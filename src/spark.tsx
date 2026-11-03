/** Server-rendered sparkline. No client JS. */
export function Spark({ values, w = 120, h = 36, stroke = "var(--brand)", area = true, className = "", strokeWidth = 2 }: { values: number[]; w?: number; h?: number; stroke?: string; area?: boolean; className?: string; strokeWidth?: number }) {
  const v = values.length ? values : [0, 0];
  const max = Math.max(1e-9, ...v);
  const pad = 3;
  const pts = v.map((x, i) => [v.length === 1 ? 0 : (i * (w - 2)) / (v.length - 1) + 1, h - pad - (x / max) * (h - pad * 2)] as const);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const id = `sp${Math.abs(d.length * 7919 + Math.round(max * 13))}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className={className} preserveAspectRatio="none" aria-hidden>
      {area ? (
        <>
          <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={stroke} stopOpacity="0.28" /><stop offset="1" stopColor={stroke} stopOpacity="0" /></linearGradient></defs>
          <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${id})`} />
        </>
      ) : null}
      <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={2.6} fill={stroke} />
    </svg>
  );
}
