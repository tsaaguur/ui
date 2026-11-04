"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconName } from "./icons";
import { Icon } from "./icons";

/* The small controls of the system: a glass pill (a link, a filter, a tag),
   a solid button and an icon-only button. All round, one line. A press is
   answered by the icon itself (an arrow slides, a check draws, refresh
   spins, anything else blinks) and a ring that leaves the edge; one easing,
   nothing bounces, nothing on hover but a tint. */
type Common = { icon?: IconName; className?: string; children: React.ReactNode };

export function Pill({ href, icon, on, onClick, className = "", children }: Common & { href?: string; on?: boolean; onClick?: () => void }) {
  const cls = `tz-pill ${on ? "is-on" : ""} ${className}`;
  const body = <>{children}{icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}</>;
  if (href && href.startsWith("/")) return <Link href={href} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>;
  return <button type="button" onClick={onClick} aria-pressed={on} className={cls}>{body}</button>;
}

export type ButtonTone = "ink" | "brand" | "quiet" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/* How an icon answers a press, read from its name. */
export function iconMotion(name?: IconName): "slide-x" | "slide-x-back" | "slide-y" | "slide-y-back" | "spin" | "draw" | "blink" {
  if (!name) return "blink";
  if (/^(arrow-right|arrow-up-right|arrow-down-right|chevron-right|chevrons-right|send|out|share|upload|redo)$/.test(name)) return "slide-x";
  if (/^(arrow-left|chevron-left|chevrons-left|undo)$/.test(name)) return "slide-x-back";
  if (/^(arrow-down|chevron-down|download|drop)$/.test(name)) return "slide-y";
  if (/^(arrow-up|chevron-up|expand)$/.test(name)) return "slide-y-back";
  if (/^(refresh|loader|settings|sun)$/.test(name)) return "spin";
  if (/^(check|check-circle|heart|star|bookmark|pin|flag|plus|minus|close|x-circle|copy|trash|edit|search)$/.test(name)) return "draw";
  return "blink";
}

/* Shared press state: the class stays for the length of the animation. */
function usePress(onClick?: (e: React.MouseEvent) => void) {
  const [pressed, setPressed] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (t.current) clearTimeout(t.current); }, []);
  const press = (e: React.MouseEvent) => {
    setPressed(false);
    requestAnimationFrame(() => setPressed(true));
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setPressed(false), 520);
    onClick?.(e);
  };
  return { pressed, press };
}

const SPIN = <svg viewBox="0 0 24 24" className="tz-spin h-[1em] w-[1em]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 3.6a8.4 8.4 0 1 0 8.4 8.4" /></svg>;

export function Button({ href, icon, iconLeft, tone = "ink", size = "md", loading = false, disabled = false, full = false, type = "button", onClick, className = "", children }: Common & { href?: string; iconLeft?: IconName; tone?: ButtonTone; size?: ButtonSize; loading?: boolean; disabled?: boolean; full?: boolean; type?: "button" | "submit"; onClick?: (e: React.MouseEvent) => void }) {
  const { pressed, press } = usePress(onClick);
  const motion = iconMotion(icon ?? iconLeft);
  const cls = `tz-button is-${tone} is-${size} ${full ? "is-full" : ""} ${pressed ? "is-pressed" : ""} ${loading ? "is-loading" : ""} ${className}`;
  const body = (
    <>
      {iconLeft ? <span className="tz-button-icon" data-side="left">{loading ? SPIN : <Icon name={iconLeft} className="h-[1.1em] w-[1.1em]" />}</span> : null}
      <span className="tz-button-label">{children}</span>
      {icon ? <span className="tz-button-icon" data-side="right">{loading && !iconLeft ? SPIN : <Icon name={icon} className="h-[1.1em] w-[1.1em]" />}</span> : null}
      {!icon && !iconLeft && loading ? <span className="tz-button-icon" data-side="right">{SPIN}</span> : null}
    </>
  );
  if (href && !disabled && href.startsWith("/")) return <Link href={href} className={cls} data-motion={motion} onClick={press}>{body}</Link>;
  if (href && !disabled) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-motion={motion} onClick={press}>{body}</a>;
  return <button type={type} onClick={press} disabled={disabled || loading} aria-busy={loading || undefined} className={cls} data-motion={motion}>{body}</button>;
}

export function IconButton({ icon, label, href, tone = "quiet", size = "md", on, loading = false, disabled = false, square = false, onClick, className = "" }: { icon: IconName; label: string; href?: string; tone?: ButtonTone; size?: ButtonSize; on?: boolean; loading?: boolean; disabled?: boolean; square?: boolean; onClick?: (e: React.MouseEvent) => void; className?: string }) {
  const { pressed, press } = usePress(onClick);
  const cls = `tz-button tz-iconbutton is-${tone} is-${size} ${square ? "is-square" : ""} ${on ? "is-on" : ""} ${pressed ? "is-pressed" : ""} ${className}`;
  const body = <span className="tz-button-icon">{loading ? SPIN : <Icon name={icon} className="h-[1.15em] w-[1.15em]" />}</span>;
  if (href && !disabled && href.startsWith("/")) return <Link href={href} className={cls} aria-label={label} title={label} data-motion={iconMotion(icon)} onClick={press}>{body}</Link>;
  if (href && !disabled) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={label} title={label} data-motion={iconMotion(icon)} onClick={press}>{body}</a>;
  return <button type="button" onClick={press} disabled={disabled || loading} aria-label={label} title={label} aria-pressed={on} aria-busy={loading || undefined} className={cls} data-motion={iconMotion(icon)}>{body}</button>;
}
