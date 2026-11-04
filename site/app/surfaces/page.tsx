import { Card, Panel, Accordion, Container, Stack, Pill, Icon } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
export const metadata = { title: "Surfaces" };
export default function Page() {
  return (
    <Doc kicker="surfaces.tsx" title="Surfaces" lead="Card (title, kicker, action), panel frame (number, head, icon), accordion, container, stack." imports={["Card", "Panel", "Accordion", "Container", "Stack"]}>
      <Stage title="Card" code={'<Card kicker="7 days" title="Hot topics" action={<Pill icon="arrow-up-right">All</Pill>} lift>...</Card>'}>
        <div className="grid gap-3 sm:grid-cols-2"><Card kicker="7 days" title="Hot topics" action={<Pill icon="arrow-up-right">All</Pill>}><p className="text-[13.5px] text-muted-foreground">Rank = posts, news and reactions combined.</p></Card><Card title="Lifting card" lift><p className="text-[13.5px] text-muted-foreground">Hover: 3 px up, deeper shadow.</p></Card></div>
      </Stage>
      <Stage title="Panel" code={'<Panel n={2} total={7} head="joined · news" icon="sheet">...</Panel>'}>
        <div className="grid gap-3 sm:grid-cols-2"><Panel n={2} total={7} head="joined · news" icon="sheet"><p className="tz-display text-[20px] font-semibold leading-tight">2 degrees in Ulaanbaatar tomorrow</p></Panel><Panel head="head, no number" icon="peak"><p className="text-[13.5px] text-muted-foreground">A panel frame works without a number too.</p></Panel></div>
      </Stage>
      <Stage title="Accordion" code={'<Accordion items={[{ title: "...", body: "...", icon: "help" }]} single />'}>
        <Accordion items={[{ title: "How is a pictogram chosen?", body: "The name is read by word stems at word start; no match gives the first letter.", icon: "help" }, { title: "Why no emoji?", body: "We want marks drawn in one style, with one meaning each.", icon: "flame" }, { title: "Can motion be turned off?", body: "prefers-reduced-motion stops everything; animate=\"none\" exists too.", icon: "pulse" }]} />
      </Stage>
      <Stage title="Container, Stack" code={'<Container size="narrow">...</Container>\n<Stack gap={3} row>...</Stack>'}>
        <Container size="narrow" className="rounded-[10px] border border-dashed border-hairline py-3"><Stack gap={2} row><Pill icon="ger">Home</Pill><Pill icon="sheet">News</Pill><Pill icon="dome">Parliament</Pill><Icon name="more" className="h-4 w-4 text-muted-foreground" /></Stack></Container>
      </Stage>
      <Stage title="Props"><Props rows={[["Card", "title, kicker, action, lift", "tz-card"], ["Panel", "n, total, head, icon", "tz-panel with a stamp"], ["Accordion", "items {title,body,icon}, single", "aria-expanded"], ["Container", "size narrow|wide|full", "760 / 1200 / 1400"], ["Stack", "gap 1-8, row", "flex column / row"]]} /></Stage>
    </Doc>
  );
}
