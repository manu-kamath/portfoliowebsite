import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Work } from "@/components/work/Work";
import { CaseStudies } from "@/components/case-studies/CaseStudies";
import { Companies } from "@/components/companies/Companies";
import { Experience } from "@/components/experience/Experience";
import { Music } from "@/components/music/Music";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/contact/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <CaseStudies />
        <Companies />
        <Experience />
        <Music />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
