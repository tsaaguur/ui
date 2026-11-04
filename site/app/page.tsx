import Link from "next/link";
import { Icon, Glyph, Button, Pill } from "@tsaaguur/ui";
import { SECTIONS } from "@/components/sections";
import { CodeBlock } from "@/components/code";
import pkg from "../../package.json";

const STEPS: [string, string, string][] = [
  ["1. Install", "sh", "pnpm add github:tsaaguur/ui"],
  ["2. next.config.mjs", "js", 'const nextConfig = {\n  transpilePackages: ["@tsaaguur/ui"],\n};\nexport default nextConfig;'],
  ["3. app/globals.css", "css", '@import "tailwindcss";\n@import "@tsaaguur/ui/styles.css";\n@source "../node_modules/@tsaaguur/ui/src";'],
  ["4. Use it", "tsx", 'import { Button, Icon, Glyph } from "@tsaaguur/ui";\n\n<Button tone="brand" icon="arrow-right">Open</Button>\n<Icon name="dome" className="h-5 w-5" />\n<Glyph name="цасан шуурга" size={32} animate="idle" />'],
];

export default function Home() {
  return (
    <article className="max-w-[920px]">
      <div className="tz-label">@tsaaguur/ui · v{pkg.version} · MIT</div>
      <h1 className="tz-display mt-1 text-[40px] font-bold leading-[1] sm:text-[56px]">A UI library drawn by hand</h1>
      <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-muted-foreground">
        Tokens, three typefaces, 115 icons, 16 animated pictograms, inputs, navigation, feedback, data display, surfaces and a story board. React 19, Next.js 15+, Tailwind v4, TypeScript. No icon package, no emoji, one easing curve.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button href="/inputs" icon="arrow-right" tone="brand">Components</Button>
        <Button href="/icons" icon="arrow-right" tone="quiet">Icons</Button>
        <Pill href="https://github.com/tsaaguur/ui" icon="out">GitHub</Pill>
        <Pill href="https://lab.tsaaguur.mn" icon="out">See it in use</Pill>
      </div>

      <h2 className="tz-display mt-12 text-[24px] font-semibold">Quick start</h2>
      <p className="mt-1 text-[13.5px] text-muted-foreground">Installs straight from the repository; the lockfile pins the commit. Needs React 19, Next 15+ and Tailwind v4 in the app.</p>
      <ol className="mt-4 grid gap-3">
        {STEPS.map(([t, lang, code]) => (
          <li key={t} className="tz-card overflow-hidden">
            <div className="tz-label px-4 pt-3">{t}</div>
            <CodeBlock code={code} lang={lang} className="mt-2" />
          </li>
        ))}
      </ol>

      <h2 className="tz-display mt-12 text-[24px] font-semibold">Components</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {SECTIONS.filter((s) => s.href !== "/").map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className="tz-card group flex items-center gap-4 p-4">
              <span className="tz-num text-[13px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <Icon name={s.icon} className="h-6 w-6 shrink-0" />
              <span className="min-w-0"><span className="tz-display tz-underline inline text-[17px] font-semibold">{s.label}</span><span className="tz-label mt-0.5 block">{s.hint}</span></span>
              <Icon name="arrow-up-right" className="ml-auto h-4 w-4 opacity-50" />
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="tz-display mt-12 text-[24px] font-semibold">Rules</h2>
      <ul className="mt-4 grid gap-3 text-[14px] leading-relaxed sm:grid-cols-2">
        <li className="tz-card p-4"><Glyph name="цаг агаар" size={28} animate="idle" className="mb-2" /><b>One easing.</b> Everything moves on <code className="tz-num">--ease</code>; nothing bounces; all motion stops under <code className="tz-num">prefers-reduced-motion</code>.</li>
        <li className="tz-card p-4"><Glyph name="хууль батлах" size={28} animate="idle" className="mb-2" /><b>No left-border accent bars.</b> Tint, border, spacing, weight or a leading mark instead.</li>
        <li className="tz-card p-4"><Glyph name="төсвийн тодотгол" size={28} animate="idle" className="mb-2" /><b>Mono for numbers and labels</b> (<code className="tz-num">tz-num</code>, <code className="tz-num">tz-label</code>); the display face for names.</li>
        <li className="tz-card p-4"><Glyph name="н.учрал" size={28} animate="idle" className="mb-2" /><b>Every mark is drawn</b> on the 24 grid, stroke 1.75, round caps. Controls are ours: no native select, checkbox or range.</li>
      </ul>

    </article>
  );
}
