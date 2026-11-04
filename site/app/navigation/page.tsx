"use client";
import { useState } from "react";
import { Tabs, Breadcrumb, Pagination, Menu, Stepper, Pill, Button } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [tab, setTab] = useState("posts");
  const [page, setPage] = useState(3);
  const [step, setStep] = useState(1);
  return (
    <Doc kicker="navigation.tsx" title="Замчлал" lead="Таб (доогуур зураас гулсана), замчлал, хуудаслалт, цэс, алхам. Гар: таб дээр сум, цэсэнд сум ба Enter, Esc хаана.">
      <Stage title="Tabs" code={'<Tabs items={[{ value: "posts", label: "Постууд", icon: "banner" }, ...]} value={tab} onChange={setTab} />'}>
        <Tabs value={tab} onChange={setTab} items={[{ value: "posts", label: "Постууд", icon: "banner" }, { value: "news", label: "Мэдээ", icon: "sheet" }, { value: "threads", label: "Threads", icon: "spool" }, { value: "replies", label: "Хариултууд", icon: "reply" }]} />
        <p className="mt-3 text-[13.5px] text-muted-foreground">Сонгосон: {tab}</p>
      </Stage>
      <Stage title="Breadcrumb" code={'<Breadcrumb items={[{ href: "/", label: "Нүүр" }, { href: "/stories", label: "Түүхүүд" }, { label: "Улаанбаатар" }]} />'}>
        <Breadcrumb items={[{ href: "/", label: "Нүүр" }, { href: "/board", label: "Түүхүүд" }, { label: "Улаанбаатар" }]} />
      </Stage>
      <Stage title="Pagination" code={'<Pagination page={page} pages={12} onChange={setPage} />'}>
        <Pagination page={page} pages={12} onChange={setPage} />
      </Stage>
      <Stage title="Menu" code={'<Menu trigger={<Pill icon="chevron-down">Үйлдэл</Pill>} items={[{ label: "Засах", icon: "edit" }, { divider: true }, { label: "Устгах", icon: "trash", danger: true }]} />'}>
        <div className="flex gap-3"><Menu trigger={<Pill icon="chevron-down">Үйлдэл</Pill>} items={[{ label: "Засах", icon: "edit" }, { label: "Хуулах холбоос", icon: "link" }, { label: "Хуваалцах", icon: "share" }, { divider: true, label: "" }, { label: "Устгах", icon: "trash", danger: true }]} /><Menu align="right" trigger={<Button tone="quiet" icon="more">Бусад</Button>} items={[{ label: "Нүүр", icon: "ger", href: "/" }, { label: "Дүрс", icon: "sun", href: "/icons" }]} /></div>
      </Stage>
      <Stage title="Stepper" code={'<Stepper steps={[{ label: "Экспорт" }, { label: "Түүхүүд" }, { label: "Шошго" }, { label: "Шалгалт" }]} current={step} />'}>
        <Stepper current={step} steps={[{ label: "Экспорт", hint: "14 хоног" }, { label: "Түүхүүд", hint: "registry" }, { label: "Шошго", hint: "chunk agents" }, { label: "Шалгалт", hint: "rules as code" }]} />
        <div className="mt-2 flex gap-2"><Pill onClick={() => setStep(Math.max(0, step - 1))} icon="chevron-left">өмнөх</Pill><Pill onClick={() => setStep(Math.min(3, step + 1))} icon="chevron-right">дараах</Pill></div>
      </Stage>
      <Stage title="Props"><Props rows={[["Tabs", "items {value,label,icon?}, value, onChange", "role tablist, сум"], ["Breadcrumb", "items {href?,label}", "aria-current page сүүлд"], ["Pagination", "page, pages, onChange", "1 ... x-1 x x+1 ... n"], ["Menu", "trigger, items {label,icon,onSelect,href,danger,divider}, align", "role menu, Esc"], ["Stepper", "steps {label,hint}, current", "дууссан, одоогийн, ирэх"]]} /></Stage>
    </Doc>
  );
}
