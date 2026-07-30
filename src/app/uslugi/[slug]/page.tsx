import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { company, serviceExtras, servicePages, servicePagesUi as ui, services } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/site";
import { ServicePhoto } from "@/components/ServiceArt";
import { Reveal } from "@/components/Reveal";
import { PageNav } from "@/components/PageNav";
import { LegalBase, LiabilityBlock, LicenseBlock, ServiceFaq, Stages } from "@/components/ServiceBlocks";
import { Equipment } from "@/components/Equipment";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

export function generateStaticParams() {
  return services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/uslugi/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/uslugi/${slug}`,
      images: [{ url: `/img/services/${slug}.jpg`, width: 1600, height: 1000 }],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePages[slug];
  const item = services.items.find((s) => s.slug === slug);
  if (!page || !item) notFound();

  const others = services.items.filter((s) => s.slug !== slug);
  const extras = serviceExtras[slug];
  /** Лицензия относится к маркшейдерским работам — показываем её на связанных страницах. */
  const licensed = ["marksheyderskie-raboty", "audit-nedropolzovaniya", "proektirovanie-gornyh-rabot"].includes(slug);
  /** Приборы показываем там, где работа ведётся измерениями. */
  const showsEquipment = ["marksheyderskie-raboty", "geodezicheskie-raboty", "topograficheskaya-semka", "aerofotosemka"].includes(slug);

  const navItems = [
    { id: "vhodit", label: "Что входит" },
    { id: "podrobnee", label: "Подробнее" },
    { id: "rezultat", label: "Результат" },
    ...(licensed ? [{ id: "licenziya", label: "Лицензия" }] : []),
    ...(showsEquipment ? [{ id: "oborudovanie", label: "Оборудование" }] : []),
    { id: "etapy", label: "Этапы работы" },
    ...(extras?.liability
      ? [{ id: "otvetstvennost", label: extras.liability.items.some((i) => i.norm) ? "Ответственность" : "Риски" }]
      : []),
    { id: "normativy", label: "Нормативы" },
    { id: "voprosy", label: "Вопросы" },
    { id: "tsena", label: "Цена и заявка" },
  ];

  return (
    <>
      {/* шапка страницы: с фотографией — тёмная, без неё — кремовая */}
      <section
        className={`relative overflow-hidden pb-16 pt-44 max-lg:pt-36 ${
          page.heroImage ? "bg-dark text-white" : "bg-cream"
        }`}
      >
        {page.heroImage && (
          <>
            <picture>
              <source type="image/avif" srcSet={`/img/heroes/${slug}.avif`} />
              <source type="image/webp" srcSet={`/img/heroes/${slug}.webp`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/img/heroes/${slug}.jpg`}
                alt=""
                aria-hidden="true"
                width={2400}
                height={1029}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover [object-position:62%_50%]"
              />
            </picture>
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "linear-gradient(180deg,rgba(16,19,23,.78) 0%,rgba(16,19,23,.26) 24%,rgba(16,19,23,0) 52%,rgba(16,19,23,.30) 100%)",
                  `rgba(16,19,23,${page.heroVeil ?? 0.34})`,
                ].join(","),
              }}
            />
          </>
        )}

        <div className={`${wrap} relative z-[2]`}>
          <nav
            aria-label="Хлебные крошки"
            className={`mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] ${
              page.heroImage ? "text-white/80" : "text-muted"
            }`}
          >
            <Link href="/" className="no-underline hover:text-amber">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <Link href="/#svc" className="no-underline hover:text-amber">Услуги</Link>
            <span className="mx-2 text-amber">/</span>
            <span>{item.title}</span>
          </nav>
          <h1
            className={`mb-6 max-w-[24ch] text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.025em] ${
              page.heroImage ? "text-white [text-shadow:0_2px_20px_rgba(0,0,0,.4)]" : ""
            }`}
          >
            {page.h1}
          </h1>
          <p
            className={`m-0 max-w-[72ch] text-[19px] leading-relaxed ${
              page.heroImage ? "text-white/85" : "text-graphite"
            }`}
          >
            {page.lead}
          </p>
        </div>
      </section>

      <PageNav items={navItems} />

      {/* фото + что входит */}
      <section id="vhodit" className="bg-white py-20 max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[1.1fr_0.9fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-9`}>
          <Reveal>
            <ServicePhoto slug={slug} alt={item.alt} />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-5 text-[26px] font-semibold tracking-[-0.02em]">{ui.includesTitle}</h2>
            <ul className="m-0 list-none p-0">
              {item.bullets.map((b) => (
                <li
                  key={b}
                  className="relative border-b border-line py-3 pl-[18px] text-[15.5px] leading-snug text-graphite last:border-0 before:absolute before:left-0.5 before:top-[21px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* смысловые блоки */}
      <section id="podrobnee" className="bg-white pb-20 max-lg:pb-14">
        <div className={wrap}>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 max-lg:grid-cols-1">
            {page.blocks.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 70}>
                <div className="border-t border-graphite/25 pt-6">
                  <div className="num-tab mb-4 font-mono text-[13px] tracking-[0.14em] text-amber-dk">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-3 text-[20px] font-semibold leading-snug tracking-[-0.01em]">{b.title}</h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* результат и поводы */}
      <section id="rezultat" className="bg-cream py-20 max-lg:py-14">
        <div className={`${wrap} grid grid-cols-2 gap-14 max-lg:grid-cols-1 max-lg:gap-10`}>
          <Reveal>
            <h2 className="mb-6 text-[26px] font-semibold tracking-[-0.02em]">{ui.deliverablesTitle}</h2>
            <ul className="m-0 list-none p-0">
              {page.deliverables.map((d) => (
                <li key={d} className="mb-2.5 flex items-start gap-3 text-[16px] leading-snug text-ink">
                  <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-graphite text-amber">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mb-6 text-[26px] font-semibold tracking-[-0.02em]">{ui.whenTitle}</h2>
            <ul className="m-0 list-none p-0">
              {page.when.map((w) => (
                <li key={w} className="mb-3 rounded-lg bg-white px-5 py-4 text-[15.5px] leading-snug text-graphite">
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {licensed && <LicenseBlock />}

      {showsEquipment && <Equipment compact />}

      <Stages />

      {extras.liability && <LiabilityBlock data={extras.liability} />}

      <LegalBase />

      <ServiceFaq items={extras.faq} />

      {/* цена + заявка */}
      <section id="tsena" className="bg-dark py-20 text-white max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[1.15fr_0.85fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-9`}>
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">{ui.priceTitle}</div>
            <p className="mb-6 max-w-[62ch] text-[19px] leading-relaxed text-white/80">{ui.priceText}</p>
            <Link
              href={`/tseny#${slug}`}
              className="inline-flex items-center gap-2.5 border-b border-amber pb-1 text-[16px] font-semibold text-white no-underline transition hover:text-amber"
            >
              {ui.priceLink}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/[0.04] p-8 max-lg:p-6">
            <h2 className="mb-3 text-[22px] font-semibold leading-snug tracking-[-0.015em] text-white">{ui.ctaTitle}</h2>
            <p className="mb-6 text-[15.5px] leading-relaxed text-white/80">{ui.ctaText}</p>
            <button
              data-lead
              className="mb-4 inline-flex w-full items-center justify-center gap-3 rounded-full border border-amber bg-ink-deep px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
            >
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber" />
              Рассчитать стоимость
            </button>
            <a href={company.phoneHref} className="num-tab block text-center text-[19px] font-semibold text-white no-underline">
              {company.phone}
            </a>
          </div>
        </div>
      </section>

      {/* другие услуги */}
      <section className="bg-white py-20 max-lg:py-14">
        <div className={wrap}>
          <h2 className="mb-9 text-[26px] font-semibold tracking-[-0.02em]">{ui.otherTitle}</h2>
          <div className="grid grid-cols-5 gap-px border border-line bg-line max-lg:grid-cols-1">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/uslugi/${o.slug}`}
                className="group bg-white px-6 py-7 text-[16px] font-medium leading-snug text-ink no-underline transition-colors hover:bg-cream"
              >
                <span className="mb-4 block h-px w-8 bg-amber transition-all duration-300 group-hover:w-14" />
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: extras.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbSchema([
            { name: "Главная", url: "/" },
            { name: "Услуги", url: "/#svc" },
            { name: item.title, url: `/uslugi/${slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: item.title,
            serviceType: item.title,
            description: page.metaDescription,
            url: `${siteUrl}/uslugi/${slug}`,
            image: `${siteUrl}/img/services/${slug}.jpg`,
            provider: { "@type": "Organization", name: company.legal, url: siteUrl },
            areaServed: { "@type": "Country", name: "Россия" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: item.title,
              itemListElement: item.bullets.map((b) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: b },
              })),
            },
          },
        ]}
      />
    </>
  );
}
