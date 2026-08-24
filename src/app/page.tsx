"use client";

import Navbar from "@/components/Navbar";
import PageScroll from "@/components/PageScroll";
import Hero from "@/components/Hero";
import WorkPhotography from "@/components/WorkPhotography";
import WorkVideo from "@/components/WorkVideo";
import WorkAIGC from "@/components/WorkAIGC";
import WorkProjects from "@/components/WorkProjects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import MobileNav from "@/components/MobileNav";
import PageTitle from "@/components/PageTitle";
import AudioPlayer from "@/components/AudioPlayer";
import AutoPlay from "@/components/AutoPlay";
import VersionBadge from "@/components/VersionBadge";
import NotesPage from "@/components/NotesPage";
import { LangProvider } from "@/contexts/LangContext";

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <PageTitle />
      <PageScroll>
        <Hero />
        <About />
        <WorkPhotography />
        <WorkVideo />
        <WorkAIGC />
        <WorkProjects />
        <Contact />
        <NotesPage />
      </PageScroll>
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 90, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: "-30%",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
          opacity: 0.05,
          mixBlendMode: "overlay",
          animation: "grainShiftT 1.2s steps(10) infinite",
          willChange: "transform",
        }} />
      </div>
      <MobileNav />
      <AudioPlayer />
      <AutoPlay />
      <VersionBadge />
    </LangProvider>
  );
}
