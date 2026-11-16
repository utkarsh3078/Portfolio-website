import { ArrowUp } from "lucide-react";

import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="container-page flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
      <p>
        © {profile.copyrightYear} {profile.name}
      </p>

      <a
        href="#top"
        className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg"
      >
        Back to top
        <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      </a>
    </footer>
  );
}
