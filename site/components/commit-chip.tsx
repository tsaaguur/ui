"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@tsaaguur/ui";
import { ago, type Commit } from "./commits";

/* The floating chip at the bottom right of every page: the latest commit
   on main in one line; a tap opens the last few with links. */
export function CommitChip({ commits, now }: { commits: Commit[] | null; now: number }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  if (!commits?.length) return null;
  const head = commits[0];
  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-4 sm:right-4">
      {open ? (
        <div className="tz-card w-[calc(100vw-24px)] max-w-[360px] p-3 shadow-lg" role="dialog" aria-label="Recent commits">
          <div className="mb-1 flex items-center justify-between px-1"><span className="tz-label">Recent commits</span><button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-6 w-6 place-items-center rounded-full hover:bg-muted"><Icon name="close" className="h-3.5 w-3.5" /></button></div>
          <ol className="flex flex-col">
            {commits.slice(0, 5).map((c) => (
              <li key={c.sha} className="flex items-start gap-2 border-t border-hairline py-2 first:border-t-0">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="tz-num shrink-0 rounded-[5px] bg-muted px-1 py-0.5 text-[10.5px] text-muted-foreground hover:text-foreground">{c.sha.slice(0, 7)}</a>
                <span className="min-w-0 flex-1 truncate text-[12.5px]" title={c.message}>{c.message}</span>
                <span className="tz-num shrink-0 text-[10.5px] text-muted-foreground">{ago(c.date, now)}</span>
              </li>
            ))}
          </ol>
          <div className="mt-2 flex gap-2"><Link href="/changelog" onClick={() => setOpen(false)} className="tz-pill">Changelog <Icon name="arrow-right" className="h-3.5 w-3.5" /></Link><a href="https://github.com/tsaaguur/ui/commits/main" target="_blank" rel="noopener noreferrer" className="tz-pill">GitHub <Icon name="out" className="h-3.5 w-3.5" /></a></div>
        </div>
      ) : null}
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Latest commit" className="tz-pill max-w-[calc(100vw-24px)] shadow-md">
        <span className="tz-live inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-up" aria-hidden />
        <span className="tz-num shrink-0 text-[11px] text-muted-foreground">{head.sha.slice(0, 7)}</span>
        <span className="min-w-0 truncate">{head.message}</span>
        <span className="tz-num shrink-0 text-[11px] text-muted-foreground">{ago(head.date, now)}</span>
      </button>
    </div>
  );
}
