import { hero } from "@/copy";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-dark">
      <picture>
        <source media="(max-width:760px)" type="image/avif" srcSet="/img/hero-mobile.avif" />
        <source media="(max-width:760px)" type="image/webp" srcSet="/img/hero-mobile.webp" />
        <source type="image/avif" srcSet="/img/hero.avif" />
        <source type="image/webp" srcSet="/img/hero.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero.jpg"
          alt={hero.imageAlt}
          width={2400}
          height={1351}
          fetchPriority="high"
          decoding="async"
          className="a-heroZoom absolute inset-0 h-full w-full object-cover [object-position:60%_50%] [filter:contrast(1.1)]"
        />
      </picture>

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg,rgba(16,19,23,.88) 0%,rgba(16,19,23,.28) 14%,rgba(16,19,23,0) 30%),rgba(16,19,23,.13)",
        }}
      />
      <div className="a-curtain pointer-events-none absolute inset-0 z-[3] bg-[#16191D]" />
      <div
        className="a-scan pointer-events-none absolute inset-x-0 top-0 z-[4] h-0.5"
        style={{
          background:
            "linear-gradient(90deg,rgba(242,167,59,0) 0%,rgba(242,167,59,.9) 22%,rgba(242,167,59,1) 50%,rgba(242,167,59,.9) 78%,rgba(242,167,59,0) 100%)",
          boxShadow: "0 0 26px 5px rgba(242,167,59,.35)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-8 pb-28 pt-44 max-lg:px-5 max-lg:pt-32">
        <p className="a-eyebrow mb-8 font-mono text-[13px] font-medium uppercase tracking-[0.24em] text-amber [text-shadow:0_1px_10px_rgba(0,0,0,.5)]">
          {hero.eyebrow}
        </p>

        <h1 className="mb-11 max-w-[17ch] text-[clamp(36px,5.6vw,66px)] font-semibold leading-[1.06] tracking-[-0.025em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,.35)]">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <span className="a-line block" style={{ animationDelay: `${0.8 + i * 0.2}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="a-btns flex flex-wrap items-center gap-3.5">
          <button
            data-lead
            className="inline-flex items-center gap-3 rounded-full border border-amber bg-ink-deep px-11 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark hover:shadow-[0_6px_26px_rgba(242,167,59,.22)] max-lg:w-full max-lg:justify-center max-lg:px-6"
          >
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-amber" />
            {hero.primaryCta}
          </button>
          <a
            href="#svc"
            className="inline-flex items-center rounded-full border border-white/40 px-11 py-5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10 max-lg:w-full max-lg:justify-center max-lg:px-6"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
