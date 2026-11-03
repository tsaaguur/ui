"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, ThemeToggle } from "@tsaaguur/ui";
import { SECTIONS } from "./sections";

/* The library's own shell: a top bar with the mark and the version, a left
   rail of sections on a desk, a sheet of the same links on a phone. Built
   from the library it documents, nothing else. */

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Хэсгүүд">
      {SECTIONS.map((s) => (
        <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[13.5px] font-medium transition-colors ${active(s.href) ? "bg-foreground text-background" : "hover:bg-muted"}`}>
          <Icon name={s.icon} className="h-[18px] w-[18px] shrink-0 opacity-80" />
          <span className="min-w-0"><span className="block">{s.label}</span><span className={`tz-label block text-[10px] ${active(s.href) ? "text-background/70" : ""}`}>{s.hint}</span></span>
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-2" aria-label="Цаагуур UI">
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-[8px] bg-[#131518]"><img src="/brand/tsaaguur-mark-light.svg" alt="" aria-hidden className="h-7 w-7" /></span>
            <span className="tz-display text-[17px] font-bold leading-none tracking-tight">Цаагуур</span>
            <span className="tz-label hidden rounded-full border border-hairline px-1.5 py-0.5 text-[9.5px] sm:inline">ui · 0.1.0</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <a href="https://lab.tsaaguur.mn" className="tz-pill hidden sm:inline-flex">lab.tsaaguur.mn <Icon name="arrow-up-right" className="h-3.5 w-3.5" /></a>
            <ThemeToggle />
            <button type="button" onClick={() => setOpen(!open)} aria-label="Цэс" className="tz-hit grid h-9 w-9 place-items-center rounded-full hover:bg-muted lg:hidden"><Icon name={open ? "close" : "menu"} className="h-5 w-5" /></button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-8 px-4 py-6 sm:px-6">
        <aside className="hidden w-[240px] shrink-0 lg:block"><div className="sticky top-20">{nav}</div></aside>
        {open ? <div className="fixed inset-x-0 top-14 z-30 border-b border-hairline bg-background p-4 lg:hidden">{nav}</div> : null}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
