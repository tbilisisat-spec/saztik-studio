import type { MetadataRoute } from "next";
import { getWorkItems } from "@/db/work";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://saztik.com";
  const now = new Date();

  let cases: MetadataRoute.Sitemap = [];
  try {
    const items = await getWorkItems();
    cases = items.map((item) => ({
      url: `${base}/work/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    cases = [];
  }

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/start-a-project`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...cases,
  ];
}
