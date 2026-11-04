import { Doc, Stage } from "@/components/doc";
export const metadata = { title: "Үсэг" };
export default function Page() {
  return (
    <Doc kicker="type" title="Үсэг" lead="Гурван хэв, гурван ажил: Onest бие бичвэрт, Geologica гарчиг нэрэнд (tz-display), JetBrains Mono тоо, огноо, шошго бүрт (tz-num, tz-label). Кирилл, латин хоёулаа.">
      <Stage title="Гарчиг · tz-display" code={'<h1 className="tz-display text-[56px] font-bold">Улаанбаатар</h1>'}>
        <p className="tz-display text-[44px] font-bold leading-none sm:text-[64px]">Хэн анх хэлснээс эхлээд</p>
        <p className="tz-display mt-2 text-[24px] font-semibold">Цэргийн эмнэлгийн 105 жил</p>
      </Stage>
      <Stage title="Бие · Onest" code={'<p className="text-[15px] leading-relaxed">...</p>'}>
        <p className="max-w-[60ch] text-[15px] leading-relaxed">Монголын сошиал медиа, мэдээний урсгалаас өдрийн гол сэдвүүдийг олж, хэн анх хэлснийг, хэзээ оргилдоо хүрснийг, одоо юу болж байгааг нэг самбар дээр үзүүлнэ.</p>
      </Stage>
      <Stage title="Шошго, тоо · tz-label, tz-num" code={'<span className="tz-label">анх хэлсэн · мэдээ</span>\n<span className="tz-num">2026.11.04 08:00</span>'}>
        <div className="flex flex-wrap items-center gap-6"><span className="tz-label">анх хэлсэн · мэдээ</span><span className="tz-num text-[14px]">2026.11.04 08:00</span><span className="tz-num text-[28px] font-semibold">2,713</span><span className="tz-num text-[12px] text-muted-foreground">01 / 07</span></div>
      </Stage>
    </Doc>
  );
}
