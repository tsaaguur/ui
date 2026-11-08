import { Icon, type IconName } from "./icons";
import { fmtInt } from "./format";

/* Data display (2026-11-04): avatars with a letter when there is no picture,
   badges, a table with sortable heads, a definition list, a stat tile, a
   vertical timeline (the small cousin of the story board), kbd and code,
   dividers. Server-safe: nothing here needs a browser. */

export function Avatar({ src, name, size = 36, className = "" }: { src?: string | null; name: string; size?: number; className?: string }) {
  const letter = (name.trim().charAt(0) || "?").toUpperCase();
  return src
    ? <img src={src} alt="" className={`shrink-0 rounded-full bg-muted object-cover ${className}`} style={{ width: size, height: size }} loading="lazy" />
    : <span className={`tz-display inline-grid shrink-0 place-items-center rounded-full bg-muted font-semibold ${className}`} style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden>{letter}</span>;
}

export function AvatarGroup({ people, size = 28, max = 4, className = "" }: { people: { src?: string | null; name: string }[]; size?: number; max?: number; className?: string }) {
  const shown = people.slice(0, max), rest = people.length - shown.length;
  return (
    <span className={`inline-flex items-center ${className}`}>
      {shown.map((p, i) => <span key={i} className="rounded-full ring-2 ring-background" style={{ marginLeft: i ? -size * 0.3 : 0 }}><Avatar src={p.src} name={p.name} size={size} /></span>)}
      {rest > 0 ? <span className="tz-num inline-grid place-items-center rounded-full bg-muted text-[11px] font-semibold ring-2 ring-background" style={{ width: size, height: size, marginLeft: -size * 0.3 }}>+{rest}</span> : null}
    </span>
  );
}

export function Badge({ children, tone = "muted", dot, className = "" }: { children: React.ReactNode; tone?: "muted" | "brand" | "up" | "down" | "warm" | "ink" | "outline"; dot?: boolean; className?: string }) {
  const t = { muted: "bg-muted text-foreground", brand: "bg-brand-soft text-brand-strong", up: "bg-up/12 text-up", down: "bg-down/12 text-down", warm: "bg-warm/15 text-warm", ink: "bg-foreground text-background", outline: "border border-hairline text-muted-foreground" }[tone];
  return <span className={`tz-num inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${t} ${className}`}>{dot ? <i className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> : null}{children}</span>;
}

export type Column<T> = { key: string; label: string; align?: "left" | "right"; width?: string; render?: (row: T) => React.ReactNode };

export function Table<T extends Record<string, unknown>>({ columns, rows, sort, onSort, rowKey, className = "" }: { columns: Column<T>[]; rows: T[]; sort?: { key: string; dir: "asc" | "desc" }; onSort?: (key: string) => void; rowKey: (row: T) => string; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-[13.5px]">
        <thead><tr className="border-b border-hairline">
          {columns.map((c) => (
            <th key={c.key} style={{ width: c.width }} className={`tz-label py-2 pr-3 font-semibold ${c.align === "right" ? "text-right" : "text-left"}`}>
              {onSort ? <button type="button" onClick={() => onSort(c.key)} aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined} className={`inline-flex items-center gap-1 hover:text-foreground ${sort?.key === c.key ? "text-foreground" : ""}`}>{c.label}{sort?.key === c.key ? <Icon name={sort.dir === "asc" ? "chevron-up" : "chevron-down"} className="h-3 w-3" /> : null}</button> : c.label}
            </th>
          ))}
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} className="border-b border-hairline last:border-b-0">
              {columns.map((c) => <td key={c.key} className={`py-2.5 pr-3 ${c.align === "right" ? "tz-num text-right" : ""}`}>{c.render ? c.render(r) : String(r[c.key] ?? "")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Stat({ label, value, delta, sub, icon, className = "" }: { label: string; value: number | string; delta?: number; sub?: string; icon?: IconName; className?: string }) {
  return (
    <div className={`tz-card p-4 ${className}`}>
      <div className="flex items-center justify-between"><span className="tz-label">{label}</span>{icon ? <Icon name={icon} className="h-4 w-4 text-muted-foreground" /> : null}</div>
      <div className="tz-display mt-2 text-[28px] font-semibold leading-none">{typeof value === "number" ? fmtInt(value) : value}</div>
      <div className="mt-1.5 flex items-center gap-2 text-[12px]">
        {delta != null ? <span className={`tz-num inline-flex items-center gap-1 ${delta >= 0 ? "text-up" : "text-down"}`}><Icon name={delta >= 0 ? "arrow-up-right" : "arrow-down-right"} className="h-3 w-3" />{Math.abs(delta).toFixed(1)}%</span> : null}
        {sub ? <span className="text-muted-foreground">{sub}</span> : null}
      </div>
    </div>
  );
}

export function Timeline({ items, className = "" }: { items: { at: string; title: React.ReactNode; body?: React.ReactNode; icon?: IconName; tone?: "brand" | "warm" | "up" | "down" | "ink" }[]; className?: string }) {
  const dot = { brand: "bg-brand", warm: "bg-warm", up: "bg-up", down: "bg-down", ink: "bg-foreground" };
  return (
    <ol className={`relative flex flex-col gap-5 pl-7 ${className}`}>
      <span className="absolute left-[9px] top-2 bottom-2 w-px bg-hairline" aria-hidden />
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className={`absolute -left-7 top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-background ${dot[it.tone ?? "brand"]} text-background`}>{it.icon ? <Icon name={it.icon} className="h-3 w-3" strokeWidth={2.2} /> : null}</span>
          <div className="tz-num text-[11px] text-muted-foreground">{it.at}</div>
          <div className="text-[14.5px] font-semibold leading-snug">{it.title}</div>
          {it.body ? <div className="mt-1 text-[13.5px] text-muted-foreground">{it.body}</div> : null}
        </li>
      ))}
    </ol>
  );
}

export function DefinitionList({ items, className = "" }: { items: [string, React.ReactNode][]; className?: string }) {
  return <dl className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13.5px] ${className}`}>{items.map(([k, v]) => <div key={k} className="contents"><dt className="tz-label self-baseline">{k}</dt><dd className="min-w-0">{v}</dd></div>)}</dl>;
}

export function Kbd({ children }: { children: React.ReactNode }) { return <kbd className="tz-num inline-block rounded-[5px] border border-hairline bg-muted px-1.5 py-0.5 text-[11px] font-semibold">{children}</kbd>; }
export function Code({ children, block = false }: { children: React.ReactNode; block?: boolean }) {
  return block ? <pre className="tz-num overflow-x-auto rounded-[10px] bg-muted/70 px-4 py-3 text-[12.5px] leading-relaxed"><code>{children}</code></pre> : <code className="tz-num rounded-[5px] bg-muted px-1.5 py-0.5 text-[12.5px]">{children}</code>;
}
export function Divider({ label, className = "" }: { label?: string; className?: string }) {
  return label ? <div className={`flex items-center gap-3 ${className}`} role="separator"><span className="h-px flex-1 bg-hairline" /><span className="tz-label">{label}</span><span className="h-px flex-1 bg-hairline" /></div> : <hr className={`border-0 border-t border-hairline ${className}`} />;
}
