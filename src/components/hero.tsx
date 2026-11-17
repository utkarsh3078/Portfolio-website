"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";

import { BrowserFrame } from "@/components/browser-frame";
import { Counter } from "@/components/counter";
import { SocialGlyph } from "@/components/icons";
import { EASE } from "@/components/reveal";
import { profile } from "@/data/profile";
import { heroShots } from "@/data/projects";

// The name is the headline. Each word slides up from behind a mask, one after another.
const NAME_WORDS = profile.name.split(" ");
const NAME_START = 0.3;
const WORD_STAGGER = 0.09;
// When the name has finished and the rest can come in
const AFTER_NAME = NAME_START + NAME_WORDS.length * WORD_STAGGER + 0.3;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

/** Pointer position across the window, from -0.5 to 0.5 on each axis, smoothed. */
function usePointerParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    // Touch screens have no hover pointer to follow
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX / window.innerWidth - 0.5);
      y.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return { x: smoothX, y: smoothY };
}

const SHOT_LAYOUT = [
  { position: "right-0 top-0 w-[76%] rotate-3", depth: 14, float: 7 },
  { position: "left-0 top-[27%] w-[78%] -rotate-[4deg]", depth: 26, float: 8.5 },
  { position: "bottom-0 right-[5%] w-[66%] rotate-2", depth: 40, float: 6 },
];

function FloatingShot({
  index,
  pointer,
}: {
  index: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
}) {
  const shot = heroShots[index];
  const layout = SHOT_LAYOUT[index];
  // Nearer cards move further, which reads as depth
  const x = useTransform(pointer.x, (value) => value * -layout.depth);
  const y = useTransform(pointer.y, (value) => value * -layout.depth);

  return (
    <motion.div
      className={`absolute ${layout.position}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.55 + index * 0.16, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: layout.float, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
      >
        <BrowserFrame>
          <Image
            src={shot.image}
            alt={shot.alt}
            placeholder="blur"
            preload={index === 0}
            sizes="(min-width: 1024px) 360px, 0px"
            className="aspect-16/10 w-full object-cover object-left-top"
          />
        </BrowserFrame>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const pointer = usePointerParallax();

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-32 sm:pt-40 lg:pb-20">
      {/* Background: dot grid plus two slow-drifting glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0" />
        <div
          className="animate-drift-a absolute -left-32 -top-24 h-112 w-md rounded-full blur-3xl"
          style={{ background: "var(--glow-a)" }}
        />
        <div
          className="animate-drift-b absolute -right-24 top-40 h-104 w-104 rounded-full blur-3xl"
          style={{ background: "var(--glow-b)" }}
        />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)] lg:gap-10">
        <div>
          <motion.p
            {...fadeUp(0.15)}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 text-[0.82rem] text-muted backdrop-blur"
          >
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-live" />
            {profile.availability}
          </motion.p>

          <motion.p {...fadeUp(0.22)} className="mt-8 text-lg text-muted sm:text-xl">
            Hi, I&apos;m
          </motion.p>

          <h1 className="mt-1 font-display text-[clamp(2.75rem,13vw,5.25rem)] leading-[0.98] lg:text-[clamp(3.4rem,7.2vw,5.75rem)]">
            {NAME_WORDS.map((word, index) => (
              <span key={index}>
                <span className="mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.85,
                      delay: NAME_START + index * WORD_STAGGER,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(AFTER_NAME)}
            className="mt-5 flex flex-col gap-x-3 gap-y-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent sm:flex-row sm:items-center"
          >
            {/* One row on wider screens; role above location on phones */}
            <span aria-hidden="true" className="hidden h-px w-8 bg-accent sm:block" />
            <span>{profile.role}</span>
            <span aria-hidden="true" className="hidden text-muted sm:inline">/</span>
            <span className="text-muted">{profile.location}</span>
          </motion.p>

          <motion.p
            {...fadeUp(AFTER_NAME + 0.1)}
            className="mt-7 max-w-xl font-display text-[clamp(1.45rem,5.6vw,2rem)] leading-[1.15]"
          >
            I build full-stack web apps and <span className="text-accent">AI tools</span>, and I ship them.
          </motion.p>

          <motion.p
            {...fadeUp(AFTER_NAME + 0.2)}
            className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div {...fadeUp(AFTER_NAME + 0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg pl-6 pr-5 text-[0.95rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              See my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface/60 pl-6 pr-5 text-[0.95rem] font-medium backdrop-blur transition-colors hover:border-fg/40"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <ul className="ml-1 flex items-center gap-1">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    <SocialGlyph name={social.icon} className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Floating screenshots of real projects (large screens only) */}
        <div aria-hidden="true" className="relative hidden aspect-[1/1.02] w-full lg:block">
          {heroShots.map((shot, index) => (
            <FloatingShot key={shot.alt} index={index} pointer={pointer} />
          ))}
        </div>
      </div>

      <motion.dl
        {...fadeUp(AFTER_NAME + 0.42)}
        className="container-page mt-16 grid grid-cols-3 lg:mt-20"
      >
        {profile.stats.map((stat, index) => (
          // The label comes first in the markup and the number first on screen
          <div key={stat.label} className="flex flex-col-reverse justify-end border-l border-line pl-4 pr-2 sm:pl-5">
            <dt className="mt-2.5 text-sm text-muted">{stat.label}</dt>
            <dd className="font-display text-5xl leading-none sm:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} delay={AFTER_NAME + 0.5 + index * 0.1} />
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
