import express from "express";
import { getWorkspace, updateWorkspace } from "../controllers/workspaceController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/:projectId").get(getWorkspace).put(updateWorkspace);

export default router;
