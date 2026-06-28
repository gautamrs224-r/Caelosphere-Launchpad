import { Target, TrendingUp, Users, DollarSign, Sparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

export default function OverviewTab({ project, report }) {
  const v = report?.validation;
  const score = project?.startupScore ?? v?.score ?? null;

  const kpis = [
    { icon: Target, label: "Startup Score", value: score != null ? String(score) : "—", suffix: score != null ? "/100" : "", color: "text-primary", bg: "bg-primary/15" },
    { icon: TrendingUp, label: "Market Demand", value: v ? `${v.metrics?.find((m) => m.label === "Market Demand")?.value ?? "—"}` : "—", suffix: v ? "/100" : "", color: "text-success", bg: "bg-success/15" },
    { icon: Users, label: "Competition", value: report?.competitors?.marketConcentration || "—", color: "text-warning", bg: "bg-warning/15" },
    { icon: DollarSign, label: "Financial Viability", value: v ? `${v.metrics?.find((m) => m.label === "Financial Viability")?.value ?? "—"}` : "—", suffix: v ? "/100" : "", color: "text-success", bg: "bg-success/15" },
  ];

  const radarData = v?.metrics?.map((m) => ({ metric: m.label.split(" ")[0], value: m.value })) || [];

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface2 border border-border rounded-card p-5">
            <div className={`w-10 h-10 rounded-btn ${k.bg} ${k.color} flex items-center justify-center mb-4`}><k.icon size={18} /></div>
            <p className="text-sm text-textSecondary mb-1">{k.label}</p>
            <p className="text-2xl font-bold">{k.value}<span className="text-sm text-textSecondary">{k.suffix}</span></p>
          </div>
        ))}
      </div>

      {radarData.length > 0 ? (
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Startup Health Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#3F3F46" />
              <PolarAngleAxis dataKey="metric" stroke="#A1A1AA" fontSize={12} />
              <Radar dataKey="value" stroke="#A855F7" fill="#A855F7" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-surface2 border border-border rounded-card">
          <Sparkles size={28} className="text-primary mb-3" />
          <p className="text-sm text-textSecondary">Run an AI analysis to see your startup health radar here.</p>
        </div>
      )}
    </div>
  );
}
