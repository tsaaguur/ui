import Link from "next/link";
import { Icon, Glyph, Pill, Button } from "@tsaaguur/ui";
import { SECTIONS } from "@/components/sections";

export default function Home() {
  return (
    <article className="max-w-[920px]">
      <div className="tz-label">@tsaaguur/ui · 0.2.0</div>
      <h1 className="tz-display mt-1 text-[40px] font-bold leading-[1] sm:text-[56px]">Цаагуурын өөрийн UI</h1>
      <p className="mt-5 max-w-[66ch] text-[16px] leading-relaxed text-muted-foreground">
        Бидний өөрсдөө зурсан, өөрсдөө хөдөлгөсөн нэг систем: өнгө, зай, гурван үсгийн хэв, 115 дүрс, 16 хөдөлдөг сэдвийн тэмдэг, оролтын бүх хэрэгсэл (талбар, сонголт, унтраалга, гулсуур), замчлал (таб, цэс, хуудаслалт, алхам), хариу (мэдэгдэл, тоаст, диалог, хажуу самбар, ачаалалт), өгөгдлийн дүрслэл (хүснэгт, тойм, цаг хугацааны шугам), карт, самбар, түүхийн самбар. Гаднаас авсан дүрс, emoji, бэлэн компонент байхгүй. lab.tsaaguur.mn энэ санг хэрэглэнэ; энд хүн болгон нь харагдаж, шалгагдана.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button href="/glyphs" icon="arrow-right" tone="brand">Сэдвийн тэмдэг</Button>
        <Button href="/board" icon="arrow-right" tone="quiet">Түүхийн самбар</Button>
        <Pill href="https://lab.tsaaguur.mn" icon="arrow-up-right">lab.tsaaguur.mn</Pill>
      </div>
      <div className="tz-card mt-10 p-5">
        <div className="tz-label">Хэрэглэх</div>
        <pre className="tz-num mt-2 overflow-x-auto text-[12.5px] leading-relaxed"><code>{`// package.json          "@tsaaguur/ui": "link:../ui"
// next.config.mjs       transpilePackages: ["@tsaaguur/ui"]
// app/globals.css       @import "tailwindcss"; @import "@tsaaguur/ui/styles.css"; @source "../../ui/src";
import { Icon, Glyph, StateMark, Board, Pill } from "@tsaaguur/ui";`}</code></pre>
      </div>
      <h2 className="tz-display mt-12 text-[24px] font-semibold">Хэсгүүд</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {SECTIONS.filter((s) => s.href !== "/").map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className="tz-card group flex items-center gap-4 p-4">
              <span className="tz-num text-[13px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <Icon name={s.icon} className="h-6 w-6 shrink-0" />
              <span className="min-w-0"><span className="tz-display tz-underline inline text-[17px] font-semibold">{s.label}</span><span className="tz-label mt-0.5 block">{s.hint}</span></span>
              <Icon name="arrow-up-right" className="ml-auto h-4 w-4 opacity-50" />
            </Link>
          </li>
        ))}
      </ol>
      <h2 className="tz-display mt-12 text-[24px] font-semibold">Дүрэм</h2>
      <ul className="mt-4 grid gap-3 text-[14.5px] leading-relaxed sm:grid-cols-2">
        <li className="tz-card p-4"><Glyph name="цаг агаар" size={28} animate="idle" className="mb-2" /><b>Нэг хөдөлгөөний муруй.</b> Хөдөлдөг бүхэн --ease (cubic-bezier .2 .7 .2 1) дээр; үсрэх, тонгорох байхгүй; prefers-reduced-motion бол бүгд зогсоно.</li>
        <li className="tz-card p-4"><Glyph name="хууль батлах" size={28} animate="idle" className="mb-2" /><b>Зүүн хажуугийн өнгөт зураас байхгүй.</b> Онцлохдоо дэвсгэр, бүтэн хүрээ, зай, жин, эсвэл эхний дүрс хэрэглэнэ.</li>
        <li className="tz-card p-4"><Glyph name="төсвийн тодотгол" size={28} animate="idle" className="mb-2" /><b>Тоо, огноо, шошго бүгд mono.</b> Нэр, гарчиг display; бие Onest.</li>
        <li className="tz-card p-4"><Glyph name="н.учрал" size={28} animate="idle" className="mb-2" /><b>Дүрс бүр зурагдсан.</b> 24-ийн торон дээр 1.75 зураас, дугуй үзүүр; зарим цэг санаатайгаар торноос гарна.</li>
      </ul>
    </article>
  );
}
