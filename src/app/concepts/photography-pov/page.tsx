import type { Metadata } from "next";
import PhotographyPovPrototype from "@/components/concepts/PhotographyPovPrototype";

export const metadata: Metadata = {
  title: "Photography POV Concept — MINEH4O",
  description: "Mobile-first photography portfolio interaction concept",
  robots: { index: false, follow: false },
};

export default function PhotographyPovConceptPage() {
  return <PhotographyPovPrototype />;
}
