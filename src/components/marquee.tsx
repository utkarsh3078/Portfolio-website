import { profile } from "@/data/profile";

/** An endless strip of the tools I use. The list is rendered twice so the loop has no seam. */
export function Marquee() {
  const items = profile.marquee;

  return (
    <div className="border-y border-line py-5" aria-label="Tools I work with">
      <div className="fade-x overflow-hidden">
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {items.map((item) => (
                <li key={item} className="flex items-center whitespace-nowrap font-serif text-2xl text-muted sm:text-[1.7rem]">
                  <span className="px-6 sm:px-8">{item}</span>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
