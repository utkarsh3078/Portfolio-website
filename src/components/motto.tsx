import Image from "next/image";

import cover from "@/assets/cover.jpg";
import { Reveal } from "@/components/reveal";

/** The line from my X and LinkedIn cover image, as the page's sign-off. */
export function Motto() {
  return (
    <Reveal className="container-page pt-10 sm:pt-14">
      <Image
        src={cover}
        alt="Be obsessed with Peace, Consistency, Stability, Respect, and Loyalty."
        placeholder="blur"
        sizes="(min-width: 896px) 896px, 100vw"
        className="mx-auto h-auto w-full max-w-4xl"
      />
    </Reveal>
  );
}
