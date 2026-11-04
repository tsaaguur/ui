"use client";
import { useState } from "react";
import { Icon, Segmented, Avatar, Glyph, type IconName } from "@tsaaguur/ui";
import { TOPICS } from "./fixtures";
export { TOPICS };

/* Wireframe furniture for the Layouts section: the product's header and
   footer as chrome, grey blocks where data will be, and a frame that shows
   the same layout at desktop, tablet and phone width. Nothing here reads
   data; every figure is a placeholder. */
export function Frame({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  const [w, setW] = useState("desktop");
  const width = w === "phone" ? 390 : w === "tablet" ? 820 : undefined;
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="tz-display text-[20px] font-semibold">{title}</h2>{note ? <p className="mt-1 max-w-[80ch] text-[13.5px] text-muted-foreground">{note}</p> : null}</div>
        <Segmented value={w} onChange={setW} options={[{ value: "desktop", label: "Desktop", icon: "columns" }, { value: "tablet", label: "Tablet", icon: "board" }, { value: "phone", label: "Phone", icon: "phone" }]} />
      </div>
      <div className="mt-3 overflow-x-auto">
        <div className="tz-card mx-auto overflow-hidden" style={{ width: width ?? "100%", minWidth: width }}>
          <div className="flex items-center gap-1.5 border-b border-hairline px-3 py-2"><span className="h-2.5 w-2.5 rounded-full bg-hairline" /><span className="h-2.5 w-2.5 rounded-full bg-hairline" /><span className="h-2.5 w-2.5 rounded-full bg-hairline" /><span className="tz-num ml-2 text-[11px] text-muted-foreground">tsaaguur.mn · {width ? `${width} px` : "full width"}</span></div>
          <div className="@container">{children}</div>
        </div>
      </div>
    </section>
  );
}

export const TABS: { label: string; icon: IconName }[] = [{ label: "Трэнд", icon: "ger" }, { label: "Сүлжээ", icon: "grid" }, { label: "Сенсаци", icon: "flame" }, { label: "Парламент", icon: "dome" }];

export function MockHeader({ active = 0, signedIn = true }: { active?: number; signedIn?: boolean }) {
  return (
    <header className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
      <span className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-[7px] bg-foreground"><span className="h-2 w-2 rounded-full bg-background" /></span><span className="tz-display text-[15px] font-bold">Цаагуур</span></span>
      <nav className="mx-auto hidden items-center gap-1 rounded-full border border-hairline p-1 @[700px]:flex" aria-label="Product tabs">
        {TABS.map((t, i) => <span key={t.label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium ${i === active ? "bg-foreground text-background" : "text-muted-foreground"}`}><Icon name={t.icon} className="h-3.5 w-3.5" />{t.label}</span>)}
      </nav>
      <span className="ml-auto flex items-center gap-2">{signedIn ? <><span className="tz-pill">Зочин</span><span className="tz-pill">Гарах</span></> : <span className="tz-pill">Google-ээр нэвтрэх</span>}</span>
    </header>
  );
}

export function MockTabBar({ active = 0 }: { active?: number }) {
  return (
    <nav className="grid grid-cols-4 border-t border-hairline @[700px]:hidden" aria-label="Phone tabs">
      {TABS.map((t, i) => <span key={t.label} className={`flex flex-col items-center gap-1 py-2 text-[10.5px] ${i === active ? "text-foreground" : "text-muted-foreground"}`}><Icon name={t.icon} className="h-5 w-5" />{t.label}</span>)}
    </nav>
  );
}

export function MockFooter() {
  return <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline px-4 py-3 text-[11.5px] text-muted-foreground"><span>Цаагуур · Улаанбаатар</span><span className="flex gap-3"><span>Нууцлал</span><span>Нөхцөл</span></span></footer>;
}

/* grey blocks: lines of text, a picture, a figure */
export function Lines({ n = 3, w = ["100%", "92%", "60%"], className = "" }: { n?: number; w?: string[]; className?: string }) {
  return <div className={`flex flex-col gap-2 ${className}`}>{Array.from({ length: n }, (_, i) => <span key={i} className="block h-3 rounded-full bg-muted" style={{ width: w[i % w.length] }} />)}</div>;
}
export function Box({ ratio = "16/9", className = "", label }: { ratio?: string; className?: string; label?: string }) {
  return <div className={`tz-dots grid place-items-center rounded-[10px] bg-muted text-muted-foreground ${className}`} style={{ aspectRatio: ratio }}>{label ? <span className="tz-label">{label}</span> : <Icon name="image" className="h-5 w-5 opacity-50" />}</div>;
}
export function Figure({ label, w = "3ch" }: { label: string; w?: string }) {
  return <div className="rounded-[10px] border border-hairline p-3"><span className="tz-label">{label}</span><span className="mt-2 block h-7 rounded-[6px] bg-muted" style={{ width: w }} /></div>;
}
export function TopicRow({ n, name, bar = 60 }: { n: number; name: string; bar?: number }) {
  return <li className="flex items-center gap-3 py-2"><span className="tz-num w-6 text-[13px] text-muted-foreground">{String(n).padStart(2, "0")}</span><Glyph name={name} size={26} animate="none" /><span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-medium">{name}</span><span className="mt-1 block h-1.5 rounded-full bg-brand/70" style={{ width: `${bar}%` }} /></span></li>;
}
export function PostCard({ picture = true, news = false }: { picture?: boolean; news?: boolean }) {
  return (
    <article className="tz-card p-4">
      <div className="flex items-center gap-2"><Avatar name={news ? "М" : "Х"} size={28} /><span className="flex-1"><Lines n={1} w={["38%"]} /></span><span className="tz-label">{news ? "мэдээ" : "facebook"} · 2ц</span></div>
      <Lines n={3} className="mt-3" />
      {picture ? <Box className="mt-3" /> : null}
      <div className="mt-3 flex gap-3 text-[12px] text-muted-foreground"><span className="flex items-center gap-1"><Icon name="heart" className="h-3.5 w-3.5" />--</span><span className="flex items-center gap-1"><Icon name="message" className="h-3.5 w-3.5" />--</span><span className="flex items-center gap-1"><Icon name="share" className="h-3.5 w-3.5" />--</span></div>
    </article>
  );
}
