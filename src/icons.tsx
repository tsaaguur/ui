/* The lab's own icon set (2026-11-04, owner: draw everything ourselves).
   Every path here was drawn for this site: a Mongolian ger for home, the
   Government Palace dome for parliament, a spool for Threads, a folded sheet
   for the press. Monoline, round caps, stroke 1.75 on a 24 grid; a few
   control points sit off the grid on purpose so the lines read as drawn,
   not generated. Use <Icon name="..." /> with a className for size. */

export type IconName =
  | "ger" | "hash" | "flame" | "dome" | "sheet" | "board" | "menu" | "close"
  | "arrow-up-right" | "arrow-right" | "arrow-left" | "chevron-left" | "chevron-right"
  | "play" | "pause" | "sun" | "moon" | "out" | "spool" | "person" | "banner"
  | "reply" | "peak" | "pulse" | "quote";

const P: Record<IconName, React.ReactNode> = {
  // a ger: the felt wall, the roof poles meeting at the toono ring, the door
  ger: <><path d="M4.2 11.6c2.3-4.3 5-6.4 7.8-6.4s5.5 2.1 7.8 6.4" /><path d="M4.6 11.6h14.8" /><path d="M5.2 11.6v7.2h13.6v-7.2" /><path d="M10.3 18.8v-4.3h3.4v4.3" /><circle cx="12" cy="5.4" r="1.1" /></>,
  hash: <><path d="M9.4 4.6 7.6 19.4" /><path d="M16.6 4.6l-1.8 14.8" /><path d="M4.8 9.3h15" /><path d="M4.2 14.9h15" /></>,
  flame: <><path d="M12 20.2c-3.4 0-5.6-2.3-5.6-5.4 0-2.6 1.6-4.3 2.7-6.2.5 1.1 1.1 1.8 1.9 2.2.2-2.9 1.3-5.3 3.1-7 .1 3 2.1 4.4 3.1 6.5.8 1.7.9 3.3.2 4.9-1 2.2-3 5-5.4 5z" /><path d="M12 20.2c-1.5 0-2.4-1-2.4-2.4 0-1.3.9-2.1 1.6-3.2.6.9 1.2 1.3 1.7 1.5.4 1.6-.1 4.1-.9 4.1z" /></>,
  // the Government Palace: the dome, the drum, the wide steps
  dome: <><path d="M7.2 11.2c0-3.1 2.1-5.3 4.8-5.3s4.8 2.2 4.8 5.3" /><path d="M12 5.9V4.1" /><path d="M6 11.2h12" /><path d="M7.4 11.2v5.2M12 11.2v5.2M16.6 11.2v5.2" /><path d="M4.6 16.4h14.8" /><path d="M3.4 19.6h17.2" /></>,
  sheet: <><path d="M6.4 4.6h8.2l3.6 3.6v11.2H6.4z" /><path d="M14.6 4.6v3.6h3.6" /><path d="M9 11.4h6.2M9 14.4h6.2M9 17.3h4" /></>,
  // a storyboard frame with its corner tab
  board: <><rect x="3.6" y="6.2" width="16.8" height="12.4" rx="1.6" /><path d="M3.6 10.2h16.8" /><path d="M8.2 6.2v4" /><path d="M7 14.6l2.6-2.2 2.4 2 3.2-3 2.6 3.2" /></>,
  menu: <><path d="M4.6 7.2h14.8" /><path d="M4.6 12h10.6" /><path d="M4.6 16.8h14.8" /></>,
  close: <><path d="M6.4 6.4l11.2 11.2" /><path d="M17.6 6.4 6.4 17.6" /></>,
  "arrow-up-right": <><path d="M7.4 16.6 16.6 7.4" /><path d="M9.6 7.4h7v7" /></>,
  "arrow-right": <><path d="M4.8 12h14" /><path d="M13.2 6.4 18.8 12l-5.6 5.6" /></>,
  "arrow-left": <><path d="M19.2 12h-14" /><path d="M10.8 6.4 5.2 12l5.6 5.6" /></>,
  "chevron-left": <path d="M14.6 5.8 8.4 12l6.2 6.2" />,
  "chevron-right": <path d="M9.4 5.8l6.2 6.2-6.2 6.2" />,
  play: <path d="M8.2 5.6v12.8L18.4 12z" />,
  pause: <><path d="M8.4 5.6v12.8" /><path d="M15.6 5.6v12.8" /></>,
  // a sun with rays of uneven length
  sun: <><circle cx="12" cy="12" r="3.6" /><path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" /></>,
  moon: <path d="M14.2 3.8a8.4 8.4 0 1 0 6 12.4 7 7 0 0 1-6-12.4z" />,
  out: <><path d="M13.2 5h5.8v5.8" /><path d="M19 5l-8.4 8.4" /><path d="M10.2 6.6H5.6V18.4h11.8v-4.6" /></>,
  // a spool: two flanges and the thread winding across
  spool: <><path d="M6.2 5.4h11.6" /><path d="M6.2 18.6h11.6" /><path d="M8.2 5.4v13.2M15.8 5.4v13.2" /><path d="M8.2 8.2c2.5 1.2 5.1-.6 7.6.6M8.2 11.4c2.5 1.2 5.1-.6 7.6.6M8.2 14.6c2.5 1.2 5.1-.6 7.6.6" /></>,
  person: <><circle cx="12" cy="8.2" r="3.4" /><path d="M5.4 19.4c.6-3.8 3.1-5.8 6.6-5.8s6 2 6.6 5.8" /></>,
  banner: <><path d="M6 20.2V4.4" /><path d="M6 5.2c3.4-1.6 6.2 1.4 9.6-.2.9-.4 1.6-.6 2.4-.6v8.6c-3.4 1.6-6.2-1.4-9.6.2-.9.4-1.6.6-2.4.6" /></>,
  reply: <><path d="M5 17.6V7.2c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6.2c0 1.1-.9 2-2 2H9.2z" /><path d="M8.6 9.4h6.8M8.6 12.2h4.2" /></>,
  peak: <><path d="M3.6 19 9.4 9.2l3.3 5 2.1-2.8 5.6 7.6z" /><circle cx="17.2" cy="6.4" r="2" /></>,
  pulse: <><path d="M3.6 12.4h4l2.2-5.2 3 10 2.4-7 1.4 2.2h3.8" /></>,
  quote: <><path d="M9.6 7.2c-2.6.6-4.2 2.3-4.2 5.2v4.4h4.6v-4.6H7.6c0-1.6.7-2.5 2-2.9z" /><path d="M18.4 7.2c-2.6.6-4.2 2.3-4.2 5.2v4.4h4.6v-4.6h-2.4c0-1.6.7-2.5 2-2.9z" /></>,
};

export function Icon({ name, className = "h-4 w-4", strokeWidth = 1.75, title }: { name: IconName; className?: string; strokeWidth?: number; title?: string }) {
  const filled = name === "play";
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      {P[name]}
    </svg>
  );
}
