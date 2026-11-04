import { CodeBlock } from "./code";

/* The page furniture of the library site: a title block with the import
   line, a demo stage with its code under it, a props table. */
export function Doc({ kicker, title, lead, imports, children }: { kicker: string; title: string; lead: string; imports?: string[]; children: React.ReactNode }) {
  return (
    <article className="max-w-[920px]">
      <div className="tz-label">{kicker}</div>
      <h1 className="tz-display mt-1 text-[34px] font-bold leading-none sm:text-[44px]">{title}</h1>
      <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">{lead}</p>
      {imports?.length ? <CodeBlock code={`import { ${imports.join(", ")} } from "@tsaaguur/ui";`} lang="ts" className="mt-5 overflow-hidden rounded-[10px] border border-hairline" /> : null}
      <div className="mt-8 flex flex-col gap-10">{children}</div>
    </article>
  );
}

export function Stage({ title, code, note, children, dark = false }: { title: string; code?: string; note?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section>
      <h2 className="tz-display text-[20px] font-semibold">{title}</h2>
      {note ? <p className="mt-1 text-[13.5px] text-muted-foreground">{note}</p> : null}
      <div className={`tz-card mt-3 ${dark ? "dark bg-[#121212] text-[#e8eaed]" : ""}`}>
        <div className="p-5">{children}</div>
        {code ? <CodeBlock code={code} className="overflow-hidden rounded-b-[11px] border-t border-hairline" /> : null}
      </div>
    </section>
  );
}

export function Props({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-[13px]">
      <thead><tr className="tz-label text-left"><th className="py-1.5 pr-3 font-semibold">Prop</th><th className="py-1.5 pr-3 font-semibold">Type</th><th className="py-1.5 font-semibold">Description</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r[0]} className="border-t border-hairline"><td className="tz-num py-1.5 pr-3">{r[0]}</td><td className="tz-num py-1.5 pr-3 text-muted-foreground">{r[1]}</td><td className="py-1.5">{r[2]}</td></tr>)}</tbody>
    </table></div>
  );
}
