"use client";
import { useState } from "react";
import { Pill, Button, Icon, ThemeToggle } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [on, setOn] = useState("Now");
  return (
    <Doc kicker="pill.tsx · theme-toggle.tsx" title="Buttons" lead="Two small controls: a glass pill (a link, a filter, a tag) and a solid button. Both round, one line; the icon sits after the words. The glass button sits on pictures." imports={["Button", "Pill", "ThemeToggle"]}>
      <Stage title="Button" note="Solid by default (ink), brand for the one main action, quiet for the rest. href starting with / is a Link, https opens a new tab, no href is a button." code={'<Button href="/story/x" icon="arrow-right">Open story</Button>\n<Button tone="brand" icon="arrow-right">Vote</Button>\n<Button tone="quiet" icon="arrow-left" onClick={back}>Back</Button>'}>
        <div className="flex flex-wrap items-center gap-3"><Button href="/board" icon="arrow-right">Open story</Button><Button tone="brand" icon="arrow-right">Vote</Button><Button tone="quiet" icon="arrow-left">Back</Button><Button icon="check">Save</Button><Button tone="quiet">Cancel</Button></div>
      </Stage>
      <Stage title="Pill" note="on={true} renders it pressed (aria-pressed)." code={'<Pill href="/stories" icon="arrow-up-right">All frames</Pill>\n<Pill on={v === "Now"} onClick={() => set("Now")}>Now</Pill>'}>
        <div className="flex flex-wrap items-center gap-2">
          <Pill href="/board" icon="arrow-up-right">All frames</Pill>
          <Pill href="https://tsaaguur.mn" icon="out">tsaaguur.mn</Pill>
          {["Now", "7 days", "People"].map((v) => <Pill key={v} on={on === v} onClick={() => setOn(v)}>{v}</Pill>)}
          <Pill icon="spool">Threads</Pill>
        </div>
      </Stage>
      <Stage title="Glass button, kicker" note="On pictures: a white glass round button, a dark glass kicker." dark code={'<button className="tz-glass-button h-11 w-11"><Icon name="chevron-right" /></button>\n<span className="tz-kicker"><i />first</span>'}>
        <div className="tz-dots flex items-center gap-3 rounded-[10px] bg-[#0f1013] p-6"><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-left" className="h-4 w-4" /></button><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-right" className="h-4 w-4" /></button><span className="tz-kicker"><i />No. 1 · 7 days</span><button type="button" className="tz-glass-button h-9 w-9"><Icon name="pause" className="h-3.5 w-3.5" /></button></div>
      </Stage>
      <Stage title="ThemeToggle" note="Light / dark; a view transition grows a circle from the button." code={'<ThemeToggle />'}><ThemeToggle /></Stage>
      <Stage title="Props">
        <Props rows={[["Button.tone", '"ink" | "brand" | "quiet"', "solid ink, brand blue, outlined"], ["Button.href / onClick", "string / () => void", "Link, external anchor or button"], ["Button.icon / Pill.icon", "IconName", "after the words"], ["Pill.href", "string", "/ is a Link, https a new tab, none a button"], ["Pill.on", "boolean", "pressed state (aria-pressed)"]]} />
      </Stage>
    </Doc>
  );
}
