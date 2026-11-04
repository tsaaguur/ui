"use client";
import { Stat, Ticker, Avatar, Icon } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter, Lines, Box, TopicRow, PostCard, TOPICS } from "@/components/mock";

export default function Page() {
  return (
    <Doc kicker="layouts · home" title="Home" lead="Header, the hero carousel of the top stories, a stat rail, the ticker, the ranked topics, then the feed between two rails: new topics on the left, parliament and talked-about on the right. Rails fold under the feed on a phone.">
      <Frame title="Home" note="Three columns from 1100 px, one column with folds below.">
        <MockHeader active={0} />
        <div className="p-4 @[900px]:p-6">
          <div className="grid gap-3 @[900px]:grid-cols-[2fr_1fr]">
            <div className="tz-panel relative overflow-hidden p-5"><Box ratio="21/9" label="hero · story 1 of 5" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><span className="tz-kicker"><i />№1 · 7 хоног</span><span className="flex gap-2"><span className="tz-glass-button h-9 w-9"><Icon name="chevron-left" className="h-4 w-4" /></span><span className="tz-glass-button h-9 w-9"><Icon name="chevron-right" className="h-4 w-4" /></span></span></div></div>
            <div className="grid grid-cols-2 gap-3"><Stat label="Сэдэв" value="--" icon="flame" /><Stat label="Пост" value="--" icon="banner" /><Stat label="Мэдээ" value="--" icon="sheet" /><Stat label="Гишүүн" value="-- / 126" icon="dome" /></div>
          </div>
          <div className="mt-4 overflow-hidden rounded-full border border-hairline"><Ticker items={TOPICS.slice(0, 6).map((t, i) => ({ key: String(i), name: t, tone: (["up", "new", "flat", "down"] as const)[i % 4], label: "--" }))} /></div>
          <div className="mt-6 grid gap-6 @[1100px]:grid-cols-[220px_1fr_260px]">
            <aside className="hidden @[1100px]:block"><div className="tz-label mb-2">Шинэ сэдвүүд</div><ol className="tz-card px-3">{TOPICS.slice(5, 9).map((t, i) => <TopicRow key={t} n={i + 1} name={t} bar={70 - i * 12} />)}</ol></aside>
            <main>
              <div className="tz-label mb-2">Хамгийн халуун · 7 хоног</div>
              <div className="tz-card grid gap-4 p-4 @[700px]:grid-cols-[1fr_1fr]"><div className="rounded-[10px] bg-brand-soft p-4"><span className="tz-label">№1</span><Lines n={2} w={["80%", "50%"]} className="mt-3" /><Box ratio="3/1" className="mt-3" label="7-day chart" /></div><ol>{TOPICS.slice(1, 6).map((t, i) => <TopicRow key={t} n={i + 2} name={t} bar={80 - i * 12} />)}</ol></div>
              <div className="mt-4 flex items-center gap-2"><span className="tz-pill is-on">Одоо</span><span className="tz-pill">7 хоног</span></div>
              <div className="mt-3 grid gap-3"><PostCard /><PostCard news /><PostCard picture={false} /></div>
            </main>
            <aside className="hidden @[1100px]:block"><div className="tz-label mb-2">Парламент</div><ol className="tz-card px-3">{["Н.Учрал", "Л.Энх-Амгалан", "Т.Аубакир", "Б.Батбаяр", "Ж.Сүхбаатар"].map((m, i) => <li key={m} className="flex items-center gap-3 border-t border-hairline py-2 first:border-t-0"><span className="tz-num w-5 text-[12px] text-muted-foreground">{i + 1}</span><Avatar name={m} size={28} /><span className="flex-1 text-[13px]">{m}</span><span className="h-2 w-10 rounded-full bg-muted" /></li>)}</ol></aside>
          </div>
        </div>
        <MockFooter /><MockTabBar active={0} />
      </Frame>
    </Doc>
  );
}
