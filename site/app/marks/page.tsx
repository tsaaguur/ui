"use client";
import { useState } from "react";
import { StateMark, LiveDot, DrawnBars, Sprockets, Stamp, Spark, Pill } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [k, setK] = useState(0);
  return (
    <Doc kicker="marks.tsx · spark.tsx" title="Хөдөлдөг тэмдэг" lead="Төлөвийн сум гарч ирэхдээ өөрөө зурагдана, амьд цэг удаан амьсгална, баганат зураг оргилоо дүүргэж бусдыг хүрээлнэ, sparkline сервер дээр зурагдана. Хүрээний тамга, сprocket шугам нь самбарын эд зүйлс.">
      <Stage title="StateMark" note="Өсч буй, намжиж буй, тогтвортой. Зураас нь stroke-dashoffset-оор зурагдана; дахин харахын тулд товч." code={'<StateMark state="rising" className="h-5 w-7" />'}>
        <div key={k} className="flex flex-wrap items-center gap-8">
          <span className="flex items-center gap-2"><StateMark state="rising" className="h-8 w-11" /><span className="tz-num text-[12px]">rising</span></span>
          <span className="flex items-center gap-2"><StateMark state="falling" className="h-8 w-11" /><span className="tz-num text-[12px]">falling</span></span>
          <span className="flex items-center gap-2"><StateMark state="flat" className="h-8 w-11" /><span className="tz-num text-[12px]">flat</span></span>
          <Pill onClick={() => setK(k + 1)} icon="play">дахин зурах</Pill>
        </div>
      </Stage>
      <Stage title="LiveDot" code={'<LiveDot />'}><span className="flex items-center gap-2"><LiveDot /><span className="tz-num text-[12px]">сүүлийн дурдлага 08:00</span></span></Stage>
      <Stage title="DrawnBars" note="Оргил нь брэнд өнгөөр дүүрэн, бусад нь хүрээ; суурь шугам нарийн." code={'<DrawnBars values={[...]} peak={7} />'}><div className="text-foreground"><DrawnBars values={[1, 0, 2, 1, 0, 3, 5, 9, 4, 2, 1, 0, 1, 2, 1, 0, 0, 1, 3, 2, 1, 0, 1, 0]} peak={7} /></div></Stage>
      <Stage title="Spark" note="Сервер дээр зурагддаг sparkline, JS байхгүй." code={'<Spark values={series} w={200} h={48} />'}><div className="flex flex-wrap gap-6"><Spark values={[2, 3, 5, 4, 8, 12, 9, 6]} w={200} h={48} /><Spark values={[9, 7, 6, 5, 3, 2, 2, 1]} w={200} h={48} stroke="var(--muted-foreground)" /><Spark values={[1, 1, 2, 2, 2, 3, 3, 3]} w={200} h={48} stroke="var(--up)" area={false} /></div></Stage>
      <Stage title="Sprockets, Stamp" note="Самбарын хальсны ирмэг ба хүрээний дугаарын тамга." code={'<Sprockets />  <Stamp n={3} total={7} />'}>
        <Sprockets /><div className="tz-panel mt-3 h-[90px]"><Stamp n={3} total={7} /></div>
      </Stage>
      <Stage title="Props">
        <Props rows={[["StateMark.state", '"rising" | "falling" | "stable" | "flat"', "сумын хэлбэр, өнгө"], ["DrawnBars.values / peak", "number[] / number", "багануудын утга, дүүргэх индекс"], ["Spark.values, w, h, stroke, area", "number[], number, number, string, boolean", "цуваа, хэмжээ, өнгө, талбай будах эсэх"], ["Stamp.n / total", "number", "хүрээний дугаар"]]} />
      </Stage>
    </Doc>
  );
}
