import type { Metadata } from "next";
import Link from "next/link";
import { certificates, company, license, sro } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Type";

export const metadata: Metadata = {
  title: "Лицензия, СРО и сертификаты качества",
  description:
    "Лицензия Ростехнадзора на производство маркшейдерских работ, членство в СРО проектировщиков и сертификаты системы менеджмента качества. Регистрационные номера, сроки действия, документы в PDF.",
  alternates: { canonical: "/litsenzii" },
  openGraph: { title: "Лицензия и документы — ТехГеоПроект", url: "/litsenzii" },
};

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

export default function LicensePage() {
  return (
    <>
      <section className="bg-cream pb-14 pt-40 max-lg:pt-32">
        <div className={wrap}>
          <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="no-underline hover:text-amber-dk">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <span>Лицензии и документы</span>
          </nav>
          <h1 className="mb-6 max-w-[26ch] text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Лицензии и документы
          </h1>
          <p className="m-0 max-w-[74ch] text-[18px] leading-relaxed text-graphite">
            Маркшейдерские работы вправе выполнять только организация с действующей лицензией. Ниже —
            реквизиты нашей лицензии и полный перечень разрешённых видов работ. Номер можно сверить
            в реестре Ростехнадзора.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[0.58fr_1fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-9`}>
          <Reveal>
            <a
              href={license.fileUrl}
              target="_blank"
              rel="noopener"
              className="group relative block overflow-hidden rounded-xl border border-line bg-cream"
            >
              <picture>
                <source type="image/webp" srcSet="/docs/vypiska-preview.webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/docs/vypiska-preview.jpg"
                  alt="Выписка из реестра лицензий на производство маркшейдерских работ, ООО «ТехГеоПроект»"
                  width={1000}
                  height={1078}
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </picture>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-ink-deep/88 py-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Открыть выписку в PDF
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="mb-6 text-[clamp(22px,2.6vw,30px)] font-semibold leading-snug tracking-[-0.02em]">
                {license.title}
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <dl className="m-0 border-t border-graphite/25">
                {[
                  ["Регистрационный номер", license.number, true],
                  ["Статус", license.status, false],
                  ["Дата предоставления", license.issuedAt, false],
                  ["Лицензирующий орган", license.authority, false],
                  ["Лицензируемый вид деятельности", license.activity, false],
                  ["Реквизиты приказа", license.orderRef, false],
                  ["Лицензиат", company.legalFull, false],
                  ["ИНН", company.inn, true],
                  ["ОГРН", company.ogrn, true],
                  ["Адрес места осуществления деятельности", company.address, false],
                ].map(([k, v, mono]) => (
                  <div key={String(k)} className="grid grid-cols-[1fr_1.15fr] gap-6 border-b border-line py-3.5 max-lg:grid-cols-1 max-lg:gap-1">
                    <dt className="text-[14px] leading-snug text-muted">{k}</dt>
                    <dd className={`m-0 text-[15px] font-medium leading-snug text-ink ${mono ? "num-tab font-mono" : ""}`}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 max-lg:py-14">
        <div className={wrap}>
          <Reveal>
            <h2 className="mb-3 text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">{license.worksTitle}</h2>
          </Reveal>
          <Reveal delay={70}>
            <p className="mb-9 max-w-[74ch] text-[17px] leading-relaxed text-muted">
              Перечень приведён дословно по выписке из реестра лицензий.
            </p>
          </Reveal>
          <ol className="m-0 grid list-none grid-cols-2 gap-x-12 p-0 max-lg:grid-cols-1">
            {license.works.map((w, i) => (
              <li key={w} className="flex items-start gap-4 border-b border-line py-4">
                <span className="num-tab mt-0.5 shrink-0 font-mono text-[13px] tracking-[0.1em] text-amber-dk">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15.5px] leading-snug text-graphite">{w}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sro" className="bg-cream py-20 max-lg:py-14">
        <div className={wrap}>
          <Reveal>
            <div className="mb-5">
              <Eyebrow>{sro.tag}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mb-4 max-w-[24ch] text-[clamp(24px,3vw,34px)] font-semibold leading-snug tracking-[-0.02em]">
              {sro.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="m-0 mb-10 max-w-[76ch] text-[17px] leading-relaxed text-muted">{sro.lead}</p>
          </Reveal>

          <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-9">
            <Reveal>
              <a
                href={sro.fileUrl}
                target="_blank"
                rel="noopener"
                className="group block no-underline"
              >
                <div className="overflow-hidden rounded-lg border border-line bg-white">
                  <picture>
                    <source type="image/avif" srcSet={`${sro.preview}.avif`} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${sro.preview}.jpg`}
                      alt="Выписка из реестра членов саморегулируемой организации Ассоциация Проектировщиков"
                      width={495}
                      height={700}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </picture>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-amber-dk">
                  {sro.fileLabel}
                  <span
                    aria-hidden="true"
                    className="h-[2px] w-6 bg-amber transition-[width] duration-300 group-hover:w-10"
                  />
                </span>
              </a>
            </Reveal>

            <div>
              <Reveal delay={70}>
                <dl className="m-0 mb-9 border-t border-graphite/25">
                  {sro.fields.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-8 border-b border-line py-3 max-lg:flex-col max-lg:gap-1"
                    >
                      <dt className="shrink-0 text-[14.5px] leading-snug text-muted">{k}</dt>
                      <dd className="num-tab m-0 text-right text-[15px] font-medium leading-snug text-ink max-lg:text-left">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="mb-3 text-[19px] font-semibold tracking-[-0.01em] text-ink">{sro.scopeTitle}</h3>
                <ul className="m-0 mb-6 list-none p-0">
                  {sro.scope.map((x) => (
                    <li
                      key={x}
                      className="relative py-[6px] pl-[18px] text-[15.5px] leading-snug text-graphite before:absolute before:left-0.5 before:top-[13px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="m-0 border-l-[3px] border-amber pl-5 text-[15px] leading-relaxed text-ink">{sro.note}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="sertifikaty" className="bg-white py-20 max-lg:py-14">
        <div className={wrap}>
          <Reveal>
            <div className="mb-5">
              <Eyebrow>{certificates.tag}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mb-4 max-w-[24ch] text-[clamp(24px,3vw,34px)] font-semibold leading-snug tracking-[-0.02em]">
              {certificates.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="m-0 mb-9 max-w-[76ch] text-[17px] leading-relaxed text-muted">{certificates.lead}</p>
          </Reveal>

          <Reveal delay={160}>
            <dl className="mb-12 grid grid-cols-4 gap-px border border-line bg-line max-lg:grid-cols-2">
              {[
                ["Регистрационный номер", certificates.regNumber],
                ["Стандарт", certificates.standard],
                ["Дата регистрации", certificates.validFrom],
                ["Действует до", certificates.validUntil],
              ].map(([k, v]) => (
                <div key={k} className="bg-white px-6 py-5">
                  <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber-dk">{k}</dt>
                  <dd className="m-0 text-[15.5px] font-medium leading-snug text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1 max-lg:gap-7">
            {certificates.items.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 70}>
                <a
                  href={`/docs/sertifikaty/${c.slug}.pdf`}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col no-underline"
                >
                  <div className="mb-5 overflow-hidden rounded-lg border border-line bg-cream">
                    <picture>
                      <source type="image/avif" srcSet={`/docs/sertifikaty/${c.slug}.avif`} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/docs/sertifikaty/${c.slug}.jpg`}
                        alt={`${c.title}: ${c.subtitle}`}
                        width={495}
                        height={700}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </picture>
                  </div>
                  <h3 className="mb-1.5 text-[18px] font-semibold leading-snug text-ink transition-colors group-hover:text-amber-dk">
                    {c.title}
                  </h3>
                  <p className="m-0 mb-3 text-[14.5px] leading-snug text-graphite">{c.subtitle}</p>
                  <p className="m-0 mb-4 flex-1 text-[14px] leading-relaxed text-muted">{c.note}</p>
                  <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-amber-dk">
                    Открыть PDF
                    <span
                      aria-hidden="true"
                      className="h-[2px] w-6 bg-amber transition-[width] duration-300 group-hover:w-10"
                    />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-2 gap-14 border-t border-line pt-12 max-lg:grid-cols-1 max-lg:gap-8">
            <Reveal>
              <div>
                <h3 className="mb-3 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  {certificates.scopeTitle}
                </h3>
                <ul className="m-0 list-none p-0">
                  {certificates.scope.map((x) => (
                    <li
                      key={x}
                      className="relative py-[6px] pl-[18px] text-[15.5px] leading-snug text-graphite before:absolute before:left-0.5 before:top-[13px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{certificates.scopeNote}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="border-l-[3px] border-amber bg-cream px-7 py-6">
                <h3 className="mb-3 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  {certificates.systemTitle}
                </h3>
                <p className="m-0 text-[15.5px] leading-relaxed text-graphite">{certificates.systemText}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-dark py-20 text-white max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[1.15fr_0.85fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-9`}>
          <div>
            <h2 className="mb-4 max-w-[26ch] text-[clamp(24px,3vw,34px)] font-semibold leading-snug text-white">
              Проверьте, покрывает ли лицензия вашу задачу
            </h2>
            <p className="mb-6 max-w-[62ch] text-[17.5px] leading-relaxed text-white/75">
              Опишите объект — скажем прямо, какие работы выполняем сами по лицензии, а какие
              относятся к проектным или геодезическим и оформляются иначе.
            </p>
            <Link
              href="/oborudovanie"
              className="inline-flex items-center gap-2.5 border-b border-amber pb-1 text-[16px] font-semibold text-white no-underline transition hover:text-amber"
            >
              Приборы и свидетельства о поверке
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/[0.04] p-8 max-lg:p-6">
            <button
              data-lead
              className="mb-4 inline-flex w-full items-center justify-center gap-3 rounded-full border border-amber bg-ink-deep px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
            >
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber" />
              Задать вопрос
            </button>
            <a href={company.phoneHref} className="num-tab block text-center text-[19px] font-semibold text-white no-underline">
              {company.phone}
            </a>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Лицензии и документы", url: "/litsenzii" },
        ])}
      />
    </>
  );
}
