import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Report from "../models/Report.js";
import Project from "../models/Project.js";
import {
  generateValidation,
  generateCompetitors,
  generateSWOT,
  generateLeanCanvas,
  generateMVPPlan,
} from "../services/gemini.service.js";

// GET /api/reports/:projectId
export const getReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ projectId: req.params.projectId });
  if (!report) throw new ApiError(404, "Report not found for this project.");
  res.status(200).json({ success: true, data: report });
});

// POST /api/reports/:projectId
// Creates (or updates) the report shell for a project with raw data the
// client sends directly (used for manual edits, not AI generation).
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
// Runs the real Gemini analysis for a project: Validation, Competitors,
// SWOT, Lean Canvas, and MVP Plan. Saves the combined result as this
// project's Report, and updates the project's startupScore.
export const analyzeProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");

  let validation, competitors, swot, leanCanvas, mvpPlan;
  try {
    [validation, competitors, swot, leanCanvas, mvpPlan] = await Promise.all([
      generateValidation(project),
      generateCompetitors(project),
      generateSWOT(project),
      generateLeanCanvas(project),
      generateMVPPlan(project),
    ]);
  } catch (err) {
    throw new ApiError(502, `AI analysis failed: ${err.message}`);
  }

  const report = await Report.findOneAndUpdate(
    { projectId: project._id },
    { $set: { validation, competitors, swot, leanCanvas, mvpPlan }, $inc: { version: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (typeof validation?.score === "number") {
    project.startupScore = validation.score;
    await project.save();
  }

  res.status(200).json({ success: true, data: report });
});
