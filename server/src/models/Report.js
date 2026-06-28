import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    validation: { type: mongoose.Schema.Types.Mixed, default: null },
    competitors: { type: mongoose.Schema.Types.Mixed, default: null },
    swot: { type: mongoose.Schema.Types.Mixed, default: null },
    leanCanvas: { type: mongoose.Schema.Types.Mixed, default: null },
    mvpPlan: { type: mongoose.Schema.Types.Mixed, default: null },
    branding: { type: mongoose.Schema.Types.Mixed, default: null },
    roadmap: { type: mongoose.Schema.Types.Mixed, default: null },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
