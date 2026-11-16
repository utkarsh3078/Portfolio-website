"use client";

import { motion } from "motion/react";

// Illustrative rows, not real scores
const ROWS = [
  { rank: 1, name: 64, points: 1840, bar: 1 },
  { rank: 2, name: 48, points: 1615, bar: 0.86 },
  { rank: 3, name: 72, points: 1390, bar: 0.74 },
  { rank: 4, name: 54, points: 1120, bar: 0.58 },
  { rank: 5, name: 60, points: 905, bar: 0.46 },
];

const TABS = ["All-time", "Monthly", "Semester"];

/** ICPC Portal in miniature: the points leaderboard filling in. */
export function Leaderboard() {
  return (
    <div className="flex aspect-16/10 w-full flex-col bg-surface-2/50 p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Leaderboard</span>
        <span className="flex gap-1 font-mono text-[0.64rem]">
          {TABS.map((tab, index) => (
            <span
              key={tab}
              className={`whitespace-nowrap rounded-full px-2 py-0.5 ${
                index === 0 ? "bg-fg text-bg" : "border border-line text-muted"
              } ${index === 2 ? "hidden sm:inline" : ""}`}
            >
              {tab}
            </span>
          ))}
        </span>
      </div>

      <ul className="mt-6 flex flex-1 flex-col justify-between pb-1">
        {ROWS.map((row, index) => (
          <li key={row.rank} className="flex items-center gap-3">
            <span className={`w-6 font-mono text-xs ${row.rank === 1 ? "text-accent" : "text-muted"}`}>#{row.rank}</span>
            {/* A blank bar stands in for a name */}
            <span className="hidden h-2 rounded-full bg-line sm:block" style={{ width: row.name }} />
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-line/60">
              <motion.span
                className={`block h-full origin-left rounded-full ${row.rank === 1 ? "bg-accent" : "bg-fg/35"}`}
                style={{ width: `${row.bar * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <span className="w-11 text-right font-mono text-xs tabular-nums text-muted">
              {row.points.toLocaleString("en-US")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
