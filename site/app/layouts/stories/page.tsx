import { Board, type StoryBoard, Glyph } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter } from "@/components/mock";
import { TOPICS } from "@/components/fixtures";
import fixture from "../../board/fixture.json";
export const metadata = { title: "Stories layout" };
export default function Page() {
  const b = fixture as StoryBoard;
  return (
    <Doc kicker="layouts · stories" title="Stories" lead="The week's top ten as compact three-frame boards, one per row: how it started, the picture or the loudest moment, the last side to join. The same fixture board stands in for every row.">
      <Frame title="Stories list" note="One column at every width; the three frames stack on a phone.">
        <MockHeader active={0} />
        <div className="p-4 @[900px]:p-6"><div className="mb-4 flex items-end justify-between"><div><span className="tz-label">7 хоног · хамгийн их яригдсан</span><h2 className="tz-display text-[26px] font-bold">Түүхүүд</h2></div><span className="tz-pill">Бүгд</span></div>
          <ol className="flex flex-col gap-4">{TOPICS.slice(0, 3).map((t, i) => <li key={t}><div className="mb-2 flex items-center gap-3"><span className="tz-num text-[18px] font-semibold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><Glyph name={t} size={26} animate="none" /><span className="tz-display text-[17px] font-semibold">{t}</span></div><Board b={{ ...b, tag: { ...b.tag, name: t } }} compact /></li>)}</ol>
        </div>
        <MockFooter /><MockTabBar active={0} />
      </Frame>
    </Doc>
  );
}
