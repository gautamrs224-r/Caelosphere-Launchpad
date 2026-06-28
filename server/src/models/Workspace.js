import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, unique: true },
    activeTab: { type: String, default: "overview" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", workspaceSchema);
