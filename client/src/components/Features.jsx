import { motion } from "framer-motion";
import { features } from "../data/dummy";
import { Sparkles, ArrowRight, MapPin, DollarSign, FileBarChart, MessageSquare } from "lucide-react";

const more = [
  { icon: MapPin, title: "Launch Roadmap", desc: "Step-by-step plan to launch" },
  { icon: DollarSign, title: "Business Models", desc: "Find the best revenue model for you" },
  { icon: FileBarChart, title: "Pitch Deck Generator", desc: "Investor-ready slides in seconds" },
  { icon: MessageSquare, title: "AI Assistant", desc: "Your personal startup co-pilot" },
];

export default function Features() {
  return (
    <section id="features" className="max-w-container mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-5">
          <Sparkles size={14} /> POWERFUL FEATURES
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Everything You Need to Build and Launch <span className="text-primary">Smarter</span>
        </h2>
        <p className="text-textSecondary">
          AI-powered tools and insights to validate your idea, create a winning strategy, and turn your vision into a successful startup.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-surface border border-border rounded-card p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-btn bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                {f.icon}
              </div>
              <span className="text-xs text-textSecondary bg-surface2 rounded-full px-2 py-1">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-textSecondary text-sm mb-4">{f.desc}</p>
            <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more <ArrowRight size={14} />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-card p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center gap-2 font-semibold flex-shrink-0">
          <Sparkles size={18} className="text-primary" />
          <span>And More to<br />Accelerate Your Journey</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          {more.map((m) => (
            <div key={m.title} className="flex items-start gap-2">
              <div className="w-9 h-9 rounded-btn bg-surface2 flex items-center justify-center text-primary flex-shrink-0">
                <m.icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">{m.title}</p>
                <p className="text-xs text-textSecondary">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
