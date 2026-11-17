import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { BrowserFrame } from "@/components/browser-frame";
import { SpotlightCard } from "@/components/spotlight-card";
import { Leaderboard } from "@/components/visuals/leaderboard";
import { Newsfeed } from "@/components/visuals/newsfeed";
import { Teleprompter } from "@/components/visuals/teleprompter";
import { statusLabel } from "@/data/projects";
import type { Project } from "@/data/projects";

const visuals = {
  teleprompter: Teleprompter,
  leaderboard: Leaderboard,
  newsfeed: Newsfeed,
};

const statusDot: Record<Project["status"], string> = {
  live: "bg-live animate-pulse-dot",
  wip: "bg-wip",
  done: "border border-muted",
};

/** The address shown in the browser bar: the live site's domain, or the project name. */
function frameLabel(project: Project) {
  const live = project.links.find((link) => link.label === "Live site");
  return live ? new URL(live.href).hostname : project.slug;
}

function ProjectMedia({ project, wide }: { project: Project; wide: boolean }) {
  const Visual = project.visual ? visuals[project.visual] : null;

  return (
    <BrowserFrame label={frameLabel(project)} className="transition-transform duration-500 group-hover/card:-translate-y-1">
      {project.image ? (
        <div className="overflow-hidden">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            placeholder="blur"
            sizes={wide ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 768px) 520px, 100vw"}
            className="h-auto w-full transition-transform duration-700 group-hover/card:scale-[1.03]"
          />
        </div>
      ) : (
        Visual && <Visual />
      )}
    </BrowserFrame>
  );
}

type ProjectCardProps = {
  project: Project;
  /** Full-width card with the picture beside the text on large screens. */
  wide?: boolean;
  /** For wide cards: put the picture on the right. */
  flip?: boolean;
};

export function ProjectCard({ project, wide = false, flip = false }: ProjectCardProps) {
  return (
    <SpotlightCard className="h-full">
      <article
        className={`flex h-full flex-col gap-7 p-5 sm:p-7 ${
          wide ? "lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:p-9" : ""
        }`}
      >
        <div className={wide && flip ? "lg:order-2" : ""}>
          <ProjectMedia project={project} wide={wide} />
        </div>

        <div className="flex flex-1 flex-col">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            <span className="flex items-center gap-2 text-fg">
              <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} />
              {statusLabel[project.status]}
            </span>
            <span>{project.period}</span>
            <span>{project.context}</span>
          </p>

          <h3 className={`mt-4 font-display leading-[1.05] ${wide ? "text-4xl sm:text-[2.7rem]" : "text-[2rem] sm:text-4xl"}`}>
            {project.title}
          </h3>
          <p className="mt-3 text-[1.05rem] font-medium leading-snug">{project.tagline}</p>
          <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

          {project.now && (
            <p className="mt-4 rounded-xl border border-dashed border-line bg-accent-soft px-4 py-3 text-[0.93rem] leading-relaxed">
              <span className="font-medium text-accent">Right now: </span>
              {project.now}
            </p>
          )}

          <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                {tag}
              </li>
            ))}
          </ul>

          <ul className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.links.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/link inline-flex h-10 items-center gap-1.5 rounded-full pl-4 pr-3 text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-fg text-bg hover:bg-accent hover:text-accent-fg"
                      : "border border-line hover:border-fg/40"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </SpotlightCard>
  );
}
