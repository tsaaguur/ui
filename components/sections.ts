import type { IconName } from "@tsaaguur/ui";

/* The library's table of contents, grouped the way a reader looks for a
   piece: what it is made of, then the parts by job. `search` lists the
   component names a page documents, for the search box. */
export type Section = { href: string; label: string; hint: string; icon: IconName; search?: string[] };
export const GROUPS: { title: string; items: Section[] }[] = [
  { title: "Суурь", items: [
    { href: "/", label: "Эхлэл", hint: "юу вэ, яаж хэрэглэх", icon: "ger" },
    { href: "/tokens", label: "Өнгө, зай", hint: "tokens.css", icon: "hash", search: ["tokens", "color", "radius", "ease"] },
    { href: "/type", label: "Үсэг", hint: "гурван үсгийн хэв", icon: "quote", search: ["typography", "display", "mono", "label"] },
    { href: "/motion", label: "Хөдөлгөөн", hint: "keyframes, ease", icon: "peak", search: ["motion", "animation", "keyframes"] },
  ]},
  { title: "Тэмдэг", items: [
    { href: "/icons", label: "Дүрс", hint: "115 зурсан тэмдэг", icon: "sun", search: ["Icon", "icons"] },
    { href: "/glyphs", label: "Сэдвийн тэмдэг", hint: "16 хөдөлдөг пиктограм", icon: "flame", search: ["Glyph", "glyphKind", "pictogram", "emoji"] },
    { href: "/marks", label: "Хөдөлдөг тэмдэг", hint: "сум, цэг, баганат зураг", icon: "pulse", search: ["StateMark", "LiveDot", "DrawnBars", "Spark", "Sprockets", "Stamp"] },
  ]},
  { title: "Оролт", items: [
    { href: "/inputs", label: "Оролт", hint: "Input, Select, Switch, Slider", icon: "edit", search: ["Input", "Textarea", "SearchField", "Select", "Checkbox", "RadioGroup", "Switch", "Slider", "Segmented", "Chip", "Field"] },
    { href: "/controls", label: "Товч, пилл", hint: "Pill, Button, glass", icon: "play", search: ["Pill", "Button", "ThemeToggle", "kicker", "glass"] },
  ]},
  { title: "Замчлал", items: [
    { href: "/navigation", label: "Замчлал", hint: "Tabs, Breadcrumb, Menu, Stepper", icon: "columns", search: ["Tabs", "Breadcrumb", "Pagination", "Menu", "Stepper"] },
  ]},
  { title: "Хариу", items: [
    { href: "/feedback", label: "Хариу", hint: "Alert, Toast, Dialog, Drawer", icon: "bell", search: ["Alert", "Toast", "useToast", "Dialog", "Drawer", "Tooltip", "Progress", "Ring", "Spinner", "Skeleton", "Empty"] },
  ]},
  { title: "Өгөгдөл", items: [
    { href: "/display", label: "Өгөгдөл", hint: "Avatar, Badge, Table, Timeline", icon: "table", search: ["Avatar", "AvatarGroup", "Badge", "Table", "Stat", "Timeline", "DefinitionList", "Kbd", "Code", "Divider"] },
  ]},
  { title: "Гадаргуу", items: [
    { href: "/surfaces", label: "Гадаргуу", hint: "Card, Panel, Accordion", icon: "layers", search: ["Card", "Panel", "Accordion", "Container", "Stack"] },
    { href: "/cards", label: "Карт, самбар", hint: "css: tz-card, tz-panel", icon: "board", search: ["tz-card", "tz-panel", "SectionHead"] },
    { href: "/board", label: "Түүхийн самбар", hint: "Board, бүтэн жишээ", icon: "sheet", search: ["Board", "StoryBoard", "story"] },
  ]},
];
export const SECTIONS: Section[] = GROUPS.flatMap((g) => g.items);
