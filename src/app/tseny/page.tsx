import type { Metadata } from "next";
import Link from "next/link";
import { company, prices } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Цены на маркшейдерские и геодезические работы",
  description:
    "Стоимость маркшейдерских работ, проектирования горных работ, аэрофотосъёмки, топосъёмки и аудита недропользования. Смета считается под задачу — цены ниже рынка.",
  alternates: { canonical: "/tseny" },
  openGraph: { title: "Цены на работы — ТехГеоПроект", url: "/tseny" },
};

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

function Cell({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      data-label={label}
      className={`border-b border-line py-4 pr-6 align-top text-[15px] leading-snug max-md:flex max-md:justify-between max-md:gap-6 max-md:border-0 max-md:py-1.5 max-md:pr-0 max-md:before:shrink-0 max-md:before:font-mono max-md:before:text-[11px] max-md:before:uppercase max-md:before:tracking-[0.12em] max-md:before:text-muted max-md:before:content-[attr(data-label)] ${className}`}
    >
      {children}
    </td>
  );
}

export default function PricesPage() {
  return (
    <>
      <section className="bg-cream pb-16 pt-40 max-lg:pt-32">
        <div className={wrap}>
          <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="no-underline hover:text-amber-dk">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <span>Цены</span>
          </nav>
          <h1 className="mb-6 max-w-[26ch] text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]">
            {prices.title}
          </h1>
          <p className="m-0 max-w-[76ch] text-[17.5px] leading-relaxed text-muted">{prices.lead}</p>
        </div>
      </section>

      <section className="bg-white py-20 max-lg:py-14">
        <div className={wrap}>
          {prices.sections.map((sec) => (
            <div key={sec.slug} id={sec.slug} className="mb-16 last:mb-0">
              <h2 className="mb-6 text-[clamp(22px,2.6vw,32px)] font-semibold tracking-[-0.02em]">
                <Link href={`/uslugi/${sec.slug}`} className="no-underline transition hover:text-amber-dk">
                  {sec.title}
                </Link>
              </h2>

              <table className="w-full border-collapse text-left max-md:block">
                <thead className="max-md:hidden">
                  <tr className="border-y border-graphite/25">
                    <th className="w-[30%] py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.name}</th>
                    <th className="py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.result}</th>
                    {"withApproval" in sec && sec.withApproval && (
                      <>
                        <th className="w-[16%] py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.org}</th>
                        <th className="w-[11%] py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.approval}</th>
                      </>
                    )}
                    <th className="w-[10%] py-3 pr-6 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.term}</th>
                    <th className="w-[15%] py-3 font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted">{prices.columns.price}</th>
                  </tr>
                </thead>
                <tbody className="max-md:block">
                  {sec.rows.map((r) => (
                    <tr
                      key={r.name}
                      className="transition-colors hover:bg-cream/70 max-md:mb-4 max-md:block max-md:border-b max-md:border-line max-md:pb-4 max-md:hover:bg-transparent"
                    >
                      <Cell label={prices.columns.name} className="font-medium text-ink max-md:mb-2 max-md:text-[16px] max-md:before:content-none">
                        {r.name}
                      </Cell>
                      <Cell label={prices.columns.result} className="text-muted">{r.result}</Cell>
                      {"withApproval" in sec && sec.withApproval && (
                        <>
                          <Cell label={prices.columns.org} className="text-muted">{r.org || "—"}</Cell>
                          <Cell label={prices.columns.approval} className="num-tab text-muted">{r.approval || "—"}</Cell>
                        </>
                      )}
                      <Cell label={prices.columns.term} className="num-tab text-muted">
                        {r.term || prices.onRequest}
                      </Cell>
                      <Cell
                        label={prices.columns.price}
                        className={`num-tab font-mono ${r.price ? "font-medium text-ink" : "text-muted"} max-md:font-semibold`}
                      >
                        {r.price || prices.onRequest}
                      </Cell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <p className="mt-4 flex items-baseline gap-3 font-mono text-[12.5px] tracking-[0.04em] text-muted">
            <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
            {prices.unitsNote}
          </p>
        </div>
      </section>

      <section className="bg-cream pt-20 max-lg:pt-14">
        <div className={wrap}>
          <Reveal>
            <div className="grid grid-cols-[0.9fr_1.1fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-7">
              <h2 className="m-0 text-[clamp(24px,2.8vw,34px)] font-semibold leading-tight tracking-[-0.02em] text-ink">
                {prices.packageTitle}
              </h2>
              <div className="flex flex-col gap-5">
                <p className="m-0 text-[17px] leading-relaxed text-graphite">{prices.packageText}</p>
                <p className="m-0 text-[17px] leading-relaxed text-graphite">{prices.packageText2}</p>
                <p className="m-0 border-l-[3px] border-amber pl-5 text-[17px] font-medium leading-relaxed text-ink">
                  {prices.packageNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-20 pt-14 max-lg:pb-14 max-lg:pt-10">
        <div className={wrap}>
          <div className="grid grid-cols-[1fr_auto] items-center gap-14 rounded-r-md border-l-[3px] border-amber bg-white px-10 py-9 shadow-[0_3px_24px_rgba(63,71,80,.08)] max-lg:grid-cols-1 max-lg:gap-7 max-lg:px-6 max-lg:py-7">
            <div>
              <h2 className="mb-4 text-[26px] font-semibold tracking-[-0.015em]">{prices.whyFromTitle}</h2>
              <p className="mb-5 max-w-[70ch] text-[17px] leading-relaxed text-muted">{prices.whyFromText}</p>
              <p className="m-0 max-w-[70ch] text-[17px] leading-relaxed text-ink">{prices.ctaText}</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <button
                data-lead
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-amber bg-ink-deep px-10 py-[18px] text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark hover:shadow-[0_6px_26px_rgba(242,167,59,.22)]"
              >
                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber" />
                {prices.ctaButton}
              </button>
              <a href={company.phoneHref} className="num-tab whitespace-nowrap text-[19px] font-semibold text-ink no-underline">
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Цены", url: "/tseny" },
        ])}
      />
    </>
  );
}
