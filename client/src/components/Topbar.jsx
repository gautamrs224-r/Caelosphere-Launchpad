import { Menu, Search, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick, title, subtitle, action, onSearchClick }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-2 px-4 lg:px-8 py-4 border-b border-border overflow-hidden">
      {/* Left — hamburger + title or search */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button onClick={onMenuClick} className="lg:hidden text-textSecondary flex-shrink-0">
          <Menu size={22} />
        </button>

        {title ? (
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold truncate">{title}</h1>
            {subtitle && <p className="text-xs sm:text-sm text-textSecondary truncate">{subtitle}</p>}
          </div>
        ) : (
          <button
            onClick={onSearchClick}
            className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-btn px-3.5 py-2.5 w-full max-w-sm text-textSecondary text-sm cursor-pointer hover:border-primary/50 transition-colors"
          >
            <Search size={16} className="flex-shrink-0" />
            <span className="flex-1 text-left">Search anything...</span>
            <span className="text-xs border border-border rounded px-1.5 py-0.5 flex-shrink-0 whitespace-nowrap">Ctrl K</span>
          </button>
        )}
      </div>

      {/* Right — notifications + action */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="relative text-textSecondary hover:text-textPrimary flex-shrink-0">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>

        {/* Action slot — passed in from each page */}
        {action || (
          <button
            onClick={() => navigate("/launchpad")}
            className="bg-primary hover:bg-primaryHover transition-colors text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-btn flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus size={15} />
            <span className="hidden xs:inline">New Project</span>
            <span className="xs:hidden">New</span>
          </button>
        )}
      </div>
    </div>
  );
}
