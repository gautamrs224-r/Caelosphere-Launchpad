import { useNavigate } from "react-router-dom";
import { Building2, ChevronDown, Search, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import WizardLayout from "./WizardLayout";
import { wizardIndustries } from "../../../data/dummy";

export default function Step2({ data, setData }) {
  const navigate = useNavigate();

  return (
    <WizardLayout
      step={2}
      icon={<Building2 size={22} />}
      title="Create New Startup"
      subtitle={{ title: "Define your industry and market", desc: "This helps us provide tailored insights and benchmarks for your startup." }}
      completedLabels={{ 1: data.name || "Startup" }}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium mb-1">Industry</p>
          <p className="text-xs text-textSecondary mb-3">Select your primary industry</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {wizardIndustries.map((ind) => (
              <button
                key={ind.key}
                onClick={() => setData({ ...data, industry: ind.label })}
                className={`flex flex-col items-center gap-2 py-5 rounded-btn border text-sm transition-colors
                ${data.industry === ind.label ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface2 text-textSecondary hover:border-textSecondary"}`}
              >
                <span className="text-2xl">{ind.icon}</span>
                {ind.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input placeholder="Can't find your industry? Search here..." className="w-full bg-surface2 border border-border rounded-btn pl-10 py-3 outline-none focus:border-primary text-sm" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Target Market</p>
          <p className="text-xs text-textSecondary mb-4">Tell us about your target customers</p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Target Customer Segment</label>
              <select className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-3 outline-none focus:border-primary text-sm appearance-none">
                <option>Select your primary customer segment</option>
                <option>Enterprises & Developers</option>
                <option>Small Businesses</option>
                <option>Consumers</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Geographic Focus</label>
              <select className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-3 outline-none focus:border-primary text-sm appearance-none">
                <option>Select primary geographic focus</option>
                <option>North America</option>
                <option>Global</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Market Size</label>
              <select className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-3 outline-none focus:border-primary text-sm appearance-none">
                <option>Select estimated market size</option>
                <option>$1B - $50B</option>
                <option>$50B+</option>
              </select>
            </div>
          </div>
          <div className="bg-primary/10 border border-primary/30 rounded-card p-4 flex items-start gap-3 mt-5">
            <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Why we ask this?</p>
              <p className="text-xs text-textSecondary">Understanding your market helps us provide accurate market size estimates, trends, and competitive landscape.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => navigate("/launchpad/step-1")} className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2 flex items-center gap-1.5">
          <ArrowLeft size={15} /> Previous
        </button>
        <div className="flex gap-3">
          <button className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2">Save & Exit</button>
          <button onClick={() => navigate("/launchpad/step-3")} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5">
            Next: Goals <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
