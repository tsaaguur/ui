import type { IconName } from "@tsaaguur/ui";

/* The table of contents, grouped by job. `search` lists the component
   names a page documents, for the search box. */
export type Section = { href: string; label: string; hint: string; icon: IconName; search?: string[] };
export const GROUPS: { title: string; items: Section[] }[] = [
  { title: "Foundation", items: [
    { href: "/", label: "Get started", hint: "install, setup", icon: "ger", search: ["install", "setup", "quick start"] },
    { href: "/tokens", label: "Tokens", hint: "color, radius, ease", icon: "hash", search: ["tokens", "color", "radius", "ease", "dark"] },
    { href: "/type", label: "Typography", hint: "three typefaces", icon: "quote", search: ["typography", "display", "mono", "label", "font"] },
    { href: "/motion", label: "Motion", hint: "keyframes", icon: "peak", search: ["motion", "animation", "keyframes"] },
  ]},
  { title: "Marks", items: [
    { href: "/icons", label: "Icons", hint: "115 drawn icons", icon: "sun", search: ["Icon", "icons", "svg"] },
    { href: "/glyphs", label: "Pictograms", hint: "16 animated glyphs", icon: "flame", search: ["Glyph", "glyphKind", "pictogram", "emoji"] },
    { href: "/marks", label: "Marks", hint: "arrows, dots, bars", icon: "pulse", search: ["StateMark", "LiveDot", "DrawnBars", "Spark", "Sprockets", "Stamp"] },
  ]},
  { title: "Inputs", items: [
    { href: "/inputs", label: "Inputs", hint: "Input, Select, Switch, Slider", icon: "edit", search: ["Input", "Textarea", "SearchField", "Select", "Checkbox", "RadioGroup", "Switch", "Slider", "Segmented", "Chip", "Field"] },
    { href: "/controls", label: "Buttons", hint: "Button, Pill, glass", icon: "play", search: ["Pill", "Button", "ThemeToggle", "kicker", "glass"] },
  ]},
  { title: "Navigation", items: [
    { href: "/navigation", label: "Navigation", hint: "Tabs, Menu, Stepper", icon: "columns", search: ["Tabs", "Breadcrumb", "Pagination", "Menu", "Stepper"] },
  ]},
  { title: "Feedback", items: [
    { href: "/feedback", label: "Feedback", hint: "Alert, Toast, Dialog", icon: "bell", search: ["Alert", "Toast", "useToast", "Dialog", "Drawer", "Tooltip", "Progress", "Ring", "Spinner", "Skeleton", "Empty"] },
  ]},
  { title: "Data", items: [
    { href: "/display", label: "Data display", hint: "Table, Stat, Timeline", icon: "table", search: ["Avatar", "AvatarGroup", "Badge", "Table", "Stat", "Timeline", "DefinitionList", "Kbd", "Code", "Divider"] },
  ]},
  { title: "Surfaces", items: [
    { href: "/surfaces", label: "Surfaces", hint: "Card, Panel, Accordion", icon: "layers", search: ["Card", "Panel", "Accordion", "Container", "Stack"] },
    { href: "/cards", label: "Cards (CSS)", hint: "tz-card, tz-panel", icon: "board", search: ["tz-card", "tz-panel", "tz-lift", "SectionHead"] },
    { href: "/board", label: "Story board", hint: "Board, full example", icon: "sheet", search: ["Board", "StoryBoard", "story"] },
  ]},
  { title: "Project", items: [
    { href: "/changelog", label: "Changelog", hint: "recent commits", icon: "clock", search: ["changelog", "commits", "git", "version", "history"] },
  ]},
];
export const SECTIONS: Section[] = GROUPS.flatMap((g) => g.items);

/* The Layouts section: the product's pages as structure only, no data. */
export const LAYOUT_GROUPS: { title: string; items: Section[] }[] = [
  { title: "Layouts", items: [
    { href: "/layouts", label: "Overview", hint: "all pages", icon: "layers", search: ["layouts", "pages", "wireframe"] },
    { href: "/layouts/home", label: "Home", hint: "hero, topics, feed, rails", icon: "ger", search: ["home", "hero", "feed", "rail"] },
    { href: "/layouts/topic", label: "Topic", hint: "figures, how it spread", icon: "flame", search: ["topic", "tag", "history"] },
    { href: "/layouts/stories", label: "Stories", hint: "compact boards", icon: "sheet", search: ["stories", "board"] },
    { href: "/layouts/story", label: "Story", hint: "the full board", icon: "board", search: ["story", "frames"] },
    { href: "/layouts/parliament", label: "Parliament", hint: "podium, leaderboard", icon: "dome", search: ["parliament", "members", "rating"] },
    { href: "/layouts/now", label: "Now", hint: "the live list", icon: "pulse", search: ["now", "live"] },
    { href: "/layouts/login", label: "Sign-in gate", hint: "blurred preview, card", icon: "lock", search: ["login", "gate", "google"] },
  ]},
];
export const LAYOUTS: Section[] = LAYOUT_GROUPS.flatMap((g) => g.items);
