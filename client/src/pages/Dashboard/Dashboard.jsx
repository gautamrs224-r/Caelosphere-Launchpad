import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  FileText,
  TrendingUp,
  Download,
  Plus,
  Sparkles,
  BarChart3,
  Calendar,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import { SkeletonRow } from "../../components/Skeleton";
import { activityData, industries } from "../../data/dummy";
import { projects as projectsApi } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const ICONS = ["🚀", "💡", "📈", "🌱", "🛒", "🎓", "❤️", "💬"];
const COLORS = [
  "bg-primary/20 text-primary",
  "bg-green-500/20 text-green-400",
  "bg-blue-500/20 text-blue-400",
  "bg-pink-500/20 text-pink-400",
  "bg-yellow-500/20 text-yellow-400",
];

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const quickActions = [
  {
    icon: Plus,
    title: "Create Startup",
    desc: "New project",
    bg: "bg-primary/15",
    color: "text-primary",
    to: "/launchpad",
  },
  {
    icon: Sparkles,
    title: "Generate Report",
    desc: "AI analysis",
    bg: "bg-blue-500/15",
    color: "text-blue-400",
    to: "/reports",
  },
  {
    icon: BarChart3,
    title: "Competitors",
    desc: "Find market gaps",
    bg: "bg-green-500/15",
    color: "text-green-400",
    to: "/workspace?tab=competitors",
  },
  {
    icon: Calendar,
    title: "Roadmap",
    desc: "Plan launch",
    bg: "bg-orange-500/15",
    color: "text-orange-400",
    to: "/workspace?tab=roadmap",
  },
  {
    icon: Download,
    title: "Export",
    desc: "Download",
    bg: "bg-blue-500/15",
    color: "text-blue-400",
    to: "/exports",
  },
  {
    icon: MessageSquare,
    title: "AI Chat",
    desc: "Ask questions",
    bg: "bg-primary/15",
    color: "text-primary",
    to: "/workspace",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    projectsApi
      .list()
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err.message || "Could not load projects."))
      .finally(() => setLoading(false));
  }, []);

  const recent = projects.slice(0, 5);
  const avgScore = projects.length
    ? Math.round(
        projects.reduce((sum, p) => sum + (p.startupScore || 0), 0) /
          projects.length,
      )
    : 0;

  return (
    <DashboardLayout>
      <h1 className="text-xl sm:text-2xl font-bold mb-1">
        Welcome back, {user?.name?.split(" ")[0] || "there"}! 👋
      </h1>
      <p className="text-textSecondary text-sm mb-6">
        Here's what's happening with your startups today.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard
          icon={<FolderOpen size={18} />}
          label="Total Projects"
          value={String(projects.length)}
          delta={projects.length ? "Live" : "—"}
          note="your account"
          sparkData={activityData}
        />
        <StatCard
          icon={<FileText size={18} />}
          label="Reports"
          value="0"
          delta="—"
          note="Stage 6"
          sparkData={activityData}
          bg="bg-blue-500/15"
          color="text-blue-400"
        />
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Avg Score"
          value={avgScore ? `${avgScore}%` : "—"}
          delta={avgScore ? "Live" : "—"}
          note="your projects"
          sparkData={activityData}
        />
        <StatCard
          icon={<Download size={18} />}
          label="Exports"
          value="0"
          delta="—"
          note="coming soon"
          sparkData={activityData}
          bg="bg-green-500/15"
          color="text-green-400"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Projects</h3>
            <button
              onClick={() => navigate("/projects")}
              className="text-sm text-primary"
            >
              View all
            </button>
          </div>
          {loading && [1, 2, 3].map((i) => <SkeletonRow key={i} />)}
          {!loading && error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm rounded-btn px-4 py-3">
              {error}
            </div>
          )}
          {!loading && !error && recent.length === 0 && (
            <div className="text-center py-10">
              <p className="text-textSecondary text-sm mb-4">
                No startups yet.
              </p>
              <button
                onClick={() => navigate("/launchpad")}
                className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-4 py-2 rounded-btn"
              >
                Create Your First Startup
              </button>
            </div>
          )}
          {!loading && !error && recent.length > 0 && (
            <div className="flex flex-col divide-y divide-border">
              {recent.map((p, i) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/workspace/${p._id}`)}
                  className="flex items-center gap-3 py-3.5 cursor-pointer hover:bg-surface2/40 rounded-btn px-2 -mx-2 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-btn flex items-center justify-center text-lg flex-shrink-0 ${COLORS[i % COLORS.length]}`}
                  >
                    {ICONS[i % ICONS.length]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-textSecondary truncate">
                      {p.industry || "Uncategorized"}
                    </p>
                  </div>
                  <span className="text-xs font-medium bg-surface2 px-2.5 py-1 rounded-full flex-shrink-0">
                    {p.startupScore ?? "—"}
                  </span>
                  <span className="text-xs text-textSecondary hidden sm:block flex-shrink-0">
                    {timeAgo(p.updatedAt)}
                  </span>
                  <MoreHorizontal
                    size={16}
                    className="text-textSecondary flex-shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((q) => (
              <button
                key={q.title}
                onClick={() => q.to && navigate(q.to)}
                className="text-left bg-surface2 hover:bg-border/40 transition-colors rounded-btn p-3 flex flex-col gap-1.5"
              >
                <div
                  className={`w-7 h-7 rounded-btn ${q.bg} ${q.color} flex items-center justify-center`}
                >
                  <q.icon size={13} />
                </div>
                <div>
                  <p className="text-xs font-medium leading-tight">{q.title}</p>
                  <p className="text-[11px] text-textSecondary leading-tight">
                    {q.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-surface border border-border rounded-card p-5">
          <h3 className="font-semibold mb-4">Project Activity</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#A1A1AA"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A1A1AA"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#18181B",
                  border: "1px solid #3F3F46",
                  borderRadius: 10,
                  fontSize: 11,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#A855F7"
                strokeWidth={2}
                fill="url(#colorVal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface border border-border rounded-card p-5">
          <h3 className="font-semibold mb-4">Top Industries</h3>
          <div className="flex flex-col gap-2 mb-4">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-1.5 text-textSecondary min-w-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: ind.color }}
                  />
                  <span className="truncate">{ind.name}</span>
                </span>
                <span className="font-medium ml-2 flex-shrink-0">
                  {ind.pct}%
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-24 h-24 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={industries}
                  dataKey="pct"
                  innerRadius={30}
                  outerRadius={44}
                  startAngle={90}
                  endAngle={-270}
                >
                  {industries.map((ind, i) => (
                    <Cell key={i} fill={ind.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-lg font-bold">{projects.length}</p>
              <p className="text-[10px] text-textSecondary">Total</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
