/* Drawn marks that move (2026-11-04): the state arrow draws itself once when it
   enters, the live dot breathes slowly, the sprocket rail is a repeated SVG
   pattern. One easing, no bounce, and nothing moves under prefers-reduced-motion. */

export type Tone = "up" | "down" | "flat" | "new";

/** rising / falling / flat as a drawn arrow; the stroke draws in on mount. */
export function StateMark({ state, className = "h-4 w-6" }: { state: "rising" | "falling" | "stable" | "flat"; className?: string }) {
  const d = state === "rising" ? "M2 14.5 8.5 8l4 3.5L20 4" : state === "falling" ? "M2 4l6.5 6.5 4-3.5L20 15" : "M2 10h18";
  const head = state === "rising" ? "M14 4h6v6" : state === "falling" ? "M14 15h6V9" : "M15 6l4 4-4 4";
  const color = state === "rising" ? "var(--up)" : state === "falling" ? "var(--down)" : "var(--muted-foreground)";
  return (
    <svg viewBox="0 0 22 19" className={className} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} className="tz-draw" pathLength={1} />
      <path d={head} className="tz-draw tz-draw-late" pathLength={1} />
    </svg>
  );
}

export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-grid h-2.5 w-2.5 place-items-center ${className}`} aria-hidden>
      <span className="tz-breathe absolute inset-0 rounded-full bg-up/40" />
      <span className="h-1.5 w-1.5 rounded-full bg-up" />
    </span>
  );
}

/** A film-strip edge: sprocket holes repeated across the width. */
export function Sprockets({ className = "" }: { className?: string }) {
  return (
    <svg className={`block h-3 w-full text-foreground/22 ${className}`} aria-hidden>
      <defs>
        <pattern id="tz-sprocket" width="28" height="12" patternUnits="userSpaceOnUse">
          <rect x="6" y="2.5" width="16" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tz-sprocket)" />
    </svg>
  );
}

/** The corner tab of a storyboard panel: the frame number, stamped. */
export function Stamp({ n, total }: { n: number; total: number }) {
  return (
    <span className="tz-num absolute -top-px -left-px inline-flex items-center gap-1 rounded-br-[8px] rounded-tl-[11px] bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background" aria-label={`${n}-р хүрээ`}>
      {String(n).padStart(2, "0")}<span className="opacity-50">/{String(total).padStart(2, "0")}</span>
    </span>
  );
}

/** Drawn bars: the peak hour filled, the rest outlined, a thin baseline. */
export function DrawnBars({ values, peak, className = "" }: { values: number[]; peak: number; className?: string }) {
  const w = 300, h = 80, gap = 2;
  const max = Math.max(1, ...values);
  const bw = (w - gap * (values.length - 1)) / Math.max(1, values.length);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`block h-[88px] w-full ${className}`} preserveAspectRatio="none" aria-hidden>
      {values.map((v, i) => {
        const bh = Math.max(1.5, (v / max) * (h - 6));
        const x = i * (bw + gap);
        return i === peak
          ? <rect key={i} x={x} y={h - 2 - bh} width={bw} height={bh} rx={1} fill="var(--brand)" />
          : <rect key={i} x={x + 0.4} y={h - 2 - bh} width={Math.max(0.8, bw - 0.8)} height={bh} rx={1} fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />;
      })}
      <path d={`M0 ${h - 1.2}H${w}`} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
