// the story board payload: /api/trends/board/<key>
export type StorySrc = "threads" | "fb_individual" | "fb_publisher" | "news";
export interface StoryItem { src: StorySrc; side: string; at: string | null; id: string; who: string; text: string; url: string | null; reactions: number; image: string | null }
export type StoryFrame =
  | ({ n: number; kind: "first" | "joined" | "loudest" | "picture"; at: string | null } & StoryItem)
  | { n: number; kind: "peak"; at: string | null; hour: string; mentions: number; sides: Record<StorySrc, number>; series: ({ hour: string } & Record<string, number | string>)[] }
  | { n: number; kind: "replies"; at: string | null; post: { who: string; text: string; url: string | null; at: string | null }; replies: { who: string; text: string; likes: number; at: string | null }[] }
  | { n: number; kind: "now"; at: string | null; state: "rising" | "falling" | "flat"; sides: StorySrc[] };
export interface StoryBoard { tag: { id: number; key: string; name: string }; days: number; state: "rising" | "falling" | "flat"; frames: StoryFrame[] }
