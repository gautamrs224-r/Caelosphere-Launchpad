import { Dumbbell, Link2, Target, AlertTriangle, Star } from "lucide-react";

const blocks = [
  { key: "strengths", title: "Strengths", icon: Dumbbell, color: "text-success", badge: "bg-success/15 text-success", ring: "#22C55E", desc: "Internal advantages that give you a competitive edge." },
  { key: "weaknesses", title: "Weaknesses", icon: Link2, color: "text-warning", badge: "bg-warning/15 text-warning", ring: "#F97316", desc: "Internal limitations that may hold you back." },
  { key: "opportunities", title: "Opportunities", icon: Target, color: "text-primary", badge: "bg-primary/15 text-primary", ring: "#3B82F6", desc: "External factors you can leverage for growth." },
  { key: "threats", title: "Threats", icon: AlertTriangle, color: "text-error", badge: "bg-error/15 text-error", ring: "#A855F7", desc: "External risks that could impact your success." },
];

export default function SwotTab({ data }) {
  if (!data) return null;
  const s = data;

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
        {blocks.map((b) => (
          <div key={b.key} className="bg-surface2 border border-border rounded-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold flex items-center gap-2 ${b.color}`}><b.icon size={16} /> {b.title}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${b.badge}`}>{s[b.key]?.score}/10</span>
            </div>
            <p className="text-xs text-textSecondary mb-3">{b.desc}</p>
            <div className="h-px bg-border mb-3" />
            <ul className="flex flex-col gap-2">
              {(s[b.key]?.items || []).slice(0, 6).map((item) => (
                <li key={item} className="text-xs text-textSecondary flex items-start gap-2">
                  <span className={`mt-0.5 flex-shrink-0 ${b.color}`}>●</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">SWOT Summary</h3>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#27272A" strokeWidth="3" />
              {blocks.map((b, i) => (
                <circle key={b.key} cx="18" cy="18" r="15.5" fill="none" stroke={b.ring} strokeWidth="3" strokeDasharray="25 100" strokeDashoffset={-25 * i} />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{s.overall}</p>
              <p className="text-[10px] text-textSecondary">Overall Score</p>
            </div>
          </div>
          <p className="text-xs text-textSecondary mb-1">Overall Assessment</p>
          <span className="text-xs font-medium bg-success/15 text-success px-2.5 py-1 rounded-full inline-block mb-4">{s.assessment}</span>
          <div className="flex flex-col gap-2">
            {blocks.map((b) => (
              <div key={b.key} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-textSecondary"><span className="w-2 h-2 rounded-full" style={{ background: b.ring }} />{b.title}</span>
                <span className="font-medium">{s[b.key]?.score}/10</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-1.5"><Star size={15} className="text-primary" /> Key Takeaway</h3>
          <p className="text-xs text-textSecondary mb-4">{s.takeaway}</p>
          <p className="text-xs font-medium mb-2">Recommended Actions</p>
          <ul className="flex flex-col gap-1.5">
            {(s.recommendedActions || []).map((a) => (
              <li key={a} className="text-xs text-textSecondary flex items-start gap-1.5">
                <span className="text-primary flex-shrink-0">☑</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
