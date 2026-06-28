import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Project from "../models/Project.js";

// GET /api/projects
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.status(200).json({ success: true, data: projects });
});

// GET /api/projects/:id
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");
  res.status(200).json({ success: true, data: project });
});

// POST /api/projects
export const createProject = asyncHandler(async (req, res) => {
  const { title, tagline, description, industry, audience, businessModel, stage, goals } = req.body;
  if (!title) throw new ApiError(400, "Startup title is required.");

  const project = await Project.create({
    userId: req.user._id,
    title,
    tagline,
    description,
    industry,
    audience,
    businessModel,
    stage,
    goals,
  });

  res.status(201).json({ success: true, data: project });
});

// PUT /api/projects/:id
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!project) throw new ApiError(404, "Project not found.");
  res.status(200).json({ success: true, data: project });
});

// DELETE /api/projects/:id
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");
  res.status(200).json({ success: true, message: "Project deleted." });
});
