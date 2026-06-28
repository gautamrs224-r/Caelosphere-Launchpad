import { useNavigate } from "react-router-dom";
import { Users, Plus, Trash2, GripVertical, Send, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import WizardLayout from "./WizardLayout";
import { teamMembers } from "../../../data/dummy";

const tips = ["Add all key team members", "Highlight relevant experience", "Clearly define roles", "Investors look for complementary skills"];

export default function Step4({ data }) {
  const navigate = useNavigate();

  return (
    <WizardLayout
      step={4}
      icon={<Users size={22} />}
      title="Create New Startup"
      subtitle={{ title: "Add your team information", desc: "Tell us about the key people behind your startup." }}
      completedLabels={{ 1: data.name || "Startup", 2: data.industry || "Industry", 3: `${(data.goals || []).length} objectives set` }}
    >
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-medium mb-3">Team Members</p>
          <div className="flex flex-col gap-3 mb-4">
            {teamMembers.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3 bg-surface2 border border-border rounded-card px-4 py-3">
                <img src={`https://i.pravatar.cc/80?img=${i + 13}`} className="w-9 h-9 rounded-full object-cover" alt={m.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium flex items-center gap-2 truncate">
                    {m.name} <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full flex-shrink-0">{m.role}</span>
                  </p>
                  <p className="text-xs text-textSecondary truncate">{m.email}</p>
                </div>
                {m.you ? (
                  <span className="text-xs bg-surface px-2 py-1 rounded-full text-textSecondary">You</span>
                ) : (
                  <>
                    <Trash2 size={15} className="text-textSecondary cursor-pointer flex-shrink-0" />
                    <GripVertical size={15} className="text-textSecondary cursor-pointer flex-shrink-0" />
                  </>
                )}
              </div>
            ))}
          </div>
          <button className="w-full border border-dashed border-primary/40 text-primary rounded-card py-3 text-sm flex items-center justify-center gap-2 hover:bg-primary/5">
            <Plus size={16} /> Add Team Member
          </button>
        </div>

        <div>
          <div className="bg-surface2 border border-border rounded-card p-5 mb-5">
            <p className="font-semibold mb-1">Invite Team Member</p>
            <p className="text-xs text-textSecondary mb-4">Invite a new team member to collaborate.</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium block mb-1">Full Name</label>
                <input placeholder="Enter full name" className="w-full bg-surface border border-border rounded-btn px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Email Address</label>
                <input placeholder="Enter email address" className="w-full bg-surface border border-border rounded-btn px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Role</label>
                <select className="w-full bg-surface border border-border rounded-btn px-3 py-2.5 text-sm outline-none focus:border-primary appearance-none">
                  <option>Select role</option>
                  <option>CTO</option>
                  <option>COO</option>
                  <option>CFO</option>
                  <option>Engineer</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1">Responsibilities <span className="text-textSecondary">(Optional)</span></label>
                <textarea rows={2} maxLength={200} placeholder="Describe their key responsibilities" className="w-full bg-surface border border-border rounded-btn px-3 py-2.5 text-sm outline-none focus:border-primary resize-none" />
              </div>
              <label className="flex items-center gap-2 text-xs text-textSecondary">
                <input type="checkbox" defaultChecked className="accent-primary w-3.5 h-3.5" /> Send invitation email
              </label>
              <button className="bg-primary hover:bg-primaryHover text-white text-sm font-medium py-2.5 rounded-btn flex items-center justify-center gap-1.5">
                <Send size={14} /> Send Invitation
              </button>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-card p-4">
            <p className="text-sm font-medium mb-1">Why team info matters</p>
            <p className="text-xs text-textSecondary mb-3">A strong team builds investor confidence and improves your chances of success.</p>
            <div className="flex flex-col gap-1.5">
              {tips.map((t) => (
                <p key={t} className="text-xs text-textSecondary flex items-center gap-1.5"><CheckCircle2 size={13} className="text-primary flex-shrink-0" /> {t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => navigate("/launchpad/step-3")} className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2 flex items-center gap-1.5">
          <ArrowLeft size={15} /> Previous
        </button>
        <div className="flex gap-3">
          <button className="border border-border rounded-btn px-5 py-2.5 text-sm hover:bg-surface2">Save & Exit</button>
          <button onClick={() => navigate("/launchpad/step-5")} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5">
            Next: Review <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </WizardLayout>
  );
}
