import { Board, type StoryBoard } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";
import fixture from "./fixture.json";
export const metadata = { title: "Түүхийн самбар" };
export default function Page() {
  const b = fixture as StoryBoard;
  return (
    <Doc kicker="board.tsx" title="Түүхийн самбар" lead="Нэг сэдэв = дугаарласан хүрээнүүдийн хальс. Хүрээ бүр нэг мөч: хэн, хэзээ, юу, зураг байвал зураг. Ширээн дээр зүүнээс баруун тийш гүйлгэнэ (сум, хоёр товч), утсан дээр хуруугаар. Хоосон хүрээ зурагдахгүй. Өгөгдөл: /api/trends/board/<key>.">
      <Stage title="Бүтэн самбар" note="Жишээ өгөгдөл: улаанбаатар сэдэв, 2026-11-04." code={'const b = await api.story(key);\n<Board b={b} />'}>
        <Board b={b} />
      </Stage>
      <Stage title="Хураангуй самбар" note="/stories жагсаалтын хэлбэр: яаж эхэлсэн, зурагтай эсвэл хамгийн чанга, сүүлд нэгдсэн тал." code={'<Board b={b} compact />'}>
        <Board b={b} compact />
      </Stage>
      <Stage title="Props"><Props rows={[["b", "StoryBoard", "tag, days, state, frames[]"], ["compact", "boolean", "гурван хүрээ, дэвсгэр хальсгүй"], ["frame.kind", '"first" | "joined" | "loudest" | "picture" | "peak" | "replies" | "now"', "хүрээний төрөл; тус бүр өөрийн зурагтай"]]} /></Stage>
    </Doc>
  );
}
