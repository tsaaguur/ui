import { SectionHead, Sprockets, Stamp, Icon, Glyph } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
export const metadata = { title: "Карт, самбар" };
export default function Page() {
  return (
    <Doc kicker="styles.css · section-head.tsx" title="Карт, самбар" lead="Шилэн карт (tz-card), зөөлөн өргөгддөг карт (tz-lift), давхар шугамтай самбарын хүрээ (tz-panel) ба хэсгийн толгой. Карт дээр hover-оор өнгө солигдохгүй; tz-lift л 3 px дээш хөдөлнө.">
      <Stage title="tz-card" code={'<div className="tz-card p-5">...</div>'}>
        <div className="grid gap-3 sm:grid-cols-2"><div className="tz-card p-5"><span className="tz-label">шилэн</span><p className="tz-display mt-2 text-[20px] font-semibold">Суурь тэтгэвэр олгох</p></div><div className="tz-card tz-lift p-5"><span className="tz-label">tz-lift</span><p className="tz-display mt-2 text-[20px] font-semibold">Hover: 3 px дээш</p></div></div>
      </Stage>
      <Stage title="tz-panel, Stamp, Sprockets" note="Самбарын хүрээ: гадна 1 px, дотор 5 px зайтай бас нэг 1 px; дугаар нь булангийн тамга." code={'<Sprockets />\n<article className="tz-panel p-5"><Stamp n={1} total={7} />...</article>'}>
        <Sprockets />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <article className="tz-panel p-5"><Stamp n={1} total={7} /><div className="flex items-center gap-2 pl-[72px] pt-1"><Icon name="sheet" className="h-[18px] w-[18px]" /><span className="tz-label">анх хэлсэн · мэдээ</span></div><p className="mt-3 text-[13px] text-muted-foreground"><span className="font-medium text-foreground">mnb.mn</span> · 2026.10.21 14:35</p><div className="mt-2 flex gap-2"><Icon name="quote" className="mt-1 h-5 w-5 shrink-0 text-brand" /><p className="tz-display text-[22px] font-semibold leading-[1.15]">Ирэх сарын 1-нээс 435 мянган ахмад настан шинээр суурь тэтгэвэр авч эхэлнэ</p></div></article>
          <article className="tz-panel p-5"><Stamp n={2} total={7} /><div className="flex items-center gap-2 pl-[72px] pt-1"><Icon name="peak" className="h-[18px] w-[18px]" /><span className="tz-label">оргил цаг</span></div><div className="mt-5 flex items-baseline gap-2"><span className="tz-display text-[40px] font-semibold leading-none">08:00</span><span className="tz-num text-[12px] text-muted-foreground">2026.10.28</span></div></article>
        </div>
        <Sprockets className="mt-3" />
      </Stage>
      <Stage title="SectionHead" code={'<SectionHead kicker="7 хоног" title="Түүхүүд" href="/stories" cta="Бүгд" />'}>
        <SectionHead kicker="7 хоног · хамгийн их яригдсан" title="Түүхүүд" href="/board" cta="Бүгд" />
        <ol className="mt-2"><li className="flex items-center gap-3 py-2"><span className="tz-num text-[18px] font-semibold text-muted-foreground">01</span><Glyph name="суурь тэтгэвэр олгох" size={28} animate="idle" /><span className="tz-display text-[17px] font-semibold">Суурь тэтгэвэр олгох</span></li></ol>
      </Stage>
      <Stage title="Props"><Props rows={[["SectionHead.kicker / title", "string", "дээд шошго, гарчиг"], ["SectionHead.href / cta", "string", "баруун талын пилл холбоос"], ["className tz-card / tz-lift / tz-panel", "css", "карт, өргөгддөг карт, самбарын хүрээ"]]} /></Stage>
    </Doc>
  );
}
