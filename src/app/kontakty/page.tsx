import type { Metadata } from "next";
import Link from "next/link";
import { company, contacts, license } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { MapEmbed } from "@/components/MapEmbed";
import { MailIcon, MaxIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "ООО «ТехГеоПроект», г. Кемерово, ул. Кузбасская, 33А. Телефон +7 (961) 722-00-01, почта tehgeoproekt@mail.ru. Маркшейдерские и геодезические работы по всей России.",
  alternates: { canonical: "/kontakty" },
  openGraph: { title: "Контакты — ТехГеоПроект", url: "/kontakty" },
};

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-5">
      <div className="mb-2 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">{label}</div>
      {children}
    </div>
  );
}

export default function ContactsPage() {
  return (
    <>
      <section className="bg-cream pb-14 pt-40 max-lg:pt-32">
        <div className={wrap}>
          <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="no-underline hover:text-amber-dk">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <span>Контакты</span>
          </nav>
          <h1 className="mb-6 text-[clamp(32px,4.4vw,54px)] font-semibold leading-[1.06] tracking-[-0.025em]">
            {contacts.title}
          </h1>
          <p className="m-0 max-w-[70ch] text-[18px] leading-relaxed text-graphite">{contacts.lead}</p>
        </div>
      </section>

      {/* контакты слева, карта справа — без прокрутки */}
      <section className="bg-white py-20 max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[0.95fr_1.05fr] items-stretch gap-14 max-lg:grid-cols-1 max-lg:gap-10`}>
          <Reveal>
            <div className="border-t border-graphite/25">
              <Field label={contacts.phoneLabel}>
                <a href={company.phoneHref} className="num-tab text-[clamp(24px,2.6vw,32px)] font-semibold tracking-[-0.02em] text-ink no-underline transition hover:text-amber-dk">
                  {company.phone}
                </a>
              </Field>

              <Field label={contacts.emailLabel}>
                <a href={`mailto:${company.email}`} className="text-[19px] font-medium text-ink no-underline transition hover:text-amber-dk break-anywhere">
                  {company.email}
                </a>
              </Field>

              <Field label={contacts.messengersLabel}>
                <div className="mb-3 flex items-center gap-3">
                  {company.max && (<a href={company.max} aria-label="Написать в MAX" className="leading-none transition hover:-translate-y-0.5">
                    <MaxIcon id="mxContacts" size={44} />
                  </a>)}
                  <a href={company.whatsapp} target="_blank" rel="noopener" aria-label="Написать в WhatsApp" className="leading-none transition hover:-translate-y-0.5">
                    <WhatsAppIcon size={44} />
                  </a>
                  <a href={`mailto:${company.email}`} aria-label="Написать на почту" className="leading-none transition hover:-translate-y-0.5">
                    <MailIcon size={44} />
                  </a>
                </div>
                <p className="m-0 max-w-[48ch] text-[14.5px] leading-relaxed text-muted">{contacts.messengersNote}</p>
              </Field>

              <div className="grid grid-cols-[1.4fr_1fr] gap-8 max-lg:grid-cols-1 max-lg:gap-0">
                <Field label={contacts.addressLabel}>
                  <p className="m-0 text-[16px] leading-snug text-ink">{company.address}</p>
                </Field>
                <Field label={contacts.hoursLabel}>
                  <p className="num-tab m-0 text-[16px] text-ink">{contacts.hours}</p>
                </Field>
              </div>

              <div className="grid grid-cols-[1.4fr_1fr] gap-8 max-lg:grid-cols-1 max-lg:gap-0">
                <Field label={contacts.directorLabel}>
                  <p className="m-0 text-[16px] leading-snug text-ink">{company.director}</p>
                </Field>
                <Field label="Лицензия">
                  <p className="num-tab m-0 font-mono text-[14.5px] leading-snug text-ink">{license.number}</p>
                  <Link href="/litsenzii" className="mt-2 inline-flex items-center gap-2 border-b border-amber pb-0.5 text-[14.5px] font-semibold text-ink no-underline transition hover:text-amber-dk">
                    Смотреть выписку
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </Field>
              </div>

              <p className="mt-6 flex items-baseline gap-3.5 text-[15px] leading-relaxed text-muted">
                <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
                <span>{contacts.mapNote}</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={90} className="h-full">
            <MapEmbed fill />
          </Reveal>
        </div>
      </section>

      {/* реквизиты */}
      <section id="rekvizity" className="bg-white py-20 max-lg:py-14">
        <div className={wrap}>
          <Reveal><h2 className="mb-3 text-[clamp(24px,3vw,34px)] font-semibold tracking-[-0.02em]">{contacts.requisitesTitle}</h2></Reveal>
          <Reveal delay={70}><p className="mb-9 max-w-[70ch] text-[16px] leading-relaxed text-muted">{contacts.requisitesNote}</p></Reveal>
          <Reveal delay={120}>
            <dl className="m-0 border-t border-graphite/25">
              {contacts.requisites.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[0.9fr_1.1fr] gap-8 border-b border-line py-3.5 max-lg:grid-cols-1 max-lg:gap-1">
                  <dt className="text-[14px] leading-snug text-muted">{k}</dt>
                  <dd className={`m-0 text-[15px] font-medium leading-snug text-ink ${/^[\d.\sЛ0-9/-]+$/.test(v) ? "num-tab font-mono" : ""}`}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Контакты", url: "/kontakty" },
        ])}
      />
    </>
  );
}
