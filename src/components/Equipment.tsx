import Link from "next/link";
import { equipment } from "@/copy";
import { Reveal } from "./Reveal";
import { Eyebrow, Headline } from "./Type";

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

const icons: Record<string, React.ReactNode> = {
  gnss: <><circle cx="12" cy="7" r="3" /><path d="M12 10v11M7 21h10M6.5 4a8 8 0 0 1 11 0M4 1.5a12 12 0 0 1 16 0" /></>,
  total: <><rect x="8" y="4" width="8" height="7" rx="1" /><path d="M16 7.5h4M12 11v3M12 14 6 22M12 14l6 8M12 14v8" /></>,
  level: <><rect x="4" y="8" width="14" height="5" rx="1" /><path d="M18 10.5h3M11 13v3M7 20h8l-4-4z" /></>,
  theodolite: <><rect x="9" y="3" width="6" height="6" rx="1" /><path d="M12 9v4M12 13 7 21M12 13l5 8M5 21h14" /></>,
  staff: <><rect x="9.5" y="2" width="5" height="20" rx="1" /><path d="M9.5 6h5M9.5 10h5M9.5 14h5M9.5 18h5" /></>,
  tape: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2.5" /><path d="M12 20v2h8" /></>,
};

function DeviceIcon({ kind }: { kind: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[kind] ?? icons.total}
    </svg>
  );
}


/** Главные приборы — крупно: фото слева, характеристики справа.
 *  Без вкладок: скрытый контент хуже индексируется и не виден на телефоне. */
function Featured() {
  const items = equipment.items.filter((d) => d.specs?.length);

  return (
    <div className="mb-16 flex flex-col gap-px border border-line bg-line max-lg:mb-11">
      {items.map((d, i) => (
        <Reveal key={d.slug}>
          <article className="grid grid-cols-[0.85fr_1.15fr] items-center gap-12 bg-white p-9 max-lg:grid-cols-1 max-lg:gap-7 max-lg:p-6">
            <div className={`relative overflow-hidden rounded-xl bg-[#F5F2EC] ${i % 2 ? "lg:order-2" : ""}`}>
              {d.photo ? (
                <picture>
                  <source type="image/avif" srcSet={`${d.photo}.avif`} />
                  <source type="image/webp" srcSet={`${d.photo}.webp`} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${d.photo}.jpg`}
                    alt={`${d.name} ${d.model}, заводской номер ${d.serial}`}
                    width={900}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-square h-auto w-full object-contain"
                  />
                </picture>
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-5 bg-[#F5F2EC] px-8 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-2xl bg-graphite text-amber">
                    <span className="scale-[1.7]"><DeviceIcon kind={d.kind} /></span>
                  </span>
                  <span className="font-mono text-[15px] font-medium uppercase tracking-[0.1em] text-ink">{d.model}</span>
                  <span className="num-tab font-mono text-[12px] tracking-[0.04em] text-muted">
                    Зав. № {d.serial}
                  </span>
                </div>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[14px] text-muted">{d.name}</p>
              <h3 className="mb-6 text-[clamp(22px,2.4vw,28px)] font-semibold leading-snug tracking-[-0.02em]">
                {d.model}
              </h3>

              <dl className="m-0 mb-7 border-t border-graphite/25">
                {d.specs!.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-line py-2.5 max-lg:flex-col max-lg:gap-0.5">
                    <dt className="shrink-0 text-[14px] leading-snug text-muted">{k}</dt>
                    <dd className="num-tab m-0 text-right text-[14.5px] font-medium leading-snug text-ink max-lg:text-left">{v}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-6 border-b border-line py-2.5 max-lg:flex-col max-lg:gap-0.5">
                  <dt className="shrink-0 text-[14px] text-muted">Заводской номер</dt>
                  <dd className="num-tab m-0 text-right font-mono text-[14.5px] font-medium text-ink max-lg:text-left">{d.serial}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line py-2.5 max-lg:flex-col max-lg:gap-0.5">
                  <dt className="shrink-0 text-[14px] text-muted">Поверка действительна до</dt>
                  <dd className="num-tab m-0 text-right text-[14.5px] font-semibold text-amber-dk max-lg:text-left">{d.validUntil}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={d.pdf}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2.5 rounded-full border border-amber bg-ink-deep px-6 py-3 text-[15px] font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                    <path d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  </svg>
                  Свидетельство о поверке
                </a>
                {d.fgis && (
                  <a
                    href={d.fgis}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[14.5px] text-muted no-underline transition hover:text-amber-dk"
                  >
                    Проверить в реестре «Аршин»
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Список приборов с поверками.
 *  compact — короткая версия для страниц услуг: без описаний, со ссылкой на полную. */
export function Equipment({ compact = false }: { compact?: boolean }) {
  const items = compact
    ? equipment.items.slice(0, 5)
    : equipment.items.filter((d) => !d.specs?.length);

  return (
    <section id="oborudovanie" className={compact ? "bg-white py-20 max-lg:py-14" : "bg-white py-20 max-lg:py-14"}>
      <div className={wrap}>
        <Reveal><div className="mb-5"><Eyebrow>{equipment.tag}</Eyebrow></div></Reveal>
        <Reveal delay={70}>
          <Headline text={equipment.title} mark={equipment.titleMark} className="mb-4 text-[clamp(26px,3.2vw,38px)] font-semibold tracking-[-0.02em]" />
        </Reveal>
        <Reveal delay={120}>
          <p className="mb-10 max-w-[76ch] text-[17px] leading-relaxed text-muted">{equipment.lead}</p>
        </Reveal>

        {!compact && <Featured />}

        {!compact && (
          <Reveal>
            <h3 className="mb-6 text-[20px] font-semibold tracking-[-0.01em]">Остальные приборы</h3>
          </Reveal>
        )}

        <div className="grid grid-cols-3 gap-px border border-line bg-line max-lg:grid-cols-1">
          {items.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 60}>
              <article className="group flex h-full flex-col bg-white p-7 max-lg:p-6">
                {d.photo ? (
                  <div className="relative mb-5 overflow-hidden rounded-lg bg-[#F5F2EC]">
                    <picture>
                      <source type="image/avif" srcSet={`${d.photo}.avif`} />
                      <source type="image/webp" srcSet={`${d.photo}.webp`} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${d.photo}.jpg`}
                        alt={`${d.name} ${d.model}, заводской номер ${d.serial}`}
                        width={900}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-square h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </picture>
                    <span className="num-tab absolute right-3 top-3 rounded border border-amber/50 bg-white/92 px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-amber-dk backdrop-blur-sm">
                      до {d.validUntil}
                    </span>
                  </div>
                ) : (
                  <div className="relative mb-5 flex aspect-square flex-col items-center justify-center gap-4 rounded-lg bg-[#F5F2EC] px-5 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-graphite text-amber">
                      <span className="scale-[1.25]"><DeviceIcon kind={d.kind} /></span>
                    </span>
                    <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-ink">{d.model}</span>
                    <span className="num-tab absolute right-3 top-3 rounded border border-amber/45 bg-white/92 px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-amber-dk">
                      до {d.validUntil}
                    </span>
                  </div>
                )}

                <p className="mb-1 text-[13px] leading-snug text-muted">{d.name}</p>
                <h3 className="mb-4 text-[18px] font-semibold leading-snug tracking-[-0.01em]">{d.model}</h3>

                <dl className="m-0 mb-5 border-t border-line text-[13.5px]">
                  <div className="flex justify-between gap-4 border-b border-line py-2">
                    <dt className="text-muted">Заводской номер</dt>
                    <dd className="num-tab m-0 font-mono font-medium text-ink">{d.serial}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-line py-2">
                    <dt className="text-muted">Номер в реестре типов</dt>
                    <dd className="num-tab m-0 font-mono text-ink">{d.regType}</dd>
                  </div>
                </dl>

                {d.note && !compact && (
                  <p className="mb-5 text-[14px] leading-relaxed text-muted">{d.note}</p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={d.pdf}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 border-b border-amber pb-0.5 text-[14px] font-semibold text-ink no-underline transition hover:text-amber-dk"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                      <path d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    </svg>
                    Свидетельство
                  </a>
                  {d.fgis && (
                    <a
                      href={d.fgis}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-[13.5px] text-muted no-underline transition hover:text-amber-dk"
                    >
                      Проверить в реестре
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <p className="mt-8 flex items-baseline gap-3.5 text-[15.5px] leading-relaxed text-muted">
            <span className="relative -top-[5px] h-px w-6 shrink-0 bg-amber" />
            <span>{compact ? equipment.ownershipNote : equipment.note}</span>
          </p>
        </Reveal>

        {compact && (
          <Reveal delay={100}>
            <Link
              href="/oborudovanie"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-amber bg-ink-deep px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
            >
              <span className="h-[6px] w-[6px] rounded-full bg-amber" />
              Всё оборудование и поверки
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
