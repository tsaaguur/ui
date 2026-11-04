import { Doc, Stage } from "@/components/doc";
export const metadata = { title: "Typography" };
export default function Page() {
  return (
    <Doc kicker="type" title="Typography" lead="Three typefaces, three jobs: Onest for body text, Geologica for titles and names (tz-display), JetBrains Mono for numbers, dates and labels (tz-num, tz-label). Cyrillic and Latin.">
      <Stage title="Display · tz-display" code={'<h1 className="tz-display text-[56px] font-bold">Ulaanbaatar</h1>'}>
        <p className="tz-display text-[44px] font-bold leading-none sm:text-[64px]">Who said it first</p>
        <p className="tz-display mt-2 text-[24px] font-semibold">Цэргийн эмнэлгийн 105 жил</p>
      </Stage>
      <Stage title="Body · Onest" code={'<p className="text-[15px] leading-relaxed">...</p>'}>
        <p className="max-w-[60ch] text-[15px] leading-relaxed">Finds the day&apos;s topics in Mongolian social media and the press, shows who said it first, when it peaked and what is happening now, on one board.</p>
      </Stage>
      <Stage title="Labels, numbers · tz-label, tz-num" code={'<span className="tz-label">first · news</span>\n<span className="tz-num">2026.11.04 08:00</span>'}>
        <div className="flex flex-wrap items-center gap-6"><span className="tz-label">first · news</span><span className="tz-num text-[14px]">2026.11.04 08:00</span><span className="tz-num text-[28px] font-semibold">2,713</span><span className="tz-num text-[12px] text-muted-foreground">01 / 07</span></div>
      </Stage>
    </Doc>
  );
}
