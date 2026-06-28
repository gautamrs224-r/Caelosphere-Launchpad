import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle, X, Rocket, Check } from "lucide-react";

const steps = [
  { n: 1, label: "Startup Basics", sub: "Tell us about your startup" },
  { n: 2, label: "Industry & Market", sub: "Define your space" },
  { n: 3, label: "Goals", sub: "Set your objectives" },
  { n: 4, label: "Team", sub: "Add your team info" },
  { n: 5, label: "Review", sub: "Confirm and create" },
];

export default function WizardLayout({ step, icon, title, subtitle, completedLabels = {}, children }) {
  const navigate = useNavigate();
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

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-primary/20 via-surface to-surface border border-border rounded-card p-6 lg:p-8 mb-8 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-btn bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">{icon}</div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-textSecondary text-sm">Step {step} of 5</p>
            </div>
          </div>
          <Rocket className="hidden md:block text-primary/40 relative z-10" size={70} />
          <div className="absolute -top-10 right-20 w-52 h-52 bg-primary/20 rounded-full glow" />
        </div>

        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0
                  ${s.n < step ? "bg-primary text-white" : s.n === step ? "bg-primary text-white ring-4 ring-primary/20" : "bg-surface2 text-textSecondary border border-border"}`}
                >
                  {s.n < step ? <Check size={16} /> : s.n}
                </div>
                <div className="hidden sm:block min-w-[110px]">
                  <p className={`text-sm font-medium ${s.n <= step ? "text-textPrimary" : "text-textSecondary"}`}>{s.label}</p>
                  <p className="text-xs text-primary">{s.n < step ? completedLabels[s.n] || "Done" : s.n === step ? s.sub : ""}</p>
                </div>
              </div>
              {i < steps.length - 1 && <div className="w-10 sm:w-16 h-px bg-border mx-2 sm:mx-3" />}
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-card p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-1">{subtitle.title}</h2>
          <p className="text-textSecondary text-sm mb-7">{subtitle.desc}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
