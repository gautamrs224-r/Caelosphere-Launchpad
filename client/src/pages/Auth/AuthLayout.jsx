import { Brain, Rocket, BarChart3 } from "lucide-react";

export default function AuthLayout({ children, perks }) {
  return (
    <div className="min-h-screen flex bg-bg text-textPrimary">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center px-16 py-12">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1400&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="space"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">C</div>
            <div>
              <p className="font-semibold leading-tight">Caelosphere</p>
              <p className="text-[11px] text-primary tracking-widest leading-tight">LAUNCHPAD</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Turn Your Idea<br />Into a <span className="text-primary">Launch Plan</span>
          </h1>
          <p className="text-textSecondary max-w-sm mb-10">
            AI-powered insights, market analysis, and smart planning tools to help you build, validate, and launch your startup.
          </p>
          <div className="flex flex-col gap-5">
            {perks.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-btn bg-surface/80 border border-border flex items-center justify-center text-primary flex-shrink-0">
                  <p.icon size={18} />
                </div>
                <div>
                  <p className="font-medium text-sm">{p.title}</p>
                  <p className="text-xs text-textSecondary max-w-xs">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export const defaultPerks = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Get deep insights about your idea, market, and competition." },
  { icon: Rocket, title: "Build Smarter", desc: "Create validated roadmaps, MVP plans, and growth strategies." },
  { icon: BarChart3, title: "Launch Faster", desc: "Everything you need to go from idea to launch, in one place." },
];
