import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Play, Lightbulb, LineChart, Target, Rocket } from "lucide-react";

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
    <section className="relative overflow-x-hidden pt-12 pb-20 bg-grid">
      {/* Glow blobs — pointer-events-none prevents horizontal scroll trigger */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/25 rounded-full glow pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[250px] bg-accent/15 rounded-full glow pointer-events-none" />

      {/* px-3 on tiny phones, px-6 from sm up */}
      <div className="max-w-container mx-auto px-3 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden min-w-0"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-5">
              <Sparkles size={14} /> AI-Powered Startup Operating System
            </span>

            {/* break-words stops any single long word from overflowing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold leading-[1.1] mb-5 break-words">
              Turn Your Startup Idea Into a{" "}
              <span className="text-primary">Launch Plan</span>
            </h1>

            {/* max-w-full + break-words — never wider than its container */}
            <p className="text-textSecondary text-base sm:text-lg mb-7 max-w-full break-words">
              Validate ideas, analyze markets, discover competitors, build MVP
              roadmaps, and launch smarter with AI-powered insights.
            </p>

            {/* Buttons stack vertically on phones, side-by-side from 480px */}
            <div className="flex flex-col xs:flex-row flex-wrap gap-3 mb-7">
              <button
                onClick={() => navigate("/register")}
                className="w-full xs:w-auto bg-primary hover:bg-primaryHover transition-colors text-white font-medium px-6 py-3 rounded-btn flex items-center justify-center gap-2"
              >
                Launch Your Idea 🚀
              </button>
              <button className="w-full xs:w-auto border border-border hover:border-textSecondary transition-colors px-6 py-3 rounded-btn flex items-center justify-center gap-2 font-medium">
                <Play size={16} /> Watch Demo
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 flex-shrink-0">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/64?img=${i + 20}`}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-bg object-cover"
                    alt="founder"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-warning text-sm">{"★★★★★"}</div>
                <p className="text-xs text-textSecondary">Loved by 1,000+ founders</p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Idea Journey card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full min-w-0"
          >
            <div className="bg-surface/80 backdrop-blur border border-primary/30 rounded-card p-3 sm:p-6 shadow-soft w-full overflow-hidden">
              <p className="flex items-center gap-2 text-sm font-medium mb-4">
                Your Idea Journey <Sparkles size={14} className="text-primary" />
              </p>

              <div className="flex flex-col gap-3">
                {journeySteps.map((s, i) => (
                  <div
                    key={i}
                    className="bg-surface2 border border-border rounded-card p-3 sm:p-4 flex items-center gap-2 sm:gap-3 overflow-hidden"
                  >
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-btn bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <s.icon size={16} />
                    </div>

                    {/* Title + desc — flex-1 min-w-0 forces truncation, not overflow */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.title}</p>
                      <p className="text-xs text-textSecondary truncate">{s.desc}</p>
                    </div>

                    {/* Right indicators — flex-shrink-0 keeps them visible */}
                    <div className="flex-shrink-0">
                      {s.tag && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${s.tagColor || ""}`}>
                          {s.tag}
                        </span>
                      )}
                      {s.score && (
                        <div className="relative w-10 h-10 flex items-center justify-center">
                          <svg className="absolute inset-0" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#3F3F46" strokeWidth="3" />
                            <circle
                              cx="18" cy="18" r="16" fill="none" stroke="#A855F7" strokeWidth="3"
                              strokeDasharray={`${(s.score / 100) * 100} 100`}
                              strokeLinecap="round" transform="rotate(-90 18 18)"
                            />
                          </svg>
                          <span className="text-xs font-bold relative">{s.score}</span>
                        </div>
                      )}
                      {s.bars && (
                        <div className="flex items-end gap-0.5 h-5">
                          {[5, 9, 13, 18].map((h, idx) => (
                            <div key={idx} style={{ height: h }} className="w-1.5 bg-primary rounded-sm" />
                          ))}
                        </div>
                      )}
                      {s.link && (
                        <span className="text-xs text-primary font-medium whitespace-nowrap hidden xs:inline">
                          {s.link} →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust logos */}
        <div className="mt-14">
          <p className="text-center text-xs text-textSecondary tracking-widest mb-5">
            TRUSTED BY INNOVATORS WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-10 opacity-60 text-textSecondary font-semibold text-sm">
            {logos.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}