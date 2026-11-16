import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Motto } from "@/components/motto";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { NowSection } from "@/components/sections/now";
import { WorkSection } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <NowSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
      {/* The closing band is always dark, in both themes, to match the cover image.
          data-theme="dark" makes the colour tokens inside it resolve to their dark values. */}
      <div
        data-theme="dark"
        className="mt-10 border-t border-line bg-[#010103] text-fg sm:mt-14"
      >
        <Motto />
        <Footer />
      </div>
    </>
  );
}
