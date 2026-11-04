"use client";
import { useState } from "react";
import { Tabs, Breadcrumb, Pagination, Menu, Stepper, Pill, Button } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const [tab, setTab] = useState("posts");
  const [page, setPage] = useState(3);
  const [step, setStep] = useState(1);
  return (
    <Doc kicker="navigation.tsx" title="Navigation" lead="Tabs with a sliding underline, breadcrumb, pagination, menu, stepper. Keyboard: arrows on tabs, arrows and Enter in menus, Esc closes." imports={["Tabs", "Breadcrumb", "Pagination", "Menu", "Stepper", "type MenuItem"]}>
      <Stage title="Tabs" code={'<Tabs items={[{ value: "posts", label: "Posts", icon: "banner" }, ...]} value={tab} onChange={setTab} />'}>
        <Tabs value={tab} onChange={setTab} items={[{ value: "posts", label: "Posts", icon: "banner" }, { value: "news", label: "News", icon: "sheet" }, { value: "threads", label: "Threads", icon: "spool" }, { value: "replies", label: "Replies", icon: "reply" }]} />
        <p className="mt-3 text-[13.5px] text-muted-foreground">Selected: {tab}</p>
      </Stage>
      <Stage title="Breadcrumb" code={'<Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/stories", label: "Stories" }, { label: "Ulaanbaatar" }]} />'}>
        <Breadcrumb items={[{ href: "/", label: "Home" }, { href: "/board", label: "Stories" }, { label: "Ulaanbaatar" }]} />
      </Stage>
      <Stage title="Pagination" code={'<Pagination page={page} pages={12} onChange={setPage} />'}>
        <Pagination page={page} pages={12} onChange={setPage} />
      </Stage>
      <Stage title="Menu" code={'<Menu trigger={<Pill icon="chevron-down">Actions</Pill>} items={[{ label: "Edit", icon: "edit" }, { divider: true }, { label: "Delete", icon: "trash", danger: true }]} />'}>
        <div className="flex gap-3"><Menu trigger={<Pill icon="chevron-down">Actions</Pill>} items={[{ label: "Edit", icon: "edit" }, { label: "Copy link", icon: "link" }, { label: "Share", icon: "share" }, { divider: true, label: "" }, { label: "Delete", icon: "trash", danger: true }]} /><Menu align="right" trigger={<Button tone="quiet" icon="more">More</Button>} items={[{ label: "Home", icon: "ger", href: "/" }, { label: "Icons", icon: "sun", href: "/icons" }]} /></div>
      </Stage>
      <Stage title="Stepper" code={'<Stepper steps={[{ label: "Export" }, { label: "Stories" }, { label: "Tags" }, { label: "Check" }]} current={step} />'}>
        <Stepper current={step} steps={[{ label: "Export", hint: "14 days" }, { label: "Stories", hint: "registry" }, { label: "Tags", hint: "chunk agents" }, { label: "Check", hint: "rules as code" }]} />
        <div className="mt-2 flex gap-2"><Pill onClick={() => setStep(Math.max(0, step - 1))} icon="chevron-left">Previous</Pill><Pill onClick={() => setStep(Math.min(3, step + 1))} icon="chevron-right">Next</Pill></div>
      </Stage>
      <Stage title="Props"><Props rows={[["Tabs", "items {value,label,icon?}, value, onChange", "role tablist, arrows"], ["Breadcrumb", "items {href?,label}", "aria-current page on the last"], ["Pagination", "page, pages, onChange", "1 ... x-1 x x+1 ... n"], ["Menu", "trigger, items {label,icon,onSelect,href,danger,divider}, align", "role menu, Esc"], ["Stepper", "steps {label,hint}, current", "done, current, upcoming"]]} /></Stage>
    </Doc>
  );
}
