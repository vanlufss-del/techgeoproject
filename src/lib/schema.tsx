import { company, faq, geo, services } from "@/copy";
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

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
