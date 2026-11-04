import Link from "next/link";
import { Icon } from "@tsaaguur/ui";
import { LAYOUTS } from "@/components/sections";

export const metadata = { title: "Layouts" };

/* tiny wireframes for the index cards */
const THUMB: Record<string, React.ReactNode> = {
  "/layouts/home": <div className="grid grid-cols-4 gap-1"><span className="col-span-4 h-5 rounded bg-muted" /><span className="col-span-3 h-10 rounded bg-brand/30" /><span className="h-10 rounded bg-muted" /><span className="h-8 rounded bg-muted" /><span className="col-span-2 h-8 rounded bg-muted" /><span className="h-8 rounded bg-muted" /></div>,
  "/layouts/topic": <div className="grid grid-cols-3 gap-1"><span className="col-span-3 h-5 rounded bg-brand/30" /><span className="h-4 rounded bg-muted" /><span className="h-4 rounded bg-muted" /><span className="h-4 rounded bg-muted" /><span className="col-span-2 h-12 rounded bg-muted" /><span className="h-12 rounded bg-muted" /></div>,
  "/layouts/stories": <div className="grid gap-1"><span className="grid grid-cols-3 gap-1"><span className="h-7 rounded bg-muted" /><span className="h-7 rounded bg-brand/30" /><span className="h-7 rounded bg-muted" /></span><span className="grid grid-cols-3 gap-1"><span className="h-7 rounded bg-muted" /><span className="h-7 rounded bg-muted" /><span className="h-7 rounded bg-muted" /></span></div>,
  "/layouts/story": <div className="flex gap-1"><span className="h-16 w-10 rounded bg-muted" /><span className="h-16 w-10 rounded bg-brand/30" /><span className="h-16 w-10 rounded bg-muted" /><span className="h-16 w-10 rounded bg-muted" /></div>,
  "/layouts/parliament": <div className="grid grid-cols-3 gap-1"><span className="col-span-3 h-5 rounded bg-muted" /><span className="h-8 rounded bg-brand/30" /><span className="h-8 rounded bg-muted" /><span className="h-8 rounded bg-muted" /><span className="col-span-3 h-3 rounded bg-muted" /><span className="col-span-3 h-3 rounded bg-muted" /></div>,
  "/layouts/now": <div className="grid gap-1"><span className="h-4 rounded bg-brand/30" /><span className="h-4 rounded bg-muted" /><span className="h-4 rounded bg-muted" /><span className="h-4 rounded bg-muted" /></div>,
  "/layouts/login": <div className="grid h-16 place-items-center rounded bg-muted"><span className="h-8 w-14 rounded bg-brand/30" /></div>,
};

export default function Page() {
  return (
    <article className="min-w-0">
      <div className="tz-label">layouts</div>
      <h1 className="tz-display mt-1 text-[34px] font-bold leading-none sm:text-[44px]">The product, as structure</h1>
      <p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-muted-foreground">Every page of the tsaaguur redesign drawn with the library: navigation, grids, panels and placeholder blocks where the data will be. No figures, no posts, nothing fetched. Each layout has a desktop, tablet and phone frame.</p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {LAYOUTS.filter((l) => l.href !== "/layouts").map((l) => (
          <li key={l.href}><Link href={l.href} className="tz-card block p-4"><div className="rounded-[8px] border border-hairline p-3">{THUMB[l.href]}</div><div className="mt-3 flex items-center gap-3"><Icon name={l.icon} className="h-5 w-5" /><span className="min-w-0"><span className="tz-display block text-[16px] font-semibold">{l.label}</span><span className="tz-label block">{l.hint}</span></span><Icon name="arrow-up-right" className="ml-auto h-4 w-4 opacity-50" /></div></Link></li>
        ))}
      </ol>
    </article>
  );
}
