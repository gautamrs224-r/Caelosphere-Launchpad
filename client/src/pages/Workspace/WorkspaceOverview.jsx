import { Heart, Target, FileBarChart, ClipboardCheck, Plus, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";
import { topOpportunities, recentActivity, marketOverTime } from "../../data/dummy";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "validation", label: "Validation" },
  { key: "competitors", label: "Competitors" },
  { key: "swot", label: "SWOT" },
  { key: "leancanvas", label: "Lean Canvas" },
  { key: "mvp", label: "MVP Plan" },
  { key: "branding", label: "Branding" },
  { key: "roadmap", label: "Roadmap" },
];

export default function WorkspaceOverview({ onOpenTab }) {
  const action = (
    <button className="bg-primary hover:bg-primaryHover transition-colors text-white text-sm font-medium px-4 py-2 rounded-btn flex items-center gap-1.5">
      <Plus size={16} /> New Project <ChevronDown size={14} />
    </button>
  );

  return (
    <DashboardLayout title="Workspace Overview" subtitle="Here's what's happening with Caelosphere AI today." action={action}>
      {onOpenTab && (
        <div className="flex items-center gap-1 mb-6 border-b border-border overflow-x-auto">
          <button className="px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 border-primary text-primary">Home</button>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onOpenTab(t.key)}
              className="px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 border-transparent text-textSecondary hover:text-textPrimary"
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <p className="text-textSecondary text-sm mb-1">Welcome back, Alex! 👋</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="bg-surface border border-border rounded-card p-5">
          <div className="w-10 h-10 rounded-btn bg-primary/15 text-primary flex items-center justify-center mb-4"><Heart size={18} /></div>
          <p className="text-sm text-textSecondary mb-1">Health Score</p>
          <p className="text-2xl font-bold mb-1">92<span className="text-sm text-textSecondary">/100</span></p>
          <p className="text-xs text-success">↑12% vs last week</p>
        </div>
        <div className="bg-surface border border-border rounded-card p-5">
          <div className="w-10 h-10 rounded-btn bg-primary/15 text-primary flex items-center justify-center mb-4"><Target size={18} /></div>
          <p className="text-sm text-textSecondary mb-1">Market Opportunity</p>
          <p className="text-2xl font-bold mb-1">$126B</p>
          <p className="text-xs text-success">↑18% vs last week</p>
        </div>
        <div className="bg-surface border border-border rounded-card p-5">
          <div className="w-10 h-10 rounded-btn bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4"><FileBarChart size={18} /></div>
          <p className="text-sm text-textSecondary mb-1">Analysis Reports</p>
          <p className="text-2xl font-bold mb-1">24</p>
          <p className="text-xs text-success">↑33% vs last week</p>
        </div>
        <div className="bg-surface border border-border rounded-card p-5">
          <div className="w-10 h-10 rounded-btn bg-green-500/15 text-green-400 flex items-center justify-center mb-4"><ClipboardCheck size={18} /></div>
          <p className="text-sm text-textSecondary mb-1">Action Items</p>
          <p className="text-2xl font-bold mb-1">7</p>
          <p className="text-xs text-warning">⏱ 2 due this week</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">Market Opportunity Over Time</h3>
            <select className="bg-surface2 border border-border rounded-btn text-xs px-2 py-1 outline-none">
              <option>Last 12 Months</option>
            </select>
          </div>
          <p className="text-2xl font-bold mb-0.5">$126B <span className="text-success text-sm font-normal">↑18%</span></p>
          <p className="text-xs text-textSecondary mb-4">Total Addressable Market</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={marketOverTime}>
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}B`} />
              <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #3F3F46", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <button className="text-xs text-primary">View All</button>
          </div>
          <div className="flex flex-col gap-4">
            {recentActivity.map((a) => (
              <div key={a.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-btn bg-surface2 flex items-center justify-center text-sm flex-shrink-0">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <p className="text-xs text-textSecondary truncate">{a.desc}</p>
                </div>
                <span className="text-[11px] text-textSecondary flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Opportunities</h3>
            <button className="text-xs text-primary">View All</button>
          </div>
          <div className="flex flex-col gap-3">
            {topOpportunities.map((o) => (
              <div key={o.name} className="flex items-center justify-between text-sm">
                <span className="text-textSecondary truncate">{o.name}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span>{o.size}</span>
                  <span className={`text-xs ${o.level === "High" ? "text-success" : o.level === "Medium" ? "text-warning" : "text-textSecondary"}`}>{o.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Project Status</h3>
            <button className="text-xs text-primary">View All</button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#27272A" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray="41.6 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="25 100" strokeDashoffset="-41.6" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="16.6 100" strokeDashoffset="-66.6" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#3F3F46" strokeWidth="3" strokeDasharray="16.6 100" strokeDashoffset="-83.2" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold">12</p>
                <p className="text-[10px] text-textSecondary">Total Projects</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" />5 In Progress</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success" />3 Completed</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning" />2 On Hold</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-textSecondary" />2 Not Started</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Overview</h3>
            <button className="text-xs text-primary">View All</button>
          </div>
          <div className="flex -space-x-2 mb-4">
            {[13, 14, 15, 16].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/64?img=${i}`} className="w-9 h-9 rounded-full border-2 border-surface object-cover" alt="member" />
            ))}
            <div className="w-9 h-9 rounded-full border-2 border-surface bg-surface2 flex items-center justify-center text-textSecondary">+</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><p className="text-lg font-bold">4</p><p className="text-[11px] text-textSecondary">Team Members</p></div>
            <div><p className="text-lg font-bold">28</p><p className="text-[11px] text-textSecondary">Tasks Completed</p></div>
            <div><p className="text-lg font-bold">86%</p><p className="text-[11px] text-success">↑14% Productivity</p></div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/15 to-transparent border border-primary/30 rounded-card p-5 flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <p className="font-medium text-sm">Pro Tip</p>
            <p className="text-xs text-textSecondary">You're doing great! Complete 3 more action items to improve your health score.</p>
          </div>
        </div>
        <button className="text-primary text-sm font-medium flex-shrink-0">View Action Items →</button>
      </div>
    </DashboardLayout>
  );
}
