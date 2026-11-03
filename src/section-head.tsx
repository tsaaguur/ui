import Link from "next/link";
import { Icon } from "./icons";

export function SectionHead({ title, kicker, href, cta, children }: { title: string; kicker?: string; href?: string; cta?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-hairline pb-3">
      <div>
        {kicker ? <div className="tz-label mb-1">{kicker}</div> : null}
        <h2 className="tz-display text-[30px] font-semibold leading-none sm:text-[40px]">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        {children}
        {href && cta ? (
          <Link href={href} className="tz-pill">{cta} <Icon name="arrow-up-right" className="h-3.5 w-3.5" /></Link>
        ) : null}
      </div>
    </div>
  );
}
