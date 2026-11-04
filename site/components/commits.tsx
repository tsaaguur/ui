import { Icon } from "@tsaaguur/ui";

/* Recent commits of tsaaguur/ui, read from GitHub's public API and cached
   for ten minutes. Shown on the home page (a few) and /changelog (all). */
export type Commit = { sha: string; message: string; author: string; date: string; url: string };
type GhCommit = { sha: string; html_url: string; commit: { message: string; author?: { name?: string; date?: string } }; author?: { login?: string } | null };

export async function fetchCommits(n = 30): Promise<Commit[] | null> {
  try {
    const r = await fetch(`https://api.github.com/repos/tsaaguur/ui/commits?per_page=${n}`, { headers: { Accept: "application/vnd.github+json", "User-Agent": "ui.tsaaguur.mn" }, next: { revalidate: 600 } });
    if (!r.ok) return null;
    const list = (await r.json()) as GhCommit[];
    return list.map((c) => ({ sha: c.sha, message: c.commit.message.split("\n")[0], author: c.commit.author?.name ?? c.author?.login ?? "", date: c.commit.author?.date ?? "", url: c.html_url }));
  } catch {
    return null;
  }
}

export function ago(iso: string, now = Date.now()) {
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000);
  if (s < 90) return "just now";
  const m = s / 60; if (m < 60) return `${Math.round(m)} min ago`;
  const h = m / 60; if (h < 36) return `${Math.round(h)} h ago`;
  const d = h / 24; if (d < 30) return `${Math.round(d)} d ago`;
  return new Date(iso).toISOString().slice(0, 10);
}

export function CommitList({ commits, now }: { commits: Commit[] | null; now: number }) {
  if (!commits) return <p className="text-[13.5px] text-muted-foreground">GitHub did not answer; see the <a className="tz-underline" href="https://github.com/tsaaguur/ui/commits/main">commit log</a>.</p>;
  return (
    <ol className="flex flex-col">
      {commits.map((c) => (
        <li key={c.sha} className="flex items-start gap-3 border-t border-hairline py-2.5 first:border-t-0">
          <a href={c.url} className="tz-num shrink-0 rounded-[6px] bg-muted px-1.5 py-0.5 text-[11.5px] text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">{c.sha.slice(0, 7)}</a>
          <span className="min-w-0 flex-1 text-[14px] leading-snug">{c.message}</span>
          <span className="tz-num shrink-0 text-[11.5px] text-muted-foreground">{ago(c.date, now)}</span>
        </li>
      ))}
      <li className="pt-3"><a href="https://github.com/tsaaguur/ui/commits/main" className="tz-pill" target="_blank" rel="noopener noreferrer">All commits on GitHub <Icon name="out" className="h-3.5 w-3.5" /></a></li>
    </ol>
  );
}
