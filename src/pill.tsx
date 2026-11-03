import Link from "next/link";
import type { IconName } from "./icons";
import { Icon } from "./icons";

/* The two small controls of the system: a glass pill (a link, a filter, a
   tag) and a solid button. Both round, both a single line; the icon, when
   there is one, sits after the words. */
type Common = { icon?: IconName; className?: string; children: React.ReactNode };

export function Pill({ href, icon, on, onClick, className = "", children }: Common & { href?: string; on?: boolean; onClick?: () => void }) {
  const cls = `tz-pill ${on ? "is-on" : ""} ${className}`;
  const body = <>{children}{icon ? <Icon name={icon} className="h-3.5 w-3.5" /> : null}</>;
  if (href && href.startsWith("/")) return <Link href={href} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>;
  return <button type="button" onClick={onClick} aria-pressed={on} className={cls}>{body}</button>;
}

export function Button({ href, icon, tone = "ink", onClick, className = "", children }: Common & { href?: string; tone?: "ink" | "brand" | "quiet"; onClick?: () => void }) {
  const cls = `tz-button ${tone === "brand" ? "is-brand" : tone === "quiet" ? "is-quiet" : ""} ${className}`;
  const body = <>{children}{icon ? <Icon name={icon} className="h-4 w-4" /> : null}</>;
  if (href && href.startsWith("/")) return <Link href={href} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>;
  return <button type="button" onClick={onClick} className={cls}>{body}</button>;
}
