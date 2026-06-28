import { useNavigate } from "react-router-dom";
import { Download, Lightbulb, TrendingUp, AlertTriangle, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import { activityData, industries, projects, marketOverTime } from "../../data/dummy";

const topProjects = [
  { name: "FarmAI", industry: "Agriculture", score: 92, icon: "🌱" },
  { name: "HealthMate", industry: "Healthcare", score: 91, icon: "❤️" },
  { name: "FinSmart", industry: "Fintech", score: 78, icon: "💬" },
  { name: "EduConnect", industry: "Education", score: 75, icon: "🎓" },
  { name: "MarketGo", industry: "E-commerce", score: 72, icon: "🛍️" },
];

export default function Analytics() {
  const navigate = useNavigate();
  const action = (
    <button onClick={() => navigate("/exports")} className="bg-primary hover:bg-primaryHover transition-colors text-white text-sm font-medium px-4 py-2 rounded-btn flex items-center gap-1.5">
      <Download size={16} /> Export Report
    </button>
  );

  return (
    <DashboardLayout title="Analytics Overview" subtitle="Deep insights into your startup portfolio and performance." action={action}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard icon={<TrendingUp size={18} />} label="Startup Score (Avg)" value="84/100" delta="12%" note="vs last month" sparkData={activityData} />
        <StatCard icon={<TrendingUp size={18} />} label="Market Opportunity" value="$2.48B" delta="18%" note="vs last month" sparkData={activityData} bg="bg-green-500/15" color="text-green-400" />
        <StatCard icon={<TrendingUp size={18} />} label="Active Projects" value="12" delta="20%" note="vs last month" sparkData={activityData} bg="bg-blue-500/15" color="text-blue-400" />
        <StatCard icon={<TrendingUp size={18} />} label="Reports Generated" value="28" delta="35%" note="vs last month" sparkData={activityData} bg="bg-orange-500/15" color="text-orange-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Startup Score Trend</h3>
            <select className="bg-surface2 border border-border rounded-btn text-xs px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={activityData.map((d) => ({ ...d, value: d.value + 50 }))}>
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #3F3F46", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 3, fill: "#A855F7" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold">Market Opportunity</h3>
            <select className="bg-surface2 border border-border rounded-btn text-xs px-2 py-1 outline-none">
              <option>This Month</option>
            </select>
          </div>
          <p className="text-2xl font-bold mb-4">$2.48B <span className="text-success text-sm font-normal">↑18%</span></p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={marketOverTime}>
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #3F3F46", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="font-semibold mb-5">Project Activity</h3>
          <div className="relative w-36 h-36 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industries} dataKey="pct" innerRadius={48} outerRadius={68} startAngle={90} endAngle={-270}>
                  {industries.map((ind, i) => <Cell key={i} fill={ind.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">312</p>
              <p className="text-[10px] text-textSecondary">Total Activities</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="font-semibold mb-5">Industry Distribution</h3>
          <div className="relative w-36 h-36 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={industries} dataKey="pct" innerRadius={48} outerRadius={68} startAngle={90} endAngle={-270}>
                  {industries.map((ind, i) => <Cell key={i} fill={ind.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">12</p>
              <p className="text-[10px] text-textSecondary">Projects</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6">
          <h3 className="font-semibold mb-5">Top Performing Projects</h3>
          <div className="flex flex-col gap-4">
            {topProjects.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="flex items-center gap-2"><span>{p.icon}</span> {p.name}</span>
                  <span className="font-medium">{p.score}/100</span>
                </div>
                <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/15 to-transparent border border-primary/30 rounded-card p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-12 h-12 rounded-btn bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
          <Lightbulb size={22} />
        </div>
        <div className="flex-1">
          <p className="font-semibold mb-1">AI Insight <span className="text-xs bg-surface2 text-textSecondary px-2 py-0.5 rounded-full ml-1">Beta</span></p>
          <p className="text-sm text-textSecondary">Your startups in AI and Healthcare are performing 28% above average. Consider increasing focus on these high-potential industries.</p>
        </div>
        <button onClick={() => navigate("/workspace")} className="text-primary text-sm font-medium flex-shrink-0">View Detailed Insights →</button>
        <div className="flex gap-6 flex-shrink-0 border-l border-border pl-6">
          <div className="text-center">
            <p className="text-success font-bold flex items-center gap-1 justify-center"><TrendingUp size={14} />3</p>
            <p className="text-xs text-textSecondary">High Potential</p>
          </div>
          <div className="text-center">
            <p className="text-warning font-bold flex items-center gap-1 justify-center"><AlertTriangle size={14} />2</p>
            <p className="text-xs text-textSecondary">Needs Attention</p>
          </div>
          <div className="text-center">
            <p className="text-error font-bold flex items-center gap-1 justify-center"><ShieldAlert size={14} />1</p>
            <p className="text-xs text-textSecondary">At Risk</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
