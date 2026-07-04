import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }
  return (
    <button onClick={handleCopy} className="text-textSecondary hover:text-primary transition-colors flex-shrink-0">
      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
    </button>
  );
}

export default function BrandingTab({ data }) {
  if (!data) return null;
  const b = data;

  return (
    <div className="flex flex-col gap-5">
      {/* Names + Taglines */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Startup Names</h3>
          <div className="grid grid-cols-2 gap-2">
            {(b.names || []).map((n) => (
              <div key={n} className="flex items-center justify-between bg-surface border border-border rounded-btn px-3 py-2.5 text-sm gap-2">
                <span className="truncate">{n}</span>
                <CopyButton text={n} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Taglines</h3>
          <div className="flex flex-col gap-2">
            {(b.taglines || []).map((t) => (
              <div key={t} className="flex items-center justify-between bg-surface border border-border rounded-btn px-4 py-2.5 gap-2">
                <span className="text-sm text-textSecondary flex-1">{t}</span>
                <CopyButton text={t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Colors + Voice */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-4">Color Palette</h3>
          <div className="grid grid-cols-5 gap-3">
            {(b.colors || []).map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-1.5">
                <div className="w-full h-14 rounded-btn shadow-soft border border-border/50" style={{ background: c.hex }} />
                <p className="text-[10px] font-medium text-center leading-tight">{c.name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-[10px] text-textSecondary">{c.hex}</p>
                  <CopyButton text={c.hex} />
                </div>
                <p className="text-[10px] text-primary">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface2 border border-border rounded-card p-6">
          <h3 className="font-semibold mb-3">Brand Voice</h3>
          <p className="text-sm text-textSecondary mb-5">{b.voice}</p>
          {b.brandPersonality?.length > 0 && (
            <>
              <p className="text-xs font-medium mb-2">Brand Personality</p>
              <div className="flex flex-wrap gap-2">
                {b.brandPersonality.map((trait) => (
                  <span key={trait} className="text-xs bg-primary/15 text-primary px-2.5 py-1 rounded-full">{trait}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Positioning + Logo Prompt + Audience */}
      <div className="grid lg:grid-cols-2 gap-5">
        {b.positioningStatement && (
          <div className="bg-surface2 border border-border rounded-card p-6">
            <h3 className="font-semibold mb-2">Positioning Statement</h3>
            <p className="text-sm text-textSecondary italic">"{b.positioningStatement}"</p>
          </div>
        )}
        {b.targetAudience && (
          <div className="bg-surface2 border border-border rounded-card p-6">
            <h3 className="font-semibold mb-2">Target Audience</h3>
            <p className="text-sm text-textSecondary">{b.targetAudience}</p>
          </div>
        )}
      </div>

      {/* Logo Prompt */}
      <div className="bg-surface2 border border-border rounded-card p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2"><Sparkles size={16} className="text-primary" /> Logo Prompt</h3>
          <CopyButton text={b.logoPrompt || ""} />
        </div>
        <p className="text-sm text-textSecondary bg-surface border border-border rounded-btn p-4 leading-relaxed">{b.logoPrompt}</p>
        <p className="text-xs text-textSecondary mt-2">Copy this prompt and paste it into Midjourney, DALL·E, or Adobe Firefly to generate a logo.</p>
      </div>
    </div>
  );
}
