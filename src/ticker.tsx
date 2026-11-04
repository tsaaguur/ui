"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";

export type TickerItem = { key: string; name: string; tone: "up" | "down" | "flat" | "new"; label: string };

/* `href` maps an item to its page; return null for a ticker that only shows. */
export function Ticker({ items, href = (it) => `/tag/${it.key}` }: { items: TickerItem[]; href?: (it: TickerItem) => string | null }) {
  const [paused, setPaused] = useState(false);
  if (!items.length) return null;
  const row = [...items, ...items];
  const color = (t: TickerItem["tone"]) => (t === "up" ? "text-up" : t === "down" ? "text-down" : t === "new" ? "text-brand" : "text-muted-foreground");
  return (
    <section className={`tz-ticker relative border-y border-hairline bg-card/60 font-mono text-[13px] ${paused ? "is-paused" : ""}`} aria-label="Одоо яригдаж буй сэдвүүд">
      <div className="overflow-hidden py-2.5">
        <div className="tz-ticker-track">
          {row.map((it, i) => {
            const body = <><span className="text-foreground">{it.name}</span><span className={`${color(it.tone)} text-[11.5px]`}>{it.label}</span><span className="pl-3 text-hairline">|</span></>;
            const cls = "flex shrink-0 items-center gap-2 px-5";
            const to = href(it);
            return to ? <Link key={i} href={to} className={`${cls} hover:text-brand`} aria-hidden={i >= items.length}>{body}</Link> : <span key={i} className={cls} aria-hidden={i >= items.length}>{body}</span>;
          })}
        </div>
      </div>
      <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Үргэлжлүүлэх" : "Зурвасыг зогсоох"} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-hairline bg-background/80 text-muted-foreground backdrop-blur hover:text-foreground">
        {paused ? <Icon name="play" className="h-3 w-3" /> : <Icon name="pause" className="h-3 w-3" />}
      </button>
    </section>
  );
}
