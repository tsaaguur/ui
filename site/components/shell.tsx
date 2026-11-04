"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, ThemeToggle, SearchField, ToastProvider } from "@tsaaguur/ui";
import { GROUPS } from "./sections";
import { CommitChip } from "./commit-chip";
import type { Commit } from "./commits";
import pkg from "../../package.json";

/* The site's own shell: a top bar with the mark, the version and the
   GitHub link, a left rail of grouped sections with a search over
   component names on a desk, a sheet of the same on a phone. */
export function Shell({ children, commits, now }: { children: React.ReactNode; commits: Commit[] | null; now: number }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const ql = q.trim().toLowerCase();
  const groups = ql ? GROUPS.map((g) => ({ ...g, items: g.items.filter((s) => [s.label, s.hint, ...(s.search ?? [])].some((w) => w.toLowerCase().includes(ql))) })).filter((g) => g.items.length) : GROUPS;
  const nav = (
    <nav className="flex flex-col gap-5" aria-label="Sections">
      <SearchField value={q} onChange={setQ} placeholder="Search components" />
      {groups.map((g) => (
        <div key={g.title}>
          <div className="tz-label mb-1.5 px-3">{g.title}</div>
          <div className="flex flex-col gap-0.5">
            {g.items.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] font-medium transition-colors ${active(s.href) ? "bg-foreground text-background" : "hover:bg-muted"}`}>
                <Icon name={s.icon} className="h-[18px] w-[18px] shrink-0 opacity-80" />
                <span className="min-w-0"><span className="block">{s.label}</span><span className={`tz-label block text-[10px] ${active(s.href) ? "text-background/70" : ""}`}>{s.hint}</span></span>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {!groups.length ? <div className="px-3 text-[13px] text-muted-foreground">No match</div> : null}
    </nav>
  );
  return (
    <ToastProvider>
      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
            <Link href="/" className="group inline-flex items-center gap-2" aria-label="Tsaaguur UI">
              <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-[8px] bg-[#131518]"><img src="/brand/tsaaguur-mark-light.svg" alt="" aria-hidden className="h-7 w-7" /></span>
              <span className="tz-display text-[17px] font-bold leading-none tracking-tight">Tsaaguur UI</span>
              <span className="tz-label hidden rounded-full border border-hairline px-1.5 py-0.5 text-[9.5px] sm:inline">v{pkg.version}</span>
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <a href="https://github.com/tsaaguur/ui" className="tz-pill" target="_blank" rel="noopener noreferrer"><Icon name="code" className="h-3.5 w-3.5" />GitHub</a>
              <a href="https://lab.tsaaguur.mn" className="tz-pill hidden sm:inline-flex" target="_blank" rel="noopener noreferrer">lab <Icon name="arrow-up-right" className="h-3.5 w-3.5" /></a>
              <ThemeToggle />
              <button type="button" onClick={() => setOpen(!open)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted lg:hidden"><Icon name={open ? "close" : "menu"} className="h-5 w-5" /></button>
            </div>
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-8 px-4 py-6 sm:px-6">
          <aside className="hidden w-[250px] shrink-0 lg:block"><div className="sticky top-20 max-h-[calc(100svh-6rem)] overflow-auto pr-1">{nav}</div></aside>
          {open ? <div className="fixed inset-x-0 top-14 bottom-0 z-30 overflow-auto border-b border-hairline bg-background p-4 lg:hidden">{nav}</div> : null}
          <main className="min-w-0 flex-1 pb-16">{children}</main>
        </div>
        <CommitChip commits={commits} now={now} />
      </div>
    </ToastProvider>
  );
}
