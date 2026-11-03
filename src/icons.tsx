/* The icon set of @tsaaguur/ui (2026-11-04, 92 marks). Every path here was
   drawn for this library: a Mongolian ger for home, the Government Palace
   dome for parliament, a spool for Threads, a folded sheet for the press, a
   horse and an ovoo among the signs of the place. Monoline, round caps,
   stroke 1.75 on a 24 grid; a few control points sit off the grid on purpose
   so the lines read as drawn, not generated. <Icon name="..." /> with a
   className for size; `title` makes it an image for screen readers. */

export const ICON_GROUPS = {
  "place": ["ger", "dome", "horse", "ovoo", "mountain", "sun", "moon", "cloud", "snow", "wind", "drop", "flame"],
  "arrows": ["arrow-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up-right", "arrow-down-right", "chevron-up", "chevron-down", "chevron-left", "chevron-right", "chevrons-left", "chevrons-right", "refresh", "undo", "redo", "expand", "collapse", "out"],
  "actions": ["plus", "minus", "close", "check", "check-circle", "x-circle", "search", "filter", "sort", "edit", "trash", "copy", "download", "upload", "share", "link", "send", "pin", "bookmark", "heart", "star", "flag", "print", "settings", "menu", "more", "more-v", "drag"],
  "state": ["info", "help", "alert", "warning", "lock", "unlock", "eye", "eye-off", "bell", "bell-off", "pulse", "peak", "loader", "clock", "calendar", "timer", "spark"],
  "people": ["person", "people", "person-plus", "banner", "reply", "quote", "message", "mail", "phone", "spool", "at"],
  "media": ["image", "camera", "video", "mic", "volume", "play", "pause", "stop", "file", "folder", "sheet", "board", "layers", "grid", "list", "columns", "table", "chart-bar", "chart-line", "map-pin", "globe", "hash", "tag", "cart", "coin", "shield", "key", "code", "terminal"],
} as const;
export type IconName = (typeof ICON_GROUPS)[keyof typeof ICON_GROUPS][number];
export const ICON_NAMES: IconName[] = Object.values(ICON_GROUPS).flat() as IconName[];

const P: Record<IconName, React.ReactNode> = {
  // place
  ger: <><path d="M4.2 11.6c2.3-4.3 5-6.4 7.8-6.4s5.5 2.1 7.8 6.4" /><path d="M4.6 11.6h14.8" /><path d="M5.2 11.6v7.2h13.6v-7.2" /><path d="M10.3 18.8v-4.3h3.4v4.3" /><circle cx="12" cy="5.4" r="1.1" /></>,
  dome: <><path d="M7.2 11.2c0-3.1 2.1-5.3 4.8-5.3s4.8 2.2 4.8 5.3" /><path d="M12 5.9V4.1" /><path d="M6 11.2h12" /><path d="M7.4 11.2v5.2M12 11.2v5.2M16.6 11.2v5.2" /><path d="M4.6 16.4h14.8" /><path d="M3.4 19.6h17.2" /></>,
  // a horse: the neck and head, the back, two legs
  horse: <><path d="M4 19.4V12c0-2.6 1.8-4.4 4.4-4.4h5.2c1.2-2.2 2.6-3.4 4.6-3.6l1.6 2.4-1.8 2.6v4.6" /><path d="M8 19.4v-4.2M13.6 19.4V14M18 19.4v-5.2" /><path d="M9.4 7.6 8.2 5.2" /></>,
  // an ovoo: the cairn and its pole with a ribbon
  ovoo: <><path d="M3.6 19.6c1-3.4 3.4-5.4 5.6-5.4h5.6c2.2 0 4.6 2 5.6 5.4z" /><path d="M7.4 14.2c.8-2 2.4-3.2 4.6-3.2s3.8 1.2 4.6 3.2" /><path d="M12 11V3.8" /><path d="M12 4.6c2 .4 3.2 1.2 3.8 2.4-1.4.6-2.6.6-3.8.2" /></>,
  mountain: <><path d="M2.8 19.2 9 8.4l3.4 5 2.4-3.2 6.4 9z" /><path d="M7.4 11.2l1.6 1.4 1.6-1.4" /></>,
  sun: <><circle cx="12" cy="12" r="3.6" /><path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6" /></>,
  moon: <path d="M14.2 3.8a8.4 8.4 0 1 0 6 12.4 7 7 0 0 1-6-12.4z" />,
  cloud: <path d="M7.4 17.6a3.6 3.6 0 0 1 .4-7.2 5 5 0 0 1 9.6 1.4 3 3 0 0 1-.4 5.8z" />,
  snow: <><path d="M12 3.6v16.8M4.7 7.8l14.6 8.4M4.7 16.2l14.6-8.4" /><path d="M9.6 5.2 12 7.2l2.4-2M9.6 18.8l2.4-2 2.4 2M4.9 10.2l2.6.8.8-2.6M16.5 15.6l-.8-2.6 2.6-.8" /></>,
  wind: <><path d="M3.6 9.4h10.2a2.6 2.6 0 1 0-2.4-3.4" /><path d="M3.6 14h13.8a2.6 2.6 0 1 1-2.4 3.4" /><path d="M3.6 18.4h6" /></>,
  drop: <path d="M12 3.6c3.4 4.2 5.6 7.4 5.6 10.2a5.6 5.6 0 0 1-11.2 0c0-2.8 2.2-6 5.6-10.2z" />,
  flame: <><path d="M12 20.2c-3.4 0-5.6-2.3-5.6-5.4 0-2.6 1.6-4.3 2.7-6.2.5 1.1 1.1 1.8 1.9 2.2.2-2.9 1.3-5.3 3.1-7 .1 3 2.1 4.4 3.1 6.5.8 1.7.9 3.3.2 4.9-1 2.2-3 5-5.4 5z" /><path d="M12 20.2c-1.5 0-2.4-1-2.4-2.4 0-1.3.9-2.1 1.6-3.2.6.9 1.2 1.3 1.7 1.5.4 1.6-.1 4.1-.9 4.1z" /></>,
  // arrows
  "arrow-up": <><path d="M12 19.2v-14" /><path d="M6.4 10.8 12 5.2l5.6 5.6" /></>,
  "arrow-down": <><path d="M12 4.8v14" /><path d="M6.4 13.2 12 18.8l5.6-5.6" /></>,
  "arrow-left": <><path d="M19.2 12h-14" /><path d="M10.8 6.4 5.2 12l5.6 5.6" /></>,
  "arrow-right": <><path d="M4.8 12h14" /><path d="M13.2 6.4 18.8 12l-5.6 5.6" /></>,
  "arrow-up-right": <><path d="M7.4 16.6 16.6 7.4" /><path d="M9.6 7.4h7v7" /></>,
  "arrow-down-right": <><path d="M7.4 7.4l9.2 9.2" /><path d="M16.6 9.6v7h-7" /></>,
  "chevron-up": <path d="M5.8 14.6 12 8.4l6.2 6.2" />,
  "chevron-down": <path d="M5.8 9.4 12 15.6l6.2-6.2" />,
  "chevron-left": <path d="M14.6 5.8 8.4 12l6.2 6.2" />,
  "chevron-right": <path d="M9.4 5.8l6.2 6.2-6.2 6.2" />,
  "chevrons-left": <><path d="M11.2 6.6 5.8 12l5.4 5.4" /><path d="M18.2 6.6 12.8 12l5.4 5.4" /></>,
  "chevrons-right": <><path d="M5.8 6.6l5.4 5.4-5.4 5.4" /><path d="M12.8 6.6l5.4 5.4-5.4 5.4" /></>,
  refresh: <><path d="M19.4 12a7.4 7.4 0 1 1-2.2-5.2" /><path d="M19.6 4.4v4.6H15" /></>,
  undo: <><path d="M8.6 7.4H4.4v4.2" /><path d="M4.8 11.2A7.6 7.6 0 1 1 6 16.8" /></>,
  redo: <><path d="M15.4 7.4h4.2v4.2" /><path d="M19.2 11.2A7.6 7.6 0 1 0 18 16.8" /></>,
  expand: <><path d="M4.6 9.6V4.6h5M19.4 14.4v5h-5" /><path d="M4.6 4.6l5.4 5.4M19.4 19.4 14 14" /></>,
  collapse: <><path d="M10 4.6v5.4H4.6M14 19.4V14h5.4" /><path d="M10 10 4.6 4.6M14 14l5.4 5.4" /></>,
  out: <><path d="M13.2 5h5.8v5.8" /><path d="M19 5l-8.4 8.4" /><path d="M10.2 6.6H5.6V18.4h11.8v-4.6" /></>,
  // actions
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <><path d="M6.4 6.4l11.2 11.2" /><path d="M17.6 6.4 6.4 17.6" /></>,
  check: <path d="M4.6 12.6 9.6 17.4 19.4 7" />,
  "check-circle": <><circle cx="12" cy="12" r="8.4" /><path d="M8 12.4l2.8 2.8 5.4-5.8" /></>,
  "x-circle": <><circle cx="12" cy="12" r="8.4" /><path d="M9 9l6 6M15 9l-6 6" /></>,
  search: <><circle cx="10.6" cy="10.6" r="5.8" /><path d="M15 15l5 5" /></>,
  filter: <path d="M4 5.4h16l-6.2 7.4v5.6l-3.6 1.8v-7.4z" />,
  sort: <><path d="M4.6 7h14.8M7 12h10M9.4 17h5.2" /></>,
  edit: <><path d="M4.6 19.4h4l10.2-10.2-4-4L4.6 15.4z" /><path d="M13.2 6.8l4 4" /></>,
  trash: <><path d="M5 7.2h14M9.4 7.2V4.8h5.2v2.4" /><path d="M6.4 7.2l.8 12.2h9.6l.8-12.2" /><path d="M10 10.8v5.6M14 10.8v5.6" /></>,
  copy: <><rect x="8.6" y="8.6" width="10.8" height="10.8" rx="2" /><path d="M5.4 15.4V6.6a2 2 0 0 1 2-2h8.8" /></>,
  download: <><path d="M12 4.6v10" /><path d="M7.6 10.4 12 14.8l4.4-4.4" /><path d="M4.6 16.6v2.8h14.8v-2.8" /></>,
  upload: <><path d="M12 14.6v-10" /><path d="M7.6 9 12 4.6 16.4 9" /><path d="M4.6 16.6v2.8h14.8v-2.8" /></>,
  share: <><circle cx="17.4" cy="6" r="2.2" /><circle cx="6.6" cy="12" r="2.2" /><circle cx="17.4" cy="18" r="2.2" /><path d="M8.6 10.9l6.8-3.8M8.6 13.1l6.8 3.8" /></>,
  link: <><path d="M10.2 13.8a4 4 0 0 0 5.6 0l2.8-2.8a4 4 0 1 0-5.6-5.6l-1.2 1.2" /><path d="M13.8 10.2a4 4 0 0 0-5.6 0l-2.8 2.8a4 4 0 1 0 5.6 5.6l1.2-1.2" /></>,
  send: <><path d="M20 4.4 4.4 10.6l6.8 2.4 2.4 6.8z" /><path d="M20 4.4l-8.8 8.6" /></>,
  pin: <><path d="M14.6 4.2l5.2 5.2-2.8 1.2-1.6 4.6-3.4-3.4L6 17.8l-.4-.4 6-6-3.4-3.4 4.6-1.6z" /></>,
  bookmark: <path d="M6.6 4.6h10.8v14.8L12 15.6l-5.4 3.8z" />,
  heart: <path d="M12 19.6c-4.4-3.2-7.4-6-7.4-9.4a3.8 3.8 0 0 1 7.4-1.4 3.8 3.8 0 0 1 7.4 1.4c0 3.4-3 6.2-7.4 9.4z" />,
  star: <path d="M12 4.2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.9l5.4-.8z" />,
  flag: <><path d="M6 20.2V4.4" /><path d="M6 5.2c3.4-1.6 6.2 1.4 9.6-.2.9-.4 1.6-.6 2.4-.6v8.6c-3.4 1.6-6.2-1.4-9.6.2-.9.4-1.6.6-2.4.6" /></>,
  print: <><path d="M7.4 9V4.8h9.2V9" /><rect x="4.4" y="9" width="15.2" height="7" rx="1.6" /><path d="M7.4 13.4h9.2v5.8H7.4z" /></>,
  settings: <><circle cx="12" cy="12" r="2.8" /><path d="M12 3.6v2.2M12 18.2v2.2M3.6 12h2.2M18.2 12h2.2M6.1 6.1l1.5 1.5M16.4 16.4l1.5 1.5M17.9 6.1l-1.5 1.5M7.6 16.4l-1.5 1.5" /><circle cx="12" cy="12" r="6.4" /></>,
  menu: <><path d="M4.6 7.2h14.8" /><path d="M4.6 12h10.6" /><path d="M4.6 16.8h14.8" /></>,
  more: <><circle cx="6" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18" cy="12" r="1.3" /></>,
  "more-v": <><circle cx="12" cy="6" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="12" cy="18" r="1.3" /></>,
  drag: <><circle cx="9" cy="6.6" r="1.2" /><circle cx="15" cy="6.6" r="1.2" /><circle cx="9" cy="12" r="1.2" /><circle cx="15" cy="12" r="1.2" /><circle cx="9" cy="17.4" r="1.2" /><circle cx="15" cy="17.4" r="1.2" /></>,
  // state
  info: <><circle cx="12" cy="12" r="8.4" /><path d="M12 11v5.2M12 7.8v.2" /></>,
  help: <><circle cx="12" cy="12" r="8.4" /><path d="M9.6 9.6a2.4 2.4 0 1 1 3.4 2.2c-.7.4-1 .9-1 1.6v.4M12 16.6v.2" /></>,
  alert: <><circle cx="12" cy="12" r="8.4" /><path d="M12 7.8v5.2M12 16.4v.2" /></>,
  warning: <><path d="M12 4.4 3.8 18.6h16.4z" /><path d="M12 10v4M12 16.4v.2" /></>,
  lock: <><rect x="5.4" y="10.6" width="13.2" height="9" rx="2" /><path d="M8.4 10.6V8a3.6 3.6 0 0 1 7.2 0v2.6" /><path d="M12 14.2v2" /></>,
  unlock: <><rect x="5.4" y="10.6" width="13.2" height="9" rx="2" /><path d="M8.4 10.6V8a3.6 3.6 0 0 1 7-1" /><path d="M12 14.2v2" /></>,
  eye: <><path d="M3.2 12c2.2-3.8 5.2-5.8 8.8-5.8s6.6 2 8.8 5.8c-2.2 3.8-5.2 5.8-8.8 5.8S5.4 15.8 3.2 12z" /><circle cx="12" cy="12" r="2.6" /></>,
  "eye-off": <><path d="M4.2 4.2l15.6 15.6" /><path d="M9.8 7c.7-.5 1.4-.8 2.2-.8 3.6 0 6.6 2 8.8 5.8-.7 1.2-1.5 2.2-2.4 3.1M6.4 8.6C5.1 9.5 4 10.6 3.2 12c2.2 3.8 5.2 5.8 8.8 5.8 1.2 0 2.4-.2 3.4-.7" /><path d="M10.2 10.2a2.6 2.6 0 0 0 3.6 3.6" /></>,
  bell: <><path d="M6.4 16.4c1-1.2 1.4-2.6 1.4-4.4V10a4.2 4.2 0 0 1 8.4 0v2c0 1.8.4 3.2 1.4 4.4z" /><path d="M10 19.2a2 2 0 0 0 4 0" /><path d="M12 4.4v1.4" /></>,
  "bell-off": <><path d="M4.2 4.2l15.6 15.6" /><path d="M8.6 7.4A4.2 4.2 0 0 1 16.2 10v2c0 1 .1 1.8.4 2.6M7.8 10.8V12c0 1.8-.4 3.2-1.4 4.4h9.4" /><path d="M10 19.2a2 2 0 0 0 4 0" /></>,
  pulse: <path d="M3.6 12.4h4l2.2-5.2 3 10 2.4-7 1.4 2.2h3.8" />,
  peak: <><path d="M3.6 19 9.4 9.2l3.3 5 2.1-2.8 5.6 7.6z" /><circle cx="17.2" cy="6.4" r="2" /></>,
  loader: <><path d="M12 3.6v3.2M12 17.2v3.2M3.6 12h3.2M17.2 12h3.2M6.1 6.1l2.2 2.2M15.7 15.7l2.2 2.2M17.9 6.1l-2.2 2.2M8.3 15.7l-2.2 2.2" /></>,
  clock: <><circle cx="12" cy="12" r="8.4" /><path d="M12 7.6V12l3 2" /></>,
  calendar: <><rect x="4.4" y="6" width="15.2" height="13.6" rx="2" /><path d="M4.4 10.4h15.2M8.4 4.2v3.4M15.6 4.2v3.4" /><path d="M8 14h2M11 14h2M14 14h2M8 17h2M11 17h2" /></>,
  timer: <><circle cx="12" cy="13.2" r="7" /><path d="M12 9.6v3.6l2.4 1.6M9.6 3.8h4.8M12 3.8v2.4M18.2 7l1.4-1.4" /></>,
  spark: <><path d="M12 4.2l1.8 5.2 5.2 1.8-5.2 1.8-1.8 5.2-1.8-5.2L5 11.2l5.2-1.8z" /><path d="M18.6 16.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" /></>,
  // people
  person: <><circle cx="12" cy="8.2" r="3.4" /><path d="M5.4 19.4c.6-3.8 3.1-5.8 6.6-5.8s6 2 6.6 5.8" /></>,
  people: <><circle cx="9" cy="8.4" r="3" /><path d="M3.4 19c.5-3.4 2.6-5.2 5.6-5.2s5.1 1.8 5.6 5.2" /><path d="M15.2 5.8a3 3 0 0 1 0 5.4" /><path d="M16.4 13.9c2.4.4 3.9 2.1 4.2 5.1" /></>,
  "person-plus": <><circle cx="10" cy="8.2" r="3.4" /><path d="M3.4 19.4c.6-3.8 3.1-5.8 6.6-5.8 1.2 0 2.3.2 3.2.7" /><path d="M17.6 13.4v6M14.6 16.4h6" /></>,
  banner: <><path d="M6 20.2V4.4" /><path d="M6 5.2c3.4-1.6 6.2 1.4 9.6-.2.9-.4 1.6-.6 2.4-.6v8.6c-3.4 1.6-6.2-1.4-9.6.2-.9.4-1.6.6-2.4.6" /></>,
  reply: <><path d="M5 17.6V7.2c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6.2c0 1.1-.9 2-2 2H9.2z" /><path d="M8.6 9.4h6.8M8.6 12.2h4.2" /></>,
  quote: <><path d="M9.6 7.2c-2.6.6-4.2 2.3-4.2 5.2v4.4h4.6v-4.6H7.6c0-1.6.7-2.5 2-2.9z" /><path d="M18.4 7.2c-2.6.6-4.2 2.3-4.2 5.2v4.4h4.6v-4.6h-2.4c0-1.6.7-2.5 2-2.9z" /></>,
  message: <><path d="M4.6 5.6h14.8v10H9.4l-4.8 3.6z" /><path d="M8.4 9.2h7.2M8.4 12h4.4" /></>,
  mail: <><rect x="3.8" y="5.6" width="16.4" height="12.8" rx="2" /><path d="M4.4 7.2 12 12.8l7.6-5.6" /></>,
  phone: <path d="M6.2 4.6h3l1.6 4-2 1.4a10.6 10.6 0 0 0 5.2 5.2l1.4-2 4 1.6v3c0 1.1-.9 2-2 2A14.8 14.8 0 0 1 4.2 6.6c0-1.1.9-2 2-2z" />,
  spool: <><path d="M6.2 5.4h11.6" /><path d="M6.2 18.6h11.6" /><path d="M8.2 5.4v13.2M15.8 5.4v13.2" /><path d="M8.2 8.2c2.5 1.2 5.1-.6 7.6.6M8.2 11.4c2.5 1.2 5.1-.6 7.6.6M8.2 14.6c2.5 1.2 5.1-.6 7.6.6" /></>,
  at: <><circle cx="12" cy="12" r="3.4" /><path d="M15.4 12v1.4a2.2 2.2 0 0 0 4.4 0V12a7.8 7.8 0 1 0-3 6.2" /></>,
  // media and data
  image: <><rect x="4.2" y="5.2" width="15.6" height="13.6" rx="2" /><circle cx="9" cy="9.6" r="1.6" /><path d="M4.8 17.4l4.4-4.2 3 2.8 2.8-2.4 4.6 3.8" /></>,
  camera: <><path d="M4.4 8.4h3.2l1.4-2.2h6l1.4 2.2h3.2v10.2H4.4z" /><circle cx="12" cy="13.2" r="3.2" /></>,
  video: <><rect x="3.8" y="7" width="12" height="10" rx="2" /><path d="M15.8 10.4 20.2 8v8l-4.4-2.4" /></>,
  mic: <><rect x="9" y="4" width="6" height="10" rx="3" /><path d="M6.4 11.4a5.6 5.6 0 0 0 11.2 0M12 17v3M9.4 20h5.2" /></>,
  volume: <><path d="M4.6 9.4h3.2L12 5.6v12.8l-4.2-3.8H4.6z" /><path d="M15.4 9.2a4 4 0 0 1 0 5.6M17.8 6.8a7.4 7.4 0 0 1 0 10.4" /></>,
  play: <path d="M8.2 5.6v12.8L18.4 12z" />,
  pause: <><path d="M8.4 5.6v12.8" /><path d="M15.6 5.6v12.8" /></>,
  stop: <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="1.6" />,
  file: <><path d="M6.4 4.6h8.2l3.6 3.6v11.2H6.4z" /><path d="M14.6 4.6v3.6h3.6" /></>,
  folder: <path d="M3.8 6.6h6l1.8 2h8.6v9.8H3.8z" />,
  sheet: <><path d="M6.4 4.6h8.2l3.6 3.6v11.2H6.4z" /><path d="M14.6 4.6v3.6h3.6" /><path d="M9 11.4h6.2M9 14.4h6.2M9 17.3h4" /></>,
  board: <><rect x="3.6" y="6.2" width="16.8" height="12.4" rx="1.6" /><path d="M3.6 10.2h16.8" /><path d="M8.2 6.2v4" /><path d="M7 14.6l2.6-2.2 2.4 2 3.2-3 2.6 3.2" /></>,
  layers: <><path d="M12 4.6l8 4.2-8 4.2-8-4.2z" /><path d="M4 13l8 4.2 8-4.2M4 16.8l8 4.2 8-4.2" /></>,
  grid: <><rect x="4.4" y="4.4" width="6.4" height="6.4" rx="1.4" /><rect x="13.2" y="4.4" width="6.4" height="6.4" rx="1.4" /><rect x="4.4" y="13.2" width="6.4" height="6.4" rx="1.4" /><rect x="13.2" y="13.2" width="6.4" height="6.4" rx="1.4" /></>,
  list: <><path d="M9 6.8h10.6M9 12h10.6M9 17.2h10.6" /><circle cx="5" cy="6.8" r="1.1" /><circle cx="5" cy="12" r="1.1" /><circle cx="5" cy="17.2" r="1.1" /></>,
  columns: <><rect x="4.4" y="4.6" width="15.2" height="14.8" rx="2" /><path d="M12 4.6v14.8" /></>,
  table: <><rect x="4.4" y="4.6" width="15.2" height="14.8" rx="2" /><path d="M4.4 9.4h15.2M4.4 14.2h15.2M10 9.4v10" /></>,
  "chart-bar": <><path d="M5 19.4V12M10 19.4V6.4M15 19.4V9.6M20 19.4v-5" /></>,
  "chart-line": <><path d="M4 18.4 9 12l3.6 3.2L20 6.6" /><path d="M15.6 6.6H20V11" /></>,
  "map-pin": <><path d="M12 20.4c-3.8-4.2-6-7.4-6-10.4a6 6 0 0 1 12 0c0 3-2.2 6.2-6 10.4z" /><circle cx="12" cy="10" r="2.2" /></>,
  globe: <><circle cx="12" cy="12" r="8.2" /><ellipse cx="12" cy="12" rx="3.4" ry="8.2" /><path d="M4 12h16M5.4 8.2h13.2M5.4 15.8h13.2" /></>,
  hash: <><path d="M9.4 4.6 7.6 19.4" /><path d="M16.6 4.6l-1.8 14.8" /><path d="M4.8 9.3h15" /><path d="M4.2 14.9h15" /></>,
  tag: <><path d="M4.4 4.4h7.4l8 8-7.4 7.4-8-8z" /><circle cx="8.6" cy="8.6" r="1.3" /></>,
  cart: <><path d="M3.6 4.6h2.6l2.2 10.4h9.8l2-7.2H7.2" /><circle cx="9.6" cy="19" r="1.3" /><circle cx="16.8" cy="19" r="1.3" /></>,
  coin: <><circle cx="12" cy="12" r="8" /><path d="M9.2 9.4h5.6M9.2 12.4h5.6M12 7.4v9.6" /></>,
  shield: <><path d="M12 3.4l7.2 2.8v5.6c0 4.4-3 7.6-7.2 9.2-4.2-1.6-7.2-4.8-7.2-9.2V6.2z" /><path d="M9 12.2l2 2 4-4.4" /></>,
  key: <><circle cx="8.4" cy="12" r="3.8" /><path d="M11.8 12h8.4M17 12v3M19.6 12v2.2" /></>,
  code: <><path d="M8.6 7.4 4 12l4.6 4.6M15.4 7.4 20 12l-4.6 4.6M13.6 5l-3.2 14" /></>,
  terminal: <><rect x="3.8" y="5" width="16.4" height="14" rx="2" /><path d="M7.4 9l3 3-3 3M12.2 15h4.6" /></>,
};

export function Icon({ name, className = "h-4 w-4", strokeWidth = 1.75, title }: { name: IconName; className?: string; strokeWidth?: number; title?: string }) {
  const filled = name === "play";
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      {P[name]}
    </svg>
  );
}
