import { CheckCircle2 } from "lucide-react";
import { roadmapData } from "../../../data/workspaceData";

export default function RoadmapTab() {
  return (
    <div className="grid md:grid-cols-4 gap-5">
      {roadmapData.map((m, i) => (
        <div key={m.month} className="relative">
          <div className="bg-surface2 border border-border rounded-card p-5 h-full">
            <p className="text-xs text-primary font-medium mb-1">{m.month}</p>
            <h3 className="font-semibold mb-4">{m.title}</h3>
            <ul className="flex flex-col gap-2">
              {m.items.map((it) => (
                <li key={it} className="text-sm text-textSecondary flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" /> {it}
                </li>
              ))}
            </ul>
          </div>
          {i < roadmapData.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}
