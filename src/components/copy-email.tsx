"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** Copies the email address and confirms it for a couple of seconds. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the address is still on screen to select.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface/60 pl-5 pr-6 text-[0.95rem] font-medium backdrop-blur transition-colors hover:border-fg/40"
    >
      <span className="relative grid h-4 w-4 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            className="absolute"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? <Check className="h-4 w-4 text-live" /> : <Copy className="h-4 w-4 text-muted" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
