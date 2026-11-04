"use client";
import { useState } from "react";
import { Icon } from "@tsaaguur/ui";

/* A code block with a copy button. Used under every demo and for the
   import line of every page. */
export function CodeBlock({ code, lang = "tsx", className = "" }: { code: string; lang?: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setDone(true); setTimeout(() => setDone(false), 1400); } catch { /* clipboard blocked: nothing to do */ }
  };
  return (
    <div className={`relative ${className}`}>
      <pre className="tz-num overflow-x-auto bg-muted/60 px-4 py-3 pr-24 text-[12.5px] leading-relaxed"><code>{code}</code></pre>
      <span className="tz-label pointer-events-none absolute right-12 top-3 text-[9.5px]">{lang}</span>
      <button type="button" onClick={copy} aria-label={done ? "Copied" : "Copy code"} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-[7px] border border-hairline bg-card text-muted-foreground transition-colors hover:text-foreground">
        <Icon name={done ? "check" : "copy"} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
