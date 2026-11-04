# @tsaaguur/ui

Tsaaguur's own UI library: tokens, type, 115 drawn icons, 16 animated topic
pictograms, marks that move, inputs, navigation, feedback, data display,
surfaces and the story board. Everything in it was drawn and written for
Tsaaguur; there is no icon package, no emoji, no borrowed component.

Documented and demoed at https://ui.tsaaguur.mn (source: `../ui-site`).
Used by https://lab.tsaaguur.mn (source: `../lab`).

## Shape

```
src/
  tokens.css      the CSS variables (two themes), base element rules
  styles.css      every tz-* class, inside @layer components
  icons.tsx       Icon, ICON_GROUPS, ICON_NAMES
  glyph.tsx       Glyph, glyphKind (topic pictograms, animate draw|idle|none)
  marks.tsx       StateMark, LiveDot, Sprockets, Stamp, DrawnBars
  spark.tsx       Spark (server-rendered sparkline)
  pill.tsx        Pill, Button
  inputs.tsx      Field, Input, Textarea, SearchField, Select, Checkbox, RadioGroup, Switch, Slider, Segmented, Chip
  navigation.tsx  Tabs, Breadcrumb, Pagination, Menu, Stepper
  feedback.tsx    Alert, ToastProvider/useToast, Dialog, Drawer, Tooltip, Progress, Ring, Spinner, Skeleton, Empty
  display.tsx     Avatar, AvatarGroup, Badge, Table, Stat, Timeline, DefinitionList, Kbd, Code, Divider
  surfaces.tsx    Card, Panel, Accordion, Container, Stack
  section-head.tsx, ticker.tsx, theme-toggle.tsx, board.tsx, types.ts, format.ts
  index.ts        the public surface
```

## Using it from a Next app (today)

The apps copy the source in at build time; no symlink, no workspace (a
symlinked package resolved `react` from its own folder and would have
bundled a second React):

```json
"scripts": { "sync": "rsync -a --delete ../ui/src/ ./ui/", "dev": "pnpm sync && next dev", "build": "pnpm sync && next build" }
```

`tsconfig.json` paths: `"@tsaaguur/ui": ["./ui/index.ts"]`; `app/globals.css`:
`@import "tailwindcss"; @import "../ui/styles.css"; @source "../ui";` plus the
app's `@theme inline` bridge of the variables to Tailwind names. The copy
(`<app>/ui`) is git-ignored.

Peer requirements: React 19, Next 15+ (Link), Tailwind v4.

## Rules

- One easing (`--ease`), nothing bounces, everything stops under
  `prefers-reduced-motion`.
- No coloured left-border accents; tint, border, spacing, weight or a
  leading mark instead.
- Numbers, dates and labels in mono (`tz-num`, `tz-label`); names in the
  display face (`tz-display`).
- Every mark drawn on the 24 grid, stroke 1.75, round caps.
- Controls are ours: no native select, checkbox or range.

## Splitting into its own repository (planned)

This folder is self-contained (own `package.json`, no imports from outside
`src/`). To move it out of `tsaaguur` with history:

```bash
git subtree split -P ui -b ui-only          # in the tsaaguur clone
git push git@github.com:Tsaaguur/ui.git ui-only:main
```

Then the apps install it as a real dependency (publish from the new repo,
or `pnpm add github:Tsaaguur/ui`) and drop `pnpm sync`; `transpilePackages:
["@tsaaguur/ui"]` in `next.config` replaces the tsconfig path. `lab/` and
`ui-site/` split the same way (`git subtree split -P lab`, `-P ui-site`).
