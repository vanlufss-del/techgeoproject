import type { Metadata } from "next";
import Link from "next/link";
import { company, equipment } from "@/copy";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { Equipment } from "@/components/Equipment";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Оборудование и поверки",
  description:
    "Приборы ООО «ТехГеоПроект»: тахеометры Leica FlexLine TS07 и CHCNAV CTS-112R4, спутниковый приёмник EFIX C5, нивелиры RGK и теодолит. Все с действующими свидетельствами о поверке, номера проверяются в реестре ФГИС «Аршин».",
  alternates: { canonical: "/oborudovanie" },
  openGraph: { title: "Оборудование и поверки — ТехГеоПроект", url: "/oborudovanie" },
};

const wrap = "mx-auto w-full max-w-[1180px] px-8 max-lg:px-5";

export default function EquipmentPage() {
  // считаем только средства измерений: у беспилотника поверки нет
  const verifiable = equipment.items.filter((x) => Boolean(x.validUntil));
  const soonest = [...verifiable].sort((a, b) => {
    const d = (s: string) => s.split(".").reverse().join("-");
    return d(a.validUntil!) < d(b.validUntil!) ? -1 : 1;
  })[0];

  return (
    <>
      <section className="bg-cream pb-14 pt-40 max-lg:pt-32">
        <div className={wrap}>
          <nav aria-label="Хлебные крошки" className="mb-7 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            <Link href="/" className="no-underline hover:text-amber-dk">Главная</Link>
            <span className="mx-2 text-amber">/</span>
            <span>Оборудование</span>
          </nav>
          <h1 className="mb-6 max-w-[24ch] text-[clamp(30px,4vw,50px)] font-semibold leading-[1.08] tracking-[-0.02em]">
            Оборудование и действующие поверки
          </h1>
          <p className="m-0 max-w-[74ch] text-[18px] leading-relaxed text-graphite">
            Измерения имеют силу только тогда, когда прибор поверен. Ниже — весь парк с заводскими
            номерами, сроками поверки и ссылками на записи в государственном реестре. Проверить
            может любой, не спрашивая нас.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-px border border-line bg-line max-lg:grid-cols-1">
            {[
              ["Приборов в работе", String(equipment.items.length)],
              ["Поверенных средств измерений", String(verifiable.length)],
              ["Ближайшая поверка до", soonest?.validUntil ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="bg-cream px-7 py-6">
                <div className="mb-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-muted">{k}</div>
                <div className="num-tab text-[24px] font-semibold tracking-[-0.02em] text-ink">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Equipment />

      <section className="bg-dark py-20 text-white max-lg:py-14">
        <div className={`${wrap} grid grid-cols-[1.15fr_0.85fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-9`}>
          <Reveal>
            <h2 className="mb-4 max-w-[26ch] text-[clamp(24px,3vw,34px)] font-semibold leading-snug text-white">
              Нужен прибор под конкретную точность?
            </h2>
            <p className="m-0 max-w-[62ch] text-[17.5px] leading-relaxed text-white/75">
              Опишите задачу — скажем, каким прибором её решим и какая точность получится на выходе.
              От этого напрямую зависит стоимость: съёмка с высокой точностью дороже, и нужна она
              далеко не всегда.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-xl border border-white/12 bg-white/[0.04] p-8 max-lg:p-6">
              <button
                data-lead
                className="mb-4 inline-flex w-full items-center justify-center gap-3 rounded-full border border-amber bg-ink-deep px-8 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-amber" />
                Задать вопрос
              </button>
              <a href={company.phoneHref} className="num-tab block text-center text-[19px] font-semibold text-white no-underline">
                {company.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Оборудование", url: "/oborudovanie" },
        ])}
      />
    </>
  );
}
