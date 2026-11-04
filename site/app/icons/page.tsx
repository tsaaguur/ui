"use client";
import { useState } from "react";
import { Icon, ICON_GROUPS, type IconName, Pill, SearchField } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const TITLE: Record<string, string> = { place: "Place", arrows: "Arrows", actions: "Actions", state: "State", people: "People, talk", media: "Media, data" };

export default function Page() {
  const [size, setSize] = useState(28);
  const [w, setW] = useState(1.75);
  const [q, setQ] = useState("");
  const groups = Object.entries(ICON_GROUPS).map(([k, names]) => [k, (names as readonly string[]).filter((n) => n.includes(q.trim().toLowerCase()))] as const).filter(([, n]) => n.length);
  const total = Object.values(ICON_GROUPS).reduce((a, g) => a + g.length, 0);
  return (
    <Doc kicker={`icons.tsx · ${total}`} title="Icons" lead="All drawn for this library: a ger for home, the parliament dome, a spool for Threads, a folded sheet for the press, a horse, an ovoo. 24 grid, stroke 1.75, round caps; a few points leave the grid on purpose so they read as hand-drawn." imports={["Icon", "ICON_NAMES", "ICON_GROUPS", "type IconName"]}>
      <Stage title="All icons" code={`<Icon name="dome" className="h-6 w-6" strokeWidth={${w}} />`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <SearchField value={q} onChange={setQ} placeholder="Search by name" className="w-[220px]" />
          {[20, 28, 40].map((s) => <Pill key={s} on={size === s} onClick={() => setSize(s)}>{s}px</Pill>)}
          {[1.25, 1.75, 2.25].map((x) => <Pill key={x} on={w === x} onClick={() => setW(x)}>stroke {x}</Pill>)}
        </div>
        <style>{`.tz-iconsheet svg{width:${size}px;height:${size}px}`}</style>
        <div className="tz-iconsheet flex flex-col gap-6">
          {groups.map(([k, names]) => (
            <div key={k}>
              <div className="tz-label mb-2">{TITLE[k] ?? k} · {names.length}</div>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-6">
                {names.map((n) => <li key={n} className="flex flex-col items-center gap-2 rounded-[10px] border border-hairline p-3"><Icon name={n as IconName} className="" strokeWidth={w} title={n} /><span className="tz-num text-[10.5px] text-muted-foreground">{n}</span></li>)}
              </ul>
            </div>
          ))}
          {!groups.length ? <div className="text-[13px] text-muted-foreground">No match</div> : null}
        </div>
      </Stage>
      <Stage title="Props">
        <Props rows={[["name", "IconName", "icon name (ICON_NAMES and ICON_GROUPS are exported)"], ["className", "string", "size and color, e.g. h-4 w-4 text-brand"], ["strokeWidth", "number", "stroke width, 1.75 by default"], ["title", "string", "sets role=img and a label for screen readers"]]} />
      </Stage>
    </Doc>
  );
}
