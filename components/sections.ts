import type { IconName } from "@tsaaguur/ui";

export const SECTIONS: { href: string; label: string; hint: string; icon: IconName }[] = [
  { href: "/", label: "Эхлэл", hint: "юу вэ, яаж хэрэглэх", icon: "ger" },
  { href: "/tokens", label: "Өнгө, зай", hint: "tokens.css", icon: "hash" },
  { href: "/type", label: "Үсэг", hint: "гурван үсгийн хэв", icon: "quote" },
  { href: "/icons", label: "Дүрс", hint: "25 зурсан тэмдэг", icon: "sun" },
  { href: "/glyphs", label: "Сэдвийн тэмдэг", hint: "16 хөдөлдөг пиктограм", icon: "flame" },
  { href: "/marks", label: "Хөдөлдөг тэмдэг", hint: "сум, цэг, баганат зураг", icon: "pulse" },
  { href: "/controls", label: "Товч, пилл", hint: "Pill, Button, glass", icon: "play" },
  { href: "/cards", label: "Карт, самбар", hint: "card, panel, stamp, sprockets", icon: "board" },
  { href: "/board", label: "Түүхийн самбар", hint: "Board, бүтэн жишээ", icon: "sheet" },
  { href: "/motion", label: "Хөдөлгөөн", hint: "keyframes, ease", icon: "peak" },
];
