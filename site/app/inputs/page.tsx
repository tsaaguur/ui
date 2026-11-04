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
  const [chips, setChips] = useState(["нойтон цас", "төсвийн тодотгол", "н.учрал"]);
  return (
    <Doc kicker="inputs.tsx" title="Оролт" lead="Талбар, сонголт, сонгох хайрцаг, радио, унтраалга, гулсуур, хэсэгчилсэн товч, чип. Браузерын select, checkbox байхгүй: бүгд өөрийнх, гар дээр ажиллана (сум, зай, Enter, Esc).">
      <Stage title="Input, Textarea, SearchField" code={'<Input label="И-мэйл" icon="mail" placeholder="name@mail.mn" hint="..." />\n<Input label="Нууц үг" type="password" error="Багадаа 8 тэмдэгт" />\n<SearchField value={q} onChange={setQ} />'}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="И-мэйл" icon="mail" placeholder="name@mail.mn" hint="Хариу энд ирнэ" />
          <Input label="Нууц үг" type="password" icon="lock" defaultValue="1234" error="Багадаа 8 тэмдэгт" />
          <Textarea label="Тайлбар" placeholder="Юу болсон бэ?" className="sm:col-span-2" />
          <SearchField value={q} onChange={setQ} placeholder="Сэдэв хайх" className="sm:col-span-2" />
        </div>
      </Stage>
      <Stage title="Select" note="Listbox: сумаар гүйлгэнэ, Enter сонгоно, Esc хаана; гадна дарахад хаагдана." code={'<Select label="Эх сурвалж" options={[{ value: "fb", label: "Facebook", icon: "banner" }, ...]} value={v} onChange={setV} />'}>
        <div className="max-w-[320px]"><Select label="Эх сурвалж" value={sel} onChange={setSel} options={[{ value: "fb", label: "Facebook", icon: "banner", hint: "хуудас, хүн" }, { value: "news", label: "Мэдээ", icon: "sheet", hint: "19 сайт" }, { value: "threads", label: "Threads", icon: "spool" }, { value: "parliament", label: "Парламент", icon: "dome", hint: "126 гишүүн" }]} /></div>
      </Stage>
      <Stage title="Checkbox, RadioGroup, Switch" code={'<Checkbox checked={c} onChange={setC} label="..." />\n<RadioGroup options={[...]} value={r} onChange={setR} />\n<Switch checked={on} onChange={setOn} label="..." />'}>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-3"><Checkbox checked={c1} onChange={setC1} label="Зурагтай пост" hint="зураг нь хадгалагдсан" /><Checkbox checked={c2} onChange={setC2} label="Зөвхөн Монгол хэлээр" /><Checkbox checked={false} onChange={() => {}} label="Идэвхгүй" disabled /></div>
          <RadioGroup label="Хугацаа" value={r} onChange={setR} options={[{ value: "day", label: "24 цаг" }, { value: "week", label: "7 хоног", hint: "анхдагч" }, { value: "month", label: "30 хоног" }]} />
          <div className="flex flex-col gap-3"><Switch checked={sw} onChange={setSw} label="Шууд шинэчлэх" /><Switch checked={false} onChange={() => {}} label="Идэвхгүй" disabled /></div>
        </div>
      </Stage>
      <Stage title="Slider" code={'<Slider label="Босго" value={v} onChange={setV} min={0} max={100} format={(x) => `${x}%`} />'}>
        <div className="max-w-[420px]"><Slider label="Босго" value={v} onChange={setV} format={(x) => `${x}%`} /></div>
      </Stage>
      <Stage title="Segmented, Chip" code={'<Segmented options={[{ value: "now", label: "Одоо", icon: "flame" }, ...]} value={seg} onChange={setSeg} />\n<Chip icon="tag" onRemove={...}>нойтон цас</Chip>'}>
        <div className="flex flex-col gap-4">
          <Segmented value={seg} onChange={setSeg} options={[{ value: "now", label: "Одоо", icon: "flame" }, { value: "week", label: "7 хоног" }, { value: "people", label: "Хүмүүс", icon: "people" }]} />
          <div className="flex flex-wrap items-center gap-2">{chips.map((c) => <Chip key={c} icon="tag" onRemove={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>)}<Chip tone="brand">шинэ</Chip><Chip tone="up">өсч байна</Chip><Chip tone="down">намжсан</Chip><Chip tone="warm">мэдээ</Chip>{!chips.length ? <Button tone="quiet" onClick={() => setChips(["нойтон цас", "төсвийн тодотгол", "н.учрал"])}>буцаах</Button> : null}</div>
        </div>
      </Stage>
      <Stage title="Props"><Props rows={[["Input / Textarea", "label, hint, error, icon, right + native props", "талбар; error нь улаан хүрээ, доорх мөр"], ["Select", "options: {value,label,hint?,icon?}[], value, onChange, placeholder", "listbox, гар дээр"], ["Checkbox / Switch", "checked, onChange, label, hint, disabled", "role checkbox / switch"], ["RadioGroup", "options, value, onChange, label", "role radiogroup, сум"], ["Slider", "value, onChange, min, max, step, label, format", "role slider, сум, Home, End"], ["Segmented", "options {value,label,icon?}, value, onChange", "aria-pressed"], ["Chip", "icon, tone, onRemove", "хасах товчтой шошго"]]} /></Stage>
    </Doc>
  );
}
