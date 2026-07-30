import type { Metadata } from "next";
import Link from "next/link";
import { company, license } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Лицензия на производство маркшейдерских работ",
  description:
    "Действующая лицензия ООО «ТехГеоПроект» на производство маркшейдерских работ: регистрационный номер, дата предоставления, лицензирующий орган и перечень разрешённых видов работ. Выписка из реестра лицензий в PDF.",
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
