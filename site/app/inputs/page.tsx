"use client";
import { useState } from "react";
import { Input, Textarea, SearchField, Select, Checkbox, RadioGroup, Switch, Slider, Segmented, Chip, Button } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [sel, setSel] = useState<string | null>("fb");
  const [q, setQ] = useState("");
  const [c1, setC1] = useState(true); const [c2, setC2] = useState(false);
  const [r, setR] = useState("week");
  const [sw, setSw] = useState(true);
  const [v, setV] = useState(35);
  const [seg, setSeg] = useState("now");
  const [chips, setChips] = useState(["wet snow", "budget revision", "n.uchral"]);
  return (
    <Doc kicker="inputs.tsx" title="Inputs" lead="Fields, select, checkbox, radio, switch, slider, segmented control, chip. No native select or checkbox: all ours, all keyboard (arrows, space, Enter, Esc)." imports={["Input", "Textarea", "SearchField", "Select", "Checkbox", "RadioGroup", "Switch", "Slider", "Segmented", "Chip"]}>
      <Stage title="Input, Textarea, SearchField" code={'<Input label="Email" icon="mail" placeholder="name@mail.mn" hint="..." />\n<Input label="Password" type="password" error="At least 8 characters" />\n<SearchField value={q} onChange={setQ} />'}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email" icon="mail" placeholder="name@mail.mn" hint="Replies arrive here" />
          <Input label="Password" type="password" icon="lock" defaultValue="1234" error="At least 8 characters" />
          <Textarea label="Note" placeholder="What happened?" className="sm:col-span-2" />
          <SearchField value={q} onChange={setQ} placeholder="Search topics" className="sm:col-span-2" />
        </div>
      </Stage>
      <Stage title="Select" note="A listbox: arrows move, Enter picks, Esc closes; a click outside closes." code={'<Select label="Source" options={[{ value: "fb", label: "Facebook", icon: "banner" }, ...]} value={v} onChange={setV} />'}>
        <div className="max-w-[320px]"><Select label="Source" value={sel} onChange={setSel} options={[{ value: "fb", label: "Facebook", icon: "banner", hint: "pages, people" }, { value: "news", label: "News", icon: "sheet", hint: "19 sites" }, { value: "threads", label: "Threads", icon: "spool" }, { value: "parliament", label: "Parliament", icon: "dome", hint: "126 members" }]} /></div>
      </Stage>
      <Stage title="Checkbox, RadioGroup, Switch" code={'<Checkbox checked={c} onChange={setC} label="..." />\n<RadioGroup options={[...]} value={r} onChange={setR} />\n<Switch checked={on} onChange={setOn} label="..." />'}>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-3"><Checkbox checked={c1} onChange={setC1} label="Posts with a picture" hint="picture stored" /><Checkbox checked={c2} onChange={setC2} label="Mongolian only" /><Checkbox checked={false} onChange={() => {}} label="Disabled" disabled /></div>
          <RadioGroup label="Window" value={r} onChange={setR} options={[{ value: "day", label: "24 hours" }, { value: "week", label: "7 days", hint: "default" }, { value: "month", label: "30 days" }]} />
          <div className="flex flex-col gap-3"><Switch checked={sw} onChange={setSw} label="Live updates" /><Switch checked={false} onChange={() => {}} label="Disabled" disabled /></div>
        </div>
      </Stage>
      <Stage title="Slider" code={'<Slider label="Threshold" value={v} onChange={setV} min={0} max={100} format={(x) => `${x}%`} />'}>
        <div className="max-w-[420px]"><Slider label="Threshold" value={v} onChange={setV} format={(x) => `${x}%`} /></div>
      </Stage>
      <Stage title="Segmented, Chip" code={'<Segmented options={[{ value: "now", label: "Now", icon: "flame" }, ...]} value={seg} onChange={setSeg} />\n<Chip icon="tag" onRemove={...}>wet snow</Chip>'}>
        <div className="flex flex-col gap-4">
          <Segmented value={seg} onChange={setSeg} options={[{ value: "now", label: "Now", icon: "flame" }, { value: "week", label: "7 days" }, { value: "people", label: "People", icon: "people" }]} />
          <div className="flex flex-wrap items-center gap-2">{chips.map((c) => <Chip key={c} icon="tag" onRemove={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>)}<Chip tone="brand">new</Chip><Chip tone="up">rising</Chip><Chip tone="down">fading</Chip><Chip tone="warm">news</Chip>{!chips.length ? <Button tone="quiet" onClick={() => setChips(["wet snow", "budget revision", "n.uchral"])}>Reset</Button> : null}</div>
        </div>
      </Stage>
      <Stage title="Props"><Props rows={[["Input / Textarea", "label, hint, error, icon, right + native props", "field; error turns the border red and shows the line below"], ["Select", "options: {value,label,hint?,icon?}[], value, onChange, placeholder", "listbox with keyboard"], ["Checkbox / Switch", "checked, onChange, label, hint, disabled", "role checkbox / switch"], ["RadioGroup", "options, value, onChange, label", "role radiogroup, arrows"], ["Slider", "value, onChange, min, max, step, label, format", "role slider, arrows, Home, End"], ["Segmented", "options {value,label,icon?}, value, onChange", "aria-pressed"], ["Chip", "icon, tone, onRemove", "a label with a remove button"]]} /></Stage>
    </Doc>
  );
}
