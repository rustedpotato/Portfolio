import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Playground from "@/components/sections/Playground";
import SideDecorations from "@/components/SideDecorations";

export default function Home() {
  return (
    <main>
      {/* <SideDecorations /> */}
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      {/* <Playground /> */}
    </main>
  );
}
