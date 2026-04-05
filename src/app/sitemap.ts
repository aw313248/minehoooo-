import { MetadataRoute } from "next";
import { workSlugs } from "@/data/works";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://minehoooo.xyz";

  const works: MetadataRoute.Sitemap = workSlugs.map(slug => ({
    url: `${base}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...works,
  ];
}
