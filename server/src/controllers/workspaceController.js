import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Workspace from "../models/Workspace.js";
import Project from "../models/Project.js";

// GET /api/workspaces/:projectId
export const getWorkspace = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");

  let workspace = await Workspace.findOne({ projectId: project._id });
  if (!workspace) {
    workspace = await Workspace.create({ projectId: project._id });
  }

  res.status(200).json({ success: true, data: workspace });
});

// PUT /api/workspaces/:projectId
export const updateWorkspace = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, userId: req.user._id });
  if (!project) throw new ApiError(404, "Project not found.");

  const workspace = await Workspace.findOneAndUpdate(
    { projectId: project._id },
    req.body,
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({ success: true, data: workspace });
});
