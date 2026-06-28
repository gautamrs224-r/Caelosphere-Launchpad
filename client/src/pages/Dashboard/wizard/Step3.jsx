import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, X, Users, ArrowLeft, ArrowRight } from "lucide-react";
import WizardLayout from "./WizardLayout";
import { objectives } from "../../../data/dummy";

export default function Step3({ data, setData }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(data.goals || []);

  const toggle = (obj) => {
    let next;
    if (selected.find((s) => s.key === obj.key)) {
      next = selected.filter((s) => s.key !== obj.key);
    } else if (selected.length < 3) {
      next = [...selected, obj];
    } else return;
    setSelected(next);
    setData({ ...data, goals: next });
  };

  return (
    <WizardLayout
      step={3}
      icon={<Target size={22} />}
      title="Create New Startup"
      subtitle={{ title: "Set your objectives", desc: "Choose the primary goals you want to achieve with your startup." }}
      completedLabels={{ 1: data.name || "Startup", 2: data.industry || "Industry" }}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium mb-3">Select Primary Objectives <span className="text-textSecondary">(Choose up to 3)</span></p>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {objectives.map((obj) => {
              const isSel = !!selected.find((s) => s.key === obj.key);
              return (
                <button
                  key={obj.key}
                  onClick={() => toggle(obj)}
                  className={`text-left rounded-card border p-4 transition-colors relative
                  ${isSel ? "border-primary bg-primary/10" : "border-border bg-surface2 hover:border-textSecondary"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{obj.icon}</span>
                    <span className={`w-4 h-4 rounded-sm border flex items-center justify-center ${isSel ? "bg-primary border-primary" : "border-border"}`}>
                      {isSel && <span className="text-white text-[10px]">✓</span>}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{obj.label}</p>
                  <p className="text-xs text-textSecondary">{obj.desc}</p>
                </button>
              );
            })}
          </div>
          <label className="text-sm font-medium block mb-1.5">What does success look like in 12 months?</label>
          <textarea rows={3} maxLength={500} placeholder="Describe your key milestones and success metrics..." className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-3 outline-none focus:border-primary text-sm resize-none" />
        </div>

        <div>
          <div className="bg-primary/10 border border-primary/30 rounded-card p-4 flex items-start gap-3 mb-5">
            <Target size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Why setting objectives matters</p>
              <p className="text-xs text-textSecondary">Clear objectives help us personalise insights, recommendations, and benchmarks that align with your startup's goals.</p>
            </div>
          </div>

          <p className="text-sm font-medium mb-3">Your selected objectives</p>
          <div className="flex flex-col gap-2 mb-6">
            {selected.length === 0 && <p className="text-xs text-textSecondary">No objectives selected yet.</p>}
            {selected.map((s) => (
              <div key={s.key} className="flex items-center justify-between bg-surface2 border border-border rounded-btn px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <span>{s.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-[11px] text-textSecondary">{s.desc}</p>
                  </div>
                </div>
                <button onClick={() => toggle(s)}><X size={14} className="text-textSecondary" /></button>
              </div>
            ))}
          </div>

          <div className="bg-surface2 border border-border rounded-card p-4 flex items-start gap-3">
            <Users size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">What's next?</p>
              <p className="text-xs text-textSecondary">Next, you'll add your team information so we can tailor collaboration and reporting to your team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => navigate("/launchpad/step-2")} className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2 flex items-center gap-1.5">
          <ArrowLeft size={15} /> Previous
        </button>
        <div className="flex gap-3">
          <button className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2">Save & Exit</button>
          <button onClick={() => navigate("/launchpad/step-4")} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5">
            Next: Team <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
