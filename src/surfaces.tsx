"use client";
import { useState } from "react";
import { Icon, type IconName } from "./icons";

/* Surfaces and layout (2026-11-04): the card and the panel as components,
   an accordion (disclosure rows), a container, a stack. */

export function Card({ title, kicker, action, children, lift = false, className = "" }: { title?: React.ReactNode; kicker?: string; action?: React.ReactNode; children: React.ReactNode; lift?: boolean; className?: string }) {
  return (
    <section className={`tz-card ${lift ? "tz-lift" : ""} p-5 ${className}`}>
      {title || kicker || action ? <div className="mb-3 flex items-start justify-between gap-3"><div>{kicker ? <div className="tz-label">{kicker}</div> : null}{title ? <h3 className="tz-display text-[18px] font-semibold leading-tight">{title}</h3> : null}</div>{action}</div> : null}
      {children}
    </section>
  );
}

export function Panel({ n, total, head, icon, children, className = "" }: { n?: number; total?: number; head?: string; icon?: IconName; children: React.ReactNode; className?: string }) {
  return (
    <article className={`tz-panel p-5 ${className}`}>
      {n != null ? <span className="tz-num absolute -top-px -left-px inline-flex items-center gap-1 rounded-br-[8px] rounded-tl-[11px] bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">{String(n).padStart(2, "0")}{total ? <span className="opacity-50">/{String(total).padStart(2, "0")}</span> : null}</span> : null}
      {head ? <div className={`flex items-center gap-2 pt-1 ${n != null ? "pl-[72px]" : ""}`}>{icon ? <Icon name={icon} className="h-[18px] w-[18px] shrink-0 text-foreground/80" /> : null}<span className="tz-label truncate">{head}</span></div> : null}
      <div className={head ? "mt-3" : ""}>{children}</div>
    </article>
  );
}

export function Accordion({ items, single = true, className = "" }: { items: { title: string; body: React.ReactNode; icon?: IconName }[]; single?: boolean; className?: string }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen((s) => { const n = new Set(single ? [] : s); if (s.has(i)) n.delete(i); else n.add(i); return n; });
  return (
    <div className={`divide-y divide-hairline rounded-[12px] border border-hairline ${className}`}>
      {items.map((it, i) => (
        <div key={i}>
          <button type="button" aria-expanded={open.has(i)} onClick={() => toggle(i)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14.5px] font-medium hover:bg-muted/60">
            {it.icon ? <Icon name={it.icon} className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}<span className="flex-1">{it.title}</span><Icon name="chevron-down" className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open.has(i) ? "rotate-180" : ""}`} />
          </button>
          {open.has(i) ? <div className="tz-fade px-4 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">{it.body}</div> : null}
        </div>
      ))}
    </div>
  );
}

export function Container({ children, size = "wide", className = "" }: { children: React.ReactNode; size?: "narrow" | "wide" | "full"; className?: string }) {
  const w = { narrow: "max-w-[760px]", wide: "max-w-[1200px]", full: "max-w-[1400px]" }[size];
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${w} ${className}`}>{children}</div>;
}

export function Stack({ children, gap = 4, row = false, className = "" }: { children: React.ReactNode; gap?: 1 | 2 | 3 | 4 | 6 | 8; row?: boolean; className?: string }) {
  const g = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8" }[gap];
  return <div className={`flex ${row ? "flex-row flex-wrap items-center" : "flex-col"} ${g} ${className}`}>{children}</div>;
}
