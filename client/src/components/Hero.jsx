import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Play, Star, Lightbulb, LineChart, Target, Rocket } from "lucide-react";

const journeySteps = [
  { icon: Lightbulb, title: "Startup Idea", desc: "AI-powered farming assistant", tag: "Completed", tagColor: "text-success bg-success/15" },
  { icon: LineChart, title: "Validation Score", desc: "Market potential is High", score: 84 },
  { icon: Target, title: "Market Opportunity", desc: "Large market with high demand", bars: true, tag: "High", tagColor: "text-success" },
  { icon: Rocket, title: "MVP Plan", desc: "3 Phases • 12 Key Features", link: "View Roadmap" },
];

const logos = ["Microsoft", "Google", "AWS", "Notion", "Stripe", "Vercel"];

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-16 pb-24 bg-grid">
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full glow" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-accent/20 rounded-full glow" />

      <div className="max-w-container mx-auto px-6 relative grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-6">
            <Sparkles size={14} /> AI-Powered Startup Operating System
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-[64px] font-extrabold leading-[1.08] mb-6">
            Turn Your Startup Idea Into a <span className="text-primary">Launch Plan</span>
          </h1>
          <p className="text-textSecondary text-lg mb-8 max-w-md">
            Validate ideas, analyze markets, discover competitors, build MVP roadmaps, and launch smarter with AI-powered insights.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primaryHover transition-colors text-white font-medium px-6 py-3.5 rounded-btn flex items-center gap-2"
            >
              Launch Your Idea 🚀
            </button>
            <button className="border border-border hover:border-textSecondary transition-colors px-6 py-3.5 rounded-btn flex items-center gap-2 font-medium">
              <Play size={16} /> Watch Demo
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/64?img=${i + 20}`} className="w-9 h-9 rounded-full border-2 border-bg object-cover" alt="founder" />
              ))}
            </div>
            <div>
              <div className="flex text-warning text-sm">{"★★★★★"}</div>
              <p className="text-xs text-textSecondary">Loved by 1,000+ founders</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="bg-surface/80 backdrop-blur border border-primary/30 rounded-card p-6 shadow-soft">
            <p className="flex items-center gap-2 text-sm font-medium mb-5">
              Your Idea Journey <Sparkles size={14} className="text-primary" />
            </p>
            <div className="flex flex-col gap-4">
              {journeySteps.map((s, i) => (
                <div key={i} className="bg-surface2 border border-border rounded-card p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-btn bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <s.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.title}</p>
                      <p className="text-xs text-textSecondary truncate">{s.desc}</p>
                    </div>
                  </div>
                  {s.tag && <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${s.tagColor || ""}`}>{s.tag}</span>}
                  {s.score && (
                    <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <svg className="absolute inset-0" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#3F3F46" strokeWidth="3" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#A855F7" strokeWidth="3" strokeDasharray={`${(s.score / 100) * 100} 100`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                      </svg>
                      <span className="text-xs font-bold">{s.score}</span>
                    </div>
                  )}
                  {s.bars && (
                    <div className="flex items-end gap-0.5 h-6 flex-shrink-0">
                      {[6, 10, 14, 20].map((h, idx) => (
                        <div key={idx} style={{ height: h }} className="w-1.5 bg-primary rounded-sm" />
                      ))}
                    </div>
                  )}
                  {s.link && <span className="text-xs text-primary font-medium flex-shrink-0">{s.link} →</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-container mx-auto px-6 mt-20">
        <p className="text-center text-xs text-textSecondary tracking-widest mb-6">TRUSTED BY INNOVATORS WORLDWIDE</p>
        <div className="flex flex-wrap justify-center gap-10 opacity-60 text-textSecondary font-semibold">
          {logos.map((l) => <span key={l}>{l}</span>)}
        </div>
      </div>
    </section>
  );
}
