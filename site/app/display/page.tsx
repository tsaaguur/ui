"use client";
import { useState } from "react";
import { Avatar, AvatarGroup, Badge, Table, Stat, Timeline, DefinitionList, Kbd, Code, Divider, Glyph } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

type Row = { name: string; side: string; posts: number; delta: number };
const ROWS: Row[] = [{ name: "суурь тэтгэвэр олгох", side: "мэдээ", posts: 184, delta: 12.4 }, { name: "нойтон цас", side: "facebook", posts: 141, delta: -8.1 }, { name: "оюу толгойн ногдол ашиг", side: "facebook", posts: 118, delta: 3.2 }, { name: "10 саяын бичлэг", side: "threads", posts: 96, delta: 41 }];

export default function Page() {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "posts", dir: "desc" });
  const rows = [...ROWS].sort((a, b) => { const k = sort.key as keyof Row; const x = a[k], y = b[k]; const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y)); return sort.dir === "asc" ? c : -c; });
  return (
    <Doc kicker="display.tsx" title="Өгөгдөл" lead="Аватар (зураггүй бол үсэг), тэмдэг, эрэмбэлэгддэг хүснэгт, тойм карт, цаг хугацааны шугам, тодорхойлолтын жагсаалт, товчлуур, код, зааг.">
      <Stage title="Avatar, AvatarGroup, Badge" code={'<Avatar name="Н.Учрал" src={url} size={40} />  <AvatarGroup people={[...]} max={3} />\n<Badge tone="up" dot>өсч байна</Badge>'}>
        <div className="flex flex-wrap items-center gap-4"><Avatar name="Н.Учрал" size={40} /><Avatar name="Д.Амарбаясгалан" size={32} /><AvatarGroup people={[{ name: "Б" }, { name: "Ж" }, { name: "О" }, { name: "Н" }, { name: "С" }]} max={3} /><Badge>126 гишүүн</Badge><Badge tone="brand">шинэ</Badge><Badge tone="up" dot>өсч байна</Badge><Badge tone="down">намжсан</Badge><Badge tone="warm">мэдээ</Badge><Badge tone="ink">01</Badge></div>
      </Stage>
      <Stage title="Table" note="Толгой дээр дарахад эрэмбэ; aria-sort." code={'<Table columns={[{ key: "name", label: "Сэдэв", render: (r) => ... }, { key: "posts", label: "Пост", align: "right" }]} rows={rows} rowKey={(r) => r.name} sort={sort} onSort={...} />'}>
        <Table<Row> rows={rows} rowKey={(r) => r.name} sort={sort} onSort={(k) => setSort((s) => ({ key: k, dir: s.key === k && s.dir === "desc" ? "asc" : "desc" }))} columns={[{ key: "name", label: "Сэдэв", render: (r) => <span className="flex items-center gap-2.5"><Glyph name={r.name} size={24} animate="none" /><span className="font-medium">{r.name}</span></span> }, { key: "side", label: "Анх", render: (r) => <Badge>{r.side}</Badge> }, { key: "posts", label: "Пост", align: "right" }, { key: "delta", label: "7 хоног", align: "right", render: (r) => <span className={r.delta >= 0 ? "text-up" : "text-down"}>{r.delta >= 0 ? "+" : ""}{r.delta}%</span> }]} />
      </Stage>
      <Stage title="Stat" code={'<Stat label="Халуун сэдэв" value={50} delta={4.2} sub="7 хоногт" icon="flame" />'}>
        <div className="grid gap-3 sm:grid-cols-3"><Stat label="Халуун сэдэв" value={50} delta={4.2} sub="7 хоногт" icon="flame" /><Stat label="Идэвхтэй гишүүн" value="106 / 126" icon="dome" /><Stat label="Threads пост" value={691} delta={-12.5} sub="24 цагт" icon="spool" /></div>
      </Stage>
      <Stage title="Timeline" code={'<Timeline items={[{ at: "10.21 09:24", title: "...", body: "...", icon: "banner", tone: "brand" }, ...]} />'}>
        <Timeline items={[{ at: "2026.10.21 09:24", title: "Newscafe.mn анх хэлэв", body: "Улаанбаатарт +5+7 градус дулаан байна", icon: "banner", tone: "brand" }, { at: "2026.10.21 20:00", title: "ubn.mn нэгдэв", body: "Маргааш Улаанбаатарт 2 хэм дулаан", icon: "sheet", tone: "warm" }, { at: "2026.10.28 08:00", title: "Оргил цаг", body: "7 дурдлага нэг цагт", icon: "peak", tone: "ink" }, { at: "2026.11.02 20:49", title: "Threads нэгдэв", icon: "spool" }]} />
      </Stage>
      <Stage title="DefinitionList, Kbd, Code, Divider" code={'<DefinitionList items={[["Эх сурвалж", "19 сайт"], ...]} />  <Kbd>⌘K</Kbd>  <Code>pnpm sync</Code>  <Divider label="эсвэл" />'}>
        <div className="grid gap-6 sm:grid-cols-2"><DefinitionList items={[["Эх сурвалж", "19 мэдээний сайт"], ["Цуглуулалт", "2 цаг тутам"], ["Шошго", <span key="k">өдөрт нэг удаа, <Code>/tag</Code></span>]]} /><div className="flex flex-col gap-3"><p className="text-[13.5px]">Хайх: <Kbd>⌘</Kbd> <Kbd>K</Kbd>, зураасаар хүрээ солих: <Kbd>←</Kbd> <Kbd>→</Kbd></p><Code block>{"pnpm sync && pnpm build"}</Code><Divider label="эсвэл" /><Divider /></div></div>
      </Stage>
      <Stage title="Props"><Props rows={[["Avatar", "src, name, size", "зураггүй бол эхний үсэг"], ["AvatarGroup", "people, size, max", "+N үлдэгдэл"], ["Badge", "tone, dot", "mono, дугуй"], ["Table", "columns {key,label,align,width,render}, rows, rowKey, sort, onSort", "эрэмбэ толгой дээр"], ["Stat", "label, value, delta, sub, icon", "тойм карт"], ["Timeline", "items {at,title,body,icon,tone}", "босоо шугам, цэгтэй"], ["DefinitionList", "items [key, value][]", "dl"], ["Kbd / Code / Divider", "children / block / label", "жижиг тусламж"]]} /></Stage>
    </Doc>
  );
}
