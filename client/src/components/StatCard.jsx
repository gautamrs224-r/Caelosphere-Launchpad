import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";

export default function StatCard({ icon, label, value, delta, note, sparkData, color = "text-primary", bg = "bg-primary/15" }) {
  return (
    <div className="bg-surface border border-border rounded-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-btn ${bg} flex items-center justify-center ${color}`}>{icon}</div>
        {sparkData && (
          <div className="w-20 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkData}>
                <Line type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <p className="text-sm text-textSecondary mb-1">{label}</p>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-success flex items-center gap-1">
        <TrendingUp size={12} /> {delta} <span className="text-textSecondary">{note}</span>
      </p>
    </div>
  );
}
