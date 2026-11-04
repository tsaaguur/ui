"use client";
import { useEffect, useState } from "react";

/* "On this page": the h2 titles of the article, read after mount, with the
   one in view marked. Shown on wide screens only. */
export function Toc() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");
  useEffect(() => {
    const hs = [...document.querySelectorAll<HTMLHeadingElement>("article h2[id]")];
    setItems(hs.map((h) => ({ id: h.id, text: h.innerText })));
    if (!hs.length) return;
    const io = new IntersectionObserver((es) => { const v = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]; if (v) setActive((v.target as HTMLElement).id); }, { rootMargin: "-80px 0px -70% 0px" });
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);
  if (items.length < 2) return null;
  return (
    <nav className="hidden xl:block" aria-label="On this page">
      <div className="sticky top-20">
        <div className="tz-label mb-2">On this page</div>
        <ol className="flex flex-col gap-0.5 border-l border-hairline">
          {items.map((i) => <li key={i.id}><a href={`#${i.id}`} className={`-ml-px block border-l py-1 pl-3 text-[12.5px] transition-colors ${active === i.id ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{i.text}</a></li>)}
        </ol>
      </div>
    </nav>
  );
}
