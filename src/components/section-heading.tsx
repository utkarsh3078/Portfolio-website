import { Reveal } from "@/components/reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
};

export function SectionHeading({ id, eyebrow, title, text }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-serif text-[clamp(2.3rem,5.5vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>}
    </Reveal>
  );
}
