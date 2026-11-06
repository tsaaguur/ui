import type { ReactNode } from "react";

/* Horizontal bars (2026-11-06): every horizontal graph is drawn with this
   file. Three pieces:

     Bar      one rounded track. A single fill (value against max) or several
              parts side by side (a split: two halves of a score, kinds of
              posts, a mood mix). For the small bars that live inside a row.
     BarList  a breakdown as labelled rows: label, its own bar, the number and,
              when asked, the share of the whole.
     BarFill  the fill behind a row's own content, where the row is the bar.

   A breakdown of a whole is a BarList, never one stacked bar with a dot
   legend: when one part holds most of it the bar turns into a single colour
   and the legend is the only readable thing left. Static by design: no hover
   state, no motion. Progress (feedback.tsx) is for a task that advances; this
   is for data. Server-safe: nothing here needs a browser. */

export type BarSize = "xs" | "sm" | "md" | "lg" | "xl";
const HEIGHT: Record<BarSize, string> = { xs: "h-1", sm: "h-1.5", md: "h-2", lg: "h-2.5", xl: "h-3" };

export type BarPart = {
  key?: string;
  value: number;
  /** Any CSS colour: a token such as var(--up) or a source colour. */
  color?: string;
  /** A utility class instead of `color`, e.g. "bg-brand/60". */
  className?: string;
  title?: string;
};

export type BarProps = {
  /** Single fill: `value` against `max` (100 by default). */
  value?: number;
  max?: number;
  color?: string;
  fillClassName?: string;
  /** A split: parts side by side against `total` (their sum by default). */
  parts?: BarPart[];
  total?: number;
  size?: BarSize;
  /** Smallest drawn width, in percent, for a part that is above zero. */
  minPct?: number;
  trackClassName?: string;
  className?: string;
  title?: string;
  /** Names the bar for a screen reader; without it the bar is decoration. */
  label?: string;
};

export function Bar({
  value, max = 100, color, fillClassName, parts, total, size = "md", minPct = 0,
  trackClassName = "bg-muted", className = "", title, label,
}: BarProps) {
  const single = !parts;
  const list: BarPart[] = parts ?? [{ value: value ?? 0, color, className: fillClassName }];
  const denom = single ? max : (total ?? list.reduce((a, p) => a + Math.max(0, p.value), 0));
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      title={title}
      className={`flex ${HEIGHT[size]} overflow-hidden rounded-full ${trackClassName} ${className}`}
    >
      {list.map((p, i) => {
        if (!(p.value > 0) || !(denom > 0)) return null;
        const width = Math.min(100, Math.max(minPct, (100 * p.value) / denom));
        return (
          <span
            key={p.key ?? i}
            title={p.title}
            className={`block h-full ${single ? "rounded-full" : ""} ${p.color ? "" : (p.className ?? "bg-brand")}`}
            style={{ width: `${width}%`, background: p.color }}
          />
        );
      })}
    </span>
  );
}

/** The parent must be `relative overflow-hidden` and its content `relative`. */
export function BarFill({ value, max, minPct = 4, className = "inset-y-1 bg-brand-soft" }: { value: number; max: number; minPct?: number; className?: string }) {
  if (!(value > 0) || !(max > 0)) return null;
  return <span aria-hidden className={`absolute left-0 rounded-md ${className}`} style={{ width: `${Math.min(100, Math.max(minPct, (100 * value) / max))}%` }} />;
}

export type BarListItem = {
  key: string;
  label: ReactNode;
  value: number;
  color?: string;
  fillClassName?: string;
  /** Shown instead of the formatted value. */
  display?: ReactNode;
  title?: string;
};

export type BarListProps = {
  items: BarListItem[];
  /** What a full bar means: "max" = the largest row (a ranking), "total" = the whole (each bar is that row's share). */
  scale?: "max" | "total";
  /** The whole, for `scale="total"` and the share column; the sum by default. */
  total?: number;
  /** With `scale="max"`: the value of a full bar, when it is not the largest row (a score out of 100). */
  max?: number;
  /** Adds the share of the whole as a last column. */
  share?: boolean;
  /** A colour dot in front of the label. */
  dot?: boolean;
  format?: (n: number) => string;
  size?: BarSize;
  minPct?: number;
  /** Width and type of the label column. */
  labelClassName?: string;
  /** Width and type of the number column. */
  valueClassName?: string;
  trackClassName?: string;
  className?: string;
  ariaLabel?: string;
};

export function BarList({
  items, scale = "max", total, max, share = false, dot = false, format = (n) => String(n), size = "md", minPct = 2,
  labelClassName = "w-[38%] font-semibold sm:w-[34%]", valueClassName = "w-12 font-semibold", trackClassName, className = "", ariaLabel,
}: BarListProps) {
  const sum = total ?? items.reduce((a, it) => a + Math.max(0, it.value), 0);
  const full = scale === "total" ? sum : (max ?? items.reduce((a, it) => Math.max(a, it.value), 0));
  return (
    <ul className={`flex flex-col gap-1.5 ${className}`} aria-label={ariaLabel}>
      {items.map((it) => (
        <li key={it.key} className="flex items-center gap-2.5 text-[13px]" title={it.title}>
          <span className={`flex min-w-0 shrink-0 items-center gap-1.5 ${labelClassName}`}>
            {dot ? <i aria-hidden className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: it.color ?? "var(--brand)" }} /> : null}
            <span className="truncate">{it.label}</span>
          </span>
          <Bar value={it.value} max={full} color={it.color} fillClassName={it.fillClassName} size={size} minPct={minPct} trackClassName={trackClassName} className="min-w-0 flex-1" />
          <span className={`tz-num shrink-0 text-right ${valueClassName}`}>{it.display ?? format(it.value)}</span>
          {share ? <span className="tz-num w-9 shrink-0 text-right text-muted-foreground">{sum > 0 && it.value > 0 ? `${Math.round((100 * it.value) / sum)}%` : "-"}</span> : null}
        </li>
      ))}
    </ul>
  );
}
