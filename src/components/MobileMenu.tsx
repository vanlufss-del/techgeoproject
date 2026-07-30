"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, nav, services } from "@/copy";
import { MailIcon, MaxIcon, WhatsAppIcon } from "./Icons";

/** Меню для узких экранов. В шапке на телефоне навигации нет — она живёт здесь.
 *
 *  Панель выводится порталом в body, а не внутри шапки. Причина: у шапки есть
 *  backdrop-filter, а такой элемент становится containing block для всех
 *  position: fixed внутри себя — панель растягивалась по шапке, а не по экрану. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  // закрываем при переходе на другую страницу
  useEffect(() => setOpen(false), [pathname]);

  // блокируем прокрутку под панелью и закрываем по Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="ml-auto grid h-11 w-11 shrink-0 place-items-center text-white lg:hidden"
      >
        <span className="relative block h-[15px] w-[26px]">
          <span className="absolute left-0 top-0 h-[2.5px] w-full rounded bg-white" />
          <span className="absolute left-0 top-[6px] h-[2.5px] w-full rounded bg-amber" />
          <span className="absolute left-0 top-[12px] h-[2.5px] w-full rounded bg-white" />
        </span>
      </button>

      {open && mounted && createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню сайта"
          className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-[rgba(24,27,31,.985)] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center justify-between px-5 pb-4 pt-5">
            <span className="text-[17px] font-semibold text-white">{company.name}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-5 pb-6">
            <ul className="m-0 list-none p-0">
              {nav.map((n) => (
                <li key={n.href} className="border-b border-white/10">
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[21px] font-semibold text-white no-underline"
                  >
                    {n.label}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>

                  {n.label === "Наши услуги" && (
                    <ul className="m-0 list-none p-0 pb-3">
                      {services.items.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/uslugi/${s.slug}`}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 pl-4 text-[15.5px] leading-snug text-white/68 no-underline"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {[
                { href: "/oborudovanie", label: "Оборудование" },
                { href: "/litsenzii", label: "Лицензии" },
              ].map((x) => (
                <li key={x.href} className="border-b border-white/10">
                  <Link
                    href={x.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[21px] font-semibold text-white no-underline"
                  >
                    {x.label}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
              <li hidden>
                <Link
                  href="/litsenzii"
                  onClick={() => setOpen(false)}
                  className="hidden"
                >
                  Лицензии
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </li>
            </ul>

            <div className="mt-8 border-t border-white/12 pt-7">
              <a href={company.phoneHref} className="num-tab block text-[26px] font-semibold tracking-[-0.02em] text-white no-underline">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="break-anywhere mt-2 block text-[16px] text-white/80 no-underline">
                {company.email}
              </a>

              <div className="mt-5 flex items-center gap-2">
                {company.max && (<a href={company.max} aria-label="Написать в MAX" className="grid h-12 w-12 place-items-center leading-none">
                  <MaxIcon id="mxMenu" size={44} />
                </a>)}
                <a href={company.whatsapp} target="_blank" rel="noopener" aria-label="Написать в WhatsApp" className="grid h-12 w-12 place-items-center leading-none">
                  <WhatsAppIcon size={44} />
                </a>
                <a href={`mailto:${company.email}`} aria-label="Написать на почту" className="grid h-12 w-12 place-items-center leading-none">
                  <MailIcon size={44} />
                </a>
              </div>

              <button
                data-lead
                onClick={() => setOpen(false)}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full border border-amber bg-ink-deep px-8 py-4 text-base font-semibold text-white"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-amber" />
                Оставить заявку
              </button>

              <p className="mt-6 text-[13.5px] leading-relaxed text-white/45">
                {company.address}
              </p>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
