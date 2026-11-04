import { Board, type StoryBoard } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
import fixture from "./fixture.json";
export const metadata = { title: "Story board" };
export default function Page() {
  const b = fixture as StoryBoard;
  return (
    <Doc kicker="board.tsx" title="Story board" lead="One topic = a film of numbered frames. Each frame is one moment: who, when, what, a picture when there is one. Scroll left to right on a desk (arrow keys, two buttons), swipe on a phone. Empty frames are not drawn. Data: /api/trends/board/<key> on tsaaguur.mn." imports={["Board", "type StoryBoard", "type StoryFrame"]}>
      <Stage title="Full board" note="Fixture: the Ulaanbaatar topic, 2026-11-04 (Mongolian content)." code={'const b = await api.story(key);\n<Board b={b} />'}>
        <Board b={b} />
      </Stage>
      <Stage title="Compact board" note="The list form: how it started, the picture or the loudest moment, the last side to join." code={'<Board b={b} compact />'}>
        <Board b={b} compact />
      </Stage>
      <Stage title="Props"><Props rows={[["b", "StoryBoard", "tag, days, state, frames[]"], ["compact", "boolean", "three frames, no film background"], ["frame.kind", '"first" | "joined" | "loudest" | "picture" | "peak" | "replies" | "now"', "frame type; each has its own drawing"]]} /></Stage>
    </Doc>
  );
}
