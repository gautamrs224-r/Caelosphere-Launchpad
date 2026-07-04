import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Folder, Plus, BarChart3, Settings, X, Rocket } from "lucide-react";
import { projects as projectsApi } from "../lib/api";

const staticCommands = [
  { label: "New Startup", desc: "Launch the startup wizard", icon: Plus, to: "/launchpad", group: "Actions" },
  { label: "Dashboard", desc: "Go to your main dashboard", icon: BarChart3, to: "/dashboard", group: "Navigate" },
  { label: "Projects", desc: "View all your startups", icon: Folder, to: "/projects", group: "Navigate" },
  { label: "Analytics", desc: "Deep insights and performance", icon: BarChart3, to: "/analytics", group: "Navigate" },
  { label: "Settings", desc: "Manage your account", icon: Settings, to: "/settings", group: "Navigate" },
];

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
      projectsApi.list().then((res) => setUserProjects(res.data || [])).catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        open ? onClose() : null; // handled by parent
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.toLowerCase();
  const filteredStatic = staticCommands.filter(
    (c) => c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
  );
  const filteredProjects = userProjects.filter(
    (p) => p.title?.toLowerCase().includes(q) || p.industry?.toLowerCase().includes(q)
  );

  function go(to) {
    navigate(to);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-surface border border-border rounded-modal shadow-soft overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-textSecondary flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, pages, actions..."
            className="bg-transparent outline-none flex-1 text-sm text-textPrimary placeholder:text-textSecondary"
          />
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {/* Your projects */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-textSecondary uppercase tracking-widest px-4 pt-2 pb-1">Your Projects</p>
              {filteredProjects.map((p) => (
                <button
                  key={p._id}
                  onClick={() => go(`/workspace/${p._id}`)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface2 text-left transition-colors"
                >
                  <div className="w-7 h-7 rounded-btn bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 text-sm">
                    <Rocket size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-textSecondary truncate">{p.industry || "Startup"}</p>
                  </div>
                  <span className="text-xs text-textSecondary ml-auto flex-shrink-0">Workspace</span>
                </button>
              ))}
            </div>
          )}

          {/* Static commands */}
          {filteredStatic.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-textSecondary uppercase tracking-widest px-4 pt-3 pb-1">Commands</p>
              {filteredStatic.map((c) => (
                <button
                  key={c.label}
                  onClick={() => go(c.to)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface2 text-left transition-colors"
                >
                  <div className="w-7 h-7 rounded-btn bg-surface2 text-textSecondary flex items-center justify-center flex-shrink-0">
                    <c.icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs text-textSecondary">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && filteredStatic.length === 0 && (
            <p className="text-center text-sm text-textSecondary py-10">No results for "{query}"</p>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[11px] text-textSecondary">
          <span>↵ open</span>
          <span>esc close</span>
          <span className="ml-auto">Ctrl K</span>
        </div>
      </div>
    </div>
  );
}
