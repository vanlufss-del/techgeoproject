import { maps } from "@/copy";

/** Карта Яндекса с меткой по адресу.
 *  fill — растягивается по высоте соседней колонки.
 *  loading="lazy" — iframe подгружается при подходе к блоку. */
export function MapEmbed({ fill = false }: { fill?: boolean }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-line bg-[#F2EFE9] ${
        fill ? "h-full" : ""
      }`}
    >
      <div className={fill ? "relative min-h-[420px] flex-1" : "relative aspect-[16/9] max-lg:aspect-[4/5]"}>
        <iframe
          src={maps.yandexWidget}
          title="Карта: офис ООО «ТехГеоПроект» в Кемерово, улица Кузбасская, 33А"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 border-t border-line bg-white px-6 py-5 max-lg:px-5">
        <a
          href={maps.twogisLink}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-amber bg-ink-deep px-6 py-3 text-[15px] font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:border-amber-lt hover:bg-dark"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-amber" />
          Открыть в 2ГИС
        </a>
        <a
          href={maps.yandexLink}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center whitespace-nowrap rounded-full border border-graphite/30 px-6 py-3 text-[15px] font-semibold text-ink no-underline transition hover:border-graphite hover:bg-cream"
        >
          Открыть в Яндекс.Картах
        </a>
      </div>
    </div>
  );
}
