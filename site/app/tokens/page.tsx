import { Doc, Stage } from "@/components/doc";
const COLORS: [string, string][] = [["background", "paper"], ["foreground", "ink"], ["card", "glass"], ["card-solid", "solid card"], ["muted", "muted surface"], ["muted-foreground", "secondary text"], ["border", "border"], ["hairline", "hairline"], ["brand", "brand blue"], ["brand-strong", "strong blue"], ["brand-soft", "soft blue"], ["up", "rising"], ["down", "falling"], ["warm", "warm, news"]];
export const metadata = { title: "Tokens" };
export default function Page() {
  return (
    <Doc kicker="tokens.css" title="Tokens" lead="Two surfaces (grey paper, near-black ink), one brand blue, three meaning colors (up, down, warm). All CSS variables; the Tailwind names bg-brand, text-up and so on come from them.">
      <Stage title="Colors" code={':root { --brand: #3d8eff; --up: #1a9e5c; --down: #d9482b; --warm: #f5a623; ... }\n.dark { ... }   /* same names, dark values */'}>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {COLORS.map(([k, w]) => (
            <li key={k} className="flex items-center gap-3"><span className="h-10 w-10 shrink-0 rounded-[8px] border border-hairline" style={{ background: `var(--${k})` }} /><span className="min-w-0"><span className="tz-num block text-[12px]">--{k}</span><span className="tz-label block">{w}</span></span></li>
          ))}
        </ul>
      </Stage>
      <Stage title="Spacing, radius" note="8 px base radius, 12 px cards, 9999 pills. Every border is a 1 px hairline." code={'--radius: 8px;  .tz-card { border-radius: 12px }  .tz-pill { border-radius: 9999px }'}>
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48].map((s) => <div key={s} className="flex flex-col items-center gap-1"><div className="rounded-[4px] bg-brand" style={{ width: s, height: s }} /><span className="tz-num text-[11px] text-muted-foreground">{s}</span></div>)}
        </div>
      </Stage>
      <Stage title="Easing" note="One curve: --ease. Durations 0.16 s (buttons), 0.3 s (cards), 0.7 s (enter), 0.9 s (draw)." code={'--ease: cubic-bezier(0.2, 0.7, 0.2, 1);'}>
        <svg viewBox="0 0 200 120" className="h-[120px] w-[200px]"><path d="M10 110 C 50 110, 70 10, 190 10" fill="none" stroke="var(--brand)" strokeWidth="2.5" /><path d="M10 110H190" stroke="var(--hairline)" /></svg>
      </Stage>
    </Doc>
  );
}
