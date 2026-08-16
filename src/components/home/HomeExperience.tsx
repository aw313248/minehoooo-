"use client";

import About from "@/components/About";
import AudioPlayer from "@/components/AudioPlayer";
import AutoPlay from "@/components/AutoPlay";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import IntroScreen from "@/components/IntroScreen";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import NotesPage from "@/components/NotesPage";
import PageScroll from "@/components/PageScroll";
import PageTitle from "@/components/PageTitle";
import VersionBadge from "@/components/VersionBadge";
import WorkAIGC from "@/components/WorkAIGC";
import WorkPhotography from "@/components/WorkPhotography";
import WorkProjects from "@/components/WorkProjects";
import WorkVideo from "@/components/WorkVideo";
import { LangProvider } from "@/contexts/LangContext";

export default function HomeExperience() {
  return (
    <LangProvider>
      <div className="home-experience">
        <IntroScreen />
        <CustomCursor />
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
        <div aria-hidden="true" className="home-film-grain">
          <div />
        </div>
        <MobileNav />
        <AudioPlayer />
        <AutoPlay />
        <VersionBadge />
      </div>
      <style jsx>{`
        .home-film-grain {
          position: fixed;
          inset: 0;
          z-index: 90;
          pointer-events: none;
          overflow: hidden;
        }

        .home-film-grain > div {
          position: absolute;
          inset: -30%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
          background-size: 140px 140px;
          opacity: 0.05;
          mix-blend-mode: overlay;
          animation: grainShiftT 1.2s steps(10) infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .home-film-grain > div {
            animation: none;
          }
        }
      `}</style>
    </LangProvider>
  );
}
