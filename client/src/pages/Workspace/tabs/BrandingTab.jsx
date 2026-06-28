import { Copy } from "lucide-react";
import { brandingData } from "../../../data/workspaceData";

export default function BrandingTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface2 border border-border rounded-card p-6">
        <h3 className="font-semibold mb-4">Startup Names</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
          {brandingData.names.map((n) => (
            <button key={n} className="bg-surface border border-border rounded-btn px-3 py-2.5 text-sm flex items-center justify-between gap-2 hover:border-primary/50">
              {n} <Copy size={13} className="text-textSecondary flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface2 border border-border rounded-card p-6">
        <h3 className="font-semibold mb-4">Taglines</h3>
        <div className="flex flex-col gap-2">
          {brandingData.taglines.map((t) => (
            <div key={t} className="bg-surface border border-border rounded-btn px-4 py-2.5 text-sm flex items-center justify-between gap-2">
              {t} <Copy size={13} className="text-textSecondary flex-shrink-0 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Color Palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {brandingData.colors.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-1.5">
                <div className="w-full h-14 rounded-btn" style={{ background: c.hex }} />
                <p className="text-[10px] text-textSecondary text-center">{c.name}</p>
                <p className="text-[10px] text-textSecondary">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-2">Brand Voice</h3>
          <p className="text-sm text-textSecondary">{brandingData.voice}</p>
        </div>
      </div>

      <div className="bg-surface2 border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Logo Prompt</h3>
          <button className="text-xs text-primary flex items-center gap-1"><Copy size={13} /> Copy</button>
        </div>
        <p className="text-sm text-textSecondary bg-surface border border-border rounded-btn p-4">{brandingData.logoPrompt}</p>
      </div>
    </div>
  );
}
