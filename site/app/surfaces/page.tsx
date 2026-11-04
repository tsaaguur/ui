import { Card, Panel, Accordion, Container, Stack, Pill, Icon } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
export const metadata = { title: "Гадаргуу" };
export default function Page() {
  return (
    <Doc kicker="surfaces.tsx" title="Гадаргуу" lead="Карт (гарчиг, кикер, үйлдэлтэй), самбарын хүрээ (дугаар, толгой, дүрстэй), нээгддэг мөрүүд, контейнер, стек.">
      <Stage title="Card" code={'<Card kicker="7 хоног" title="Халуун сэдвүүд" action={<Pill icon="arrow-up-right">Бүгд</Pill>} lift>...</Card>'}>
        <div className="grid gap-3 sm:grid-cols-2"><Card kicker="7 хоног" title="Халуун сэдвүүд" action={<Pill icon="arrow-up-right">Бүгд</Pill>}><p className="text-[13.5px] text-muted-foreground">Эрэмбэ = пост, мэдээ, хариу үйлдлийн нийлбэр.</p></Card><Card title="Өргөгддөг" lift><p className="text-[13.5px] text-muted-foreground">Hover: 3 px дээш, сүүдэр гүнзгийрнэ.</p></Card></div>
      </Stage>
      <Stage title="Panel" code={'<Panel n={2} total={7} head="нэгдэв · мэдээ" icon="sheet">...</Panel>'}>
        <div className="grid gap-3 sm:grid-cols-2"><Panel n={2} total={7} head="нэгдэв · мэдээ" icon="sheet"><p className="tz-display text-[20px] font-semibold leading-tight">Маргааш Улаанбаатарт 2 хэм дулаан</p></Panel><Panel head="толгойтой, дугааргүй" icon="peak"><p className="text-[13.5px] text-muted-foreground">Самбарын хүрээ дугааргүй ч болно.</p></Panel></div>
      </Stage>
      <Stage title="Accordion" code={'<Accordion items={[{ title: "...", body: "...", icon: "help" }]} single />'}>
        <Accordion items={[{ title: "Сэдвийн тэмдэг яаж сонгогддог вэ?", body: "Нэрийг үгийн эхлэлээр уншина: төсв = төсөв, төсвийн. Таарахгүй бол эхний үсэг.", icon: "help" }, { title: "Яагаад emoji байхгүй вэ?", body: "Өөрсдөө зурсан, нэг хэв маягтай, утгатай тэмдэг хэрэгтэй.", icon: "flame" }, { title: "Хөдөлгөөнийг унтраах уу?", body: "prefers-reduced-motion бол бүгд зогсоно; animate=\"none\" ч бий.", icon: "pulse" }]} />
      </Stage>
      <Stage title="Container, Stack" code={'<Container size="narrow">...</Container>\n<Stack gap={3} row>...</Stack>'}>
        <Container size="narrow" className="rounded-[10px] border border-dashed border-hairline py-3"><Stack gap={2} row><Pill icon="ger">Нүүр</Pill><Pill icon="sheet">Мэдээ</Pill><Pill icon="dome">Парламент</Pill><Icon name="more" className="h-4 w-4 text-muted-foreground" /></Stack></Container>
      </Stage>
      <Stage title="Props"><Props rows={[["Card", "title, kicker, action, lift", "tz-card"], ["Panel", "n, total, head, icon", "tz-panel, тамга"], ["Accordion", "items {title,body,icon}, single", "aria-expanded"], ["Container", "size narrow|wide|full", "760 / 1200 / 1400"], ["Stack", "gap 1-8, row", "flex column / row"]]} /></Stage>
    </Doc>
  );
}
