import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllEssays } from "@/lib/essays";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const essays = await getAllEssays();
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/essays`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...essays.map((e) => ({
      url: `${site.url}/essays/${e.slug}`,
      lastModified: new Date(e.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
