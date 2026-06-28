import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen, FileQuestion, LayoutTemplate, LifeBuoy } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="navLogoGrad" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <circle cx="18" cy="18" r="17" stroke="url(#navLogoGrad)" strokeWidth="2.5" strokeDasharray="80 25" />
        <circle cx="18" cy="18" r="6" fill="url(#navLogoGrad)" />
      </svg>
      <div>
        <p className="font-semibold leading-tight">Caelosphere</p>
        <p className="text-[11px] text-primary tracking-widest leading-tight">LAUNCHPAD</p>
      </div>
    </div>
  );
}

const resourceItems = [
  { icon: BookOpen, label: "Blog", desc: "Startup tips & product updates" },
  { icon: LayoutTemplate, label: "Templates", desc: "Ready-made startup blueprints" },
  { icon: FileQuestion, label: "Guides", desc: "How to get the most from Caelosphere" },
  { icon: LifeBuoy, label: "Help Center", desc: "Support and documentation" },
];

// Scrolls to a section on the page. Using a click handler (not href="#id")
// because this app uses HashRouter — a real href="#id" would overwrite the
// routing hash and trigger navigation instead of scrolling.
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const links = [
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/60">
      <div className="max-w-container mx-auto px-6 h-20 grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center gap-4">
        <Logo />

        <nav className="hidden md:flex items-center justify-center gap-8 text-sm text-textSecondary">
          {links.map((l) => (
            <button key={l.label} onClick={() => scrollToSection(l.id)} className="hover:text-textPrimary transition-colors whitespace-nowrap">
              {l.label}
            </button>
          ))}
          <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button className="flex items-center gap-1 hover:text-textPrimary transition-colors whitespace-nowrap">
              Resources <ChevronDown size={14} />
            </button>
            {resourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                <div className="bg-surface border border-border rounded-card shadow-soft p-2">
                  {resourceItems.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setResourcesOpen(false)}
                      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-btn hover:bg-surface2 text-left transition-colors"
                    >
                      <div className="w-8 h-8 rounded-btn bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                        <r.icon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-textPrimary">{r.label}</p>
                        <p className="text-xs text-textSecondary">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center justify-end gap-4">
          <button onClick={() => navigate("/login")} className="text-sm text-textSecondary hover:text-textPrimary transition-colors whitespace-nowrap">Log in</button>
          <button
            onClick={() => navigate("/register")}
            className="bg-primary hover:bg-primaryHover transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-btn flex items-center gap-1.5 whitespace-nowrap"
          >
            Start Free →
          </button>
        </div>

        <button className="md:hidden justify-self-end" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 bg-bg">
          {links.map((l) => (
            <button key={l.label} onClick={() => { scrollToSection(l.id); setOpen(false); }} className="text-left text-textSecondary">
              {l.label}
            </button>
          ))}
          {resourceItems.map((r) => (
            <button key={r.label} onClick={() => setOpen(false)} className="text-left text-textSecondary">{r.label}</button>
          ))}
          <button onClick={() => navigate("/login")} className="text-left text-textSecondary">Log in</button>
          <button onClick={() => navigate("/register")} className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-btn">
            Start Free
          </button>
        </div>
      )}
    </header>
  );
}
