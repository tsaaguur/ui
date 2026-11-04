"use client";
import { useState } from "react";
import { Pill } from "@tsaaguur/ui";
import { Doc, Stage } from "@/components/doc";
const KF: [string, string][] = [["tz-rise", "enter from 18 px below, 0.7 s"], ["tz-fade", "fade in, 0.5 s"], ["tz-roll-up", "line rolls up, 0.28 s"], ["tz-draw", "stroke draws itself, 0.9 s"], ["tz-breathe", "dot breathes, 2.6 s loop"], ["tz-live", "pulse, 2.4 s loop"], ["tz-hero-copy", "hero copy, 0.6 s"], ["tz-g-flicker", "flame flickers"], ["tz-g-drift", "wind drifts"], ["tz-g-redraw", "heartbeat redraws"], ["tz-g-flash", "lightning flashes"], ["tz-g-swing", "medal swings"], ["tz-g-flip", "coin flips"], ["tz-g-spin", "globe spins"], ["tz-g-bob", "book, person bob"], ["tz-g-tip", "scales tip"], ["tz-g-drop", "ballot drops"], ["tz-g-blink", "window blinks"]];
export default function Page() {
  const [k, setK] = useState(0);
  return (
    <Doc kicker="styles.css" title="Motion" lead="Every keyframe in one file, on one curve. Each motion means something: enter, draw, breathe, or the pictogram's own move. All of it stops under prefers-reduced-motion.">
      <Stage title="Keyframes" note="Press replay to see them again." code={'.tz-rise { animation: tz-rise 0.7s var(--ease) both; }'}>
        <div className="mb-4"><Pill onClick={() => setK(k + 1)} icon="play">Replay</Pill></div>
        <ul key={k} className="grid gap-2 sm:grid-cols-2">
          {KF.map(([c, w]) => <li key={c} className="flex items-center gap-3 rounded-[10px] border border-hairline p-3"><span className={`inline-block h-6 w-6 rounded-[6px] bg-brand ${c}`} /><span className="min-w-0"><span className="tz-num block text-[12px]">.{c}</span><span className="block text-[12.5px] text-muted-foreground">{w}</span></span></li>)}
        </ul>
      </Stage>
    </Doc>
  );
}
