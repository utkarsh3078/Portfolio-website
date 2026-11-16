import { ArrowUpRight } from "lucide-react";

import { Counter } from "@/components/counter";
import { Heatmap } from "@/components/heatmap";
import { SocialGlyph } from "@/components/icons";
import { profile } from "@/data/profile";
import { getContributions } from "@/lib/github";
import type { Contributions } from "@/lib/github";
import { levelColor } from "@/lib/heat";

const card = "rounded-3xl border border-line bg-surface p-6 sm:p-7";
const label = "font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted";

function ProfileLink() {
  return (
    <a
      href={`https://github.com/${profile.githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-line pl-3.5 pr-3 text-sm font-medium transition-colors hover:border-fg/40"
    >
      <SocialGlyph name="github" className="h-4 w-4" />@{profile.githubUsername}
      <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/** My GitHub contribution heatmap for the last year, read from my public profile. */
export async function GitHubActivity() {
  let data: Contributions | null = null;
  try {
    data = await getContributions(profile.githubUsername);
  } catch {
    // GitHub was unreachable or changed its markup. Show the card without the grid.
  }

  if (!data) {
    return (
      <div className={`${card} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className={label}>GitHub activity</p>
          <p className="mt-2 text-muted">The contribution graph couldn&apos;t be loaded just now. It&apos;s on my profile.</p>
        </div>
        <ProfileLink />
      </div>
    );
  }

  const summary = `${data.total} contributions on GitHub in the last year, on ${data.activeDays} days`;

  return (
    <div className={card}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div>
          <p className={label}>GitHub activity</p>
          <p className="mt-3 font-serif text-[2rem] leading-tight sm:text-4xl">
            <span className="text-accent">
              <Counter value={data.total} />
            </span>{" "}
            contributions in the last year
          </p>
          <p className="mt-1.5 text-muted">Active on {data.activeDays} days.</p>
        </div>
        <ProfileLink />
      </div>

      <div className="mt-7">
        <Heatmap weeks={data.weeks} summary={summary} />
      </div>

      <p aria-hidden="true" className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[0.62rem] text-muted">
        Less
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: levelColor(level) }} />
        ))}
        More
      </p>
    </div>
  );
}
