"use client";

import { motion } from "motion/react";

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** How far below its final position the element starts, in pixels. */
  y?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
