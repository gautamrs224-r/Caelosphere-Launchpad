import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ShieldCheck, Zap, BarChart2, Lock, MessageCircle, Search, ClipboardList, Rocket, ChevronRight, Check } from "lucide-react";
import { howItWorks, testimonials } from "../data/dummy";

const stepIcons = [MessageCircle, Search, ClipboardList, Rocket];
const badges = [
  { icon: ShieldCheck, title: "Data-Driven Insights", desc: "Make smarter decisions with real market data." },
  { icon: Zap, title: "Save Time & Effort", desc: "AI does the heavy lifting so you can focus on building." },
  { icon: BarChart2, title: "Increase Success", desc: "Launch with a strategy that maximizes your odds." },
  { icon: Lock, title: "Secure & Private", desc: "Your ideas and data are 100% protected." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-container mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-5">
          <Sparkles size={14} /> HOW IT WORKS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          From Idea to Launch in <span className="text-primary">4 Simple Steps</span>
        </h2>
        <p className="text-textSecondary">
          Our AI analyzes your idea, builds a winning strategy, and gives you everything you need to launch successfully.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {howItWorks.map((s, i) => {
          const Icon = stepIcons[i];
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative"
            >
              <div className="bg-surface border border-border rounded-card p-6 h-full">
                <div className="w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-5 -mt-10 mx-auto relative shadow-soft">
                  {s.step}
                </div>
                <div className="bg-surface2 rounded-btn h-28 flex items-center justify-center mb-5 text-primary">
                  <Icon size={36} />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-textSecondary">{s.desc}</p>
              </div>
              {i < 3 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-primary/60" size={20} />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-card p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-shrink-0">
          <p className="font-semibold">Built for Founders.</p>
          <p className="text-primary font-semibold">Powered by AI.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {badges.map((b) => (
            <div key={b.title} className="flex items-start gap-2">
              <div className="w-9 h-9 rounded-full bg-surface2 flex items-center justify-center text-primary flex-shrink-0">
                <b.icon size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">{b.title}</p>
                <p className="text-xs text-textSecondary">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="max-w-container mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-5">
          <Sparkles size={14} /> LOVED BY FOUNDERS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Built for Founders. Loved by Thousands.</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-surface border border-border rounded-card p-6"
          >
            <p className="text-3xl text-primary mb-2">"</p>
            <p className="text-textSecondary text-sm mb-6">{t.quote}</p>
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/64?img=${i + 31}`} className="w-10 h-10 rounded-full object-cover" alt={t.name} />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-textSecondary">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      desc: "For exploring your first idea.",
      features: ["1 active startup", "Idea Validation", "Basic SWOT & Lean Canvas", "Community support"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Founder",
      price: "$29",
      period: "/month",
      desc: "For founders ready to build.",
      features: ["Up to 5 active startups", "Full AI analysis suite", "Competitor & MVP planning", "Branding Studio", "Export to PDF/DOCX", "Priority support"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Studio",
      price: "$79",
      period: "/month",
      desc: "For teams and accelerators.",
      features: ["Unlimited startups", "Team collaboration seats", "Investor pitch generator", "Custom branding", "API access", "Dedicated support"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="max-w-container mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary border border-primary/40 rounded-full px-3 py-1.5 mb-5">
          <Sparkles size={14} /> PRICING
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple Pricing, <span className="text-primary">Built to Scale With You</span>
        </h2>
        <p className="text-textSecondary">Start free. Upgrade when you're ready to launch for real.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-start max-w-xl lg:max-w-none mx-auto">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-card p-7 border relative ${p.highlight ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-soft" : "border-border bg-surface"}`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
            <p className="text-textSecondary text-sm mb-5">{p.desc}</p>
            <p className="mb-6">
              <span className="text-4xl font-extrabold">{p.price}</span>
              <span className="text-textSecondary text-sm">{p.period}</span>
            </p>
            <ul className="flex flex-col gap-2.5 mb-7">
              {p.features.map((f) => (
                <li key={f} className="text-sm text-textSecondary flex items-start gap-2">
                  <Check size={15} className="text-primary flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-btn text-sm font-medium transition-colors ${
                p.highlight ? "bg-primary hover:bg-primaryHover text-white" : "border border-border hover:bg-surface2 text-textPrimary"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CTA() {
  const navigate = useNavigate();
  return (
    <section id="cta" className="max-w-container mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-primary/30 via-primary/10 to-transparent border border-primary/30 rounded-card p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/30 rounded-full glow" />
        <div className="relative">
          <h2 className="text-3xl font-bold mb-2">Ready to Build Your Startup?</h2>
          <p className="text-textSecondary">Join thousands of founders who are building smarter and launching faster with Caelosphere Launchpad.</p>
        </div>
        <div className="flex flex-col items-center gap-2 relative flex-shrink-0">
          <button onClick={() => navigate("/register")} className="bg-white text-bg font-medium px-7 py-3.5 rounded-btn hover:bg-gray-100 transition-colors">
            Start for Free →
          </button>
          <p className="text-xs text-textSecondary">No credit card required</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "How It Works", "Pricing", "Roadmap", "Changelog"] },
    { title: "Resources", links: ["Blog", "Guides", "Templates", "Case Studies", "Help Center"] },
    { title: "Company", links: ["About Us", "Careers", "Privacy Policy", "Terms of Service", "Contact"] },
  ];
  return (
    <footer className="border-t border-border">
      <div className="max-w-container mx-auto px-6 py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white">C</div>
            <div>
              <p className="font-semibold leading-tight">Caelosphere</p>
              <p className="text-[11px] text-primary tracking-widest leading-tight">LAUNCHPAD</p>
            </div>
          </div>
          <p className="text-sm text-textSecondary mb-6 max-w-xs">Your AI-powered partner from idea to launch and beyond.</p>
          <p className="text-sm font-medium mb-2">Subscribe to our newsletter</p>
          <div className="flex gap-2 max-w-xs">
            <input placeholder="Enter your email" className="bg-surface border border-border rounded-btn px-3 py-2 text-sm flex-1 outline-none focus:border-primary" />
            <button className="bg-primary rounded-btn px-3 text-white">→</button>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-medium mb-4">{c.title}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-textSecondary">
              {c.links.map((l) => <li key={l} className="hover:text-textPrimary cursor-pointer transition-colors">{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs text-textSecondary">
        © 2026 Caelosphere Launchpad. All rights reserved.
      </div>
    </footer>
  );
}
