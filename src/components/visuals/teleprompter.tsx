"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORDS =
  "Speaking well is a habit, not a talent. Read one page aloud every day. Slow down, breathe, and let each word land. One step closer, every single day.".split(
    " ",
  );

const WORD_MS = 360;
// Hold on the finished speech for a moment before starting over
const PAUSE_WORDS = 6;

/** VocalStep in miniature: a teleprompter that reads through a short speech. */
export function Teleprompter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(() => {
      setTick((value) => (value + 1) % (WORDS.length + PAUSE_WORDS));
    }, WORD_MS);
    return () => clearInterval(timer);
  }, [inView, reduceMotion]);

  // With reduced motion, show the whole speech as read
  const current = reduceMotion ? WORDS.length : Math.min(tick, WORDS.length);
  const progress = current / WORDS.length;

  return (
    <div ref={ref} className="flex aspect-16/10 w-full flex-col bg-surface-2/50 p-5 sm:p-7">
      <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
        <span className="whitespace-nowrap">Small daily habits</span>
        <span className="flex items-center gap-2">
          <span className="rounded-full border border-line px-2 py-0.5 text-fg">EN</span>
          <span className="rounded-full border border-line px-2 py-0.5">HI</span>
          <span className="hidden whitespace-nowrap sm:inline">5 min</span>
        </span>
      </div>

      <p className="my-auto py-4 font-medium tracking-tight text-[clamp(1.25rem,3.4vw,1.9rem)] leading-[1.28]">
        {WORDS.map((word, index) => (
          <span
            key={index}
            className={`transition-colors duration-300 ${
              index < current ? "text-fg" : index === current ? "text-accent" : "text-muted/40"
            }`}
          >
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="h-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full origin-left rounded-full bg-accent transition-transform duration-300 ease-linear"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
