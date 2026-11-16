"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

import type { ContributionDay } from "@/lib/github";
import { levelColor } from "@/lib/heat";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Phones show only the most recent weeks so the squares stay a readable size
const PHONE_WEEKS = 22;

function describe(day: ContributionDay) {
  const [year, month, date] = day.date.split("-").map(Number);
  const amount = day.count === 0 ? "No contributions" : day.count === 1 ? "1 contribution" : `${day.count} contributions`;
  return `${amount} on ${date} ${MONTHS[month - 1]} ${year}`;
}

/** The month a column starts in, as a number, or null for an empty column. */
function monthOf(week: (ContributionDay | null)[]) {
  const first = week.find((day) => day !== null);
  return first ? Number(first.date.slice(5, 7)) : null;
}

type HeatmapProps = {
  weeks: (ContributionDay | null)[][];
  /** Read out by screen readers in place of the individual squares. */
  summary: string;
};

/** A year of GitHub contributions, one column per week. The columns fade in left to right. */
export function Heatmap({ weeks, summary }: HeatmapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div ref={ref} role="img" aria-label={summary} className="flex gap-0.75 lg:gap-1">
      {weeks.map((week, index) => {
        const month = monthOf(week);
        // Label a column when its month differs from the column before it
        const showLabel = index > 0 && month !== null && month !== monthOf(weeks[index - 1]);
        const phoneHidden = index < weeks.length - PHONE_WEEKS;

        return (
          <div
            key={index}
            className={`min-w-0 flex-1 flex-col gap-0.75 transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none lg:gap-1 ${
              phoneHidden ? "hidden sm:flex" : "flex"
            } ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            style={{ transitionDelay: `${index * 14}ms` }}
          >
            <span className="relative h-4">
              {showLabel && month !== null && (
                <span className="absolute left-0 top-0 whitespace-nowrap font-mono text-[0.62rem] text-muted">
                  {MONTHS[month - 1]}
                </span>
              )}
            </span>
            {week.map((day, weekday) => (
              <span
                key={weekday}
                title={day ? describe(day) : undefined}
                className={`aspect-square w-full rounded-[3px] ${day ? "" : "invisible"}`}
                style={{ background: day ? levelColor(day.level) : undefined }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
