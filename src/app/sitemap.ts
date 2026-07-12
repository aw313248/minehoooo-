import { MetadataRoute } from "next";
import { workSlugs } from "@/data/works";
import { fieldNotes } from "@/data/fieldNotes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://minehoooo.xyz";

  const works: MetadataRoute.Sitemap = workSlugs.map(slug => ({
    url: `${base}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const notes: MetadataRoute.Sitemap = fieldNotes.map(n => ({
    url: `${base}/field-notes/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/field-notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...works,
    ...notes,
  ];
}
