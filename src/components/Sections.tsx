import Link from "next/link";
import {
  about, advantages, company, contactStrip, cta, docs, faq, goal, intro, legal, license, services, values,
} from "@/copy";
import { AdvIcon, Mark, MaxIcon, WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { ServicePhoto } from "./ServiceArt";
import { Eyebrow, Headline } from "./Type";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";
const tagWrap = "mb-5";
const h2 = "mb-6 text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]";
const leadP = "m-0 max-w-[78ch] text-[17.5px] leading-relaxed text-muted";

/* ---------- Представляем компанию ---------- */
export function Intro() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 max-lg:py-16">
      <svg className="absolute -left-36 top-10 z-0 w-[520px] opacity-[0.13]" viewBox="0 0 520 420" fill="none" stroke="#C98A22" strokeWidth="1" aria-hidden="true">
        {[40, 92, 144, 196, 248, 300, 352].map((y) => (
          <path key={y} d={`M0 ${y}C80 ${y - 32} 150 ${y + 38} 260 ${y + 4}s150-30 260 4`} />
        ))}
      </svg>
      <div className="absolute -bottom-28 -right-16 z-0 w-[460px] opacity-[0.055]" aria-hidden="true">
        <Mark size={460} color="#3F4750" />
      </div>

      <div className={`${wrap} relative z-[2] grid grid-cols-[0.78fr_1.22fr] items-start gap-[76px] max-lg:grid-cols-1 max-lg:gap-8`}>
        <div>
          <Reveal><div className={tagWrap}><Eyebrow>{intro.tag}</Eyebrow></div></Reveal>
          <Reveal delay={80}><h2 className="text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em]">{intro.title}</h2></Reveal>
          <Reveal delay={160}><div className="my-7 h-[3px] w-16 bg-amber" /></Reveal>
          <Reveal delay={200}>
            <div className="font-mono text-[12.5px] leading-[2.1] tracking-[0.08em] text-muted max-lg:hidden">
              {intro.directions.map((d) => <div key={d}>{d}</div>)}
            </div>
          </Reveal>
        </div>
        <div>
          <Reveal><p className="mb-9 max-w-[58ch] text-[21px] leading-relaxed text-graphite">{intro.lead}</p></Reveal>
          <Reveal delay={80}>
            <div className="rounded-r-md border-l-[3px] border-amber bg-white px-9 py-8 shadow-[0_3px_24px_rgba(63,71,80,.08)] max-lg:px-6 max-lg:py-6">
              <p className="mb-4 text-[23px] font-semibold leading-tight tracking-[-0.015em]">{intro.calloutTitle}</p>
              <p className="m-0 text-[17px] leading-relaxed text-muted">{intro.calloutBody}</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 flex items-baseline gap-3.5 text-[16.5px] leading-relaxed text-muted">
              <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
              <span>{intro.note}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Преимущества ---------- */
export function Advantages() {
  return (
    <section className="bg-white py-24 max-lg:py-16">
      <div className={wrap}>
        {/* подложка — кусок стены уступов, карточки лежат на ней светлыми плитами */}
        <div className="relative overflow-hidden rounded-2xl px-12 pb-14 pt-12 max-lg:rounded-xl max-lg:px-6 max-lg:pb-9 max-lg:pt-8">
          <picture>
            <source type="image/avif" srcSet="/img/stone-panel.avif" />
            <source type="image/webp" srcSet="/img/stone-panel.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/stone-panel.jpg"
              alt=""
              aria-hidden="true"
              width={1500}
              height={789}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg,rgba(24,28,33,.42) 0%,rgba(24,28,33,.2) 42%,rgba(24,28,33,.46) 100%)",
            }}
          />

          <div className="relative">
            <Reveal>
              <div className={tagWrap}><Eyebrow>{advantages.tag}</Eyebrow></div>
            </Reveal>
            <Reveal delay={80}>
              <Headline text={advantages.title} mark={advantages.titleMark} className={`${h2} mb-0 text-white [text-shadow:0_2px_14px_rgba(20,24,28,.45)]`} />
            </Reveal>

            <div className="mt-11 grid grid-cols-3 gap-x-8 gap-y-9 pb-1 pr-1 max-lg:grid-cols-1 max-lg:gap-y-7">
              {advantages.items.map((it, i) => (
                <Reveal key={it.text} delay={(i % 3) * 70} className="h-full">
                  <div className="group relative h-full">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border border-amber transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                    />
                    <div className="relative flex h-full flex-col rounded-lg bg-cream px-7 pb-8 pt-7 transition-shadow duration-300 group-hover:shadow-[0_10px_30px_rgba(0,0,0,.28)]">
                      <span className="mb-6 grid h-[52px] w-[52px] place-items-center rounded-[10px] bg-graphite text-amber">
                        <AdvIcon name={it.icon} />
                      </span>
                      <p className="m-0 text-[16px] font-medium leading-snug text-ink">{it.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Услуги ---------- */
export function Services() {
  return (
    <section id="svc" className="bg-white py-24 max-lg:py-16">
      <div className={wrap}>
        <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-6">
          <div>
            <Reveal><div className={tagWrap}><Eyebrow>{services.tag}</Eyebrow></div></Reveal>
            <Reveal delay={80}><Headline text={services.title} mark={services.titleMark} className={`${h2} mb-0`} /></Reveal>
          </div>
          <Reveal delay={140}>
            <p className="m-0 max-w-[52ch] text-[18px] leading-relaxed text-muted">{services.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-16 grid grid-cols-[auto_1fr] items-baseline gap-x-12 gap-y-4 border-y border-line py-11 max-lg:mt-10 max-lg:grid-cols-1 max-lg:gap-y-3 max-lg:py-8">
            <div className="num-tab text-[clamp(48px,6vw,84px)] font-semibold leading-none tracking-[-0.04em] text-amber-dk">
              {services.figureValue}
            </div>
            <div>
              <div className="mb-3 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-amber-dk">
                {services.figureLabel}
              </div>
              <p className="m-0 max-w-[66ch] text-[19px] leading-relaxed text-ink">
                {services.figureText}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-14 max-lg:grid-cols-1 max-lg:gap-11">
          {services.items.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80} className="h-full">
              <article className="group flex h-full flex-col">
                {/* нумерация с янтарной чертой: выделяет заголовок карточки, не повторяя маркер разделов */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="num-tab font-mono text-[13px] font-medium leading-none text-amber-dk">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-[2px] w-9 rounded-sm bg-amber transition-[width] duration-300 group-hover:w-16" />
                </div>
                <h3 className="mb-5 flex min-h-[2.5em] items-start text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-[-0.02em] max-lg:min-h-0">
                  <Link href={`/uslugi/${s.slug}`} className="no-underline transition hover:text-amber-dk">{s.title}</Link>
                </h3>
                <ServicePhoto slug={s.slug} alt={s.alt} />
                <ul className="m-0 flex-1 list-none p-0">
                  {s.bullets.map((b) => (
                    <li key={b} className="relative py-[5px] pl-[18px] text-[14.5px] leading-[1.45] text-graphite before:absolute before:left-0.5 before:top-[11px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber">
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ---------- Правовой блок ---------- */
export function Legal() {
  return (
    <section className="bg-white py-16">
      <div className={wrap}>
        <div className="mx-auto max-w-[96ch] text-center">
          <div className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-amber-dk">{legal.summary}</div>
          <p className="m-0 text-sm leading-[1.75] text-graphite">{legal.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Документы ---------- */
export function Docs() {
  return (
    <section id="docs" className="bg-[#F2EFE9] py-24 max-lg:py-16">
      <div className={wrap}>
        <Reveal><div className={tagWrap}><Eyebrow>{docs.tag}</Eyebrow></div></Reveal>
        <Reveal delay={80}><Headline text={docs.title} mark={docs.titleMark} className={h2} /></Reveal>
        <Reveal delay={140}><p className={leadP}>{docs.lead}</p></Reveal>

        <Reveal delay={80}>
          <div className="mt-11 grid grid-cols-[0.62fr_1fr] gap-12 rounded-xl bg-white p-9 max-lg:grid-cols-1 max-lg:gap-8 max-lg:p-6">
            <a
              href={license.fileUrl}
              target="_blank"
              rel="noopener"
              className="group relative block overflow-hidden rounded-lg border border-line bg-cream"
            >
              <picture>
                <source type="image/webp" srcSet="/docs/vypiska-preview.webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/docs/vypiska-preview.jpg"
                  alt="Выписка из реестра лицензий на производство маркшейдерских работ"
                  width={1000}
                  height={1078}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </picture>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-ink-deep/88 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Открыть PDF
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>

            <div>
              <h3 className="mb-6 text-[22px] font-semibold leading-snug tracking-[-0.015em]">{license.title}</h3>
              <dl className="m-0 border-t border-graphite/25">
                {[
                  ["Регистрационный номер", license.number, true],
                  ["Статус", license.status, false],
                  ["Дата предоставления", license.issuedAt, false],
                  ["Лицензирующий орган", license.authorityShort, false],
                ].map(([k, v, mono]) => (
                  <div key={String(k)} className="flex justify-between gap-6 border-b border-line py-3.5 max-lg:flex-col max-lg:gap-1">
                    <dt className="shrink-0 text-[14px] text-muted">{k}</dt>
                    <dd className={`m-0 text-right text-[15px] font-medium leading-snug text-ink max-lg:text-left ${mono ? "num-tab font-mono" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[15.5px] leading-relaxed text-muted">{license.note}</p>
              <Link
                href="/litsenzii"
                className="mt-6 inline-flex items-center gap-2.5 border-b border-amber pb-1 text-[16px] font-semibold text-ink no-underline transition hover:text-amber-dk"
              >
                Все документы и виды работ по лицензии
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Полоса с телефоном ---------- */
export function ContactStrip() {
  return (
    <section className="bg-white py-20 text-center">
      <div className={wrap}>
        <div className="mx-auto mb-11 h-px max-w-[900px] bg-line" />
        <Reveal><div className={tagWrap}><Eyebrow>{contactStrip.tag}</Eyebrow></div></Reveal>
        <Reveal delay={80}><p className="mx-auto mb-7 max-w-[74ch] text-lg leading-relaxed text-muted">{contactStrip.text}</p></Reveal>
        <Reveal delay={160}>
          <a href={company.phoneHref} className="num-tab text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-0.02em] no-underline">
            {company.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- О компании (тёмный) ---------- */
export function About() {
  return (
    <section className="relative overflow-hidden bg-dark py-24 text-white max-lg:py-16">
      <svg className="absolute -right-32 -top-16 w-[680px] opacity-[0.14]" viewBox="0 0 600 400" fill="none" stroke="#F2A73B" strokeWidth="1" aria-hidden="true">
        {[60, 110, 160, 210, 260, 310, 360].map((y) => (
          <path key={y} d={`M0 ${y}C90 ${y - 40} 180 ${y + 36} 300 ${y - 4}s180-36 300 4`} />
        ))}
      </svg>
      <div className={`${wrap} relative z-[2]`}>
        <Reveal><div className={tagWrap}><Eyebrow>{about.tag}</Eyebrow></div></Reveal>
        <Reveal delay={80}><Headline text={about.title} mark={about.titleMark} className={`${h2} text-white`} /></Reveal>
        <Reveal delay={160}><p className="m-0 max-w-[78ch] text-[17.5px] leading-relaxed text-white/80">{about.lead}</p></Reveal>

        <div className="mt-12 grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1 max-lg:gap-10">
          <Reveal>
            <div className="grid aspect-[4/3] place-items-center rounded-lg border border-white/10 bg-[#242930] font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">
              {about.photoLabel}
            </div>
          </Reveal>
          <div className="flex flex-col gap-3">
            {about.points.map((p, i) => (
              <Reveal key={p} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-full bg-white/5 px-6 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber text-ink">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span className="text-[15.5px] leading-snug">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Карточка-заявка поверх фона ---------- */
export function CtaSection() {
  return (
    <section id="cta" className="relative">
      <div className="relative grid min-h-[520px] place-items-center overflow-hidden bg-[#242A31]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="1600" height="600" fill="#242A31" />
          <path d="M0 220 320 220 320 290 720 290 720 360 1120 360 1120 440 1600 440 1600 600 0 600Z" fill="#2E353D" />
          <path d="M0 340 260 340 260 410 660 410 660 480 1080 480 1080 540 1600 540 1600 600 0 600Z" fill="#373F48" />
        </svg>

        <Reveal className="relative z-[2] w-[calc(100%-4rem)] max-w-[960px]">
          <div className="grid grid-cols-2 gap-11 rounded-2xl bg-white px-12 py-11 shadow-[0_18px_50px_rgba(0,0,0,.25)] max-lg:grid-cols-1 max-lg:gap-7 max-lg:px-6 max-lg:py-8">
            <div>
              <h2 className="mb-5 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.08] tracking-[-0.02em]">
                <span className="text-amber-dk">{cta.titleAccent}</span>
                <br />
                {cta.title}
              </h2>
              <p className="mb-4 text-[16.5px] leading-relaxed text-muted">{cta.text}</p>
              <p className="mb-4 text-[16.5px] leading-relaxed text-muted">
                {cta.phoneLine}{" "}
                <a href={company.phoneHref} className="num-tab border-b-2 border-amber font-semibold text-ink no-underline">
                  {company.phone}
                </a>{" "}
                {cta.messengerLine}
              </p>
              <div className="mt-6 flex items-center gap-3">
                {company.max && (<a href={company.max} aria-label="MAX" className="leading-none transition hover:-translate-y-0.5"><MaxIcon id="mxCta" size={46} /></a>)}
                <a href={company.whatsapp} aria-label="WhatsApp" className="leading-none transition hover:-translate-y-0.5"><WhatsAppIcon size={46} /></a>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-[15px] leading-relaxed text-muted">
                Нажмите кнопку — откроется короткая форма. Нужны только имя и телефон.
              </p>
              <button
                data-lead
                className="w-full rounded-lg border border-amber bg-ink-deep p-[17px] text-base font-semibold text-white transition hover:border-amber-lt hover:bg-dark hover:shadow-[0_6px_24px_rgba(242,167,59,.2)]"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Принципы ---------- */
export function Values() {
  const half = Math.ceil(values.items.length / 2);
  const cols = [values.items.slice(0, half), values.items.slice(half)];
  return (
    <section className="bg-white py-24 max-lg:py-16">
      <div className={wrap}>
        <Reveal><h2 className={`${h2} mb-14 text-center`}>{values.title} <span className="text-amber-dk">{values.titleAccent}</span></h2></Reveal>
        <div className="grid grid-cols-2 gap-x-14 max-lg:grid-cols-1">
          {cols.map((col, ci) => (
            <div key={ci}>
              {col.map((v, i) => (
                <Reveal key={v.q} delay={i * 60}>
                  <details className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                      <span className="relative h-[18px] w-[18px] shrink-0">
                        <span className="absolute left-0 top-2 h-0.5 w-[18px] bg-amber-dk" />
                        <span className="absolute left-2 top-0 h-[18px] w-0.5 bg-amber-dk transition group-open:rotate-90 group-open:opacity-0" />
                      </span>
                      {v.q}
                    </summary>
                    <p className="mb-5 ml-[34px] mt-0 text-[15.5px] leading-relaxed text-muted">{v.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Цель ---------- */
export function Goal() {
  return (
    <section className="bg-dark py-20 text-white">
      <div className={`${wrap} grid grid-cols-[1fr_1.1fr] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-10`}>
        <Reveal>
          <h2 className="m-0 text-[clamp(24px,2.8vw,34px)] font-semibold leading-snug text-white">
            <mark className="rounded-sm bg-amber px-2.5 py-0.5 text-ink">{goal.mark}</mark> {goal.text}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid aspect-video place-items-center rounded-lg border border-white/10 bg-[#242930] font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">
            {goal.photoLabel}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Вопросы и ответы ---------- */
export function Faq() {
  return (
    <section id="faq" className="bg-cream py-24 max-lg:py-16">
      <div className={wrap}>
        <Reveal><div className={tagWrap}><Eyebrow>{faq.tag}</Eyebrow></div></Reveal>
        <Reveal delay={80}><Headline text={faq.title} mark={faq.titleMark} className={h2} /></Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-14 max-lg:grid-cols-1">
          {[faq.items.slice(0, 4), faq.items.slice(4)].map((col, ci) => (
            <div key={ci}>
              {col.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <details className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-[17px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
                      <span className="relative mt-1.5 h-[18px] w-[18px] shrink-0">
                        <span className="absolute left-0 top-2 h-0.5 w-[18px] bg-amber-dk" />
                        <span className="absolute left-2 top-0 h-[18px] w-0.5 bg-amber-dk transition group-open:rotate-90 group-open:opacity-0" />
                      </span>
                      {f.q}
                    </summary>
                    <p className="mb-5 ml-[34px] mt-0 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
