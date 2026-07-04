import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Report from "../models/Report.js";
import Project from "../models/Project.js";
import {
  generateValidation, generateCompetitors, generateSWOT,
  generateLeanCanvas, generateMVPPlan, generateBranding, generateRoadmap,
} from "../services/gemini.service.js";

// GET /api/reports/:projectId
export const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ projectId: req.params.projectId });
  if (!report) throw new ApiError(404, "No report found for this project.");
  res.status(200).json({ success: true, data: report });
});

// POST /api/reports/:projectId
export const createOrUpdateReport = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");
  const report = await Report.findOneAndUpdate(
    { projectId: project._id },
    { $set: req.body, $inc: { version: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.status(200).json({ success: true, data: report });
});

// POST /api/reports/:projectId/analyze
// Runs all 7 Gemini generators in parallel, saves results, updates score.
export const analyzeProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");

  let validation, competitors, swot, leanCanvas, mvpPlan, branding, roadmap;

  try {
    [validation, competitors, swot, leanCanvas, mvpPlan, branding, roadmap] = await Promise.all([
      generateValidation(project),
      generateCompetitors(project),
      generateSWOT(project),
      generateLeanCanvas(project),
      generateMVPPlan(project),
      generateBranding(project),
      generateRoadmap(project),
    ]);
  } catch (err) {
    throw new ApiError(502, `AI analysis failed: ${err.message}`);
  }

  const report = await Report.findOneAndUpdate(
    { projectId: project._id },
    { $set: { validation, competitors, swot, leanCanvas, mvpPlan, branding, roadmap }, $inc: { version: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (typeof validation?.score === "number") {
    project.startupScore = validation.score;
    await project.save();
  }

  res.status(200).json({ success: true, data: report });
});
