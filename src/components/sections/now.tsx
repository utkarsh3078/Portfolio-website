import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { currentProjects } from "@/data/projects";

export function NowSection() {
  return (
    <section id="now" aria-labelledby="now-title" className="container-page py-20 sm:py-28">
      <SectionHeading
        id="now-title"
        eyebrow="Currently"
        title="Working on now"
        text="Two projects I'm pushing commits to this month."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {currentProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.12} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
