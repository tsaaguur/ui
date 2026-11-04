"use client";
import { useState } from "react";
import { Glyph, glyphKind, GLYPH_KINDS, Pill, type GlyphKind } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const WORDS: Record<GlyphKind, string> = { money: "budget, tugrik, pension, salary, price, bank, loan, tax", weather: "snow, storm, wind, rain, cold, warm, flood", parliament: "parliament, law, resolution, session, government, minister, ministry", fire: "wildfire, fire, burnt", health: "hospital, doctor, disease, infection, virus, flu, vaccine", energy: "fuel, electricity, energy, petrol, plant, coal", school: "school, education, student, teacher, lesson", transport: "bus, transport, metro, road, car, plane, traffic", court: "police, court, case, sentence, fraud, corruption, prosecutor", vote: "election, party, caucus, democratic, coalition", mining: "mine, Oyu Tolgoi, gold, copper, Tavan Tolgoi", sport: "sport, medal, champion, wrestling, olympics, naadam, league", city: "Ulaanbaatar, city, district, province, soum, khoroo, building", abroad: "visit, foreign, Japan, Russia, China, UN, world", army: "army, armed, defence, border", person: "n.uchral (initial, dot, name)", monogram: "first letter when nothing matches" };
const SAMPLES = ["суурь тэтгэвэр олгох", "цасан шуурга сэрэмжлүүлэг", "2026 оны төсвийн тодотгол", "нөмрөгийн дархан цаазат түймэр", "цэргийн эмнэлгийн 105 жил", "шатахууны хомсдол", "оюу толгойн ногдол ашиг", "ногоон автобус шалгалт", "хэрэг буцаалтын сонсгол", "ардчилсан нам хагарал", "у.хүрэлсүх беларусь айлчлал", "волейболын дээд лиг", "улаанбаатар хотын 387 жил", "н.учрал", "10 саяын бичлэг", "нийгэмшихүйн хичээл"];

export default function Page() {
  const [mode, setMode] = useState<"draw" | "idle" | "none">("idle");
  const [size, setSize] = useState(48);
  const [q, setQ] = useState("шатахууны үнэ өсөлт");
  return (
    <Doc kicker="glyph.tsx · 16 + monogram" title="Pictograms" lead="Instead of emoji: the topic name (Mongolian) is read for its subject and that subject is drawn. Coin, cloud, dome, flame, heartbeat, lightning, book, bus, scales, ballot box, shovel, medal, roofs, globe, shield, person. Words match by stem at word start; no match gives the first letter." imports={["Glyph", "glyphKind", "GLYPH_KINDS", "type GlyphKind"]}>
      <Stage title="All pictograms, animated" note="draw: draws itself once on enter. idle: each subject moves its own way (flame flickers, wind drifts, heart redraws, lightning flashes, medal swings, coin flips, globe spins). none: still." code={`<Glyph name="цасан шуурга" size={${size}} animate="${mode}" />`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {(["draw", "idle", "none"] as const).map((m) => <Pill key={m} on={mode === m} onClick={() => setMode(m)}>{m}</Pill>)}
          {[28, 48, 80].map((s) => <Pill key={s} on={size === s} onClick={() => setSize(s)}>{s}px</Pill>)}
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {GLYPH_KINDS.map((k) => (
            <li key={k + mode + size} className="flex flex-col gap-2 rounded-[10px] border border-hairline p-4"><Glyph name={k === "monogram" ? "Яриа" : k === "person" ? "б.бат" : "x"} kind={k} size={size} animate={mode} /><span className="tz-num text-[12px]">{k}</span><span className="text-[12px] leading-snug text-muted-foreground">{WORDS[k]}</span></li>
          ))}
        </ul>
      </Stage>
      <Stage title="Try a name" note="Type any Mongolian topic name and see which pictogram it gets." code={`glyphKind("${q}") === "${glyphKind(q)}"`}>
        <div className="flex items-center gap-4"><input value={q} onChange={(e) => setQ(e.target.value)} className="tz-num w-full max-w-[420px] rounded-[10px] border border-hairline bg-card px-3 py-2 text-[14px] outline-none focus:border-brand" aria-label="Topic name" /><Glyph name={q} size={48} animate="idle" /><span className="tz-num text-[12px] text-muted-foreground">{glyphKind(q)}</span></div>
      </Stage>
      <Stage title="Real names" note="This week's topics, as read.">
        <ul className="grid gap-2 sm:grid-cols-2">
          {SAMPLES.map((s) => <li key={s} className="flex items-center gap-3 rounded-[10px] border border-hairline p-3"><Glyph name={s} size={36} animate="idle" /><span className="min-w-0"><span className="block truncate text-[14px] font-medium">{s}</span><span className="tz-num text-[11px] text-muted-foreground">{glyphKind(s)}</span></span></li>)}
        </ul>
      </Stage>
      <Stage title="Props">
        <Props rows={[["name", "string", "topic name; the subject is read from it"], ["kind", "GlyphKind", "skip the reading, draw this subject"], ["size", "number", "px, 28 by default"], ["animate", '"draw" | "idle" | "none"', "draw once, keep moving, or still"], ["className", "string", "extra classes"]]} />
      </Stage>
    </Doc>
  );
}
