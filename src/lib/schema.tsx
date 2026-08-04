import type { Post } from "@/blog";
import { company, faq, geo, maps, services } from "@/copy";
import { siteUrl } from "./site";

/** JSON-LD: организация, услуги, хлебные крошки, FAQ. */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legal,
    alternateName: company.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    email: company.email,
    telephone: company.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Кузбасская, д. 33А",
      addressLocality: "Кемерово",
      postalCode: "650000",
      addressRegion: "Кемеровская область — Кузбасс",
      addressCountry: "RU",
    },
    taxID: company.inn,
    vatID: company.inn,
    /** Внешние профили компании: по ним поисковики связывают сайт с карточками
     *  в справочниках и понимают, что это одна и та же организация. */
    sameAs: [maps.twogisLink, maps.yandexLink],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneHref.replace("tel:", ""),
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
  };
}

export function localBusinessSchema() {
  if (!geo.enabled) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.legal,
    image: `${siteUrl}/og.jpg`,
    url: siteUrl,
    telephone: company.phoneHref.replace("tel:", ""),
    email: company.email,
    priceRange: geo.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: geo.streetAddress,
      addressLocality: geo.addressLocality,
      postalCode: geo.postalCode,
      addressRegion: geo.addressRegion,
      addressCountry: "RU",
    },
    ...(geo.latitude && geo.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.latitude, longitude: geo.longitude } }
      : {}),
    openingHours: [...geo.openingHours],
    areaServed: { "@type": "Country", name: "Россия" },
  };
}

export function servicesSchema() {
  return services.items.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    provider: { "@type": "Organization", name: company.legal, url: siteUrl },
    areaServed: { "@type": "Country", name: "Россия" },
    url: `${siteUrl}/uslugi/${s.slug}`,
    description: s.bullets.join(". "),
  }));
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.url}`,
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Разметка статьи. Поисковики и языковые модели берут отсюда дату, автора и тему. */
export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "ru-RU",
    articleSection: post.tag,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/stati/${post.slug}` },
    author: { "@type": "Organization", name: company.legal, url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: company.legal,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
    },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
