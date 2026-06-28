import { CheckCircle2, ArrowRight } from "lucide-react";

const META = {
  1: { icon: "❓", color: "text-error" },
  2: { icon: "✅", color: "text-success" },
  3: { icon: "💎", color: "text-primary" },
  4: { icon: "🏆", color: "text-warning" },
  5: { icon: "👥", color: "text-blue-400" },
  6: { icon: "🚚", color: "text-blue-400" },
  7: { icon: "📶", color: "text-warning" },
  8: { icon: "💲", color: "text-error" },
  9: { icon: "💰", color: "text-success" },
};

function Block({ b }) {
  const meta = META[b.num] || { icon: "▪️", color: "text-textSecondary" };
  return (
    <div className={`bg-surface2 border rounded-card p-4 ${b.highlight ? "border-primary/40 bg-primary/5" : "border-border"}`}>
      <p className={`text-sm font-semibold flex items-center gap-1.5 mb-3 ${meta.color}`}>
        <span>{meta.icon}</span> {b.num}. {b.title}
      </p>
      {b.highlight ? (
        <p className="text-xs text-textSecondary italic">"{b.highlight}"</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {(b.items || []).map((it) => (
            <li key={it} className="text-xs text-textSecondary flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 text-textSecondary">●</span> {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LeanCanvasTab({ data }) {
  if (!data) return null;
  const blocks = data.blocks || [];
  const sum = data.summary || {};

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {blocks.slice(0, 5).map((b) => <Block key={b.num} b={b} />)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {blocks.slice(5).map((b) => <Block key={b.num} b={b} />)}
      </div>

      <div className="bg-surface2 border border-border rounded-card p-6 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Lean Canvas Summary</h3>
          <p className="text-xs text-textSecondary">{sum.text}</p>
        </div>
        <div className="flex gap-8 flex-shrink-0">
          <div>
            <p className="text-xs text-textSecondary mb-1">Validation Status</p>
            <p className="text-success text-sm font-medium flex items-center gap-1"><CheckCircle2 size={14} /> {sum.validationStatus}</p>
            <p className="text-[11px] text-textSecondary">{sum.validatedBlocks}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary mb-1">Business Model Fit</p>
            <p className="text-primary text-lg font-bold">{sum.fitPct}%</p>
            <p className="text-[11px] text-success">{sum.fitLabel}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary mb-1">Next Step</p>
            <p className="text-sm font-medium flex items-center gap-1">{sum.nextStep} <ArrowRight size={13} className="text-primary" /></p>
          </div>
        </div>
      </div>
    </div>
  );
}
