"use client";

import { useEffect, useState } from "react";

/** Кнопка возврата наверх. Появляется после существенной прокрутки.
 *  На телефоне скрыта — там снизу прилипшая полоса действий. */
export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      }
      aria-label="Наверх"
      title="Наверх"
      className={`fixed bottom-6 right-6 z-[110] grid h-12 w-12 place-items-center rounded-full border border-amber bg-ink-deep text-white shadow-[0_8px_24px_rgba(0,0,0,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-dark max-lg:hidden ${
        show ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
