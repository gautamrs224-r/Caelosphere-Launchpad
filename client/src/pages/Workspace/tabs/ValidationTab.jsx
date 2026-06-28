import { CheckCircle2, TrendingUp, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import ScoreGauge from "../../../components/ScoreGauge";

export default function ValidationTab({ data }) {
  if (!data) return null;
  const v = data;

  // Gemini gives us a current score, not real history — synthesize a
  // simple illustrative ramp ending at the real score for the trend chart.
  const trend = [0.55, 0.65, 0.75, 0.85, 0.93, 1].map((f, i) => ({
    date: ["6mo ago", "5mo ago", "4mo ago", "3mo ago", "2mo ago", "Now"][i],
    value: Math.round(v.score * f),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6 flex items-center gap-6">
          <ScoreGauge value={v.score} label={v.potential} />
          <div>
            <p className="text-sm text-textSecondary mb-3">{v.summary}</p>
            {v.deltaPts != null && (
              <p className="text-success text-sm font-medium mb-3 flex items-center gap-1">
                <TrendingUp size={14} /> {v.deltaPts} pts vs last analysis
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Validation Summary</h3>
          <div className="flex flex-col gap-3">
            {(v.metrics || []).map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className="text-xs text-textSecondary w-36 flex-shrink-0">{m.label}</span>
                <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} />
                </div>
                <span className="text-xs font-medium w-12 text-right flex-shrink-0">{m.value}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Validation Over Time</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trend}>
              <XAxis dataKey="date" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#18181B", border: "1px solid #3F3F46", borderRadius: 10, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={2.5} dot={{ r: 3, fill: "#A855F7" }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-textSecondary mt-3">Illustrative trend — real historical tracking arrives with report versioning.</p>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Score Breakdown</h3>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={v.metrics || []} dataKey="value" nameKey="label" innerRadius={42} outerRadius={60} startAngle={90} endAngle={-270}>
                  {(v.metrics || []).map((m, i) => <Cell key={i} fill={m.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">{v.score}</p>
              <p className="text-[10px] text-textSecondary">Overall</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {(v.metrics || []).map((m) => (
              <div key={m.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-textSecondary"><span className="w-2 h-2 rounded-full" style={{ background: m.color }} />{m.label}</span>
                <span className="font-medium">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Key Insights</h3>
          <ul className="flex flex-col gap-3">
            {(v.insights || []).map((ins) => (
              <li key={ins} className="text-xs text-textSecondary flex items-start gap-2">
                <CheckCircle2 size={14} className="text-success flex-shrink-0 mt-0.5" /> {ins}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-3">Problem Statement</h3>
          <p className="text-xs text-textSecondary">{v.problem}</p>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-3">Proposed Solution</h3>
          <p className="text-xs text-textSecondary">{v.solution}</p>
        </div>
      </div>

      <div className="bg-surface2 border border-border rounded-card p-6">
        <h3 className="font-semibold mb-4">Top Validation Drivers</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(v.drivers || []).map((d) => (
            <div key={d.label} className="bg-surface border border-border rounded-btn p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{d.icon}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  d.impact === "High Impact" ? "bg-success/15 text-success" : d.impact === "Medium Impact" ? "bg-warning/15 text-warning" : "bg-surface2 text-textSecondary"
                }`}>{d.impact}</span>
              </div>
              <p className="text-sm font-medium mb-1">{d.label}</p>
              <p className="text-xs text-textSecondary">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
