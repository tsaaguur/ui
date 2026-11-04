"use client";
import { useState } from "react";
import { Alert, useToast, Dialog, Drawer, Tooltip, Progress, Ring, Spinner, Skeleton, Empty, Button, Pill, Input } from "@tsaaguur/ui";
import { Doc, Stage, Props } from "@/components/doc";

export default function Page() {
  const toast = useToast();
  const [dlg, setDlg] = useState(false);
  const [drw, setDrw] = useState(false);
  const [p, setP] = useState(42);
  return (
    <Doc kicker="feedback.tsx" title="Feedback" lead="Alerts with a tint and a leading mark (never a side bar), toasts that rise from the bottom and leave on their own, a glass dialog in the middle, a drawer from the right. Progress, ring, spinner, skeleton, empty state." imports={["Alert", "ToastProvider", "useToast", "Dialog", "Drawer", "Tooltip", "Progress", "Ring", "Spinner", "Skeleton", "Empty"]}>
      <Stage title="Alert" code={'<Alert tone="ok" title="Saved">...</Alert>   // info | ok | warn | bad'}>
        <div className="flex flex-col gap-2"><Alert tone="info" title="Info">Threads tags exist since 2026-11-03.</Alert><Alert tone="ok" title="Saved">126 members, 465 declarations.</Alert><Alert tone="warn" title="Heads up">The x2 clone is 5 commits behind.</Alert><Alert tone="bad" title="Error" onClose={() => {}}>No Threads posts in the last 9 hours.</Alert></div>
      </Stage>
      <Stage title="Toast" note="useToast() inside a <ToastProvider>." code={'const toast = useToast();\ntoast("Saved", "ok");'}>
        <div className="flex flex-wrap gap-2"><Button onClick={() => toast("Saved", "ok")} icon="check">ok</Button><Button tone="quiet" onClick={() => toast("You are offline", "warn")}>warn</Button><Button tone="quiet" onClick={() => toast("Request failed", "bad")}>bad</Button><Button tone="quiet" onClick={() => toast("New version ready")}>info</Button></div>
      </Stage>
      <Stage title="Dialog, Drawer" note="Focus stays inside, Esc closes, the page behind does not scroll." code={'<Dialog open={o} onClose={...} title="..." footer={<Button>Yes</Button>}>...</Dialog>\n<Drawer open={o} onClose={...} title="..." side="right">...</Drawer>'}>
        <div className="flex gap-2"><Button onClick={() => setDlg(true)}>Open dialog</Button><Button tone="quiet" onClick={() => setDrw(true)} icon="chevrons-right">Open drawer</Button></div>
        <Dialog open={dlg} onClose={() => setDlg(false)} title="Merge topics?" footer={<><Button tone="quiet" onClick={() => setDlg(false)}>Cancel</Button><Button onClick={() => { setDlg(false); toast("Merged", "ok"); }} icon="check">Merge</Button></>}>&quot;viva city bear&quot; becomes part of the story &quot;bear in the suburbs&quot;. This cannot be undone.</Dialog>
        <Drawer open={drw} onClose={() => setDrw(false)} title="Filters"><div className="flex flex-col gap-4"><Input label="Source" placeholder="all" /><Input label="Window" placeholder="7 days" /><Button onClick={() => setDrw(false)} icon="check">Apply</Button></div></Drawer>
      </Stage>
      <Stage title="Tooltip" code={'<Tooltip text="Last 24 hours"><Pill icon="help">?</Pill></Tooltip>'}><Tooltip text="Most discussed in the last 24 hours"><Pill icon="help">What is Now</Pill></Tooltip></Stage>
      <Stage title="Progress, Ring, Spinner, Skeleton" code={'<Progress value={p} label="Loading" />  <Ring value={p} />  <Spinner />  <Skeleton className="h-4 w-2/3" />'}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-4"><Progress value={p} label="Export" /><Progress value={100} label="Tags" tone="up" /><div className="flex gap-2"><Pill onClick={() => setP(Math.max(0, p - 10))}>-10</Pill><Pill onClick={() => setP(Math.min(100, p + 10))}>+10</Pill></div></div>
          <div className="flex items-center gap-6"><Ring value={p} /><Spinner className="h-6 w-6" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-20 w-full" /></div></div>
        </div>
      </Stage>
      <Stage title="Empty" code={'<Empty icon="search" title="No results" hint="..." action={<Button>...</Button>} />'}><Empty icon="search" title="No topics found" hint="Try another word, or switch to the 30-day window." action={<Button tone="quiet" icon="refresh">Clear</Button>} /></Stage>
      <Stage title="Props"><Props rows={[["Alert", "tone, title, onClose", "role status / alert"], ["useToast", "(text, tone) => void", "inside ToastProvider"], ["Dialog", "open, onClose, title, footer", "aria-modal, focus trapped"], ["Drawer", "open, onClose, title, side right|bottom", "same"], ["Tooltip", "text", "hover, focus"], ["Progress / Ring", "value 0-100, label, tone / size", "role progressbar"], ["Skeleton", "className", "size via className"], ["Empty", "icon, title, hint, action", "empty state"]]} /></Stage>
    </Doc>
  );
}
