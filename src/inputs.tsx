"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

/* Inputs (2026-11-04). Every control is ours: no native <select>, no
   browser checkbox. The field language: a hairline box, 8 px radius, the
   label in mono caps above, a hint or an error below, the brand ring on
   focus. Keyboard works everywhere (arrows in listbox, radio and slider,
   space on switch and checkbox). */

type FieldProps = { label?: string; hint?: string; error?: string; className?: string; id?: string };

export function Field({ label, hint, error, className = "", id, children }: FieldProps & { children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label ? <label htmlFor={id} className="tz-label">{label}</label> : null}
      {children}
      {error ? <span className="text-[12px] text-down">{error}</span> : hint ? <span className="text-[12px] text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

export function Input({ label, hint, error, className = "", icon, right, ...rest }: FieldProps & { icon?: IconName; right?: React.ReactNode } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">) {
  const gen = useId(); const id = rest.id || gen;
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <span className={`tz-field ${error ? "is-error" : ""}`}>
        {icon ? <Icon name={icon} className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
        <input id={id} {...rest} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70" />
        {right}
      </span>
    </Field>
  );
}

export function Textarea({ label, hint, error, className = "", ...rest }: FieldProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">) {
  const gen = useId(); const id = rest.id || gen;
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <span className={`tz-field items-start ${error ? "is-error" : ""}`}><textarea id={id} rows={3} {...rest} className="min-w-0 flex-1 resize-y bg-transparent outline-none placeholder:text-muted-foreground/70" /></span>
    </Field>
  );
}

export function SearchField({ value, onChange, placeholder = "Хайх...", name = "q", className = "" }: { value: string; onChange: (v: string) => void; placeholder?: string; name?: string; className?: string }) {
  return (
    <span className={`tz-field ${className}`}>
      <Icon name="search" className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input name={name} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70" />
      {value ? <button type="button" onClick={() => onChange("")} aria-label="Цэвэрлэх" className="grid h-5 w-5 place-items-center rounded-full hover:bg-muted"><Icon name="close" className="h-3 w-3" /></button> : null}
    </span>
  );
}

export type Option = { value: string; label: string; hint?: string; icon?: IconName };

export function Select({ label, hint, error, className = "", options, value, onChange, placeholder = "Сонгох" }: FieldProps & { options: Option[]; value: string | null; onChange: (v: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(Math.max(0, options.findIndex((o) => o.value === value)));
  const ref = useRef<HTMLDivElement | null>(null);
  const gen = useId(); const id = gen;
  useEffect(() => {
    if (!open) return;
    const f = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", f); return () => document.removeEventListener("mousedown", f);
  }, [open]);
  const pick = (i: number) => { onChange(options[i].value); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (!open) setOpen(true); setHi((h) => Math.min(options.length - 1, h + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(0, h - 1)); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (open) pick(hi); else setOpen(true); }
    else if (e.key === "Escape") setOpen(false);
  };
  const cur = options.find((o) => o.value === value);
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <div ref={ref} className="relative">
        <button id={id} type="button" onClick={() => setOpen(!open)} onKeyDown={onKey} aria-haspopup="listbox" aria-expanded={open} className={`tz-field w-full text-left ${error ? "is-error" : ""}`}>
          {cur?.icon ? <Icon name={cur.icon} className="h-4 w-4 shrink-0" /> : null}
          <span className={`flex-1 truncate ${cur ? "" : "text-muted-foreground/70"}`}>{cur?.label ?? placeholder}</span>
          <Icon name="chevron-down" className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <ul role="listbox" aria-activedescendant={`${id}-${hi}`} className="tz-menu absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 overflow-auto">
            {options.map((o, i) => (
              <li key={o.value} id={`${id}-${i}`} role="option" aria-selected={o.value === value} onMouseEnter={() => setHi(i)} onClick={() => pick(i)} className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-[13.5px] ${i === hi ? "bg-muted" : ""}`}>
                {o.icon ? <Icon name={o.icon} className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
                <span className="min-w-0 flex-1"><span className="block truncate">{o.label}</span>{o.hint ? <span className="tz-label block normal-case tracking-normal">{o.hint}</span> : null}</span>
                {o.value === value ? <Icon name="check" className="h-4 w-4 shrink-0 text-brand" /> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Field>
  );
}

export function Checkbox({ checked, onChange, label, hint, disabled, className = "" }: { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode; hint?: string; disabled?: boolean; className?: string }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 ${disabled ? "opacity-50" : ""} ${className}`}>
      <button type="button" role="checkbox" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)} className={`tz-check ${checked ? "is-on" : ""}`}>
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.2 8.6 6.6 12 12.8 4.6" className={checked ? "tz-draw" : ""} pathLength={1} style={{ opacity: checked ? 1 : 0 }} /></svg>
      </button>
      {label ? <span className="min-w-0 text-[14px] leading-snug"><span className="block">{label}</span>{hint ? <span className="block text-[12px] text-muted-foreground">{hint}</span> : null}</span> : null}
    </label>
  );
}

export function RadioGroup({ options, value, onChange, label, name, className = "" }: { options: Option[]; value: string; onChange: (v: string) => void; label?: string; name?: string; className?: string }) {
  const gen = useId(); const n = name || gen;
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); onChange(options[(i + 1) % options.length].value); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); onChange(options[(i - 1 + options.length) % options.length].value); }
  };
  return (
    <div role="radiogroup" aria-label={label} className={`flex flex-col gap-2 ${className}`}>
      {label ? <span className="tz-label">{label}</span> : null}
      {options.map((o, i) => (
        <label key={o.value} className="flex cursor-pointer items-start gap-3">
          <button type="button" role="radio" name={n} aria-checked={o.value === value} tabIndex={o.value === value || (!options.some((x) => x.value === value) && i === 0) ? 0 : -1} onClick={() => onChange(o.value)} onKeyDown={(e) => onKey(e, i)} className={`tz-radio ${o.value === value ? "is-on" : ""}`}><i /></button>
          <span className="min-w-0 text-[14px] leading-snug"><span className="block">{o.label}</span>{o.hint ? <span className="block text-[12px] text-muted-foreground">{o.hint}</span> : null}</span>
        </label>
      ))}
    </div>
  );
}

export function Switch({ checked, onChange, label, disabled, className = "" }: { checked: boolean; onChange: (v: boolean) => void; label?: React.ReactNode; disabled?: boolean; className?: string }) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-3 ${disabled ? "opacity-50" : ""} ${className}`}>
      <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)} className={`tz-switch ${checked ? "is-on" : ""}`}><i /></button>
      {label ? <span className="text-[14px]">{label}</span> : null}
    </label>
  );
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, label, format = (v: number) => String(v), className = "" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; label?: string; format?: (v: number) => string; className?: string }) {
  const track = useRef<HTMLDivElement | null>(null);
  const pct = ((value - min) / (max - min)) * 100;
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const fromX = (x: number) => { const r = track.current!.getBoundingClientRect(); return clamp(min + ((x - r.left) / r.width) * (max - min)); };
  const drag = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    onChange(fromX(e.clientX));
    const move = (ev: PointerEvent) => onChange(fromX(ev.clientX));
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); onChange(clamp(value + step)); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); onChange(clamp(value - step)); }
    if (e.key === "Home") onChange(min); if (e.key === "End") onChange(max);
  };
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? <div className="flex items-baseline justify-between"><span className="tz-label">{label}</span><span className="tz-num text-[12.5px]">{format(value)}</span></div> : null}
      <div ref={track} onPointerDown={drag} className="relative h-6 cursor-pointer touch-none">
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-muted" />
        <div className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand" style={{ width: `${pct}%` }} />
        <button type="button" role="slider" aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-label={label} onKeyDown={onKey} className="tz-thumb absolute top-1/2" style={{ left: `calc(${pct}% - 9px)` }} />
      </div>
    </div>
  );
}

export function Segmented<T extends string = string>({ options, value, onChange, label, quiet = false, size = "md", className = "" }: { options: { value: T; label: string; icon?: IconName; disabled?: boolean }[]; value: T; onChange: (v: T) => void; label?: string; quiet?: boolean; size?: "sm" | "md"; className?: string }) {
  // quiet (2026-11-09, from the admin pages' PillGroup): no track, the active pill is the only fill, for a toolbar where the control recedes until used
  const pad = size === "sm" ? "px-2.5 py-1 text-[11.5px]" : "px-3 py-1.5 text-[12.5px]";
  return (
    <div role="group" aria-label={label} className={`inline-flex ${quiet ? "gap-0.5" : "rounded-full bg-muted p-0.5"} ${className}`}>
      {options.map((o) => {
        const on = o.value === value;
        const look = quiet ? (on ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted") : (on ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground");
        return (
          <button key={o.value} type="button" aria-pressed={on} disabled={o.disabled} onClick={() => onChange(o.value)} className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold transition-colors disabled:opacity-40 ${pad} ${look}`}>
            {o.icon ? <Icon name={o.icon} className="h-3.5 w-3.5" /> : null}{o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Chip({ children, onRemove, icon, tone = "muted", className = "" }: { children: React.ReactNode; onRemove?: () => void; icon?: IconName; tone?: "muted" | "brand" | "up" | "down" | "warm"; className?: string }) {
  const t = { muted: "bg-muted text-foreground", brand: "bg-brand-soft text-brand-strong", up: "bg-up/12 text-up", down: "bg-down/12 text-down", warm: "bg-warm/15 text-warm" }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-medium ${t} ${className}`}>
      {icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}{children}
      {onRemove ? <button type="button" onClick={onRemove} aria-label="Хасах" className="-mr-1 grid h-4 w-4 place-items-center rounded-full hover:bg-foreground/10"><Icon name="close" className="h-3 w-3" /></button> : null}
    </span>
  );
}
