"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";

const NAV: { id: string; label: string; hideOnTiny?: boolean }[] = [
  // Hidden below 360px wide so the pill still fits the screen
  { id: "now", label: "Now", hideOnTiny: true },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/** Tracks which section is under the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the screen
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Above the first section (the hero) nothing is active
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function Header() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <>
      {/* Reading progress along the top edge */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="flex max-w-full items-center gap-1 rounded-full border border-line bg-surface/80 p-1.5 shadow-card backdrop-blur-xl">
          <a
            href="#top"
            aria-label={`${profile.name}, back to top`}
            className="flex h-9 items-center gap-2 rounded-full pl-1 pr-2 sm:pr-3"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-fg font-serif text-[0.95rem] leading-none text-bg">
              {profile.initials[0]}
            </span>
            <span className="hidden text-sm font-medium sm:block">{profile.name}</span>
          </a>

          <nav aria-label="Sections" className="flex items-center">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-[0.82rem] transition-colors sm:px-3.5 sm:text-sm ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  } ${item.hideOnTiny ? "max-[359px]:hidden" : ""}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <ThemeToggle />
        </div>
      </motion.header>
    </>
  );
}
