import { cacheLife } from "next/cache";

export type ContributionDay = {
  /** ISO date, for example "2026-11-16". */
  date: string;
  count: number;
  /** GitHub's own shade for the day, from 0 (none) to 4 (most). */
  level: number;
};

export type Contributions = {
  total: number;
  activeDays: number;
  /** Columns of the heatmap, oldest first. Each week runs Sunday to Saturday; missing days are null. */
  weeks: (ContributionDay | null)[][];
};

function attribute(tag: string, name: string) {
  return new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];
}

/**
 * Reads the public contribution calendar from a GitHub profile. GitHub serves it
 * as an HTML fragment, so the days are parsed out of the markup. The result is
 * cached and refreshed about once an hour, so visitors never wait on GitHub.
 */
export async function getContributions(username: string): Promise<Contributions> {
  "use cache";
  cacheLife("hours");

  const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`);
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  const html = await response.text();

  // "3 contributions on November 23rd." or "No contributions on ...", keyed by the cell's id
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(match[1], Number.parseInt(match[2], 10) || 0);
  }

  const days: ContributionDay[] = [];
  for (const [tag] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const date = attribute(tag, "data-date");
    if (!date) continue;
    days.push({
      date,
      level: Number(attribute(tag, "data-level") ?? 0),
      count: counts.get(attribute(tag, "id") ?? "") ?? 0,
    });
  }
  if (days.length === 0) throw new Error("No contribution days found in GitHub's response");
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Group into Sunday-to-Saturday columns
  const weeks: (ContributionDay | null)[][] = [];
  for (const day of days) {
    const weekday = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (weeks.length === 0 || weekday === 0) weeks.push(Array.from({ length: 7 }, () => null));
    weeks[weeks.length - 1][weekday] = day;
  }

  const heading = /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)/.exec(html)?.[1];
  const total = heading
    ? Number(heading.replaceAll(",", ""))
    : days.reduce((sum, day) => sum + day.count, 0);

  return { total, activeDays: days.filter((day) => day.count > 0).length, weeks };
}
