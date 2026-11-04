"use client";
import { LiveDot } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter, PostCard } from "@/components/mock";
export default function Page() {
  return (
    <Doc kicker="layouts · now" title="Now" lead="The live list: what is being said in the last 24 hours, newest and loudest first, posts and news woven together, a live dot and the cut-off time in the head.">
      <Frame title="Now page" note="One column; two from 900 px.">
        <MockHeader active={0} />
        <div className="p-4 @[900px]:p-6"><div className="mb-4 flex items-center gap-3"><LiveDot /><h2 className="tz-display text-[26px] font-bold">Одоо</h2><span className="tz-label">мэдээлэл --:-- хүртэл</span><span className="ml-auto flex gap-1"><span className="tz-pill is-on">Бүгд</span><span className="tz-pill">Пост</span><span className="tz-pill">Мэдээ</span></span></div><div className="grid gap-3 @[900px]:grid-cols-2"><PostCard /><PostCard news picture={false} /><PostCard picture={false} /><PostCard news /><PostCard /><PostCard picture={false} /></div></div>
        <MockFooter /><MockTabBar active={0} />
      </Frame>
    </Doc>
  );
}
