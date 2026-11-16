import { GraduationCap, MapPin, Users } from "lucide-react";

import { GitHubActivity } from "@/components/github-activity";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/data/profile";

const card = "rounded-3xl border border-line bg-surface p-6 sm:p-7";
const label = "font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted";

/** Two sine waves sliding sideways, for the swimming card. */
function Waves() {
  // One period is 200 units wide; the path is drawn twice so the loop is seamless.
  const wave = "M0 20 Q 50 0 100 20 T 200 20 T 300 20 T 400 20 V 60 H 0 Z";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 overflow-hidden">
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="animate-wave absolute bottom-0 left-0 h-full w-[200%] text-accent/15"
      >
        <path d={wave} fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="animate-wave absolute -bottom-3 left-0 h-full w-[200%] text-accent/25 [animation-duration:11s]"
      >
        <path d={wave} fill="currentColor" />
      </svg>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-20 sm:py-28">
      <SectionHeading id="about-title" eyebrow="About" title="A bit about me" />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Bio */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <div className={`${card} flex h-full flex-col justify-between gap-8`}>
            <div className="space-y-5 text-[1.12rem] leading-relaxed sm:text-xl sm:leading-relaxed">
              {profile.about.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "" : "text-muted"}>
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" />
              {profile.location}
            </p>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal delay={0.08}>
          <div className={`${card} h-full`}>
            <GraduationCap className="h-5 w-5 text-accent" />
            <p className={`${label} mt-5`}>Education</p>
            <p className="mt-2 font-serif text-[1.7rem] leading-tight">{profile.education.course}</p>
            <p className="mt-1.5 text-muted">
              {profile.education.school}, {profile.education.place}
            </p>
          </div>
        </Reveal>

        {/* Community role */}
        <Reveal delay={0.16}>
          <div className={`${card} h-full`}>
            <Users className="h-5 w-5 text-accent" />
            <p className={`${label} mt-5`}>{profile.community.org}</p>
            <p className="mt-2 font-serif text-[1.7rem] leading-tight">{profile.community.title}</p>
            <p className="mt-1.5 text-muted">{profile.community.text}</p>
          </div>
        </Reveal>

        {/* Journey */}
        <Reveal className="lg:col-span-2">
          <div className={`${card} h-full`}>
            <p className={label}>Journey</p>
            <ol className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {profile.journey.map((step) => (
                <li key={step.year} className="relative border-l border-line pl-5 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full bg-accent sm:-top-[5px] sm:left-0"
                  />
                  <p className="font-mono text-xs text-accent">{step.year}</p>
                  <p className="mt-1.5 font-serif text-2xl leading-tight">{step.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Swimming */}
        <Reveal delay={0.08}>
          <div className={`${card} relative h-full overflow-hidden pb-28 sm:pb-28`}>
            <p className={label}>Away from the keyboard</p>
            <p className="mt-3 font-serif text-7xl leading-none text-accent">{profile.swimming.value}</p>
            <p className="relative z-10 mt-2 max-w-[16rem] text-muted">{profile.swimming.text}</p>
            <Waves />
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal className="lg:col-span-3">
          <div className={card}>
            <p className={label}>What I work with</p>
            <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
              {profile.skills.map((skill) => (
                <div key={skill.group}>
                  <dt className="font-serif text-2xl">{skill.group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.82rem] text-muted transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* GitHub contribution heatmap */}
        <Reveal className="lg:col-span-3">
          <GitHubActivity />
        </Reveal>
      </div>
    </section>
  );
}
