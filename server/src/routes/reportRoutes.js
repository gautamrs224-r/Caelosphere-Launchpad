import express from "express";
import { getReport, createOrUpdateReport, analyzeProject } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/:projectId").get(getReport).post(createOrUpdateReport);
router.post("/:projectId/analyze", analyzeProject);

export default router;
