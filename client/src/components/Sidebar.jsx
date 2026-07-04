import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Rocket, FolderKanban, BarChart3, Clock, FileText,
  Download, Settings, Crown, ChevronDown, LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/launchpad", label: "Launchpad", icon: Rocket },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/history", label: "History", icon: Clock },
  { to: "/exports", label: "Exports", icon: Download },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toast = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    toast({ message: "Logged out. See you soon! 👋", type: "info" });
    logout();
    navigate("/login");
  }

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/60 z-40 lg:hidden" />
      )}
      <aside
        className={`fixed lg:sticky z-50 top-0 left-0 h-screen w-[280px] bg-bg border-r border-border flex flex-col justify-between transition-transform duration-300 flex-shrink-0
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col min-h-0 overflow-y-auto">
          <div className="flex items-center gap-2 px-6 py-6 cursor-pointer flex-shrink-0" onClick={() => navigate("/dashboard")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">C</div>
            <div>
              <p className="font-semibold leading-tight">Caelosphere</p>
              <p className="text-xs text-primary tracking-widest leading-tight">LAUNCHPAD</p>
            </div>
          </div>
          <nav className="px-4 mt-2 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-btn text-sm transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-textSecondary hover:bg-surface hover:text-textPrimary"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 pb-4 flex-shrink-0">
          <div className="bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-card p-4 mb-4">
            <div className="flex items-center gap-2 text-primary font-semibold mb-1">
              <Crown size={16} /> Upgrade to Pro
            </div>
            <p className="text-xs text-textSecondary mb-3">Unlock advanced features, custom reports, and more.</p>
            <button className="w-full text-sm bg-surface2 border border-primary/40 text-primary rounded-btn py-2 hover:bg-primary hover:text-white transition-colors">
              Upgrade Now →
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-full flex items-center gap-3 border-t border-border pt-4">
              <img src="https://i.pravatar.cc/80?img=13" className="w-9 h-9 rounded-full object-cover" alt="avatar" />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">{user?.name || "Guest"}</p>
                <p className="text-xs text-textSecondary truncate">{user?.email || ""}</p>
              </div>
              <ChevronDown size={16} className="text-textSecondary" />
            </button>
            {menuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-surface border border-border rounded-card shadow-soft overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors"
                >
                  <LogOut size={15} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
