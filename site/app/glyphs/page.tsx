"use client";
import { useState } from "react";
import { Glyph, glyphKind, GLYPH_KINDS, Pill, type GlyphKind } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

const WORDS: Record<GlyphKind, string> = { money: "төсөв, төгрөг, тэтгэвэр, цалин, үнэ, банк, зээл, татвар", weather: "цас, шуурга, салхи, бороо, хүйтэн, дулаан, үер", parliament: "УИХ, хууль, тогтоол, чуулган, засгийн газар, сайд, яам, дарга", fire: "түймэр, гал, шатсан", health: "эмнэлэг, эмч, өвчин, халдвар, вирус, томуу, вакцин", energy: "шатахуун, цахилгаан, эрчим, бензин, станц, нүүрс", school: "сургууль, боловсрол, оюутан, багш, хичээл", transport: "автобус, тээвэр, метро, зам, машин, онгоц, түгжрэл", court: "цагдаа, шүүх, хэрэг, ял, залилан, авлига, прокурор", vote: "сонгууль, нам, бүлэг, ардчилсан, МАН, эвсэл", mining: "уурхай, оюу толгой, алт, зэс, тавантолгой", sport: "спорт, медаль, аварга, бөх, олимп, наадам, лиг", city: "Улаанбаатар, хот, дүүрэг, аймаг, сум, хороо, барилга", abroad: "айлчлал, гадаад, Япон, Орос, Хятад, НҮБ, дэлхий", army: "цэрэг, зэвсэгт, батлан, хилийн", person: "н.учрал (эхний үсэг, цэг, нэр)", monogram: "таарахгүй бол эхний үсэг" };
const SAMPLES = ["суурь тэтгэвэр олгох", "цасан шуурга сэрэмжлүүлэг", "2026 оны төсвийн тодотгол", "нөмрөгийн дархан цаазат түймэр", "цэргийн эмнэлгийн 105 жил", "шатахууны хомсдол", "оюу толгойн ногдол ашиг", "ногоон автобус шалгалт", "хэрэг буцаалтын сонсгол", "ардчилсан нам хагарал", "у.хүрэлсүх беларусь айлчлал", "волейболын дээд лиг", "улаанбаатар хотын 387 жил", "н.учрал", "10 саяын бичлэг", "нийгэмшихүйн хичээл"];

export default function Page() {
  const [mode, setMode] = useState<"draw" | "idle" | "none">("idle");
  const [size, setSize] = useState(48);
  const [q, setQ] = useState("шатахууны үнэ өсөлт");
  return (
    <Doc kicker="glyph.tsx · 16 + монограм" title="Сэдвийн тэмдэг" lead="Emoji-гийн оронд: сэдвийн нэрээс сэдвийг нь уншаад тэр сэдвийг зурна. Зоос, үүл, бөмбөгөр, дөл, зүрхний цохилт, аянга, ном, автобус, дэнс, саналын хайрцаг, хүрз, медаль, гурван дээвэр, бөмбөрцөг, бамбай, хүн. Хайх үг нь үгийн эхлэлээр таарна (төсв = төсөв, төсвийн; алт нь шалгалт дотроос олдохгүй). Таарахгүй бол эхний үсэг.">
      <Stage title="Бүх тэмдэг, хөдөлгөөнтэй" note="draw: гарч ирэхдээ нэг удаа зурагдана. idle: сэдэв бүр өөрийнхөөрөө хөдөлнө (дөл анивчина, салхи хийснэ, зүрх дахин зурагдана, аянга гялсхийнэ, медаль найгана, зоос эргэнэ, бөмбөрцөг эргэлдэнэ). none: зогсоно." code={`<Glyph name="цасан шуурга" size={${size}} animate="${mode}" />`}>
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
      <Stage title="Нэрээр нь үзэх" note="Ямар ч сэдвийн нэр бичээд аль тэмдэг гарахыг үз." code={`glyphKind("${q}") === "${glyphKind(q)}"`}>
        <div className="flex items-center gap-4"><input value={q} onChange={(e) => setQ(e.target.value)} className="tz-num w-full max-w-[420px] rounded-[10px] border border-hairline bg-card px-3 py-2 text-[14px] outline-none focus:border-brand" aria-label="Сэдвийн нэр" /><Glyph name={q} size={48} animate="idle" /><span className="tz-num text-[12px] text-muted-foreground">{glyphKind(q)}</span></div>
      </Stage>
      <Stage title="Жинхэнэ нэрс" note="Энэ долоо хоногийн сэдвүүд, уншсан байдлаар.">
        <ul className="grid gap-2 sm:grid-cols-2">
          {SAMPLES.map((s) => <li key={s} className="flex items-center gap-3 rounded-[10px] border border-hairline p-3"><Glyph name={s} size={36} animate="idle" /><span className="min-w-0"><span className="block truncate text-[14px] font-medium">{s}</span><span className="tz-num text-[11px] text-muted-foreground">{glyphKind(s)}</span></span></li>)}
        </ul>
      </Stage>
      <Stage title="Props">
        <Props rows={[["name", "string", "сэдвийн нэр; сэдвийг эндээс уншина"], ["kind", "GlyphKind", "уншихгүй, шууд энэ тэмдгийг зурна"], ["size", "number", "px, 28 анхдагч"], ["animate", '"draw" | "idle" | "none"', "нэг удаа зурагдах, байнга хөдлөх, зогсох"], ["className", "string", "нэмэлт"]]} />
      </Stage>
    </Doc>
  );
}
