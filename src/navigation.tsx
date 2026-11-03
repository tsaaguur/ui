"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

/* Navigation (2026-11-04): tabs with a sliding card, breadcrumbs, pagination,
   a menu, a stepper. Keyboard: arrows move between tabs and menu items. */

export function Tabs({ items, value, onChange, className = "" }: { items: { value: string; label: string; icon?: IconName }[]; value: string; onChange: (v: string) => void; className?: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  useEffect(() => { const el = refs.current[items.findIndex((t) => t.value === value)]; if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth }); }, [value, items]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { onChange(items[(i + 1) % items.length].value); refs.current[(i + 1) % items.length]?.focus(); }
    if (e.key === "ArrowLeft") { onChange(items[(i - 1 + items.length) % items.length].value); refs.current[(i - 1 + items.length) % items.length]?.focus(); }
  };
  return (
    <div role="tablist" className={`relative flex gap-1 border-b border-hairline ${className}`}>
      {items.map((t, i) => (
        <button key={t.value} ref={(el) => { refs.current[i] = el; }} role="tab" type="button" aria-selected={t.value === value} tabIndex={t.value === value ? 0 : -1} onClick={() => onChange(t.value)} onKeyDown={(e) => onKey(e, i)} className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-[13.5px] font-medium transition-colors ${t.value === value ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {t.icon ? <Icon name={t.icon} className="h-4 w-4" /> : null}{t.label}
        </button>
      ))}
      <span className="absolute bottom-[-1px] h-[2px] rounded-full bg-foreground transition-[left,width] duration-300" style={{ left: bar.left, width: bar.width, transitionTimingFunction: "var(--ease)" }} aria-hidden />
    </div>
  );
}

export function Breadcrumb({ items, className = "" }: { items: { href?: string; label: string }[]; className?: string }) {
  return (
    <nav aria-label="Замчлал" className={`flex flex-wrap items-center gap-1.5 text-[13px] ${className}`}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i ? <Icon name="chevron-right" className="h-3.5 w-3.5 text-muted-foreground" /> : null}
          {it.href && i < items.length - 1 ? <Link href={it.href} className="text-muted-foreground hover:text-foreground">{it.label}</Link> : <span aria-current={i === items.length - 1 ? "page" : undefined} className={i === items.length - 1 ? "font-medium" : "text-muted-foreground"}>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({ page, pages, onChange, className = "" }: { page: number; pages: number; onChange: (p: number) => void; className?: string }) {
  const around = [page - 1, page, page + 1].filter((p) => p >= 1 && p <= pages);
  const list = Array.from(new Set([1, ...around, pages])).filter((p) => p >= 1 && p <= pages);
  const btn = "tz-hit grid h-9 min-w-9 place-items-center rounded-full border border-hairline px-2 text-[13px] tz-num hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent";
  return (
    <nav aria-label="Хуудас" className={`flex items-center gap-1.5 ${className}`}>
      <button type="button" className={btn} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Өмнөх"><Icon name="chevron-left" className="h-4 w-4" /></button>
      {list.map((p, i) => (
        <span key={p} className="flex items-center gap-1.5">
          {i && list[i - 1] !== p - 1 ? <span className="tz-num px-1 text-muted-foreground">…</span> : null}
          <button type="button" aria-current={p === page ? "page" : undefined} onClick={() => onChange(p)} className={`${btn} ${p === page ? "bg-foreground text-background border-foreground hover:bg-foreground" : ""}`}>{p}</button>
        </span>
      ))}
      <button type="button" className={btn} disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Дараах"><Icon name="chevron-right" className="h-4 w-4" /></button>
    </nav>
  );
}

export type MenuItem = { label: string; icon?: IconName; onSelect?: () => void; href?: string; danger?: boolean; divider?: boolean };

export function Menu({ trigger, items, align = "left", className = "" }: { trigger: React.ReactNode; items: MenuItem[]; align?: "left" | "right"; className?: string }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const f = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", f); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", f); document.removeEventListener("keydown", k); };
  }, [open]);
  const real = items.filter((i) => !i.divider);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setHi((h) => (h + 1) % real.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => (h - 1 + real.length) % real.length); }
    if (e.key === "Enter" && open) { e.preventDefault(); real[hi]?.onSelect?.(); setOpen(false); }
  };
  let k = -1;
  return (
    <div ref={ref} className={`relative inline-block ${className}`} onKeyDown={onKey}>
      <span onClick={() => setOpen(!open)} aria-haspopup="menu" aria-expanded={open}>{trigger}</span>
      {open ? (
        <ul role="menu" className={`tz-menu absolute top-[calc(100%+6px)] z-30 min-w-[200px] ${align === "right" ? "right-0" : "left-0"}`}>
          {items.map((it, i) => {
            if (it.divider) return <li key={i} role="separator" className="my-1 border-t border-hairline" />;
            k += 1; const idx = k;
            const cls = `flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] ${idx === hi ? "bg-muted" : ""} ${it.danger ? "text-down" : ""}`;
            const body = <>{it.icon ? <Icon name={it.icon} className="h-4 w-4 shrink-0 opacity-80" /> : null}{it.label}</>;
            return <li key={i} role="none" onMouseEnter={() => setHi(idx)}>{it.href ? <Link role="menuitem" href={it.href} className={cls} onClick={() => setOpen(false)}>{body}</Link> : <button role="menuitem" type="button" className={cls} onClick={() => { it.onSelect?.(); setOpen(false); }}>{body}</button>}</li>;
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function Stepper({ steps, current, className = "" }: { steps: { label: string; hint?: string }[]; current: number; className?: string }) {
  return (
    <ol className={`flex flex-col gap-0 sm:flex-row sm:items-start ${className}`} aria-label="Алхмууд">
      {steps.map((s, i) => {
        const done = i < current, now = i === current;
        return (
          <li key={i} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-stretch">
            <div className="flex items-center sm:w-full">
              <span className={`tz-num grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[12px] font-semibold ${done ? "border-foreground bg-foreground text-background" : now ? "border-brand text-brand" : "border-hairline text-muted-foreground"}`}>{done ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}</span>
              {i < steps.length - 1 ? <span className={`hidden h-px flex-1 sm:block ${done ? "bg-foreground" : "bg-hairline"}`} /> : null}
            </div>
            <div className="pb-4 sm:pr-4"><div className={`text-[13.5px] font-medium ${now ? "" : done ? "" : "text-muted-foreground"}`}>{s.label}</div>{s.hint ? <div className="tz-label mt-0.5 normal-case tracking-normal">{s.hint}</div> : null}</div>
          </li>
        );
      })}
    </ol>
  );
}
