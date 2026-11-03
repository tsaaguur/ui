"use client";
import { useState } from "react";
import { Icon, ICON_GROUPS, type IconName, Pill, SearchField } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const TITLE: Record<string, string> = { place: "Энэ газар", arrows: "Сум", actions: "Үйлдэл", state: "Төлөв", people: "Хүмүүс, яриа", media: "Медиа, өгөгдөл" };

export default function Page() {
  const [size, setSize] = useState(28);
  const [w, setW] = useState(1.75);
  const [q, setQ] = useState("");
  const groups = Object.entries(ICON_GROUPS).map(([k, names]) => [k, (names as readonly string[]).filter((n) => n.includes(q.trim().toLowerCase()))] as const).filter(([, n]) => n.length);
  const total = Object.values(ICON_GROUPS).reduce((a, g) => a + g.length, 0);
  return (
    <Doc kicker={`icons.tsx · ${total}`} title="Дүрс" lead="Бүгд энэ санд зориулж зурагдсан: нүүр нь гэр, парламент нь Төрийн ордны бөмбөгөр, Threads нь утасны ороомог, мэдээ нь нугалсан цаас, морь, овоо. 24-ийн тор, 1.75 зураас, дугуй үзүүр; зарим цэг санаатайгаар торноос гарч, гараар зурсан мэт уншигдана.">
      <Stage title="Бүх дүрс" code={`<Icon name="dome" className="h-6 w-6" strokeWidth={${w}} />`}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <SearchField value={q} onChange={setQ} placeholder="Нэрээр хайх" className="w-[220px]" />
          {[20, 28, 40].map((s) => <Pill key={s} on={size === s} onClick={() => setSize(s)}>{s}px</Pill>)}
          {[1.25, 1.75, 2.25].map((x) => <Pill key={x} on={w === x} onClick={() => setW(x)}>зураас {x}</Pill>)}
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
          {!groups.length ? <div className="text-[13px] text-muted-foreground">Олдсонгүй</div> : null}
        </div>
      </Stage>
      <Stage title="Props">
        <Props rows={[["name", "IconName", "дүрсийн нэр (ICON_NAMES, ICON_GROUPS экспортлогдсон)"], ["className", "string", "хэмжээ, өнгө (h-4 w-4 text-brand)"], ["strokeWidth", "number", "зураасны зузаан, 1.75 анхдагч"], ["title", "string", "өгвөл role=img, дэлгэц уншигчид хэлнэ"]]} />
      </Stage>
    </Doc>
  );
}
