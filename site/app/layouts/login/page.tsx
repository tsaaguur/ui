"use client";
import { Icon } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, Lines, Box, TopicRow, TOPICS } from "@/components/mock";
export default function Page() {
  return (
    <Doc kicker="layouts · sign-in gate" title="Sign-in gate" lead="A signed-out visitor sees the page blurred and inert behind a centred card: the mark, the page title, one Google button, the policy links. No counts on the card.">
      <Frame title="Gate over the home page">
        <MockHeader active={0} signedIn={false} />
        <div className="relative overflow-hidden">
          <div className="pointer-events-none select-none p-4 blur-[3px] @[900px]:p-6" aria-hidden><Box ratio="21/9" label="hero" /><div className="mt-4 grid gap-3 @[700px]:grid-cols-2"><ol className="tz-card px-3">{TOPICS.slice(0, 4).map((t, i) => <TopicRow key={t} n={i + 1} name={t} bar={80 - i * 15} />)}</ol><div className="tz-card p-4"><Lines n={6} /></div></div></div>
          <div className="absolute inset-0 grid place-items-center"><div className="tz-card w-[min(92%,380px)] p-6 text-center shadow-lg"><span className="mx-auto grid h-12 w-12 place-items-center rounded-[10px] bg-foreground"><span className="h-3 w-3 rounded-full bg-background" /></span><div className="tz-label mt-3">ЦААГУУР</div><h3 className="tz-display mt-1 text-[22px] font-bold">Монгол юу ярьж байна?</h3><p className="mt-1 text-[13px] text-muted-foreground">Өдрийн гол сэдвүүд, хэн анх хэлсэн, яаж дэлгэрсэн.</p><span className="tz-button is-brand is-full mt-4"><Icon name="globe" className="h-4 w-4" />Google-ээр нэвтрэх</span><div className="mt-3 flex justify-center gap-3 text-[11.5px] text-muted-foreground"><span>Нууцлал</span><span>Нөхцөл</span></div></div></div>
        </div>
      </Frame>
    </Doc>
  );
}
