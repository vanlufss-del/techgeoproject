import { company } from "@/copy";

/** Полоса действий внизу экрана на телефонах.
 *  В шапке на узких экранах кнопки заявки нет — здесь она и живёт. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex items-stretch gap-2 border-t border-white/12 bg-[rgba(28,32,36,.97)] px-3 py-2.5 backdrop-blur-md lg:hidden">
      <button
        data-lead
        className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full border border-amber bg-ink-deep px-5 py-3 text-[15px] font-semibold text-white"
      >
        <span className="h-[6px] w-[6px] rounded-full bg-amber" />
        Рассчитать стоимость
      </button>
      <a
        href={company.phoneHref}
        aria-label={`Позвонить ${company.phone}`}
        className="grid w-12 shrink-0 place-items-center rounded-full border border-white/25 text-white no-underline"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6.5 3h3l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L16 12.5l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
        </svg>
      </a>
    </div>
  );
}
