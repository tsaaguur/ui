"use client";
import { useState } from "react";
import { Icon, type IconName, Pill } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const ICONS: [IconName, string][] = [["ger", "гэр: нүүр"], ["hash", "сэдэв"], ["flame", "одоо, халуун"], ["dome", "Төрийн ордон: парламент"], ["sheet", "мэдээ"], ["board", "түүхийн самбар"], ["menu", "цэс"], ["close", "хаах"], ["arrow-up-right", "гадагш холбоос"], ["arrow-right", "цааш"], ["arrow-left", "буцах"], ["chevron-left", "өмнөх"], ["chevron-right", "дараах"], ["play", "үргэлжлүүлэх"], ["pause", "зогсоох"], ["sun", "гэрэл"], ["moon", "харанхуй"], ["out", "эх сурвалж"], ["spool", "Threads: утасны ороомог"], ["person", "хүн"], ["banner", "хуудас"], ["reply", "хариулт"], ["peak", "оргил"], ["pulse", "одоо"], ["quote", "ишлэл"]];

export default function Page() {
  const [size, setSize] = useState(32);
  const [w, setW] = useState(1.75);
  return (
    <Doc kicker="icons.tsx · 25" title="Дүрс" lead="Бүгд энэ сайтад зориулж зурагдсан: нүүр нь гэр, парламент нь Төрийн ордны бөмбөгөр, Threads нь утасны ороомог, мэдээ нь нугалсан цаас. 24-ийн тор, 1.75 зураас, дугуй үзүүр; зарим цэг санаатайгаар торноос гарч, гараар зурсан мэт уншигдана.">
      <Stage title="Бүх дүрс" code={`<Icon name="dome" className="h-${Math.round(size / 4)} w-${Math.round(size / 4)}" strokeWidth={${w}} />`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {[20, 32, 48].map((s) => <Pill key={s} on={size === s} onClick={() => setSize(s)}>{s}px</Pill>)}
          {[1.25, 1.75, 2.25].map((x) => <Pill key={x} on={w === x} onClick={() => setW(x)}>зураас {x}</Pill>)}
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {ICONS.map(([n, hint]) => (
            <li key={n} className="flex flex-col items-center gap-2 rounded-[10px] border border-hairline p-4"><Icon name={n} className="" strokeWidth={w} title={n} /><style>{`li svg[role="img"]{width:${size}px;height:${size}px}`}</style><span className="tz-num text-[11px]">{n}</span><span className="tz-label text-center text-[9.5px] normal-case tracking-normal">{hint}</span></li>
          ))}
        </ul>
      </Stage>
      <Stage title="Props">
        <Props rows={[["name", "IconName", "дүрсийн нэр"], ["className", "string", "хэмжээ, өнгө (h-4 w-4 text-brand)"], ["strokeWidth", "number", "зураасны зузаан, 1.75 анхдагч"], ["title", "string", "өгвөл role=img, дэлгэц уншигчид хэлнэ"]]} />
      </Stage>
    </Doc>
  );
}
