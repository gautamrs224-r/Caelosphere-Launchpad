export default function ScoreGauge({ value, max = 100, size = 160, label, sublabel, color = "#A855F7" }) {
  const pct = Math.min(100, (value / max) * 100);
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const arcFraction = 0.75; // 270-degree gauge, matches reference "speedometer" look
  const arcLength = circumference * arcFraction;
  const filled = arcLength * (pct / 100);

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(135deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#27272A"
          strokeWidth="10"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">{value}<span className="text-sm text-textSecondary">/{max}</span></p>
        {label && <p className="text-xs font-medium text-primary mt-1">{label}</p>}
        {sublabel && <p className="text-[10px] text-textSecondary">{sublabel}</p>}
      </div>
    </div>
  );
}
