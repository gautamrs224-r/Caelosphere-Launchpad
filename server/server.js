import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import workspaceRoutes from "./src/routes/workspaceRoutes.js";

const app = express();

// --- Core middleware ---
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use("/api", limiter);

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Caelosphere Launchpad API is running.", stage: "Stage 3 — Backend Architecture" });
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/workspaces", workspaceRoutes);

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(env.port, () => {
    console.log(`🚀 Caelosphere Launchpad API running on port ${env.port} [${env.nodeEnv}]`);
  });
});
