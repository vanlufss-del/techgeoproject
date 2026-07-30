import type { MetadataRoute } from "next";
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
    { url: `${siteUrl}/politika`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
