import { CheckCircle2, Circle, AlertTriangle, Target, ArrowRight } from "lucide-react";

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-success", bg: "bg-success", label: "Completed" },
  current: { icon: Circle, color: "text-primary", bg: "bg-primary", label: "In Progress" },
  upcoming: { icon: Circle, color: "text-textSecondary", bg: "bg-surface2", label: "Upcoming" },
};

export default function RoadmapTab({ data }) {
  if (!data) return null;
  const { phases = [], summary, criticalPath = [], risks = [] } = data;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary */}
      {summary && (
        <div className="bg-primary/10 border border-primary/30 rounded-card p-5">
          <p className="text-sm text-textSecondary">{summary}</p>
        </div>
      )}

      {/* Timeline */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {phases.map((p, i) => {
          const cfg = statusConfig[p.status] || statusConfig.upcoming;
          const StatusIcon = cfg.icon;
          return (
            <div key={p.month} className="relative">
              <div className={`bg-surface2 border rounded-card p-5 h-full ${p.status === "current" ? "border-primary/50" : "border-border"}`}>
                {/* Month badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-primary">{p.month}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === "current" ? "bg-primary/15 text-primary" : "bg-surface text-textSecondary"}`}>
                    {cfg.label}
                  </span>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 rounded-full ${cfg.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{i + 1}</div>
                  <h3 className="font-semibold text-sm">{p.title}</h3>
                </div>

                {/* Tasks */}
                <ul className="flex flex-col gap-2 mb-4">
                  {(p.items || []).map((it) => (
                    <li key={it} className="text-xs text-textSecondary flex items-start gap-1.5">
                      <StatusIcon size={13} className={`${cfg.color} flex-shrink-0 mt-0.5`} /> {it}
                    </li>
                  ))}
                </ul>

                {/* Milestone */}
                {p.milestone && (
                  <div className="border-t border-border pt-3 mt-auto">
                    <p className="text-[11px] text-textSecondary mb-0.5">🏁 Milestone</p>
                    <p className="text-xs font-medium">{p.milestone}</p>
                  </div>
                )}

                {/* KPI */}
                {p.kpi && (
                  <div className="mt-2">
                    <p className="text-[11px] text-textSecondary mb-0.5">📊 KPI</p>
                    <p className="text-xs text-primary">{p.kpi}</p>
                  </div>
                )}
              </div>

              {/* Connector arrow */}
              {i < phases.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-primary/50 z-10" size={18} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Critical Path */}
        {criticalPath.length > 0 && (
          <div className="bg-surface2 border border-border rounded-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Target size={16} className="text-primary" /> Critical Path
            </h3>
            <ul className="flex flex-col gap-2">
              {criticalPath.map((c, i) => (
                <li key={c} className="text-sm text-textSecondary flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span> {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risks */}
        {risks.length > 0 && (
          <div className="bg-surface2 border border-border rounded-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="text-warning" /> Risks & Mitigations
            </h3>
            <ul className="flex flex-col gap-4">
              {risks.map((r) => (
                <li key={r.risk}>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <span className="text-error">⚠</span> {r.risk}
                  </p>
                  <p className="text-xs text-textSecondary mt-1 ml-5">→ {r.mitigation}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
