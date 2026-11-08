# @tsaaguur/ui

[![ci](https://github.com/tsaaguur/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/tsaaguur/ui/actions/workflows/ci.yml)

> Tsaaguur's own React UI library for Next.js and Tailwind v4: design tokens,
> 115 hand-drawn SVG icons, animated topic pictograms, inputs, navigation,
> feedback, data display, surfaces and a story board. Made in Ulaanbaatar for
> [tsaaguur.mn](https://tsaaguur.mn), the Mongolian media trends dashboard.
> Цаагуурын өөрийн UI сан: тэмдэг, дүрс, хөдөлгөөнт пиктограм, бүрэлдэхүүн.

Tsaaguur's own UI library: tokens, type, 115 drawn icons, 16 animated topic
pictograms, marks that move, inputs, navigation, feedback, data display,
surfaces and the story board. Everything in it was drawn and written for
Tsaaguur; there is no icon package, no emoji, no borrowed component.

Documented and demoed at https://ui.tsaaguur.mn (source: `site/` in this repo,
a pnpm workspace package; `pnpm site:dev` at the root).
Used by https://lab.tsaaguur.mn (source: `tsaaguur/lab`).

## Shape

```
src/
  tokens.css      the CSS variables (two themes), base element rules
  styles.css      every tz-* class, inside @layer components
  icons.tsx       Icon, ICON_GROUPS, ICON_NAMES
  glyph.tsx       Glyph, glyphKind (topic pictograms, animate draw|idle|none)
  marks.tsx       StateMark, LiveDot, Sprockets, Stamp, DrawnBars
  spark.tsx       Spark (server-rendered sparkline)
  pill.tsx        Pill, Button, IconButton, iconMotion (press animations)
  inputs.tsx      Field, Input, Textarea, SearchField, Select, Checkbox, RadioGroup, Switch, Slider, Segmented, Chip
  navigation.tsx  Tabs, Breadcrumb, Pagination, Menu, Stepper
  feedback.tsx    Alert, ToastProvider/useToast, Dialog, Drawer, Tooltip, Progress, Ring, Spinner, Skeleton, Empty
  display.tsx     Avatar, AvatarGroup, Badge, Table, Stat, Timeline, DefinitionList, Kbd, Code, Divider
  bars.tsx        Bar, BarList, BarFill (every horizontal bar: a track, a breakdown as rows, a fill behind a row)
  daily-chart.tsx DailyChart, fillDays, niceCeil (every per-day chart; from the tsaaguur admin, 2026-11-09)
  surfaces.tsx    Card, Panel, Accordion, Container, Stack
  section-head.tsx, ticker.tsx, theme-toggle.tsx, board.tsx, types.ts, format.ts
  index.ts        the public surface
```

## Using it from a Next app

Install it straight from this repository (public, no registry needed):

```bash
pnpm add github:tsaaguur/ui
```

`next.config.mjs`: `transpilePackages: ["@tsaaguur/ui"]` (the package ships
TypeScript source, Next compiles it). `app/globals.css`:

```css
@import "tailwindcss";
@import "@tsaaguur/ui/styles.css";
@source "../node_modules/@tsaaguur/ui/src";
```

plus the app's `@theme inline` bridge of the variables to Tailwind names.
The lockfile pins the commit; `pnpm update @tsaaguur/ui` moves to the newest
`main`. Peer requirements: React 19, Next 15+ (Link), Tailwind v4.

## Rules

- One easing (`--ease`), nothing bounces, everything stops under
  `prefers-reduced-motion`.
- No coloured left-border accents; tint, border, spacing, weight or a
  leading mark instead.
- Numbers, dates and labels in mono (`tz-num`, `tz-label`); names in the
  display face (`tz-display`).
- Every mark drawn on the 24 grid, stroke 1.75, round caps.
- Controls are ours: no native select, checkbox or range.

## Repositories

Split out of the tsaaguur monorepo on 2026-11-04 with history (`git subtree
split`). This repo holds the library (root) and its docs site (`site/`);
`tsaaguur/lab` (private) consumes it; the product itself is
`tsaaguur/tsaaguur` (private). `files` limits the installed package to `src/`.

## Keywords

React · Next.js · Tailwind CSS · TypeScript · UI library · design system ·
component library · SVG icons · hand-drawn icons · animated pictograms ·
Mongolia · Mongolian · Монгол · Цаагуур · Tsaaguur

## Contributing and license

[CONTRIBUTING.md](CONTRIBUTING.md) has the rules and the checks. MIT License, see [LICENSE](LICENSE).
