import { Doc, Stage } from "@/components/doc";
const COLORS: [string, string][] = [["background", "цаас"], ["foreground", "бэх"], ["card", "шил"], ["card-solid", "цайвар карт"], ["muted", "бүдэг дэвсгэр"], ["muted-foreground", "хоёрдугаар бичвэр"], ["border", "хүрээ"], ["hairline", "нарийн шугам"], ["brand", "брэнд цэнхэр"], ["brand-strong", "хүчтэй цэнхэр"], ["brand-soft", "зөөлөн цэнхэр"], ["up", "өсөлт"], ["down", "бууралт"], ["warm", "дулаан, мэдээ"]];
export const metadata = { title: "Өнгө, зай" };
export default function Page() {
  return (
    <Doc kicker="tokens.css" title="Өнгө, зай" lead="Хоёр дэвсгэр (саарал цаас, бараан бэх), нэг брэнд цэнхэр, өсөлт / бууралт / дулаан гэсэн гурван утгын өнгө. Бүгд CSS хувьсагч; Tailwind-ийн bg-brand, text-up гэх нэрс эндээс гарна.">
      <Stage title="Өнгө" code={':root { --brand: #3d8eff; --up: #1a9e5c; --down: #d9482b; --warm: #f5a623; ... }\n.dark { ... }   // бараан горим ижил нэрээр'}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLORS.map(([k, w]) => (
            <li key={k} className="flex items-center gap-3"><span className="h-10 w-10 shrink-0 rounded-[8px] border border-hairline" style={{ background: `var(--${k})` }} /><span className="min-w-0"><span className="tz-num block text-[12px]">--{k}</span><span className="tz-label block">{w}</span></span></li>
          ))}
        </ul>
      </Stage>
      <Stage title="Зай, булан" note="8 px үндсэн радиус, 12 px карт, 9999 пилл. Хүрээ бүгд 1 px hairline." code={'--radius: 8px;  .tz-card { border-radius: 12px }  .tz-pill { border-radius: 9999px }'}>
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => <div key={s} className="flex flex-col items-center gap-1"><div className="rounded-[4px] bg-brand" style={{ width: s, height: s }} /><span className="tz-num text-[11px] text-muted-foreground">{s}</span></div>)}
        </div>
      </Stage>
      <Stage title="Хөдөлгөөний муруй" note="Нэг л муруй: --ease. Үргэлжлэх хугацаа 0.16 (товч), 0.3 (карт), 0.7 (гарч ирэх), 0.9 (зураас зурагдах)." code={'--ease: cubic-bezier(0.2, 0.7, 0.2, 1);'}>
        <svg viewBox="0 0 200 120" className="h-[120px] w-[200px]"><path d="M10 110 C 50 110, 70 10, 190 10" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><path d="M10 110H190" stroke="var(--hairline)" /></svg>
      </Stage>
    </Doc>
  );
}
