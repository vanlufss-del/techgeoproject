import type { MetadataRoute } from "next";
import { posts } from "@/blog";
import { services } from "@/copy";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/tseny`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/kontakty`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/litsenzii`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/oborudovanie`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...services.items.map((s) => ({
      url: `${siteUrl}/uslugi/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/stati`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${siteUrl}/stati/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/politika`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
