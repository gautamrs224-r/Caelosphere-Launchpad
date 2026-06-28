import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Building2, Globe, PenLine, Calendar, Rocket as RocketIcon, ChevronDown, Lightbulb, ArrowRight } from "lucide-react";
import WizardLayout from "./WizardLayout";

export default function Step1({ data, setData }) {
  const navigate = useNavigate();
  const [desc, setDesc] = useState(data.description || "");

  return (
    <WizardLayout
      step={1}
      icon={<Sparkles size={22} />}
      title="Create New Startup"
      subtitle={{ title: "Tell us about your startup", desc: "This information will help us personalize your experience and insights." }}
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-sm font-medium block mb-1.5">Startup Name</label>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Building2 size={16} className="text-textSecondary" />
            <input
              defaultValue={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Enter your startup name"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Website <span className="text-textSecondary">(Optional)</span></label>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Globe size={16} className="text-textSecondary" />
            <input placeholder="https://yourstartup.com" className="bg-transparent outline-none flex-1 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Tagline <span className="text-textSecondary">(Optional)</span></label>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <PenLine size={16} className="text-textSecondary" />
            <input
              defaultValue={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
              placeholder="A short tagline that describes your startup"
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Founded Date <span className="text-textSecondary">(Optional)</span></label>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-btn px-3.5 py-3 focus-within:border-primary">
            <Calendar size={16} className="text-textSecondary" />
            <input type="date" className="bg-transparent outline-none flex-1 text-sm text-textSecondary" />
          </div>
        </div>
        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium block mb-1.5">Description</label>
            <textarea
              value={desc}
              onChange={(e) => { setDesc(e.target.value); setData({ ...data, description: e.target.value }); }}
              maxLength={500}
              rows={4}
              placeholder="Describe your startup, what you do, and the problem you solve..."
              className="w-full bg-surface2 border border-border rounded-btn px-3.5 py-3 outline-none focus:border-primary text-sm resize-none"
            />
            <p className="text-xs text-textSecondary text-right mt-1">{desc.length}/500</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Stage</label>
            <div className="relative">
              <RocketIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
              <select
                onChange={(e) => setData({ ...data, stage: e.target.value })}
                defaultValue=""
                className="w-full bg-surface2 border border-border rounded-btn pl-10 pr-9 py-3 outline-none focus:border-primary text-sm appearance-none"
              >
                <option value="" disabled>Select your startup stage</option>
                <option>Idea Stage</option>
                <option>Seed Stage</option>
                <option>Early Stage</option>
                <option>Growth Stage</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-card p-4 flex items-start gap-3 mb-7">
        <Lightbulb size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Why we ask this?</p>
          <p className="text-xs text-textSecondary">This helps us tailor insights, benchmarks, and recommendations specific to your startup's stage and industry.</p>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => navigate("/dashboard")} className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2">Cancel</button>
        <button onClick={() => navigate("/launchpad/step-2")} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5">
          Next: Industry & Market <ArrowRight size={15} />
        </button>
      </div>
    </WizardLayout>
  );
}
