import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    industry: { type: String, default: "" },
    audience: { type: String, default: "" },
    businessModel: { type: String, default: "" },
    stage: { type: String, default: "Idea Stage" },
    goals: [{ type: String }],
    startupScore: { type: Number, default: null },
    status: { type: String, enum: ["draft", "active", "archived"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
