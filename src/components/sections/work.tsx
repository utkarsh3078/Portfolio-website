import { ArrowUpRight } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { earlierBuilds, projects } from "@/data/projects";

export function WorkSection() {
  // The first and last projects get a full-width card; the rest sit two to a row.
  const first = projects[0];
  const last = projects[projects.length - 1];
  const middle = projects.slice(1, -1);

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line bg-surface-2/40">
      <div className="container-page py-20 sm:py-28">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Finished projects"
          text="Each one runs end to end, and most are deployed. Open them and try."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <ProjectCard project={first} wide />
          </Reveal>

          {middle.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.12} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}

          <Reveal className="md:col-span-2">
            <ProjectCard project={last} wide flip />
          </Reveal>
        </div>

        {/* Smaller, older projects as a simple list */}
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Earlier builds</h3>
          <ul className="mt-4 border-t border-line">
            {earlierBuilds.map((build) => (
              <li key={build.title} className="border-b border-line">
                <a
                  href={build.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-baseline gap-x-6 gap-y-1 py-5 transition-[padding] duration-300 hover:px-3 sm:grid-cols-[13rem_minmax(0,1fr)_auto_1.25rem]"
                >
                  <span className="font-serif text-2xl transition-colors group-hover:text-accent">{build.title}</span>
                  <span className="text-muted">{build.text}</span>
                  <span className="font-mono text-xs text-muted">{build.stack}</span>
                  <ArrowUpRight className="hidden h-4 w-4 self-center text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
