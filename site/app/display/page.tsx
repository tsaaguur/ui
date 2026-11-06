"use client";
import { useState } from "react";
import { Avatar, AvatarGroup, Badge, Table, Stat, Bar, BarList, BarFill, Timeline, DefinitionList, Kbd, Code, Divider, Glyph } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const SHARE = [{ key: "search", label: "Search", value: 34, color: "var(--brand)" }, { key: "social", label: "Social", value: 15, color: "var(--down)" }, { key: "sites", label: "Other sites", value: 7, color: "var(--warm)" }, { key: "ai", label: "AI assistants", value: 1, color: "var(--up)" }, { key: "direct", label: "Direct", value: 187, color: "var(--muted-foreground)" }];
const RANK = [{ key: "a", label: "Daily Desk", value: 27300 }, { key: "b", label: "City Hall", value: 11200 }, { key: "c", label: "Open Budget", value: 3900 }, { key: "d", label: "Morning Brief", value: 999 }, { key: "e", label: "Valley News", value: 108 }];
const FILL: [string, number][] = [["sample.mn", 9], ["example.mn", 6], ["daily.mn", 4], ["brief.mn", 1]];

type Row = { name: string; side: string; posts: number; delta: number };
const ROWS: Row[] = [{ name: "суурь тэтгэвэр олгох", side: "news", posts: 184, delta: 12.4 }, { name: "нойтон цас", side: "facebook", posts: 141, delta: -8.1 }, { name: "оюу толгойн ногдол ашиг", side: "facebook", posts: 118, delta: 3.2 }, { name: "10 саяын бичлэг", side: "threads", posts: 96, delta: 41 }];

export default function Page() {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "posts", dir: "desc" });
  const rows = [...ROWS].sort((a, b) => { const k = sort.key as keyof Row; const x = a[k], y = b[k]; const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y)); return sort.dir === "asc" ? c : -c; });
  return (
    <Doc kicker="display.tsx" title="Data display" lead="Avatar (initials without a picture), badge, sortable table, stat tile, horizontal bars, timeline, definition list, keyboard key, code, divider." imports={["Avatar", "AvatarGroup", "Badge", "Table", "Stat", "Bar", "BarList", "BarFill", "Timeline", "DefinitionList", "Kbd", "Code", "Divider", "type Column"]}>
      <Stage title="Avatar, AvatarGroup, Badge" code={'<Avatar name="N. Uchral" src={url} size={40} />  <AvatarGroup people={[...]} max={3} />\n<Badge tone="up" dot>rising</Badge>'}>
        <div className="flex flex-wrap items-center gap-4"><Avatar name="Н.Учрал" size={40} /><Avatar name="Д.Амарбаясгалан" size={32} /><AvatarGroup people={[{ name: "Б" }, { name: "Ж" }, { name: "О" }, { name: "Н" }, { name: "С" }]} max={3} /><Badge>126 members</Badge><Badge tone="brand">new</Badge><Badge tone="up" dot>rising</Badge><Badge tone="down">fading</Badge><Badge tone="warm">news</Badge><Badge tone="ink">01</Badge></div>
      </Stage>
      <Stage title="Table" note="Click a header to sort; aria-sort." code={'<Table columns={[{ key: "name", label: "Topic", render: (r) => ... }, { key: "posts", label: "Posts", align: "right" }]} rows={rows} rowKey={(r) => r.name} sort={sort} onSort={...} />'}>
        <Table<Row> rows={rows} rowKey={(r) => r.name} sort={sort} onSort={(k) => setSort((s) => ({ key: k, dir: s.key === k && s.dir === "desc" ? "asc" : "desc" }))} columns={[{ key: "name", label: "Topic", render: (r) => <span className="flex items-center gap-2.5"><Glyph name={r.name} size={24} animate="none" /><span className="font-medium">{r.name}</span></span> }, { key: "side", label: "First", render: (r) => <Badge>{r.side}</Badge> }, { key: "posts", label: "Posts", align: "right" }, { key: "delta", label: "7 days", align: "right", render: (r) => <span className={r.delta >= 0 ? "text-up" : "text-down"}>{r.delta >= 0 ? "+" : ""}{r.delta}%</span> }]} />
      </Stage>
      <Stage title="Stat" code={'<Stat label="Hot topics" value={50} delta={4.2} sub="7 days" icon="flame" />'}>
        <div className="grid gap-3 sm:grid-cols-3"><Stat label="Hot topics" value={50} delta={4.2} sub="7 days" icon="flame" /><Stat label="Active members" value="106 / 126" icon="dome" /><Stat label="Threads posts" value={691} delta={-12.5} sub="24 h" icon="spool" /></div>
      </Stage>
      <Stage title="BarList" note="A breakdown as rows: label, its own bar, the number, optionally the share. Use it for every share of a whole. Never one stacked bar with a dot legend: when one part holds most of it, the bar is a single colour." code={'<BarList items={[{ key: "search", label: "Search", value: 34, color: "var(--brand)" }, ...]} scale="total" share dot />\n<BarList items={rows} format={compact} />   // scale="max": a ranking'}>
        <div className="grid gap-8 sm:grid-cols-2">
          <div><div className="tz-label mb-3">Share of a whole</div><BarList ariaLabel="Where readers came from" scale="total" share dot size="lg" labelClassName="w-[112px] text-muted-foreground" items={SHARE} /></div>
          <div><div className="tz-label mb-3">Ranking</div><BarList ariaLabel="Loudest pages" items={RANK} format={(n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n))} size="lg" /></div>
        </div>
      </Stage>
      <Stage title="Bar" note="The track on its own, for a small bar inside a row. One fill, or parts side by side for a split. Five heights: xs, sm, md, lg, xl." code={'<Bar value={62} />  <Bar value={18} max={40} color="var(--up)" size="sm" />\n<Bar parts={[{ value: 31, color: "var(--brand)" }, { value: 15, color: "var(--warm)" }]} total={100} label="work 31, news 15" />'}>
        <div className="grid max-w-[520px] grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 text-[13px]">
          <span className="tz-label">single</span><Bar value={62} />
          <span className="tz-label">against max</span><Bar value={18} max={40} color="var(--up)" size="sm" />
          <span className="tz-label">split</span><Bar total={100} label="work 31, news 15" parts={[{ key: "work", value: 31, color: "var(--brand)" }, { key: "news", value: 15, color: "var(--warm)" }]} />
          <span className="tz-label">mix</span><Bar size="lg" parts={[{ value: 6, color: "var(--brand)" }, { value: 4, className: "bg-brand/50" }, { value: 2, color: "var(--warm)" }, { value: 1, color: "var(--down)" }]} />
          <span className="tz-label">sizes</span><span className="flex flex-col gap-2">{(["xs", "sm", "md", "lg", "xl"] as const).map((z) => <Bar key={z} size={z} value={70} />)}</span>
        </div>
      </Stage>
      <Stage title="BarFill" note="The fill behind a row's own content: the row is the bar. The row is relative and overflow-hidden, its content relative." code={'<li className="relative overflow-hidden rounded-lg px-2 py-1.5"><BarFill value={n} max={top} /><span className="relative">name</span></li>'}>
        <ul className="max-w-[360px]">{FILL.map(([name, n]) => <li key={name} className="relative flex items-center gap-2.5 overflow-hidden rounded-lg px-2 py-1.5 text-[13.5px]"><BarFill value={n} max={FILL[0][1]} /><span className="relative min-w-0 flex-1 truncate font-semibold">{name}</span><span className="tz-num relative text-muted-foreground">{n}</span></li>)}</ul>
      </Stage>
      <Stage title="Timeline" code={'<Timeline items={[{ at: "10.21 09:24", title: "...", body: "...", icon: "banner", tone: "brand" }, ...]} />'}>
        <Timeline items={[{ at: "2026.10.21 09:24", title: "Newscafe.mn said it first", body: "Ulaanbaatar +5 to +7 degrees", icon: "banner", tone: "brand" }, { at: "2026.10.21 20:00", title: "ubn.mn joined", body: "2 degrees in Ulaanbaatar tomorrow", icon: "sheet", tone: "warm" }, { at: "2026.10.28 08:00", title: "Peak hour", body: "7 mentions in one hour", icon: "peak", tone: "ink" }, { at: "2026.11.02 20:49", title: "Threads joined", icon: "spool" }]} />
      </Stage>
      <Stage title="DefinitionList, Kbd, Code, Divider" code={'<DefinitionList items={[["Sources", "19 sites"], ...]} />  <Kbd>⌘K</Kbd>  <Code>pnpm build</Code>  <Divider label="or" />'}>
        <div className="grid gap-6 sm:grid-cols-2"><DefinitionList items={[["Sources", "19 news sites"], ["Collection", "every 2 hours"], ["Tags", <span key="k">once a day, <Code>/tag</Code></span>]]} /><div className="flex flex-col gap-3"><p className="text-[13.5px]">Search: <Kbd>⌘</Kbd> <Kbd>K</Kbd>, frames: <Kbd>←</Kbd> <Kbd>→</Kbd></p><Code block>{"pnpm add github:tsaaguur/ui"}</Code><Divider label="or" /><Divider /></div></div>
      </Stage>
      <Stage title="Props"><Props rows={[["Avatar", "src, name, size", "initials when there is no picture"], ["AvatarGroup", "people, size, max", "+N for the rest"], ["Badge", "tone, dot", "mono, round"], ["Table", "columns {key,label,align,width,render}, rows, rowKey, sort, onSort", "sort on header click"], ["BarList", "items {key,label,value,color}, scale, total, max, share, dot, format, size", "scale=total: each bar is a share; scale=max: a ranking"], ["Bar", "value, max, color | parts, total; size, minPct, label", "label names it for a screen reader, else it is decoration"], ["BarFill", "value, max, minPct", "absolute fill behind the row content"], ["Stat", "label, value, delta, sub, icon", "stat tile"], ["Timeline", "items {at,title,body,icon,tone}", "vertical rail with dots"], ["DefinitionList", "items [key, value][]", "a dl"], ["Kbd / Code / Divider", "children / block / label", "small helpers"]]} /></Stage>
    </Doc>
  );
}
