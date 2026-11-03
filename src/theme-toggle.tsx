"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icons";

const KEY = "tsaaguur-lab-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const apply = () => { root.classList.toggle("dark", next); localStorage.setItem(KEY, next ? "dark" : "light"); setDark(next); };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) { apply(); return; }
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--tz-clip-from", `circle(0px at ${x}px ${y}px)`);
    root.dataset.tzVt = "active";
    root.classList.add("tz-theme-swap");
    const vt = doc.startViewTransition(apply);
    requestAnimationFrame(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${far}px at ${x}px ${y}px)`] }, { duration: 450, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" });
    });
    vt.finished.finally(() => { delete root.dataset.tzVt; root.classList.remove("tz-theme-swap"); root.style.removeProperty("--tz-clip-from"); });
  };
  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Гэрэл горим" : "Харанхуй горим"} className={`tz-hit grid h-9 w-9 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-muted ${className}`}>
      {dark === null ? <span className="h-4 w-4" /> : dark ? <Icon name="sun" className="h-4 w-4" /> : <Icon name="moon" className="h-4 w-4" />}
    </button>
  );
}

/** Inline script for <head>: sets the class before paint. */
export const THEME_SCRIPT = `(function(){try{var k="${KEY}",s=localStorage.getItem(k),d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;
