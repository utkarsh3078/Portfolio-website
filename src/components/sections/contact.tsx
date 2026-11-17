import { ArrowUpRight, Mail } from "lucide-react";

import { CopyEmail } from "@/components/copy-email";
import { SocialGlyph } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pb-10 pt-6 sm:pb-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="dot-grid absolute inset-0" />
            <div
              className="animate-drift-b absolute -bottom-40 left-1/2 h-80 w-[36rem] max-w-[120%] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "var(--glow-a)" }}
            />
          </div>

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
            <h2
              id="contact-title"
              className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.6rem,7.5vw,5rem)] leading-[0.98]"
            >
              Have something to build? <span className="text-accent">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">
              I&apos;m open to internships, freelance work and interesting side projects. You can reach me on any of
              these platforms.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex h-12 max-w-full items-center gap-2.5 rounded-full bg-fg pl-5 pr-6 text-[0.95rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>
              <CopyEmail email={profile.email} />
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[0.95rem]">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
                  >
                    <SocialGlyph name={social.icon} className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
