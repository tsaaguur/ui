"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { StoryBoard, StoryFrame, StorySrc } from "./types";
import { fmtInt } from "./format";
import { Icon, type IconName } from "./icons";
import { DrawnBars, LiveDot, Sprockets, Stamp, StateMark } from "./marks";

/* The story board as a storyboard sheet (2026-11-04, owner: draw everything
   ourselves). A film-strip rail of sprocket holes above and below the strip,
   each moment a panel with a thin double line and a stamped corner number,
   the side drawn as its own mark (a spool for Threads, a person, a banner for
   a page, a folded sheet for the press). The strip snaps left to right on a
   desk, swipes on a phone; the arrow keys and the two round buttons move one
   panel. Nothing lifts, nothing bounces; the state arrow draws itself once. */

const SIDE: Record<StorySrc, { word: string; icon: IconName; dot: string }> = {
  threads: { word: "Threads", icon: "spool", dot: "bg-foreground" },
  fb_individual: { word: "Facebook · хүн", icon: "person", dot: "bg-brand" },
  fb_publisher: { word: "Facebook · хуудас", icon: "banner", dot: "bg-brand-strong" },
  news: { word: "Мэдээ", icon: "sheet", dot: "bg-warm" },
};
const KIND: Record<string, string> = {
  first: "Анх хэлсэн", joined: "Нэгдэв", loudest: "Хамгийн их хариу үйлдэл", picture: "Зураг",
  peak: "Оргил цаг", replies: "Хариултууд", now: "Одоо",
};

function when(at: string | null | undefined) {
  if (!at) return "";
  const iso = at.includes("T") ? at : at.replace(" ", "T");
  const [d, t] = iso.split("T");
  const [y, m, day] = d.split("-");
  return `${y}.${m}.${day} ${(t || "").slice(0, 5)}`;
}
/** The words only: links out of the quote (an outlet's post often ends with its own URL). */
function words(text: string, max: number): string {
  const t = text.replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + "…" : t;
}

function Head({ kind, src }: { kind: string; src?: StorySrc }) {
  return (
    <div className="flex items-center gap-2 pl-[72px] pr-1 pt-1">
      {src ? <Icon name={SIDE[src].icon} className="h-[18px] w-[18px] shrink-0 text-foreground/80" /> : <Icon name={kind === "peak" ? "peak" : kind === "replies" ? "reply" : "pulse"} className="h-[18px] w-[18px] shrink-0 text-foreground/80" />}
      <span className="tz-label truncate">{KIND[kind]}{src ? <span className="opacity-70"> · {SIDE[src].word}</span> : null}</span>
    </div>
  );
}

function Frame({ f, total }: { f: StoryFrame; total: number }) {
  if (f.kind === "peak") {
    const vals = f.series.map((b) => (["threads", "fb_individual", "fb_publisher", "news"] as StorySrc[]).reduce((a, k) => a + (Number(b[k]) || 0), 0));
    const peakI = vals.indexOf(Math.max(...vals));
    return (
      <article className="tz-panel flex h-full flex-col p-5">
        <Stamp n={f.n} total={total} /><Head kind="peak" />
        <div className="mt-5 flex items-baseline gap-2"><span className="tz-display text-[40px] font-semibold leading-none">{when(f.hour).slice(11)}</span><span className="tz-num text-[12px] text-muted-foreground">{when(f.hour).slice(0, 10)}</span></div>
        <p className="mt-2 text-[14px] text-muted-foreground">Энэ цагт хамгийн олон удаа дурдагдсан: {f.mentions}.</p>
        <div className="mt-4 text-foreground"><DrawnBars values={vals} peak={peakI} /></div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">{(Object.keys(f.sides) as StorySrc[]).filter((k) => f.sides[k]).map((k) => <span key={k} className="tz-num flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><Icon name={SIDE[k].icon} className="h-3.5 w-3.5" />{SIDE[k].word} {f.sides[k]}</span>)}</div>
      </article>
    );
  }
  if (f.kind === "replies") {
    return (
      <article className="tz-panel flex h-full flex-col p-5">
        <Stamp n={f.n} total={total} /><Head kind="replies" src="threads" />
        <p className="mt-4 text-[13px] text-muted-foreground"><span className="font-medium text-foreground">{f.post.who}</span> · {when(f.post.at)}</p>
        <p className="mt-1 line-clamp-3 text-[14px] leading-snug">{words(f.post.text, 300)}</p>
        <ol className="mt-4 flex flex-col gap-3 border-t border-hairline pt-4">
          {f.replies.map((r, i) => (
            <li key={i} className="flex gap-3">
              <Icon name="reply" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0"><span className="block text-[12.5px] font-medium">{r.who}</span><span className="block text-[14px] leading-snug">{words(r.text, 220)}</span><span className="tz-num block text-[11px] text-muted-foreground">{fmtInt(r.likes)} лайк · {when(r.at)}</span></span>
            </li>
          ))}
        </ol>
        {f.post.url ? <a href={f.post.url} target="_blank" rel="noopener noreferrer" className="tz-pill mt-auto self-start">Threads дээр <Icon name="out" className="h-3.5 w-3.5" /></a> : null}
      </article>
    );
  }
  if (f.kind === "now") {
    const word = f.state === "rising" ? "өсч байна" : f.state === "falling" ? "намжиж байна" : "тогтвортой";
    return (
      <article className="tz-panel flex h-full flex-col p-5">
        <Stamp n={f.n} total={total} /><Head kind="now" />
        <div className="mt-5 flex items-center gap-4"><StateMark state={f.state} className="h-10 w-14" /><p className="tz-display text-[30px] font-semibold leading-tight">{word}</p></div>
        <p className="mt-3 flex items-center gap-2 text-[14px] text-muted-foreground">{f.at ? <><LiveDot />Сүүлийн дурдлага {when(f.at)}</> : "Сүүлийн хоёр өдөрт дурдлага алга."}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">{Array.from(new Set(f.sides)).map((s) => <span key={s} className="tz-pill"><Icon name={SIDE[s].icon} className="h-3.5 w-3.5" />{SIDE[s].word}</span>)}</div>
      </article>
    );
  }
  const big = f.kind === "first";
  return (
    <article className="tz-panel flex h-full flex-col overflow-hidden">
      <Stamp n={f.n} total={total} />
      {f.image && !big ? <span className="mx-[6px] mt-[6px] block aspect-[16/10] overflow-hidden rounded-[7px] bg-muted"><img src={f.image} alt="" className="h-full w-full object-cover" loading="lazy" /></span> : null}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
        {f.image && !big ? <div className="flex items-center gap-2"><Icon name={SIDE[f.src].icon} className="h-[18px] w-[18px] shrink-0 text-foreground/80" /><span className="tz-label truncate">{KIND[f.kind]} · {SIDE[f.src].word}</span></div> : <Head kind={f.kind} src={f.src} />}
        <p className="mt-3 text-[13px] text-muted-foreground"><span className="font-medium text-foreground">{f.who || "нэргүй"}</span> · {when(f.at)}</p>
        <div className="mt-2 flex gap-2">{big ? <Icon name="quote" className="mt-1 h-5 w-5 shrink-0 text-brand" /> : null}<p className={`tz-display font-semibold leading-[1.15] ${big ? "text-[22px] sm:text-[26px]" : "text-[17px] sm:text-[19px]"}`}>{words(f.text, big ? 200 : 240)}</p></div>
        {f.image && big ? <span className="mt-4 block aspect-[16/10] w-full overflow-hidden rounded-[7px] bg-muted"><img src={f.image} alt="" className="h-full w-full object-cover" loading="lazy" /></span> : null}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="tz-num text-[11.5px] text-muted-foreground">{f.reactions ? `${fmtInt(f.reactions)} хариу үйлдэл` : ""}</span>
          {f.url ? <a href={f.url} target="_blank" rel="noopener noreferrer" className="tz-pill">Эх сурвалж <Icon name="out" className="h-3.5 w-3.5" /></a> : null}
        </div>
      </div>
    </article>
  );
}

export function Board({ b, compact = false }: { b: StoryBoard; compact?: boolean }) {
  const strip = useRef<HTMLOListElement | null>(null);
  const [i, setI] = useState(0);
  // the compact board (the /stories list): how it started, the one with a
  // picture or the loudest, and the last side to join; three panels, in time order
  const pick = (): StoryFrame[] => {
    const fs = b.frames.filter((f) => f.kind !== "now" && f.kind !== "peak");
    if (fs.length <= 3) return fs;
    const first = fs[0];
    const mid = fs.find((f) => f !== first && "image" in f && f.image) ?? fs.find((f) => f.kind === "loudest") ?? fs[1];
    const last = [...fs].reverse().find((f) => f !== first && f !== mid) ?? fs[2];
    return [first, mid, last].sort((a, c) => a.n - c.n);
  };
  const frames = compact ? pick() : b.frames;
  const n = frames.length;
  const go = (k: number) => {
    const el = strip.current; if (!el) return;
    const next = Math.max(0, Math.min(n - 1, k)); setI(next);
    (el.children[next] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };
  useEffect(() => {
    if (compact) return;
    const f = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); };
    window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f);
  });
  useEffect(() => {
    const el = strip.current; if (!el || compact) return;
    const f = () => { const w = (el.children[0] as HTMLElement | undefined)?.offsetWidth || 1; setI(Math.round(el.scrollLeft / (w + 12))); };
    el.addEventListener("scroll", f, { passive: true }); return () => el.removeEventListener("scroll", f);
  }, [compact]);
  return (
    <div>
      {!compact ? <Sprockets className="mb-2" /> : null}
      <ol ref={strip} className={compact ? "grid grid-cols-1 gap-3 sm:grid-cols-3" : "tz-strip flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"} aria-label={`${b.tag.name}: ${n} хүрээ`}>
        {frames.map((f, k) => (
          <li key={f.n} className={`${compact ? "min-w-0" : "w-[86vw] shrink-0 snap-start sm:w-[420px]"} tz-rise ${k ? `tz-rise-${Math.min(4, k + 1)}` : ""}`}>
            <Frame f={f} total={compact ? b.frames.length : n} />
          </li>
        ))}
      </ol>
      {!compact ? <Sprockets className="mt-2" /> : null}
      {!compact ? (
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => go(i - 1)} aria-label="Өмнөх хүрээ" className="tz-hit grid h-9 w-9 place-items-center rounded-full border border-hairline hover:bg-muted"><Icon name="chevron-left" className="h-4 w-4" /></button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Дараах хүрээ" className="tz-hit grid h-9 w-9 place-items-center rounded-full border border-hairline hover:bg-muted"><Icon name="chevron-right" className="h-4 w-4" /></button>
          <ol className="flex items-center gap-1.5" aria-hidden>
            {frames.map((f, k) => <li key={f.n}><button type="button" onClick={() => go(k)} className={`block h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"}`} /></li>)}
          </ol>
          <span className="tz-num ml-auto text-[12px] text-muted-foreground">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · сумаар гүйлгэнэ</span>
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between">
          <span className="tz-num text-[12px] text-muted-foreground">{b.frames.length} хүрээ · {when(b.frames[0]?.at)}</span>
          <Link href={`/story/${b.tag.key}`} className="tz-pill">Бүх хүрээ <Icon name="arrow-up-right" className="h-3.5 w-3.5" /></Link>
        </div>
      )}
    </div>
  );
}
