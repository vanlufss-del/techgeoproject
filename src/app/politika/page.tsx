import type { Metadata } from "next";
import Link from "next/link";
import { company, privacy } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Какие персональные данные собирает сайт ООО «ТехГеоПроект», зачем они нужны, сколько хранятся, как отозвать согласие и отказаться от аналитических cookie.",
  alternates: { canonical: "/politika" },
  robots: { index: true, follow: true },
};

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-cream pb-14 pt-40 max-lg:pt-32">
        <div className={wrap}>
          <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="no-underline hover:text-amber-dk">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <span>Политика обработки данных</span>
          </nav>
          <h1 className="mb-5 max-w-[30ch] text-[clamp(28px,3.8vw,46px)] font-semibold leading-[1.08] tracking-[-0.02em]">
            {privacy.title}
          </h1>
          <p className="num-tab mb-6 font-mono text-[12.5px] uppercase tracking-[0.14em] text-amber-dk">
            {privacy.updatedLabel} {privacy.updatedAt}
          </p>
          <p className="m-0 max-w-[74ch] text-[18px] leading-relaxed text-graphite">{privacy.intro}</p>
        </div>
      </section>

      <section className="bg-white py-20 max-lg:py-14">
        <div className={wrap}>
          <div className="max-w-[86ch]">
            {privacy.sections.map((s) => (
              <section key={s.h} className="mb-11 last:mb-0">
                <h2 className="mb-4 border-b border-line pb-3 text-[21px] font-semibold leading-snug tracking-[-0.01em]">
                  {s.h}
                </h2>
                {s.p.map((t) => (
                  <p key={t} className="mb-4 text-[16.5px] leading-[1.72] text-graphite last:mb-0">
                    {t}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-14 max-w-[86ch] rounded-r-md border-l-[3px] border-amber bg-cream px-8 py-7 max-lg:px-6">
            <p className="mb-2 text-[17px] font-semibold">Вопросы по персональным данным</p>
            <p className="m-0 text-[16px] leading-relaxed text-muted">
              Напишите на{" "}
              <a href={`mailto:${company.email}`} className="font-medium text-ink underline decoration-amber">
                {company.email}
              </a>{" "}
              с темой «Персональные данные» или позвоните{" "}
              <a href={company.phoneHref} className="num-tab font-medium text-ink underline decoration-amber">
                {company.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Политика обработки данных", url: "/politika" },
        ])}
      />
    </>
  );
}
