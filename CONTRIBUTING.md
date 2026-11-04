# Contributing to @tsaaguur/ui

Thank you for looking. This library is small on purpose: everything in it was
drawn and written for Tsaaguur, and a change is welcome when it keeps that
character.

## Before you open a pull request

```bash
pnpm install          # the library and the docs site (pnpm workspace)
pnpm typecheck        # the library
pnpm site:typecheck   # the docs site
pnpm site:dev         # http://localhost:3012, edits to src/ show at once
```

Every component you add or change should appear on the docs site (`site/app/<group>/page.tsx`): a live demo, the usage line, the props table.

## The rules

- **Drawn, not imported.** Icons and pictograms are our own SVG paths on the
  24 grid, stroke 1.75, round caps and joins. No icon package, no emoji, no
  copied artwork.
- **One easing** (`--ease`). Nothing bounces, nothing follows the cursor,
  nothing lifts or scales on hover. Every motion stops under
  `prefers-reduced-motion`.
- **No coloured left-border accent bars.** Use a tint, a full border,
  spacing, weight or a leading mark.
- **Controls are ours.** No native `<select>`, checkbox or range; extend
  `inputs.tsx` instead.
- **Tokens, not hex.** Colours, radii and type come from `tokens.css`; every
  class lives in `styles.css` inside `@layer components` so app utilities
  still win.
- **Mono for numbers and labels** (`tz-num`, `tz-label`), the display face
  for names (`tz-display`).
- **Text:** plain ASCII hyphens only, never an em or en dash, in code,
  comments, copy and commit messages. UI copy is Mongolian in everyday words.
- **Accessibility:** keyboard paths for every control (arrow keys, Enter,
  Esc), `aria-*` where a role needs it, focus held inside dialogs.

## Commits and pull requests

- One topic per branch and per pull request.
- Commit message: one short neutral line saying what changed
  (`inputs: slider keyboard step`). The why goes in the pull request.
- No AI attribution lines in commits or pull request bodies.
- A UI change carries a screenshot of the docs page, desktop and phone.

## Versioning

`package.json` carries the version; apps install the repository directly
(`github:tsaaguur/ui`) and pin a commit in their lockfile, so a breaking
change is a minor bump plus a note in the pull request.

## License

By contributing you agree that your contribution is licensed under the MIT
License in `LICENSE`.
