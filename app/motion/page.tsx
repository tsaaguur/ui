"use client";
import { useState } from "react";
import { Pill } from "@tsaaguur/ui";
import { Doc, Stage } from "@/components/doc";
const KF: [string, string][] = [["tz-rise", "гарч ирэх: 18 px доороос, 0.7s"], ["tz-fade", "бүдэгнээс, 0.5s"], ["tz-roll-up", "мөр доороос эргэж гарах, 0.28s"], ["tz-draw", "зураас өөрөө зурагдах, 0.9s"], ["tz-breathe", "цэг амьсгалах, 2.6s давтана"], ["tz-live", "бүдэгрэх давтана, 2.4s"], ["tz-hero-copy", "hero бичвэр, 0.6s"], ["tz-g-flicker", "дөл анивчих"], ["tz-g-drift", "салхи хийсэх"], ["tz-g-redraw", "зүрх дахин зурагдах"], ["tz-g-flash", "аянга гялсхийх"], ["tz-g-swing", "медаль найгах"], ["tz-g-flip", "зоос эргэх"], ["tz-g-spin", "бөмбөрцөг эргэлдэх"], ["tz-g-bob", "ном, хүн хөдлөх"], ["tz-g-tip", "дэнс хазайх"], ["tz-g-drop", "санал унах"], ["tz-g-blink", "цонх анивчих"]];
export default function Page() {
  const [k, setK] = useState(0);
  return (
    <Doc kicker="styles.css" title="Хөдөлгөөн" lead="Бүх keyframe нэг файлд, нэг муруй дээр. Хөдөлгөөн бүр ямар нэг утгатай: гарч ирэх, зурагдах, амьсгалах, сэдвийнхээ хөдөлгөөн. prefers-reduced-motion бол бүгд зогсоно.">
      <Stage title="Keyframes" note="Дахин үзэхийн тулд товч." code={'.tz-rise { animation: tz-rise 0.7s var(--ease) both; }'}>
        <div className="mb-4"><Pill onClick={() => setK(k + 1)} icon="play">дахин тоглуулах</Pill></div>
        <ul key={k} className="grid gap-2 sm:grid-cols-2">
          {KF.map(([c, w]) => <li key={c} className="flex items-center gap-3 rounded-[10px] border border-hairline p-3"><span className={`inline-block h-6 w-6 rounded-[6px] bg-brand ${c}`} /><span className="min-w-0"><span className="tz-num block text-[12px]">.{c}</span><span className="block text-[12.5px] text-muted-foreground">{w}</span></span></li>)}
        </ul>
      </Stage>
    </Doc>
  );
}
