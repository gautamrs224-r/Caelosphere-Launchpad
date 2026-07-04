import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, FileText, BarChart3, Target, Users, Sparkles, Pencil, ArrowLeft, CheckCircle2 } from "lucide-react";
import WizardLayout from "./WizardLayout";
import { teamMembers } from "../../../data/dummy";
import { projects as projectsApi } from "../../../lib/api";
import { useToast } from "../../../context/ToastContext";

export default function Step5({ data }) {
  const navigate = useNavigate();
  const goals = data.goals || [];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  async function handleCreate() {
    setError("");
    setLoading(true);
    try {
      const payload = {
        title: data.name || "Untitled Startup",
        tagline: data.tagline || "",
        description: data.description || "",
        industry: data.industry || "",
        stage: data.stage || "Idea Stage",
        goals: goals.map((g) => g.label),
      };
      const res = await projectsApi.create(payload);
      const newProject = res.data;
      toast({ message: `"${newProject.title}" created! Running AI analysis... ✨`, type: "success", duration: 5000 });
      navigate(`/launchpad/generating?projectId=${newProject._id}`);
    } catch (err) {
      setError(err.message || "Could not create your startup. Please try again.");
      setLoading(false);
    }
  }

  return (
    <WizardLayout
      step={5}
      icon={<Rocket size={22} />}
      title="Create New Startup"
      subtitle={{ title: "Review and confirm your startup", desc: "Everything looks good! Review your details below and create your startup." }}
      completedLabels={{ 1: data.name || "Startup", 2: data.industry || "Industry", 3: `${goals.length} objectives set`, 4: `${teamMembers.length} members added` }}
    >
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-surface2 border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold flex items-center gap-2"><FileText size={16} className="text-primary" /> Startup Basics</p>
            <button onClick={() => navigate("/launchpad/step-1")} className="text-xs text-primary flex items-center gap-1"><Pencil size={12} /> Edit</button>
          </div>
          <dl className="text-sm flex flex-col gap-2.5">
            <div className="flex justify-between"><dt className="text-textSecondary">Name</dt><dd>{data.name || "Caelosphere AI"}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Tagline</dt><dd className="text-right">{data.tagline || "AI-powered insights for a smarter world."}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Stage</dt><dd>{data.stage || "Seed Stage"}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Founded</dt><dd>May 2026</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Website</dt><dd>https://caelosphere.ai</dd></div>
          </dl>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> Industry & Market</p>
            <button onClick={() => navigate("/launchpad/step-2")} className="text-xs text-primary flex items-center gap-1"><Pencil size={12} /> Edit</button>
          </div>
          <dl className="text-sm flex flex-col gap-2.5">
            <div className="flex justify-between"><dt className="text-textSecondary">Industry</dt><dd>{data.industry || "AI / Machine Learning"}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Target Market</dt><dd className="text-right">Enterprises & Developers</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Geographic Focus</dt><dd className="text-right">North America, Europe, Asia Pacific</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Market Size</dt><dd>$126B (TAM)</dd></div>
          </dl>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold flex items-center gap-2"><Target size={16} className="text-primary" /> Goals</p>
            <button onClick={() => navigate("/launchpad/step-3")} className="text-xs text-primary flex items-center gap-1"><Pencil size={12} /> Edit</button>
          </div>
          <p className="text-xs text-textSecondary mb-2">Primary Objectives</p>
          <div className="flex flex-col gap-1.5">
            {(goals.length ? goals : [{ key: "mvp", label: "Build MVP" }, { key: "funding", label: "Fundraising" }, { key: "growth", label: "User Growth" }]).map((g) => (
              <p key={g.key} className="text-sm flex items-center gap-1.5"><CheckCircle2 size={14} className="text-success flex-shrink-0" /> {g.label}</p>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold flex items-center gap-2"><Users size={16} className="text-primary" /> Team ({teamMembers.length} Members)</p>
            <button onClick={() => navigate("/launchpad/step-4")} className="text-xs text-primary flex items-center gap-1"><Pencil size={12} /> Edit</button>
          </div>
          <div className="flex flex-wrap gap-4">
            {teamMembers.map((m, i) => (
              <div key={m.name} className="flex items-center gap-2">
                <img src={`https://i.pravatar.cc/80?img=${i + 13}`} className="w-9 h-9 rounded-full object-cover" alt={m.name} />
                <div>
                  <p className="text-xs font-medium">{m.name}</p>
                  <p className="text-[11px] text-primary">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-5">
          <p className="font-semibold flex items-center gap-2 mb-4"><Sparkles size={16} className="text-primary" /> Summary</p>
          <dl className="text-sm flex flex-col gap-2.5">
            <div className="flex justify-between"><dt className="text-textSecondary">Industry</dt><dd>{data.industry || "AI / Machine Learning"}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Team Members</dt><dd>{teamMembers.length}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Primary Goals</dt><dd>{goals.length || 3}</dd></div>
            <div className="flex justify-between"><dt className="text-textSecondary">Ready to Launch</dt><dd className="text-success flex items-center gap-1"><CheckCircle2 size={14} /> Yes</dd></div>
          </dl>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-card p-5 flex items-center gap-3 mb-7">
        <Sparkles size={20} className="text-primary flex-shrink-0" />
        <div>
          <p className="font-medium text-sm">You're all set!</p>
          <p className="text-xs text-textSecondary">Click Create Startup to set up your workspace and start building with Caelosphere Launchpad.</p>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-btn px-4 py-3 mb-5">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={() => navigate("/launchpad/step-4")} className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2 flex items-center gap-1.5">
          <ArrowLeft size={15} /> Previous
        </button>
        <div className="flex gap-3">
          <button className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2">Save as Draft</button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5 disabled:opacity-60"
          >
            <Rocket size={15} /> {loading ? "Creating..." : "Create Startup"}
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
