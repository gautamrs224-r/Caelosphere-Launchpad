import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, HelpCircle, X, Rocket, Sparkles, Database, Brain, BarChart3, FileText, Lightbulb, Check, AlertTriangle } from "lucide-react";
import { loadingStages } from "../../../data/dummy";
import { reports as reportsApi } from "../../../lib/api";

const icons = [Database, Brain, BarChart3, FileText];

export default function GeneratingScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const projectId = params.get("projectId");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const doneRef = useRef(false);

  // Visual progress animation — caps at 90% until the real Gemini call
  // actually finishes, then jumps to 100%. This keeps the screen honest:
  // it won't claim "done" before the real analysis is actually done.
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (doneRef.current) return p;
        if (p >= 90) return 90;
        return p + 2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!projectId) {
      setError("No project ID found — go back and create your startup again.");
      return;
    }

    reportsApi
      .analyze(projectId)
      .then(() => {
        doneRef.current = true;
        setProgress(100);
        setTimeout(() => navigate(`/workspace/${projectId}`), 700);
      })
      .catch((err) => {
        doneRef.current = true;
        setError(err.message || "AI analysis failed. Please try again.");
      });
  }, [projectId, navigate]);

  const activeIdx = Math.min(loadingStages.length - 1, Math.floor((progress / 100) * loadingStages.length));

  if (error) {
    return (
      <div className="min-h-screen bg-bg text-textPrimary flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-surface border border-error/30 rounded-card p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-error/15 text-error flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">AI Analysis Failed</h2>
          <p className="text-sm text-textSecondary mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate("/dashboard")} className="border border-border rounded-btn px-4 py-2 text-sm hover:bg-surface2">
              Back to Dashboard
            </button>
            {projectId && (
              <button onClick={() => navigate(`/workspace/${projectId}`)} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-4 py-2 rounded-btn">
                View Workspace Anyway
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <header className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-border">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm text-textSecondary hover:text-textPrimary">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-sm text-textSecondary hover:text-textPrimary"><HelpCircle size={16} /> Help</button>
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1.5 text-sm bg-surface border border-border rounded-btn px-3 py-1.5 hover:bg-surface2">
            <X size={14} /> Close
          </button>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-primary/20 via-surface to-surface border border-border rounded-card p-6 lg:p-8 mb-10 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-btn bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <Rocket size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Analysis in Progress</h1>
              <p className="text-textSecondary text-sm max-w-md">Caelosphere AI is analyzing your startup information to generate data-driven insights and recommendations.</p>
            </div>
          </div>
          <Rocket className="hidden md:block text-primary/40 relative z-10" size={70} />
          <div className="absolute -top-10 right-20 w-52 h-52 bg-primary/20 rounded-full glow" />
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="relative w-56 h-56 flex items-center justify-center mb-6">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#27272A" strokeWidth="4" />
              <circle
                cx="50" cy="50" r="45" fill="none" stroke="#A855F7" strokeWidth="4"
                strokeDasharray={`${(progress / 100) * 283} 283`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.2s linear" }}
              />
            </svg>
            <div className="text-center">
              <Sparkles className="text-primary mx-auto mb-1" size={20} />
              <p className="text-4xl font-bold">{progress}%</p>
              <p className="text-primary text-sm">Analyzing your startup</p>
            </div>
          </div>
          <p className="text-textSecondary text-sm">This may take a few moments...</p>
          <p className="text-textSecondary text-sm">Our AI is working hard to deliver the best insights for your success.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {loadingStages.map((s, i) => {
            const Icon = icons[i];
            const done = i < activeIdx;
            const active = i === activeIdx;
            return (
              <div key={s.key} className="flex flex-col items-center text-center gap-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors
                  ${done ? "bg-primary border-primary text-white" : active ? "border-primary text-primary bg-primary/10 animate-pulse" : "border-border text-textSecondary"}`}>
                  {done ? <Check size={22} /> : <Icon size={22} />}
                </div>
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-textSecondary">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-surface border border-border rounded-card p-4 flex items-center gap-3">
          <Lightbulb size={18} className="text-primary flex-shrink-0" />
          <p className="text-sm text-textSecondary">
            <span className="font-medium text-textPrimary">Did you know?</span> Startups that leverage data-driven insights are <span className="text-primary font-medium">2.5x</span> more likely to succeed.
          </p>
        </div>
      </div>
    </div>
  );
}
