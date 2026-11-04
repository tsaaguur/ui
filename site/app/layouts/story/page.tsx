import { Board, type StoryBoard, Glyph } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter } from "@/components/mock";
import fixture from "../../board/fixture.json";
export const metadata = { title: "Story layout" };
export default function Page() {
  const b = fixture as StoryBoard;
  return (
    <Doc kicker="layouts · story" title="Story" lead="One topic as a film: the head, then every frame of its board in a snap strip (arrow keys on a desk, a swipe on a phone), a link back to the topic page.">
      <Frame title="Story board page">
        <MockHeader active={0} />
        <div className="p-4 @[900px]:p-6"><div className="mb-4 flex items-center gap-3"><Glyph name={b.tag.name} size={40} animate="idle" /><div><span className="tz-label">түүх · {b.frames.length} хүрээ</span><h2 className="tz-display text-[26px] font-bold leading-none">{b.tag.name}</h2></div><span className="tz-pill ml-auto">Сэдвийн хуудас</span></div><Board b={b} /></div>
        <MockFooter /><MockTabBar active={0} />
      </Frame>
    </Doc>
  );
}
