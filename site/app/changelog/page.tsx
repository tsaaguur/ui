import { Doc } from "@/components/doc";
import { CommitList, fetchCommits } from "@/components/commits";
import pkg from "../../../package.json";

export const metadata = { title: "Changelog" };
export const revalidate = 600;

export default async function Page() {
  const [commits, now] = [await fetchCommits(40), Date.now()];
  return (
    <Doc kicker={`tsaaguur/ui · v${pkg.version}`} title="Changelog" lead="The last 40 commits on main, straight from GitHub, refreshed every ten minutes. Apps pin a commit in their lockfile; `pnpm update @tsaaguur/ui` moves to the newest one.">
      <section className="tz-card px-4 py-2"><CommitList commits={commits} now={now} /></section>
    </Doc>
  );
}
