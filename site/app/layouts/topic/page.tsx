"use client";
import { Glyph, Timeline, Icon } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter, Lines, Figure, PostCard, TOPICS } from "@/components/mock";

export default function Page() {
  return (
    <Doc kicker="layouts · topic" title="Topic" lead="The topic head with its pictogram and window switch, six figures, then the main column (how it spread, who is talking, posts, news) beside a rail of related topics and sources.">
      <Frame title="Topic page" note="Two columns from 900 px; the rail moves under the lists below that.">
        <MockHeader active={0} />
        <div className="p-4 @[900px]:p-6">
          <div className="flex items-start gap-4"><Glyph name={TOPICS[1]} size={56} animate="idle" /><div className="min-w-0 flex-1"><h2 className="tz-display text-[28px] font-bold leading-none">{TOPICS[1]}</h2><div className="mt-2 flex flex-wrap items-center gap-2"><span className="tz-label">цаг агаар · сүүлийн пост --</span><span className="ml-auto flex gap-1"><span className="tz-pill is-on">7</span><span className="tz-pill">30</span><span className="tz-pill">90</span></span></div></div></div>
          <div className="mt-5 grid grid-cols-2 gap-2 @[700px]:grid-cols-3 @[1100px]:grid-cols-6">{["Пост", "Мэдээ", "Реакц", "Сэтгэгдэл", "Хуваалцсан", "Оноо"].map((f) => <Figure key={f} label={f} />)}</div>
          <div className="mt-6 grid gap-6 @[900px]:grid-cols-[1fr_280px]">
            <main className="flex flex-col gap-6">
              <section className="tz-card p-4"><div className="tz-label">Яаж дэлгэрсэн бэ</div><Lines n={1} w={["70%"]} className="mt-2" /><div className="mt-4"><Timeline items={[{ at: "--", title: "анх · мэдээ", body: "placeholder line", icon: "sheet", tone: "warm" }, { at: "--", title: "FB нэгдэв", body: "placeholder line", icon: "banner", tone: "brand" }, { at: "--", title: "оргил цаг", icon: "peak", tone: "ink" }]} /></div></section>
              <section className="tz-card p-4"><div className="tz-label">Хэн ярьж байна</div><ol className="mt-3 flex flex-col gap-2">{[80, 55, 40, 25].map((w, i) => <li key={i} className="flex items-center gap-3"><Lines n={1} w={["30%"]} className="w-1/3" /><span className="h-2 flex-1 rounded-full bg-muted"><span className="block h-2 rounded-full bg-brand/60" style={{ width: `${w}%` }} /></span></li>)}</ol></section>
              <section><div className="mb-2 flex items-center gap-2"><span className="tz-label">Постууд</span><span className="ml-auto flex gap-1"><span className="tz-pill is-on">Шинэ</span><span className="tz-pill">Их реакцтай</span></span></div><div className="grid gap-3"><PostCard /><PostCard picture={false} /></div></section>
              <section><div className="tz-label mb-2">Мэдээ</div><div className="grid gap-3"><PostCard news picture={false} /><PostCard news /></div></section>
            </main>
            <aside className="flex flex-col gap-4">
              <section className="tz-card p-4"><div className="tz-label">Ижил сэдвүүд</div><ul className="mt-2 flex flex-col">{TOPICS.slice(3, 7).map((t) => <li key={t} className="flex items-center gap-2 border-t border-hairline py-2 text-[13px] first:border-t-0"><Glyph name={t} size={20} animate="none" /><span className="truncate">{t}</span><Icon name="arrow-up-right" className="ml-auto h-3.5 w-3.5 opacity-50" /></li>)}</ul></section>
              <section className="tz-card p-4"><div className="tz-label">Хандлага</div><div className="mt-3 flex h-2 overflow-hidden rounded-full"><span className="w-1/2 bg-up" /><span className="w-1/3 bg-muted" /><span className="flex-1 bg-down" /></div></section>
              <section className="tz-card p-4"><div className="tz-label">Эх сурвалж</div><Lines n={4} w={["60%", "45%", "40%", "30%"]} className="mt-3" /></section>
            </aside>
          </div>
        </div>
        <MockFooter /><MockTabBar active={0} />
      </Frame>
    </Doc>
  );
}
