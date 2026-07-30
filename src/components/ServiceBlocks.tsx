import { legalBase, license, stages, type Liability } from "@/copy";
import { Reveal } from "./Reveal";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

/** Этапы работы — пять шагов, одинаковые для всех услуг. */
export function Stages() {
  return (
    <section id="etapy" className="bg-cream py-20 max-lg:py-14">
      <div className={wrap}>
        <Reveal><h2 className="mb-4 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.02em]">{stages.title}</h2></Reveal>
        <Reveal delay={70}><p className="mb-11 max-w-[70ch] text-[17px] leading-relaxed text-muted">{stages.lead}</p></Reveal>
        <ol className="m-0 grid list-none grid-cols-5 gap-px border border-line bg-line p-0 max-lg:grid-cols-1">
          {stages.items.map((s, i) => (
            <li key={s.name} className="bg-white px-6 py-7 max-lg:px-5 max-lg:py-6">
              <div className="num-tab mb-4 font-mono text-[13px] tracking-[0.14em] text-amber-dk">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-2.5 text-[17px] font-semibold leading-snug">{s.name}</h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Число колонок ровно по числу карточек: иначе пустая ячейка показывает фон контейнера. */
const cols: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

/** Ответственность или последствия — зависит от услуги. */
export function LiabilityBlock({ data }: { data: Liability }) {
  const hasNorms = data.items.some((i) => i.norm);
  return (
    <section id="otvetstvennost" className="bg-dark py-20 text-white max-lg:py-14">
      <div className={wrap}>
        <Reveal>
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber">
            {hasNorms ? "Ответственность" : "Риски"}
          </div>
        </Reveal>
        <Reveal delay={70}>
          <h2 className="mb-5 max-w-[24ch] text-[clamp(26px,3.2vw,38px)] font-semibold leading-tight tracking-[-0.02em] text-white">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mb-11 max-w-[72ch] text-[17.5px] leading-relaxed text-white/72">{data.intro}</p>
        </Reveal>

        <div className={`grid gap-px border border-white/12 bg-white/12 ${cols[Math.min(data.items.length, 3)]} max-lg:grid-cols-1`}>
          {data.items.map((it) => (
            <div
              key={it.text}
              className={`flex bg-dark px-7 py-7 ${
                data.items.length === 1
                  ? "flex-row items-center gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-5"
                  : "flex-col"
              }`}
            >
              <div className={data.items.length === 1 ? "shrink-0" : ""}>
                {it.norm && (
                  <div className="num-tab mb-4 inline-flex w-fit rounded border border-amber/40 px-2.5 py-1 font-mono text-[11.5px] tracking-[0.06em] text-amber">
                    {it.norm}
                  </div>
                )}
                <p className={`text-[15.5px] leading-snug text-white/85 ${data.items.length === 1 ? "m-0 max-w-[42ch]" : "mb-4"}`}>
                  {it.text}
                </p>
              </div>
              {it.penalty && (
                <p
                  className={`num-tab m-0 font-semibold leading-snug text-amber ${
                    data.items.length === 1 ? "text-[19px]" : "mt-auto text-[16px]"
                  }`}
                >
                  {it.penalty}
                </p>
              )}
            </div>
          ))}
        </div>

        {data.note && (
          <Reveal delay={80}>
            <p className="mt-9 flex items-baseline gap-3.5 text-[16.5px] leading-relaxed text-white/80">
              <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
              <span>{data.note}</span>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Нормативная база с номерами документов. */
export function LegalBase() {
  return (
    <section id="normativy" className="bg-white py-20 max-lg:py-14">
      <div className={wrap}>
        <Reveal><h2 className="mb-4 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.02em]">{legalBase.title}</h2></Reveal>
        <Reveal delay={70}><p className="mb-9 max-w-[72ch] text-[17px] leading-relaxed text-muted">{legalBase.lead}</p></Reveal>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-12 p-0 max-lg:grid-cols-1">
          {legalBase.items.map((l) => (
            <li
              key={l}
              className="relative border-b border-line py-4 pl-[22px] text-[15px] leading-snug text-graphite before:absolute before:left-0 before:top-[21px] before:h-[5px] before:w-[5px] before:rounded-full before:bg-amber"
            >
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Вопросы и ответы по конкретной услуге. */
export function ServiceFaq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <section id="voprosy" className="bg-cream py-20 max-lg:py-14">
      <div className={wrap}>
        <Reveal><h2 className="mb-9 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.02em]">Частые вопросы</h2></Reveal>
        <div className="max-w-[92ch]">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 3) * 60}>
              <details className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-5 text-[17.5px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
                  <span className="relative mt-2 h-[18px] w-[18px] shrink-0">
                    <span className="absolute left-0 top-2 h-0.5 w-[18px] bg-amber-dk" />
                    <span className="absolute left-2 top-0 h-[18px] w-0.5 bg-amber-dk transition group-open:rotate-90 group-open:opacity-0" />
                  </span>
                  {f.q}
                </summary>
                <p className="mb-6 ml-[34px] mt-0 max-w-[76ch] text-[16px] leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Лицензия: номер, орган, статус и перечень разрешённых работ. */
export function LicenseBlock() {
  return (
    <section id="licenziya" className="bg-white py-20 max-lg:py-14">
      <div className={wrap}>
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-14 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <Reveal>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-amber-dk">Лицензия</div>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mb-6 text-[clamp(26px,3.2vw,38px)] font-semibold leading-tight tracking-[-0.02em]">
                {license.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <dl className="m-0 border-t border-graphite/25">
                {[
                  ["Регистрационный номер", license.number, true],
                  ["Статус", license.status, false],
                  ["Дата предоставления", license.issuedAt, false],
                  ["Лицензирующий орган", license.authorityShort, false],
                  ["Вид деятельности", license.activity, false],
                ].map(([k, v, mono]) => (
                  <div key={String(k)} className="flex justify-between gap-6 border-b border-line py-3.5 max-lg:flex-col max-lg:gap-1">
                    <dt className="shrink-0 text-[14px] text-muted">{k}</dt>
                    <dd
                      className={`m-0 text-right text-[15px] font-medium leading-snug text-ink max-lg:text-left ${
                        mono ? "num-tab font-mono" : ""
                      }`}
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={170}>
              <a
                href={license.fileUrl}
                target="_blank"
                rel="noopener"
                className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-amber bg-ink-deep px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                  <path d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                </svg>
                {license.fileLabel}
              </a>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <h3 className="mb-5 text-[20px] font-semibold tracking-[-0.01em]">{license.worksTitle}</h3>
            <ul className="m-0 list-none p-0">
              {license.works.map((w) => (
                <li key={w} className="flex items-start gap-3 border-b border-line py-3 text-[15px] leading-snug text-graphite last:border-0">
                  <span className="mt-0.5 grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full bg-graphite text-amber">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-baseline gap-3.5 text-[15px] leading-relaxed text-muted">
              <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
              <span>{license.note}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
