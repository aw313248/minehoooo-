import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://minehoooo.xyz",
      lastModified: new Date("2026-04-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
