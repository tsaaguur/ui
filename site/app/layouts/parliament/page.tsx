"use client";
import { Avatar, Icon } from "@tsaaguur/ui";
import { Doc } from "@/components/doc";
import { Frame, MockHeader, MockTabBar, MockFooter, Figure, Lines } from "@/components/mock";
const MEMBERS = ["Н.Учрал", "Л.Энх-Амгалан", "Т.Аубакир", "Б.Батбаяр", "Ж.Сүхбаатар", "Д.Амарбаясгалан", "Х.Нямбаатар", "С.Амарсайхан"];
export default function Page() {
  return (
    <Doc kicker="layouts · parliament" title="Parliament" lead="A head card with the window and party chips and four figures, the top three as podium cards, then the full leaderboard with sortable columns; rows open an inline panel.">
      <Frame title="Parliament page" note="The podium is three across from 700 px; the leaderboard columns collapse to name + rating on a phone.">
        <MockHeader active={3} />
        <div className="p-4 @[900px]:p-6">
          <section className="tz-card p-4"><div className="flex flex-wrap items-center gap-2"><h2 className="tz-display text-[26px] font-bold">Парламент</h2><span className="tz-pill is-on">7 хоног</span><span className="ml-auto flex gap-1">{["МАН", "АН", "ХҮН", "бусад"].map((p) => <span key={p} className="tz-pill">{p} --</span>)}</span></div><div className="mt-4 grid grid-cols-2 gap-2 @[700px]:grid-cols-4"><Figure label="Идэвхтэй гишүүн" w="6ch" /><Figure label="Ажлын пост" w="6ch" /><Figure label="Идэвх" w="4ch" /><Figure label="Мэдээнд дурдагдсан" w="4ch" /></div></section>
          <section className="mt-4 grid gap-3 @[700px]:grid-cols-3">{MEMBERS.slice(0, 3).map((m, i) => <div key={m} className="tz-card p-4"><div className="flex items-center gap-3"><span className="tz-num grid h-7 w-7 place-items-center rounded-full bg-foreground text-[12px] font-semibold text-background">{i + 1}</span><Avatar name={m} size={44} /><div><div className="font-medium">{m}</div><span className="tz-label">нам · --</span></div></div><div className="mt-4 flex items-baseline gap-2"><span className="h-8 w-14 rounded-[6px] bg-muted" /><span className="tz-label">рейтинг</span></div><div className="mt-3 flex flex-col gap-1.5"><span className="h-1.5 w-full rounded-full bg-muted"><span className="block h-1.5 w-2/3 rounded-full bg-brand/70" /></span><span className="h-1.5 w-full rounded-full bg-muted"><span className="block h-1.5 w-1/3 rounded-full bg-warm/70" /></span></div></div>)}</section>
          <section className="tz-card mt-4 overflow-hidden"><div className="tz-label hidden grid-cols-[2rem_1fr_6rem_6rem_6rem_6rem] gap-3 border-b border-hairline px-4 py-2 @[700px]:grid"><span>#</span><span>гишүүн</span><span className="text-right">рейтинг</span><span className="text-right">ажил</span><span className="text-right">пост</span><span className="text-right">мэдээ</span></div><ol>{MEMBERS.slice(3).map((m, i) => <li key={m} className="grid grid-cols-[2rem_1fr_6rem] items-center gap-3 border-t border-hairline px-4 py-2.5 @[700px]:grid-cols-[2rem_1fr_6rem_6rem_6rem_6rem]"><span className="tz-num text-[12px] text-muted-foreground">{i + 4}</span><span className="flex items-center gap-2"><Avatar name={m} size={26} /><span className="text-[13.5px]">{m}</span><Icon name="chevron-down" className="h-3.5 w-3.5 opacity-40" /></span><span className="h-2 justify-self-end w-14 rounded-full bg-muted" /><span className="hidden h-2 w-10 justify-self-end rounded-full bg-muted @[700px]:block" /><span className="hidden h-2 w-8 justify-self-end rounded-full bg-muted @[700px]:block" /><span className="hidden h-2 w-8 justify-self-end rounded-full bg-muted @[700px]:block" /></li>)}</ol><div className="px-4 py-3"><Lines n={1} w={["40%"]} /></div></section>
        </div>
        <MockFooter /><MockTabBar active={3} />
      </Frame>
    </Doc>
  );
}
