"use client";
import { useState } from "react";
import { Avatar, AvatarGroup, Badge, Table, Stat, Timeline, DefinitionList, Kbd, Code, Divider, Glyph } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

type Row = { name: string; side: string; posts: number; delta: number };
const ROWS: Row[] = [{ name: "суурь тэтгэвэр олгох", side: "news", posts: 184, delta: 12.4 }, { name: "нойтон цас", side: "facebook", posts: 141, delta: -8.1 }, { name: "оюу толгойн ногдол ашиг", side: "facebook", posts: 118, delta: 3.2 }, { name: "10 саяын бичлэг", side: "threads", posts: 96, delta: 41 }];

export default function Page() {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "posts", dir: "desc" });
  const rows = [...ROWS].sort((a, b) => { const k = sort.key as keyof Row; const x = a[k], y = b[k]; const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y)); return sort.dir === "asc" ? c : -c; });
  return (
    <Doc kicker="display.tsx" title="Data display" lead="Avatar (initials without a picture), badge, sortable table, stat tile, timeline, definition list, keyboard key, code, divider." imports={["Avatar", "AvatarGroup", "Badge", "Table", "Stat", "Timeline", "DefinitionList", "Kbd", "Code", "Divider", "type Column"]}>
      <Stage title="Avatar, AvatarGroup, Badge" code={'<Avatar name="N. Uchral" src={url} size={40} />  <AvatarGroup people={[...]} max={3} />\n<Badge tone="up" dot>rising</Badge>'}>
        <div className="flex flex-wrap items-center gap-4"><Avatar name="Н.Учрал" size={40} /><Avatar name="Д.Амарбаясгалан" size={32} /><AvatarGroup people={[{ name: "Б" }, { name: "Ж" }, { name: "О" }, { name: "Н" }, { name: "С" }]} max={3} /><Badge>126 members</Badge><Badge tone="brand">new</Badge><Badge tone="up" dot>rising</Badge><Badge tone="down">fading</Badge><Badge tone="warm">news</Badge><Badge tone="ink">01</Badge></div>
      </Stage>
      <Stage title="Table" note="Click a header to sort; aria-sort." code={'<Table columns={[{ key: "name", label: "Topic", render: (r) => ... }, { key: "posts", label: "Posts", align: "right" }]} rows={rows} rowKey={(r) => r.name} sort={sort} onSort={...} />'}>
        <Table<Row> rows={rows} rowKey={(r) => r.name} sort={sort} onSort={(k) => setSort((s) => ({ key: k, dir: s.key === k && s.dir === "desc" ? "asc" : "desc" }))} columns={[{ key: "name", label: "Topic", render: (r) => <span className="flex items-center gap-2.5"><Glyph name={r.name} size={24} animate="none" /><span className="font-medium">{r.name}</span></span> }, { key: "side", label: "First", render: (r) => <Badge>{r.side}</Badge> }, { key: "posts", label: "Posts", align: "right" }, { key: "delta", label: "7 days", align: "right", render: (r) => <span className={r.delta >= 0 ? "text-up" : "text-down"}>{r.delta >= 0 ? "+" : ""}{r.delta}%</span> }]} />
      </Stage>
      <Stage title="Stat" code={'<Stat label="Hot topics" value={50} delta={4.2} sub="7 days" icon="flame" />'}>
        <div className="grid gap-3 sm:grid-cols-3"><Stat label="Hot topics" value={50} delta={4.2} sub="7 days" icon="flame" /><Stat label="Active members" value="106 / 126" icon="dome" /><Stat label="Threads posts" value={691} delta={-12.5} sub="24 h" icon="spool" /></div>
      </Stage>
      <Stage title="Timeline" code={'<Timeline items={[{ at: "10.21 09:24", title: "...", body: "...", icon: "banner", tone: "brand" }, ...]} />'}>
        <Timeline items={[{ at: "2026.10.21 09:24", title: "Newscafe.mn said it first", body: "Ulaanbaatar +5 to +7 degrees", icon: "banner", tone: "brand" }, { at: "2026.10.21 20:00", title: "ubn.mn joined", body: "2 degrees in Ulaanbaatar tomorrow", icon: "sheet", tone: "warm" }, { at: "2026.10.28 08:00", title: "Peak hour", body: "7 mentions in one hour", icon: "peak", tone: "ink" }, { at: "2026.11.02 20:49", title: "Threads joined", icon: "spool" }]} />
      </Stage>
      <Stage title="DefinitionList, Kbd, Code, Divider" code={'<DefinitionList items={[["Sources", "19 sites"], ...]} />  <Kbd>⌘K</Kbd>  <Code>pnpm build</Code>  <Divider label="or" />'}>
        <div className="grid gap-6 sm:grid-cols-2"><DefinitionList items={[["Sources", "19 news sites"], ["Collection", "every 2 hours"], ["Tags", <span key="k">once a day, <Code>/tag</Code></span>]]} /><div className="flex flex-col gap-3"><p className="text-[13.5px]">Search: <Kbd>⌘</Kbd> <Kbd>K</Kbd>, frames: <Kbd>←</Kbd> <Kbd>→</Kbd></p><Code block>{"pnpm add github:tsaaguur/ui"}</Code><Divider label="or" /><Divider /></div></div>
      </Stage>
      <Stage title="Props"><Props rows={[["Avatar", "src, name, size", "initials when there is no picture"], ["AvatarGroup", "people, size, max", "+N for the rest"], ["Badge", "tone, dot", "mono, round"], ["Table", "columns {key,label,align,width,render}, rows, rowKey, sort, onSort", "sort on header click"], ["Stat", "label, value, delta, sub, icon", "stat tile"], ["Timeline", "items {at,title,body,icon,tone}", "vertical rail with dots"], ["DefinitionList", "items [key, value][]", "a dl"], ["Kbd / Code / Divider", "children / block / label", "small helpers"]]} /></Stage>
    </Doc>
  );
}
