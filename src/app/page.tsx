import Navbar          from "@/components/Navbar";
import PageScroll      from "@/components/PageScroll";
import Hero            from "@/components/Hero";
import WorkPhotography from "@/components/WorkPhotography";
import WorkVideo       from "@/components/WorkVideo";
import WorkAIGC        from "@/components/WorkAIGC";
import About           from "@/components/About";
import Contact         from "@/components/Contact";
import MobileNav       from "@/components/MobileNav";
import PageTitle       from "@/components/PageTitle";

export default function Home() {
  return (
    <>
      <Navbar />
      <PageTitle />
      <PageScroll>
        <Hero />
        <About />
        <WorkPhotography />
        <WorkVideo />
        <WorkAIGC />
        <Contact />
      </PageScroll>
      <MobileNav />
    </>
  );
}
