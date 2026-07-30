"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cookieNotice as t } from "@/copy";
import { readConsent, writeConsent, type Consent } from "@/lib/consent";

/** Уведомление о cookie при первом заходе.
 *  Аналитика не загружается до выбора — это не декоративный баннер. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!readConsent()) setShow(true);
  }, []);

  function choose(v: Consent) {
    writeConsent(v);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label={t.title}
      className="a-cookie fixed bottom-4 left-4 z-[120] w-[min(340px,calc(100vw-2rem))] rounded-xl border border-white/12 bg-[rgba(28,32,36,.97)] p-5 text-white shadow-[0_14px_40px_rgba(0,0,0,.45)] backdrop-blur-md max-lg:left-3 max-lg:bottom-[74px] max-lg:w-[calc(100vw-1.5rem)]"
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber text-ink">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="10" r="1.2" fill="currentColor" />
            <circle cx="14" cy="14" r="1.2" fill="currentColor" />
            <circle cx="15" cy="9" r="1.2" fill="currentColor" />
          </svg>
        </span>
        <p className="m-0 text-[15px] font-semibold leading-snug">{t.title}</p>
      </div>

      <p className="m-0 mb-4 text-[13.5px] leading-[1.55] text-white/80">
        {t.text}{" "}
        <Link href="/politika" className="whitespace-nowrap text-amber underline decoration-amber/50">
          {t.linkLabel}
        </Link>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => choose("all")}
          className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-amber bg-ink-deep px-4 py-2.5 text-[14px] font-semibold text-white transition hover:border-amber-lt hover:bg-dark"
        >
          <span className="h-[5px] w-[5px] rounded-full bg-amber" />
          {t.acceptAll}
        </button>
        <button
          onClick={() => choose("necessary")}
          className="whitespace-nowrap rounded-full border border-white/25 px-4 py-2.5 text-[14px] font-medium text-white/80 transition hover:border-white/55 hover:text-white"
        >
          Только нужные
        </button>
      </div>
    </div>
  );
}
