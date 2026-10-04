import { Preloader } from "@/components/layout/Preloader";
import { About } from "@/components/sections/About";
import { EssaysPreview } from "@/components/sections/EssaysPreview";
import { Hero } from "@/components/sections/Hero";
import { HomeMotion } from "@/components/sections/HomeMotion";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <EssaysPreview />
      <Skills />
      <HomeMotion />
    </>
  );
}
