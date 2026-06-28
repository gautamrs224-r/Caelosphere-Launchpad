import ScoreGauge from "../../../components/ScoreGauge";

const effortDot = { S: "bg-success", M: "bg-warning", L: "bg-error" };

export default function MvpTab({ data }) {
  if (!data) return null;
  const features = data.features || [];
  const phases = data.roadmapPhases || [];
  const pr = data.prioritization || {};
  const score = data.score || {};
  const scope = data.scopeRecommendation || {};
  const metrics = data.successMetrics || [];
  const nextSteps = data.nextSteps || [];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-surface2 border border-border rounded-card p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Core Features</h3>
            <span className="text-xs text-textSecondary bg-surface px-2 py-1 rounded-full">{features.length} Features</span>
          </div>
          <table className="w-full text-xs min-w-[420px]">
            <thead>
              <tr className="text-left text-textSecondary border-b border-border">
                <th className="py-2 font-medium">Feature</th>
                <th className="py-2 font-medium">Value</th>
                <th className="py-2 font-medium">Effort</th>
                <th className="py-2 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {features.map((f) => (
                <tr key={f.feature}>
                  <td className="py-2.5">
                    <p className="font-medium">{f.feature}</p>
                    <p className="text-textSecondary text-[11px]">{f.desc}</p>
                  </td>
                  <td className="py-2.5"><span className={f.value === "High" ? "text-success" : f.value === "Medium" ? "text-warning" : "text-textSecondary"}>{f.value}</span></td>
                  <td className="py-2.5"><span className={`inline-block w-2 h-2 rounded-full ${effortDot[f.effort] || "bg-textSecondary"}`} /> <span className="ml-1">{f.effort}</span></td>
                  <td className="py-2.5 text-warning">{"★".repeat(f.priority || 0)}{"☆".repeat(5 - (f.priority || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">MVP Roadmap</h3>
          <div className="flex flex-col gap-4">
            {phases.map((p) => (
              <div key={p.phase} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">{p.icon}</div>
                <div>
                  <p className="text-sm font-medium">{p.phase} <span className="text-textSecondary text-xs">({p.weeks})</span></p>
                  <ul className="mt-1">
                    {(p.items || []).map((it) => <li key={it} className="text-xs text-textSecondary">• {it}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Prioritization Matrix</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-surface border border-border rounded-btn p-3">
              <p className="text-success font-medium mb-1.5">Quick Wins</p>
              {(pr.quickWins || []).map((f) => <p key={f} className="text-textSecondary">● {f}</p>)}
            </div>
            <div className="bg-surface border border-border rounded-btn p-3">
              <p className="text-primary font-medium mb-1.5">Major Projects</p>
              {(pr.majorProjects || []).map((f) => <p key={f} className="text-textSecondary">● {f}</p>)}
            </div>
            <div className="bg-surface border border-border rounded-btn p-3">
              <p className="text-warning font-medium mb-1.5">Fill-ins</p>
              {(pr.fillIns || []).length ? pr.fillIns.map((f) => <p key={f} className="text-textSecondary">● {f}</p>) : <p className="text-textSecondary">—</p>}
            </div>
            <div className="bg-surface border border-border rounded-btn p-3">
              <p className="text-error font-medium mb-1.5">Low Priority</p>
              {(pr.lowPriority || []).length ? pr.lowPriority.map((f) => <p key={f} className="text-textSecondary">● {f}</p>) : <p className="text-textSecondary">—</p>}
            </div>
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Success Metrics</h3>
          <div className="flex flex-col gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{m.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium">{m.label}</p>
                  <p className="text-[11px] text-textSecondary">Target: {m.target}</p>
                </div>
                <span className="text-[10px] text-textSecondary bg-surface px-2 py-1 rounded-full flex-shrink-0">{m.kpi}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6 flex flex-col items-center text-center">
          <h3 className="font-semibold mb-3 self-start">MVP Score</h3>
          <ScoreGauge value={score.value} max={10} size={130} label={score.label} color="#A855F7" />
          <div className="flex flex-col gap-1.5 w-full mt-4">
            {(score.breakdown || []).map((b) => (
              <div key={b.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-textSecondary"><span className="w-2 h-2 rounded-full" style={{ background: b.color }} />{b.label}</span>
                <span className="font-medium">{b.value}/10</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-success/10 border border-success/30 rounded-card p-6">
          <p className="text-success text-sm font-medium mb-2">Recommended Scope: {scope.scope}</p>
          <p className="text-xs text-textSecondary mb-4">{scope.detail}</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-lg font-bold">{scope.coreFeatures}</p><p className="text-[11px] text-textSecondary">Core Features</p></div>
            <div><p className="text-lg font-bold">{scope.estimatedTime}</p><p className="text-[11px] text-textSecondary">Estimated Time</p></div>
            <div><p className="text-lg font-bold">{scope.devCost}</p><p className="text-[11px] text-textSecondary">Development Cost</p></div>
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Next Steps</h3>
          <ul className="flex flex-col gap-2">
            {nextSteps.map((s) => (
              <li key={s} className="text-xs text-textSecondary flex items-start gap-2"><span className="text-primary">☑</span> {s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
