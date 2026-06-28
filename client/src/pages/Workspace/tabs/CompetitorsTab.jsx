import { ChevronRight, Check, Minus, Star } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CompetitorsTab({ data, projectName }) {
  if (!data) return null;
  const ov = data;
  const positioning = ov.positioning || [];
  const rows = ov.featureRows || [];
  const competitorNames = ov.competitors || [];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-5">
          <p className="text-xs text-textSecondary mb-2">Top Competitors Analyzed</p>
          <p className="text-2xl font-bold mb-1">{ov.topAnalyzed ?? competitorNames.length}</p>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-5">
          <p className="text-xs text-textSecondary mb-2">Market Concentration</p>
          <p className="text-2xl font-bold mb-1">{ov.marketConcentration}</p>
          {ov.hhiScore && <p className="text-xs text-textSecondary">HHI Score: {ov.hhiScore}</p>}
        </div>
        <div className="bg-surface2 border border-border rounded-card p-5">
          <p className="text-xs text-textSecondary mb-2">Your Competitive Position</p>
          <p className="text-2xl font-bold mb-1 text-success">{ov.position}</p>
          <p className="text-xs text-textSecondary">{ov.positionDetail}</p>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-5">
          <p className="text-xs text-textSecondary mb-2">Competitive Advantage</p>
          <p className="text-lg font-bold mb-1">{ov.advantage}</p>
          <p className="text-xs text-textSecondary">{ov.advantageDetail}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Competitive Positioning Map</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid stroke="#27272A" />
              <XAxis type="number" dataKey="x" domain={[0, 100]} stroke="#A1A1AA" fontSize={11} tickLine={false} label={{ value: "Market Presence", position: "insideBottom", fill: "#A1A1AA", fontSize: 11, dy: 10 }} />
              <YAxis type="number" dataKey="y" domain={[0, 100]} stroke="#A1A1AA" fontSize={11} tickLine={false} label={{ value: "Product Strength", angle: -90, position: "insideLeft", fill: "#A1A1AA", fontSize: 11 }} />
              <ZAxis range={[80, 80]} />
              <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #3F3F46", borderRadius: 10, fontSize: 12 }} formatter={(val, name, props) => [props.payload.name, ""]} />
              <Scatter data={positioning} fill="#A855F7" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {positioning.map((c) => (
              <span key={c.name} className="text-[11px] text-textSecondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: c.you ? "#A855F7" : "#3F3F46" }} /> {c.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6 overflow-x-auto">
          <h3 className="font-semibold mb-4">Feature Comparison</h3>
          <table className="w-full text-xs min-w-[480px]">
            <thead>
              <tr className="text-left text-textSecondary border-b border-border">
                <th className="py-2 pr-2 font-medium">Features</th>
                <th className="py-2 px-1.5 font-medium text-center text-primary">{projectName?.split(" ")[0] || "You"}</th>
                {competitorNames.map((c) => (
                  <th key={c} className="py-2 px-1.5 font-medium text-center">{c.split(" ")[0]}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.feature}>
                  <td className="py-2 pr-2 text-textSecondary whitespace-nowrap">{r.feature}</td>
                  {r.values.map((val, i) => (
                    <td key={i} className="py-2 px-1.5 text-center">
                      {val ? <Check size={14} className="text-success inline" /> : <Minus size={14} className="text-textSecondary inline" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Opportunities</h3>
          <ul className="flex flex-col gap-3">
            {(ov.opportunities || []).map((o) => (
              <li key={o.title}>
                <p className="text-sm font-medium flex items-center gap-1.5"><span className="text-success">📈</span> {o.title}</p>
                <p className="text-xs text-textSecondary mt-0.5">{o.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Threats</h3>
          <ul className="flex flex-col gap-3">
            {(ov.threats || []).map((t) => (
              <li key={t.title}>
                <p className="text-sm font-medium flex items-center gap-1.5"><span className="text-error">⚠️</span> {t.title}</p>
                <p className="text-xs text-textSecondary mt-0.5">{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-1.5"><Star size={15} className="text-primary" /> Key Takeaway</h3>
          <p className="text-xs text-textSecondary mb-4">{ov.takeaway?.text}</p>
          <p className="text-xs font-medium mb-2">Recommended Actions</p>
          <ul className="flex flex-col gap-1.5">
            {(ov.takeaway?.actions || []).map((a) => (
              <li key={a} className="text-xs text-textSecondary flex items-start gap-1.5"><Check size={13} className="text-primary flex-shrink-0 mt-0.5" /> {a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
