"use client";
import { useState } from "react";
import { Pill, Button, IconButton, Icon, ThemeToggle, useToast } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [on, setOn] = useState("Now");
  const [fav, setFav] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const save = () => { setBusy(true); setTimeout(() => { setBusy(false); toast("Saved", "ok"); }, 1400); };
  return (
    <Doc kicker="pill.tsx" title="Buttons" lead="Solid, brand, quiet, ghost and danger; three sizes; an icon before or after the words; icon-only buttons; loading and disabled states. A press is answered by the icon itself and a ring that leaves the edge, on one easing. Hover only tints." imports={["Button", "IconButton", "Pill", "ThemeToggle"]}>
      <Stage title="Tones" note="ink for most actions, brand for the one main action, quiet or ghost for the rest, danger for what cannot be undone. Click any of them." code={'<Button icon="arrow-right">Open</Button>\n<Button tone="brand" icon="arrow-right">Vote</Button>\n<Button tone="quiet" iconLeft="arrow-left">Back</Button>\n<Button tone="ghost">Cancel</Button>\n<Button tone="danger" icon="trash">Delete</Button>'}>
        <div className="flex flex-wrap items-center gap-3"><Button icon="arrow-right">Open</Button><Button tone="brand" icon="arrow-right">Vote</Button><Button tone="quiet" iconLeft="arrow-left">Back</Button><Button tone="ghost">Cancel</Button><Button tone="danger" icon="trash">Delete</Button></div>
      </Stage>
      <Stage title="Sizes" code={'<Button size="sm" icon="plus">Add</Button>\n<Button icon="plus">Add</Button>\n<Button size="lg" icon="plus">Add</Button>'}>
        <div className="flex flex-wrap items-center gap-3"><Button size="sm" icon="plus">Add</Button><Button icon="plus">Add</Button><Button size="lg" icon="plus">Add</Button><Button size="sm" tone="quiet" iconLeft="download">Export</Button><Button tone="quiet" iconLeft="download">Export</Button><Button size="lg" tone="quiet" iconLeft="download">Export</Button></div>
      </Stage>
      <Stage title="Icon answers the press" note="Read from the icon name: arrows and chevrons slide their way, refresh spins once, check / heart / star / plus draw themselves, anything else blinks." code={'<Button icon="arrow-right">slides</Button>   <Button icon="arrow-down">slides down</Button>\n<Button icon="refresh">spins</Button>        <Button icon="check">draws</Button>\n<Button icon="bell">blinks</Button>'}>
        <div className="flex flex-wrap items-center gap-3"><Button icon="arrow-right">Slides</Button><Button tone="quiet" icon="arrow-down">Slides down</Button><Button tone="quiet" icon="refresh">Spins</Button><Button tone="brand" icon="check">Draws</Button><Button tone="quiet" icon="heart">Draws</Button><Button tone="quiet" icon="bell">Blinks</Button></div>
      </Stage>
      <Stage title="IconButton" note="Icon only, with a label for screen readers and a title on hover; round by default, square on request; on={true} for a pressed state." code={'<IconButton icon="search" label="Search" />\n<IconButton icon="heart" label="Save" tone="brand" on={fav} onClick={() => setFav(!fav)} />\n<IconButton icon="trash" label="Delete" tone="danger" square />'}>
        <div className="flex flex-wrap items-center gap-3"><IconButton icon="search" label="Search" /><IconButton icon="refresh" label="Refresh" /><IconButton icon="heart" label="Save" tone={fav ? "brand" : "quiet"} on={fav} onClick={() => setFav(!fav)} /><IconButton icon="arrow-right" label="Next" tone="ink" /><IconButton icon="plus" label="Add" tone="brand" size="lg" /><IconButton icon="close" label="Close" size="sm" /><IconButton icon="trash" label="Delete" tone="danger" square /><IconButton icon="settings" label="Settings" tone="ghost" square /></div>
      </Stage>
      <Stage title="Loading, disabled, full width" code={'<Button loading={busy} icon="check" onClick={save}>Save</Button>\n<Button disabled>Disabled</Button>\n<Button full tone="brand" icon="arrow-right">Continue</Button>'}>
        <div className="flex flex-col gap-4"><div className="flex flex-wrap items-center gap-3"><Button loading={busy} icon="check" onClick={save}>Save</Button><Button tone="quiet" loading={busy} iconLeft="refresh" onClick={save}>Sync</Button><Button disabled icon="arrow-right">Disabled</Button><IconButton icon="send" label="Send" loading={busy} tone="brand" /></div><div className="max-w-[360px]"><Button full tone="brand" icon="arrow-right">Continue</Button></div></div>
      </Stage>
      <Stage title="Pill" note="The glass pill: a link, a filter, a tag. on={true} renders it pressed (aria-pressed)." code={'<Pill href="/stories" icon="arrow-up-right">All frames</Pill>\n<Pill on={v === "Now"} onClick={() => set("Now")}>Now</Pill>'}>
        <div className="flex flex-wrap items-center gap-2"><Pill href="/board" icon="arrow-up-right">All frames</Pill><Pill href="https://tsaaguur.mn" icon="out">tsaaguur.mn</Pill>{["Now", "7 days", "People"].map((v) => <Pill key={v} on={on === v} onClick={() => setOn(v)}>{v}</Pill>)}<Pill icon="spool">Threads</Pill></div>
      </Stage>
      <Stage title="Glass button, kicker" note="On pictures: a white glass round button, a dark glass kicker." dark code={'<button className="tz-glass-button h-11 w-11"><Icon name="chevron-right" /></button>\n<span className="tz-kicker"><i />first</span>'}>
        <div className="tz-dots flex items-center gap-3 rounded-[10px] bg-[#0f1013] p-6"><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-left" className="h-4 w-4" /></button><button type="button" className="tz-glass-button h-11 w-11"><Icon name="chevron-right" className="h-4 w-4" /></button><span className="tz-kicker"><i />No. 1 · 7 days</span><button type="button" className="tz-glass-button h-9 w-9"><Icon name="pause" className="h-3.5 w-3.5" /></button></div>
      </Stage>
      <Stage title="ThemeToggle" note="Light / dark; a view transition grows a circle from the button. Pass a function as children to draw your own content (dark is null before the first paint); className is then the whole class of the button." code={'<ThemeToggle />\n<ThemeToggle className="flex flex-col items-center gap-1 text-[12px]">{(dark) => <><Icon name={dark ? "sun" : "moon"} />{dark ? "Light" : "Dark"}</>}</ThemeToggle>'}><div className="flex items-center gap-6"><ThemeToggle /><ThemeToggle className="tz-hit flex h-[54px] w-[76px] flex-col items-center justify-center gap-1 rounded-[14px] text-[12px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{(dark) => <><Icon name={dark ? "sun" : "moon"} className="h-5 w-5" />{dark === null ? "Mode" : dark ? "Light" : "Dark"}</>}</ThemeToggle></div></Stage>
      <Stage title="Props">
        <Props rows={[["Button.tone", '"ink" | "brand" | "quiet" | "ghost" | "danger"', "ink by default"], ["Button.size", '"sm" | "md" | "lg"', "md by default"], ["Button.icon / iconLeft", "IconName", "after or before the words; the press animation follows the icon"], ["Button.loading / disabled / full", "boolean", "spinner in the icon slot + aria-busy; greyed; block width"], ["Button.href / onClick / type", "string / (e) => void / button|submit", "Link, external anchor or button"], ["IconButton.icon / label", "IconName / string", "label is required (aria-label + title)"], ["IconButton.on / square", "boolean", "pressed state; 10 px corners instead of round"], ["Pill.href / on / icon", "string / boolean / IconName", "/ is a Link, https a new tab, none a button"], ["iconMotion(name)", "() => motion", "which press animation an icon gets"]]} />
      </Stage>
    </Doc>
  );
}
