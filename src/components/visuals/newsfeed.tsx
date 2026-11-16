"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const TOPICS = ["All news", "Technology", "Business", "Science", "Sports"];
// Line widths for the three placeholder articles under each topic
const LAYOUTS = [
  [92, 70, 84],
  [78, 88, 62],
  [86, 60, 90],
  [70, 94, 76],
  [88, 72, 66],
];

/** NewsSphere in miniature: switching topics swaps the feed. */
export function Newsfeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [topic, setTopic] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(() => setTopic((value) => (value + 1) % TOPICS.length), 2200);
    return () => clearInterval(timer);
  }, [inView, reduceMotion]);

  return (
    <div ref={ref} className="flex aspect-16/10 w-full flex-col bg-surface-2/50 p-5 sm:p-7">
      <div className="flex gap-1.5 overflow-hidden font-mono text-[0.64rem]">
        {TOPICS.map((label, index) => (
          <span
            key={label}
            className={`relative shrink-0 rounded-full px-2.5 py-1 transition-colors duration-300 ${
              index === topic ? "text-bg" : "text-muted"
            }`}
          >
            {index === topic && (
              <motion.span
                layoutId="news-topic"
                className="absolute inset-0 rounded-full bg-fg"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">{label}</span>
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={topic}
          className="mt-auto grid grid-cols-3 gap-3 pt-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {LAYOUTS[topic].map((width, index) => (
            <div key={index} className="rounded-lg border border-line bg-surface p-2.5">
              <div
                className="aspect-4/3 rounded-md"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(135deg, var(--glow-a), var(--accent-soft))"
                      : index === 1
                        ? "linear-gradient(135deg, var(--glow-b), var(--surface-2))"
                        : "linear-gradient(135deg, var(--surface-2), var(--glow-a))",
                }}
              />
              <div className="mt-2.5 h-1.5 rounded-full bg-fg/45" style={{ width: `${width}%` }} />
              <div className="mt-1.5 h-1.5 rounded-full bg-line" style={{ width: `${width - 22}%` }} />
              <div className="mt-1.5 h-1.5 rounded-full bg-line" style={{ width: `${width - 38}%` }} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
