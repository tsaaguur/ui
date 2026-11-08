"use client";

// daily-chart.tsx (moved into the library 2026-11-09 from the product repo; the admin charts)
// The one daily chart of the site (2026-10-08, owner: "different chart design,
// use it everywhere"): smooth lines with a soft area under the first series,
// a point per day, three quiet gridlines with values, day labels that thin
// out on long windows, and a tooltip that floats INSIDE the chart on hover
// (the card never changes height). Missing days are the caller's problem:
// pass a value for every day (see fillDays below) so the x axis is time, not
// "the days that happened to have data" - that unevenness was the complaint
// about the bars it replaced.
//
//   <DailyChart labels={["10/01", ...]} series={[{ key, name, color, values }]} />
//
// `stacked` draws the series as layered areas (each on top of the previous),
// for "rows by kind" charts; otherwise every series is its own line. `limit`
// draws a dashed horizontal line with a label (a budget, a threshold).
import { useEffect, useMemo, useRef, useState } from "react";

export type DailySeries = { key: string; name: string; color: string; values: number[] };

export function fillDays<T>(rows: T[], dateOf: (r: T) => string, make: (date: string, row: T | null) => T): T[] {
  // Expand a sparse, sorted day series into one row per calendar day.
  if (rows.length === 0) return rows;
  const byDate = new Map(rows.map((r) => [dateOf(r).slice(0, 10), r]));
  const first = new Date(dateOf(rows[0]).slice(0, 10) + "T00:00:00Z");
  const last = new Date(dateOf(rows[rows.length - 1]).slice(0, 10) + "T00:00:00Z");
  const out: T[] = [];
  for (let t = first.getTime(); t <= last.getTime(); t += 86_400_000) {
    const d = new Date(t).toISOString().slice(0, 10);
    out.push(byDate.get(d) ?? make(d, null));
  }
  return out;
}

export function niceCeil(v: number): number {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  const step = m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10;
  return step * p;
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return String(Math.round(n));
}

// Catmull-Rom through the points, emitted as cubic beziers: smooth, passes
// through every value, no overshoot worth worrying about at daily resolution.
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export function DailyChart({
  labels,
  series,
  height = 220,
  stacked = false,
  format = compact,
  limit,
  empty = "Энэ хугацаанд өгөгдөл алга",
  ariaLabel = "Өдөр бүр",
  extra,
}: {
  labels: string[];
  series: DailySeries[];
  height?: number;
  stacked?: boolean;
  format?: (n: number) => string;
  limit?: { value: number; label: string } | null;
  empty?: string;
  ariaLabel?: string;
  /** extra tooltip lines for day i, e.g. a share or a note */
  extra?: (i: number) => { label: string; value: string }[];
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const n = labels.length;
  const PAD_L = 34, PAD_R = 8, PAD_T = 10, PAD_B = 4;
  const innerW = Math.max(0, width - PAD_L - PAD_R);
  const innerH = Math.max(0, height - PAD_T - PAD_B);

  const { tops, peak } = useMemo(() => {
    // per-series y values (stacked: cumulative), and the chart's peak
    const tops: number[][] = [];
    let acc = new Array(n).fill(0);
    for (const s of series) {
      const row = s.values.map((v, i) => (stacked ? acc[i] + (v || 0) : v || 0));
      tops.push(row);
      if (stacked) acc = row;
    }
    const peak = Math.max(0, ...tops.flat(), limit?.value ?? 0);
    return { tops, peak };
  }, [series, stacked, n, limit]);
  const ceil = niceCeil(peak);

  const x = (i: number) => PAD_L + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => PAD_T + innerH - (innerH * v) / ceil;
  // labels thin out by the room they need (about 6px per character at 10px,
  // plus a gap), never by a fixed count: "10/07 09ц" and "10/07" differ twice
  const labelPx = Math.max(...labels.map((l) => l.length), 1) * 6 + 10;
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(innerW / labelPx))));

  if (n === 0 || peak === 0) {
    return <div ref={wrap} className="py-10 text-center text-[13px] text-muted-foreground">{empty}</div>;
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left - PAD_L;
    const i = Math.round((px / Math.max(1, innerW)) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, i)));
  };
  const hovered = hover !== null;
  const tipX = hovered ? x(hover) : 0;
  const tipLeft = hovered ? `clamp(0px, ${tipX - 90}px, calc(100% - 180px))` : "0px";

  return (
    <div className="select-none">
      <div ref={wrap} className="relative" style={{ height }} onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label={ariaLabel}>
        {width > 0 && (
          <svg width={width} height={height} className="block overflow-visible">
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`dc-${s.key}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={stacked ? 0.55 : 0.28} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={stacked ? 0.35 : 0.03} />
                </linearGradient>
              ))}
            </defs>
            {/* gridlines with values */}
            {[0, 0.5, 1].map((f) => (
              <g key={f}>
                <line x1={PAD_L} x2={width - PAD_R} y1={y(f * ceil)} y2={y(f * ceil)} stroke="var(--border)" strokeDasharray={f === 0 ? undefined : "2 4"} />
                <text x={PAD_L - 6} y={y(f * ceil) + 3.5} textAnchor="end" fontSize="10" fill="var(--muted-foreground)" className="tabular-nums">{format(f * ceil)}</text>
              </g>
            ))}
            {limit && limit.value > 0 && (
              <g>
                <line x1={PAD_L} x2={width - PAD_R} y1={y(limit.value)} y2={y(limit.value)} stroke="var(--down)" strokeDasharray="4 4" strokeOpacity={0.8} />
                <text x={width - PAD_R} y={y(limit.value) - 4} textAnchor="end" fontSize="10" fill="var(--down)">{limit.label}</text>
              </g>
            )}
            {/* areas (first series, or every stacked layer), lines, points */}
            {series.map((s, si) => {
              const pts = tops[si].map((v, i) => ({ x: x(i), y: y(v) }));
              const base = stacked && si > 0 ? tops[si - 1].map((v, i) => ({ x: x(i), y: y(v) })) : null;
              const line = smoothPath(pts);
              const areaBase = base
                ? [...base].reverse().map((p) => `L${p.x},${p.y}`).join(" ")
                : `L${pts[pts.length - 1].x},${y(0)} L${pts[0].x},${y(0)}`;
              const showArea = stacked || si === 0;
              return (
                <g key={s.key}>
                  {showArea && <path d={`${line} ${areaBase} Z`} fill={`url(#dc-${s.key})`} />}
                  <path d={line} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  {n <= 45 && pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={hovered && hover === i ? 4 : 2.5} fill="var(--card)" stroke={s.color} strokeWidth={2} />
                  ))}
                </g>
              );
            })}
            {hovered && <line x1={tipX} x2={tipX} y1={PAD_T} y2={PAD_T + innerH} stroke="var(--muted-foreground)" strokeOpacity={0.35} strokeDasharray="3 3" />}
          </svg>
        )}
        {hovered && (
          <div className="pointer-events-none absolute top-1 z-[2] w-[180px] rounded-[10px] border border-hairline bg-card px-3 py-2 text-[11.5px] shadow-lg" style={{ left: tipLeft }}>
            <div className="font-bold">{labels[hover]}</div>
            {series.map((s) => (
              <div key={s.key} className="mt-1 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <b className="tabular-nums">{format(s.values[hover] ?? 0)}</b>
              </div>
            ))}
            {extra?.(hover).map((e) => (
              <div key={e.label} className="mt-1 flex items-center justify-between gap-2 text-muted-foreground"><span>{e.label}</span><span className="tabular-nums">{e.value}</span></div>
            ))}
          </div>
        )}
      </div>
      <div className="relative mt-1 h-4" style={{ marginLeft: PAD_L, marginRight: PAD_R }}>
        {labels.map((l, i) => {
          // first and last always (anchored to their edge); a middle label only
          // on the thinning step AND clear of both edge labels
          const pos = n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW;
          const edge = i === 0 || i === n - 1;
          const clear = pos - labelPx / 2 >= labelPx && pos + labelPx / 2 <= innerW - labelPx;
          if (!edge && !(i % every === 0 && clear)) return null;
          return (
            <span key={i} className={`absolute text-[10px] tabular-nums text-muted-foreground whitespace-nowrap ${i === 0 ? "" : i === n - 1 ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: n <= 1 ? "50%" : `${(100 * i) / (n - 1)}%` }}>{l}</span>
          );
        })}
      </div>
      {series.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] font-semibold text-muted-foreground">
          {series.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
