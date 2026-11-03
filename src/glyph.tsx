/* A mark for every topic (2026-11-04). Not a hash and not a cartoon: the name
   is read for its SUBJECT and that subject is drawn, by hand, on the same 24
   grid as the icons. Sixteen pictograms; a name none fits gets its first
   letter as a monogram in the display face.

   Matching is on word starts in the shortest form every Mongolian case
   shares (төсв for төсөв / төсвийн, эмнэлг, цэрг, хуул, сургуул), never on
   a substring: "алт" (gold) sits inside "шалгалт" (inspection).

   Motion (`animate`): "draw" strokes the mark in once when it appears,
   "idle" adds the subject's own small loop (the flame flickers, the gusts
   drift, the heartbeat redraws, the bolt flashes, the medal swings, the coin
   flips, the globe turns), "none" is still. Reduced motion stops all of it. */

export type GlyphKind =
  | "money" | "weather" | "parliament" | "fire" | "health" | "energy" | "school" | "transport"
  | "court" | "vote" | "mining" | "sport" | "city" | "abroad" | "army" | "person" | "monogram";
export const GLYPH_KINDS: GlyphKind[] = ["money", "weather", "parliament", "fire", "health", "energy", "school", "transport", "court", "vote", "mining", "sport", "city", "abroad", "army", "person", "monogram"];

const RULES: [GlyphKind, string[]][] = [
  ["fire", ["түймэр", "түймр", "гал", "шатсан", "шатаж"]],
  ["weather", ["цас", "шуурга", "салхи", "бороо", "хүйтэн", "дулаан", "цаг агаар", "үер", "мөс", "хүйт", "аадар", "ган"]],
  ["health", ["эмнэлэг", "эмнэлг", "эмч", "өвчин", "өвчн", "халдвар", "вирус", "томуу", "эрүүл", "вакцин", "тахал", "тарваган", "эм "]],
  ["energy", ["шатахуун", "цахилгаан", "эрчим", "бензин", "дулааны", "станц", "нүүрс", "хий ", "хийн", "дизель", "ус хангамж", "усан хангамж"]],
  ["mining", ["уурхай", "оюу толгой", "оюутолгой", "алт", "алтны", "зэс", "тавантолгой", "эрдэс", "ашигт малтмал", "олборлол"]],
  ["money", ["төсөв", "төсв", "төгрөг", "тэтгэвэр", "тэтгэвр", "тэтгэмж", "цалин", "ашиг", "хувьцаа", "зээл", "татвар", "үнэ", "үнийн", "банк", "ногдол", "мөнгө", "хандив", "инфляц", "ханш", "өр "]],
  ["court", ["цагдаа", "шүүх", "шүүгч", "хэрэг", "ял", "хорих", "залилан", "авлига", "прокурор", "гэмт", "баривчл", "мөрдөн", "хууль бус", "сонсгол", "хулгай", "хүчирхийлэл"]],
  ["vote", ["сонгууль", "сонгуул", "санал хураалт", "нам", "намын", "бүлэг", "ардчилсан", "ман ", "хүннү", "эвсэл"]],
  ["parliament", ["уих", "парламент", "хууль", "хуул", "тогтоол", "чуулган", "засгийн газар", "сайд", "яам", "ерөнхий сайд", "дарга", "гишүүн", "гишүүд", "ерөнхийлөгч"]],
  ["transport", ["автобус", "тээвэр", "тээвр", "метро", "нисэх", "зам", "замын", "галт тэрэг", "төмөр зам", "машин", "онгоц", "жолооч", "түгжрэл"]],
  ["school", ["сургууль", "сургуул", "боловсрол", "оюутан", "оюутн", "багш", "хичээл", "их сургууль", "сурагч", "цэцэрлэг"]],
  ["sport", ["спорт", "медаль", "аварга", "бөх", "олимп", "наадам", "тэмцээн", "лиг", "хөлбөмбөг", "сагсан", "волейбол", "жүдо", "шигшээ", "марафон"]],
  ["army", ["цэрэг", "цэрг", "зэвсэгт", "батлан", "дайн", "хилийн", "армий", "дрон"]],
  ["abroad", ["айлчлал", "айлчл", "гадаад", "япон", "орос", "хятад", "солонгос", "америк", "ану", "европ", "нүб", "элчин", "дэлхий", "беларусь", "казах", "украин", "вьетнам", "энэтхэг"]],
  ["city", ["улаанбаатар", "хот", "хотын", "дүүрэг", "дүүрг", "аймаг", "аймг", "сум", "сумын", "хороо", "нийслэл", "барилга", "орон сууц", "хотхон", "гэр хороолол"]],
];
const PERSON = /^[а-яөүё]\.\s?[а-яөүё-]+$/i;

export function glyphKind(name: string): GlyphKind {
  const n = ` ${name.toLowerCase().trim()} `;
  if (PERSON.test(name.trim())) return "person";
  for (const [kind, stems] of RULES) if (stems.some((s) => n.includes(" " + s))) return kind;
  return "monogram";
}

type Mode = "draw" | "idle" | "none";
const d = (i: number, mode: Mode) => (mode === "draw" ? `tz-draw${i ? ` tz-draw-${Math.min(3, i + 1)}` : ""}` : "");
const idle = (cls: string, mode: Mode) => (mode === "idle" ? cls : "");

/** The drawing of each subject; `m` is the motion mode. pathLength=1 makes the draw-in uniform. */
function art(kind: Exclude<GlyphKind, "monogram">, m: Mode): React.ReactNode {
  const L = { pathLength: 1 } as const;
  switch (kind) {
    case "money":   // a coin with the tugrik strike; idle: it flips
      return <g className={idle("tz-g-flip", m)}><circle cx="12" cy="12" r="8" className={d(0, m)} {...L} /><path d="M9.2 9.4h5.6M9.2 12.4h5.6M12 7.4v9.6" className={d(1, m)} {...L} /></g>;
    case "weather": // a cloud and two gusts; idle: the gusts drift
      return <><path d="M7.4 14.6a3.3 3.3 0 0 1 .4-6.6 4.8 4.8 0 0 1 9.2 1.2 2.7 2.7 0 0 1-.4 5.4z" className={d(0, m)} {...L} /><path d="M5 18h8.6" className={`${d(1, m)} ${idle("tz-g-drift", m)}`} {...L} /><path d="M9.4 20.8h6.2" className={`${d(2, m)} ${idle("tz-g-drift tz-g-drift-2", m)}`} {...L} /></>;
    case "parliament": // the dome; idle: the flagpole tip blinks
      return <><path d="M7.2 11.2c0-3.1 2.1-5.3 4.8-5.3s4.8 2.2 4.8 5.3" className={d(0, m)} {...L} /><path d="M12 5.9V4.1" className={`${d(1, m)} ${idle("tz-g-blink", m)}`} {...L} /><path d="M6 11.2h12M7.4 11.2v5.2M12 11.2v5.2M16.6 11.2v5.2" className={d(1, m)} {...L} /><path d="M4.6 16.4h14.8M3.4 19.6h17.2" className={d(2, m)} {...L} /></>;
    case "fire":    // idle: the inner lick flickers
      return <><path d="M12 20.2c-3.4 0-5.6-2.3-5.6-5.4 0-2.6 1.6-4.3 2.7-6.2.5 1.1 1.1 1.8 1.9 2.2.2-2.9 1.3-5.3 3.1-7 .1 3 2.1 4.4 3.1 6.5.8 1.7.9 3.3.2 4.9-1 2.2-3 5-5.4 5z" className={d(0, m)} {...L} /><path d="M12 20.2c-1.5 0-2.4-1-2.4-2.4 0-1.3.9-2.1 1.6-3.2.6.9 1.2 1.3 1.7 1.5.4 1.6-.1 4.1-.9 4.1z" className={`${d(1, m)} ${idle("tz-g-flicker", m)}`} {...L} /></>;
    case "health":  // a heartbeat; idle: the trace redraws
      return <><circle cx="12" cy="12" r="8.4" className={d(0, m)} {...L} /><path d="M5.2 12.4h3.2l1.6-3.6 2.4 6.8 1.8-4.6 1 1.4h3.6" className={m === "idle" ? "tz-g-redraw" : d(1, m)} {...L} /></>;
    case "energy":  // a bolt; idle: it flashes
      return <path d="M13.2 3.4 6 13.6h5.2L10.8 20.6 18 10.4h-5.2z" className={`${d(0, m)} ${idle("tz-g-flash", m)}`} {...L} />;
    case "school":  // an open book; idle: it bobs
      return <g className={idle("tz-g-bob", m)}><path d="M4 6.6c3-1.3 5.5-1.1 8 .8 2.5-1.9 5-2.1 8-.8v11.8c-3-1.3-5.5-1.1-8 .8-2.5-1.9-5-2.1-8-.8z" className={d(0, m)} {...L} /><path d="M12 7.4v11.8" className={d(1, m)} {...L} /></g>;
    case "transport": // a bus; idle: it rocks on the road
      return <g className={idle("tz-g-wind", m)}><rect x="5" y="4.6" width="14" height="13.6" rx="2.6" className={d(0, m)} {...L} /><path d="M5 12.2h14M8.2 7.6h7.6" className={d(1, m)} {...L} /><circle cx="8.6" cy="15.4" r="1" className={d(2, m)} {...L} /><circle cx="15.4" cy="15.4" r="1" className={d(2, m)} {...L} /><path d="M7 18.2v2M17 18.2v2" className={d(2, m)} {...L} /></g>;
    case "court":   // the scales; idle: they tip
      return <g className={idle("tz-g-tip", m)}><path d="M12 4v16M9.2 20h5.6" className={d(0, m)} {...L} /><path d="M5.2 7.6h13.6" className={d(1, m)} {...L} /><path d="M6.4 7.6 3.8 13.6a2.8 2.8 0 0 0 5.2 0z" className={d(2, m)} {...L} /><path d="M17.6 7.6 15 13.6a2.8 2.8 0 0 0 5.2 0z" className={d(2, m)} {...L} /></g>;
    case "vote":    // a ballot into its box; idle: the ballot drops in
      return <><path d="M4.6 11.4h14.8v8.2H4.6z" className={d(0, m)} {...L} /><path d="M8.6 11.4h6.8" className={d(1, m)} {...L} /><g className={idle("tz-g-drop", m)}><path d="M9.2 4.2h5.6v7.2" className={d(1, m)} {...L} /><path d="M10.6 7.2l1.2 1.2 2.2-2.4" className={d(2, m)} {...L} /></g></>;
    case "mining":  // a pick over the mound; idle: the pick swings
      return <><path d="M3.8 19.4 9 11.8l3.6 4.6 7.6 3z" className={d(0, m)} {...L} /><g className={idle("tz-g-tip", m)}><path d="M14.2 5.2l4.6 4.6" className={d(1, m)} {...L} /><path d="M11.8 7.6c2.2-2 4.6-2.4 7-1.2-1.2 2.4-1.6 4.8-1.2 7" className={d(2, m)} {...L} /></g></>;
    case "sport":   // a medal on its ribbon; idle: it swings
      return <g className={idle("tz-g-swing", m)}><path d="M9.2 10.2 7 3.8h3.4L12 7.6l1.6-3.8H17l-2.2 6.4" className={d(0, m)} {...L} /><circle cx="12" cy="14.4" r="5" className={d(1, m)} {...L} /><path d="M12 12.2v4.4M10 14.4h4" className={d(2, m)} {...L} /></g>;
    case "city":    // three roofs; idle: a window blinks
      return <><path d="M3.6 20V9.8h5.2V20M8.8 20V5.4h6.4V20M15.2 20v-8h5.2v8M2.6 20h18.8" className={d(0, m)} {...L} /><path d="M11 8.4h2M11 14.4h2M5.4 13h1.6M5.4 16.2h1.6M17 15h1.6M17 17.6h1.6" className={d(1, m)} {...L} /><path d="M11 11.4h2" className={`${d(2, m)} ${idle("tz-g-blink", m)}`} {...L} /></>;
    case "abroad":  // a globe; idle: it turns
      return <><circle cx="12" cy="12" r="8.2" className={d(0, m)} {...L} /><g className={idle("tz-g-spin", m)}><ellipse cx="12" cy="12" rx="3.4" ry="8.2" className={d(1, m)} {...L} /></g><path d="M4 12h16M5.4 8.2h13.2M5.4 15.8h13.2" className={d(2, m)} {...L} /></>;
    case "army":    // a shield; idle: the cross breathes
      return <><path d="M12 3.4l7.2 2.8v5.6c0 4.4-3 7.6-7.2 9.2-4.2-1.6-7.2-4.8-7.2-9.2V6.2z" className={d(0, m)} {...L} /><path d="M12 7.4v9.2M8.2 11.2h7.6" className={`${d(1, m)} ${idle("tz-g-blink", m)}`} {...L} /></>;
    case "person":  // idle: a nod
      return <g className={idle("tz-g-bob", m)}><circle cx="12" cy="8.2" r="3.4" className={d(0, m)} {...L} /><path d="M5.4 19.4c.6-3.8 3.1-5.8 6.6-5.8s6 2 6.6 5.8" className={d(1, m)} {...L} /></g>;
  }
}

const TINT: Record<GlyphKind, string> = {
  money: "text-warm", weather: "text-brand", parliament: "text-foreground", fire: "text-down", health: "text-up",
  energy: "text-warm", school: "text-brand", transport: "text-foreground", court: "text-foreground", vote: "text-brand",
  mining: "text-warm", sport: "text-up", city: "text-foreground", abroad: "text-brand", army: "text-foreground",
  person: "text-foreground", monogram: "text-foreground",
};

export function Glyph({ name, kind: forced, size = 28, animate = "draw", className = "" }: { name: string; kind?: GlyphKind; size?: number; animate?: Mode; className?: string }) {
  const kind = forced ?? glyphKind(name);
  const box = `shrink-0 rounded-[7px] bg-muted ${TINT[kind]} ${className}`;
  if (kind === "monogram") {
    const letter = (name.trim().charAt(0) || "·").toUpperCase();
    return <span className={`${box} tz-display inline-grid place-items-center font-bold`} style={{ width: size, height: size, fontSize: size * 0.56 }} aria-hidden>{letter}</span>;
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ padding: Math.round(size * 0.15) }} className={box} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {art(kind, animate)}
    </svg>
  );
}
