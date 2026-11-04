"use client";
import { useState } from "react";
import { Pill, Button, Icon, ThemeToggle } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [on, setOn] = useState("Одоо");
  return (
    <Doc kicker="pill.tsx · theme-toggle.tsx" title="Товч, пилл" lead="Хоёр жижиг удирдлага: шилэн пилл (холбоос, шүүлтүүр, шошго) ба бүтэн товч. Хоёулаа дугуй, нэг мөр; дүрс нь үгийн ард. Шилэн товч нь зураг дээр суудаг.">
      <Stage title="Pill" note="Холбоос (href /), гадагш (https), товч (onClick); on={true} бол дарагдсан." code={'<Pill href="/stories" icon="arrow-up-right">Бүх хүрээ</Pill>\n<Pill on={v === "Одоо"} onClick={() => set("Одоо")}>Одоо</Pill>'}>
        <div className="flex flex-wrap items-center gap-2">
          <Pill href="/board" icon="arrow-up-right">Бүх хүрээ</Pill>
          <Pill href="https://tsaaguur.mn" icon="out">tsaaguur.mn</Pill>
          {["Одоо", "7 хоног", "Хүмүүс"].map((v) => <Pill key={v} on={on === v} onClick={() => setOn(v)}>{v}</Pill>)}
          <Pill icon="spool">Threads</Pill>
        </div>
      </Stage>
      <Stage title="Button" code={'<Button href="/story/x" icon="arrow-right">Сэдвийг үзэх</Button>\n<Button tone="brand">...</Button>  <Button tone="quiet">...</Button>'}>
        <div className="flex flex-wrap items-center gap-3"><Button href="/board" icon="arrow-right">Сэдвийг үзэх</Button><Button tone="brand" icon="arrow-right">Санал өгөх</Button><Button tone="quiet" icon="arrow-left">Буцах</Button></div>
      </Stage>
      <Stage title="Glass button, kicker" note="Зураг дээр: цагаан шилэн дугуй товч, хар шилэн kicker." dark code={'<button className="tz-glass-button h-11 w-11"><Icon name="chevron-right" /></button>\n<span className="tz-kicker"><i />анх хэлсэн</span>'}>
        <div className="tz-dots flex items-center gap-3 rounded-[10px] bg-[#0f1013] p-6"><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-left" className="h-4 w-4" /></button><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-right" className="h-4 w-4" /></button><span className="tz-kicker"><i />№1 · 7 хоног</span><button type="button" className="tz-glass-button h-9 w-9"><Icon name="pause" className="h-3.5 w-3.5" /></button></div>
      </Stage>
      <Stage title="ThemeToggle" note="Гэрэл / харанхуй; view transition-оор товчноос дугуй тэлнэ." code={'<ThemeToggle />'}><ThemeToggle /></Stage>
      <Stage title="Props">
        <Props rows={[["Pill.href", "string", "/ бол Link, https бол шинэ цонх, байхгүй бол button"], ["Pill.on", "boolean", "дарагдсан төлөв (aria-pressed)"], ["Pill.icon / Button.icon", "IconName", "үгийн ард"], ["Button.tone", '"ink" | "brand" | "quiet"', "бэх, цэнхэр, хүрээтэй"]]} />
      </Stage>
    </Doc>
  );
}
