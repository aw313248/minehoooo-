import Navbar         from "@/components/Navbar";
import PageScroll     from "@/components/PageScroll";
import Hero           from "@/components/Hero";
import WorkPhotography from "@/components/WorkPhotography";
import WorkVideo      from "@/components/WorkVideo";
import WorkAIGC       from "@/components/WorkAIGC";
import About          from "@/components/About";
import Contact        from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Navbar floats above everything */}
      <Navbar />

      {/* Full-page 3D rotation scroll */}
      <PageScroll>
        <Hero />
        <WorkPhotography />
        <WorkVideo />
        <WorkAIGC />
        <About />
        <Contact />
      </PageScroll>
    </>
  );
}
