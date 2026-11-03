"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

/* Feedback (2026-11-04): an alert is a tinted box with a leading mark (never
   a coloured left border), a toast is the same box that arrives at the
   bottom and leaves on its own, a dialog is a glass sheet in the middle with
   the focus held inside, a drawer the same from the right. Progress, a
   spinner drawn as the loader mark, a skeleton that shimmers once a second,
   an empty state with a mark and one line. */

const TONE: Record<string, { box: string; icon: IconName }> = {
  info: { box: "bg-brand-soft text-brand-strong", icon: "info" },
  ok: { box: "bg-up/12 text-up", icon: "check-circle" },
  warn: { box: "bg-warm/15 text-warm", icon: "warning" },
  bad: { box: "bg-down/12 text-down", icon: "x-circle" },
};
export type Tone = keyof typeof TONE;

export function Alert({ tone = "info", title, children, onClose, className = "" }: { tone?: Tone; title?: string; children?: React.ReactNode; onClose?: () => void; className?: string }) {
  const t = TONE[tone];
  return (
    <div role={tone === "bad" ? "alert" : "status"} className={`flex items-start gap-3 rounded-[10px] px-4 py-3 ${t.box} ${className}`}>
      <Icon name={t.icon} className="mt-0.5 h-[18px] w-[18px] shrink-0" />
      <div className="min-w-0 flex-1 text-[13.5px] leading-snug">{title ? <div className="font-semibold">{title}</div> : null}{children ? <div className={title ? "mt-0.5 opacity-90" : ""}>{children}</div> : null}</div>
      {onClose ? <button type="button" onClick={onClose} aria-label="Хаах" className="grid h-6 w-6 shrink-0 place-items-center rounded-full hover:bg-foreground/10"><Icon name="close" className="h-3.5 w-3.5" /></button> : null}
    </div>
  );
}

type ToastItem = { id: number; tone: Tone; text: string };
const ToastCtx = createContext<{ toast: (text: string, tone?: Tone) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const toast = useCallback((text: string, tone: Tone = "info") => {
    const id = Date.now() + Math.random();
    setItems((l) => [...l, { id, tone, text }]);
    setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 4200);
  }, []);
  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4" aria-live="polite">
        {items.map((t) => <div key={t.id} className="tz-rise pointer-events-auto w-full max-w-[420px]"><Alert tone={t.tone} onClose={() => setItems((l) => l.filter((x) => x.id !== t.id))}>{t.text}</Alert></div>)}
      </div>
    </ToastCtx.Provider>
  );
}
export function useToast() { const c = useContext(ToastCtx); if (!c) throw new Error("useToast needs <ToastProvider>"); return c.toast; }

function useTrap(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>("button, [href], input, [tabindex]:not([tabindex='-1'])"); first?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const els = [...ref.current.querySelectorAll<HTMLElement>("button, [href], input, textarea, [tabindex]:not([tabindex='-1'])")].filter((el) => !el.hasAttribute("disabled"));
        if (!els.length) return;
        const a = els[0], z = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; prev?.focus(); };
  }, [open, onClose]);
  return ref;
}

export function Dialog({ open, onClose, title, children, footer, className = "" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; className?: string }) {
  const ref = useTrap(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="presentation">
      <div className="tz-fade absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="tz-dialog-title" className={`tz-rise tz-glass relative w-full max-w-[520px] rounded-[14px] bg-card-solid/95 p-5 ${className}`}>
        <div className="flex items-start justify-between gap-3"><h2 id="tz-dialog-title" className="tz-display text-[20px] font-semibold">{title}</h2><button type="button" onClick={onClose} aria-label="Хаах" className="tz-hit grid h-8 w-8 place-items-center rounded-full hover:bg-muted"><Icon name="close" className="h-4 w-4" /></button></div>
        <div className="mt-3 text-[14px] leading-relaxed">{children}</div>
        {footer ? <div className="mt-5 flex flex-wrap justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Drawer({ open, onClose, title, children, side = "right", className = "" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; side?: "right" | "bottom"; className?: string }) {
  const ref = useTrap(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <div className="tz-fade absolute inset-0 bg-black/40" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className={`tz-drawer absolute bg-card-solid p-5 ${side === "right" ? "inset-y-0 right-0 w-full max-w-[400px] is-right" : "inset-x-0 bottom-0 max-h-[85svh] rounded-t-[16px] is-bottom"} ${className}`}>
        <div className="flex items-start justify-between gap-3"><h2 className="tz-display text-[18px] font-semibold">{title}</h2><button type="button" onClick={onClose} aria-label="Хаах" className="tz-hit grid h-8 w-8 place-items-center rounded-full hover:bg-muted"><Icon name="close" className="h-4 w-4" /></button></div>
        <div className="mt-3 overflow-auto text-[14px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Tooltip({ text, children, className = "" }: { text: string; children: React.ReactNode; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <span className={`relative inline-flex ${className}`} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      {children}
      {on ? <span role="tooltip" className="tz-fade pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-foreground px-2.5 py-1.5 text-[12px] text-background">{text}</span> : null}
    </span>
  );
}

export function Progress({ value, label, tone = "brand", className = "" }: { value: number; label?: string; tone?: "brand" | "up" | "warm" | "down"; className?: string }) {
  const c = { brand: "bg-brand", up: "bg-up", warm: "bg-warm", down: "bg-down" }[tone];
  return (
    <div className={className}>
      {label ? <div className="mb-1.5 flex items-baseline justify-between"><span className="tz-label">{label}</span><span className="tz-num text-[12px]">{Math.round(value)}%</span></div> : null}
      <div role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} className="h-[6px] overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${c} transition-[width] duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%`, transitionTimingFunction: "var(--ease)" }} /></div>
    </div>
  );
}

export function Ring({ value, size = 56, label, className = "" }: { value: number; size?: number; label?: string; className?: string }) {
  const r = (size - 6) / 2, c = 2 * Math.PI * r;
  return (
    <span className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }} role="progressbar" aria-valuenow={Math.round(value)} aria-label={label}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90"><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth="5" /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, Math.max(0, value / 100)))} style={{ transition: "stroke-dashoffset 0.6s var(--ease)" }} /></svg>
      <span className="tz-num absolute text-[12px] font-semibold">{Math.round(value)}</span>
    </span>
  );
}

export function Spinner({ className = "h-5 w-5" }: { className?: string }) {
  return <Icon name="loader" className={`tz-spin ${className}`} title="Ачаалж байна" />;
}

export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return <span className={`tz-skeleton block rounded-[6px] ${className}`} aria-hidden />;
}

export function Empty({ icon = "sheet", title, hint, action, className = "" }: { icon?: IconName; title: string; hint?: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 rounded-[12px] border border-dashed border-hairline px-6 py-10 text-center ${className}`}>
      <Icon name={icon} className="h-8 w-8 text-muted-foreground" />
      <div className="tz-display text-[17px] font-semibold">{title}</div>
      {hint ? <div className="max-w-[40ch] text-[13.5px] text-muted-foreground">{hint}</div> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
