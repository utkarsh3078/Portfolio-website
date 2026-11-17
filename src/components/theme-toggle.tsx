"use client";

import { Moon, Sun } from "lucide-react";

/**
 * The current theme lives on <html data-theme>, set before first paint by the
 * script in layout.tsx from the visitor's system setting. CSS picks which icon
 * to show, so this needs no state. A manual switch lasts only for this tab, so
 * the next visit opens in the system theme again.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      sessionStorage.setItem("theme", next);
    } catch {
      // Private windows can block storage; the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <Moon className="theme-icon-moon h-4 w-4" />
      <Sun className="theme-icon-sun h-4 w-4" />
    </button>
  );
}
