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
    <Doc kicker="feedback.tsx" title="Хариу" lead="Мэдэгдэл нь өнгөт дэвсгэр ба эхний дүрс (зүүн хажуугийн зураас хэзээ ч биш), тоаст нь доороос ирээд өөрөө явна, диалог нь дунд шилэн хуудас, хажуу самбар баруунаас. Явц, цагираг, эргэлдэгч, араг яс, хоосон төлөв.">
      <Stage title="Alert" code={'<Alert tone="ok" title="Хадгалагдлаа">...</Alert>   // info | ok | warn | bad'}>
        <div className="flex flex-col gap-2"><Alert tone="info" title="Мэдээлэл">Threads-ийн шошго 2026-11-03-аас хойш л бий.</Alert><Alert tone="ok" title="Хадгалагдлаа">126 гишүүн, 465 мэдүүлэг.</Alert><Alert tone="warn" title="Анхаар">x2-ийн clone 5 commit хоцорч байна.</Alert><Alert tone="bad" title="Алдаа" onClose={() => {}}>Сүүлийн 9 цагт Threads пост ирээгүй.</Alert></div>
      </Stage>
      <Stage title="Toast" note="<ToastProvider> дотор useToast()." code={'const toast = useToast();\ntoast("Хадгалагдлаа", "ok");'}>
        <div className="flex flex-wrap gap-2"><Button onClick={() => toast("Хадгалагдлаа", "ok")} icon="check">ok</Button><Button tone="quiet" onClick={() => toast("Сүлжээгүй байна", "warn")}>warn</Button><Button tone="quiet" onClick={() => toast("Хүсэлт амжилтгүй", "bad")}>bad</Button><Button tone="quiet" onClick={() => toast("Шинэ хувилбар бэлэн")}>info</Button></div>
      </Stage>
      <Stage title="Dialog, Drawer" note="Фокус дотроо, Esc хаана, арын хуудас гүйлгэгдэхгүй." code={'<Dialog open={o} onClose={...} title="..." footer={<Button>Тийм</Button>}>...</Dialog>\n<Drawer open={o} onClose={...} title="..." side="right">...</Drawer>'}>
        <div className="flex gap-2"><Button onClick={() => setDlg(true)}>Диалог нээх</Button><Button tone="quiet" onClick={() => setDrw(true)} icon="chevrons-right">Хажуу самбар</Button></div>
        <Dialog open={dlg} onClose={() => setDlg(false)} title="Сэдвийг нэгтгэх үү?" footer={<><Button tone="quiet" onClick={() => setDlg(false)}>Болих</Button><Button onClick={() => { setDlg(false); toast("Нэгтгэлээ", "ok"); }} icon="check">Нэгтгэх</Button></>}>&quot;вива сити баавгай&quot; нь &quot;баавгай суурьшилд орох&quot; түүхийн нэг хэсэг болно. Буцаах боломжгүй.</Dialog>
        <Drawer open={drw} onClose={() => setDrw(false)} title="Шүүлтүүр"><div className="flex flex-col gap-4"><Input label="Эх сурвалж" placeholder="бүгд" /><Input label="Хугацаа" placeholder="7 хоног" /><Button onClick={() => setDrw(false)} icon="check">Хэрэглэх</Button></div></Drawer>
      </Stage>
      <Stage title="Tooltip" code={'<Tooltip text="Сүүлийн 24 цаг"><Pill icon="help">?</Pill></Tooltip>'}><Tooltip text="Сүүлийн 24 цагт хамгийн их яригдсан"><Pill icon="help">Одоо гэж юу вэ</Pill></Tooltip></Stage>
      <Stage title="Progress, Ring, Spinner, Skeleton" code={'<Progress value={p} label="Ачаалалт" />  <Ring value={p} />  <Spinner />  <Skeleton className="h-4 w-2/3" />'}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-4"><Progress value={p} label="Экспорт" /><Progress value={100} label="Шошго" tone="up" /><div className="flex gap-2"><Pill onClick={() => setP(Math.max(0, p - 10))}>-10</Pill><Pill onClick={() => setP(Math.min(100, p + 10))}>+10</Pill></div></div>
          <div className="flex items-center gap-6"><Ring value={p} /><Spinner className="h-6 w-6" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-20 w-full" /></div></div>
        </div>
      </Stage>
      <Stage title="Empty" code={'<Empty icon="search" title="Олдсонгүй" hint="..." action={<Button>...</Button>} />'}><Empty icon="search" title="Сэдэв олдсонгүй" hint="Өөр үгээр хайж үзээрэй, эсвэл 30 хоногийн цонх руу шилжээрэй." action={<Button tone="quiet" icon="refresh">Цэвэрлэх</Button>} /></Stage>
      <Stage title="Props"><Props rows={[["Alert", "tone, title, onClose", "role status / alert"], ["useToast", "(text, tone) => void", "ToastProvider дотор"], ["Dialog", "open, onClose, title, footer", "aria-modal, фокус дотроо"], ["Drawer", "open, onClose, title, side right|bottom", "мөн адил"], ["Tooltip", "text", "hover, focus"], ["Progress / Ring", "value 0-100, label, tone / size", "role progressbar"], ["Skeleton", "className", "хэмжээг className өгнө"], ["Empty", "icon, title, hint, action", "хоосон төлөв"]]} /></Stage>
    </Doc>
  );
}
