"use client";

import { MotionConfig } from "motion/react";

/** Turns off movement for visitors who ask their system for reduced motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
