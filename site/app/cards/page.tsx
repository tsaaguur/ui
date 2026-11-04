import { SectionHead, Sprockets, Stamp, Icon, Glyph } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
export const metadata = { title: "Cards (CSS)" };
export default function Page() {
  return (
    <Doc kicker="styles.css · section-head.tsx" title="Cards (CSS)" lead="The glass card (tz-card), the lifting card (tz-lift), the double-lined panel frame (tz-panel) and the section head. Cards do not change color on hover; only tz-lift moves 3 px up." imports={["SectionHead", "Sprockets", "Stamp"]}>
      <Stage title="tz-card" code={'<div className="tz-card p-5">...</div>'}>
        <div className="grid gap-3 sm:grid-cols-2"><div className="tz-card p-5"><span className="tz-label">glass</span><p className="tz-display mt-2 text-[20px] font-semibold">Basic pension</p></div><div className="tz-card tz-lift p-5"><span className="tz-label">tz-lift</span><p className="tz-display mt-2 text-[20px] font-semibold">Hover: 3 px up</p></div></div>
      </Stage>
      <Stage title="tz-panel, Stamp, Sprockets" note="The panel frame: 1 px outside, another 1 px 5 px inside; the number is a corner stamp." code={'<Sprockets />\n<article className="tz-panel p-5"><Stamp n={1} total={7} />...</article>'}>
        <Sprockets />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <article className="tz-panel p-5"><Stamp n={1} total={7} /><div className="flex items-center gap-2 pl-[72px] pt-1"><Icon name="sheet" className="h-[18px] w-[18px]" /><span className="tz-label">first · news</span></div><p className="mt-3 text-[13px] text-muted-foreground"><span className="font-medium text-foreground">mnb.mn</span> · 2026.10.21 14:35</p><div className="mt-2 flex gap-2"><Icon name="quote" className="mt-1 h-5 w-5 shrink-0 text-brand" /><p className="tz-display text-[22px] font-semibold leading-[1.15]">435 thousand elders start receiving the basic pension next month</p></div></article>
          <article className="tz-panel p-5"><Stamp n={2} total={7} /><div className="flex items-center gap-2 pl-[72px] pt-1"><Icon name="peak" className="h-[18px] w-[18px]" /><span className="tz-label">peak hour</span></div><div className="mt-5 flex items-baseline gap-2"><span className="tz-display text-[40px] font-semibold leading-none">08:00</span><span className="tz-num text-[12px] text-muted-foreground">2026.10.28</span></div></article>
        </div>
        <Sprockets className="mt-3" />
      </Stage>
      <Stage title="SectionHead" code={'<SectionHead kicker="7 days" title="Stories" href="/stories" cta="All" />'}>
        <SectionHead kicker="7 days · most discussed" title="Stories" href="/board" cta="All" />
        <ol className="mt-2"><li className="flex items-center gap-3 py-2"><span className="tz-num text-[18px] font-semibold text-muted-foreground">01</span><Glyph name="суурь тэтгэвэр олгох" size={28} animate="idle" /><span className="tz-display text-[17px] font-semibold">Basic pension</span></li></ol>
      </Stage>
      <Stage title="Props"><Props rows={[["SectionHead.kicker / title", "string", "label above, title"], ["SectionHead.href / cta", "string", "pill link on the right"], ["className tz-card / tz-lift / tz-panel", "css", "card, lifting card, panel frame"]]} /></Stage>
    </Doc>
  );
}
