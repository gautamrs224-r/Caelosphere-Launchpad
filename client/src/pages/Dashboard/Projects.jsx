import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreHorizontal } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { projects as projectsApi } from "../../lib/api";
import { SkeletonProjectCard } from "../../components/Skeleton";

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
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    projectsApi
      .list()
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err.message || "Could not load your projects."))
      .finally(() => setLoading(false));
  }, []);

  const action = (
    <button onClick={() => navigate("/launchpad")} className="bg-primary hover:bg-primaryHover transition-colors text-white text-sm font-medium px-4 py-2 rounded-btn flex items-center gap-1.5">
      <Plus size={16} /> New Project
    </button>
  );

  return (
    <DashboardLayout title="Projects" subtitle="All your startups in one place." action={action}>
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map((i) => <SkeletonProjectCard key={i} />)}
        </div>
      )}

      {!loading && error && (
        <div className="bg-error/10 border border-error/30 text-error text-sm rounded-card px-5 py-4">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-surface border border-border rounded-card">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold mb-1">No Projects Yet</h3>
          <p className="text-textSecondary text-sm mb-6 max-w-sm">Create your first startup and Caelosphere will set up a workspace for it.</p>
          <button onClick={() => navigate("/launchpad")} className="bg-primary hover:bg-primaryHover text-white text-sm font-medium px-5 py-2.5 rounded-btn">
            Create Your First Startup
          </button>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={p._id}
              onClick={() => navigate(`/workspace/${p._id}`)}
              className="bg-surface border border-border rounded-card p-5 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-btn flex items-center justify-center text-xl ${COLORS[i % COLORS.length]}`}>
                  {ICONS[i % ICONS.length]}
                </div>
                <MoreHorizontal size={16} className="text-textSecondary" />
              </div>
              <h3 className="font-semibold mb-0.5">{p.title}</h3>
              <p className="text-xs text-textSecondary mb-4">{p.industry || "Uncategorized"}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium bg-surface2 px-2.5 py-1 rounded-full">
                  Score {p.startupScore ?? "—"}
                </span>
                <span className="text-xs text-textSecondary">Updated {timeAgo(p.updatedAt)}</span>
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate("/launchpad")}
            className="border border-dashed border-primary/40 rounded-card p-5 flex flex-col items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors min-h-[160px]"
          >
            <Plus size={22} />
            <span className="text-sm font-medium">Create New Startup</span>
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
