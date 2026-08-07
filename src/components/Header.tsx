"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { aboutMenu, company, nav, services } from "@/copy";
import { Mark, MailIcon, MaxIcon, WhatsAppIcon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  /** Прозрачная шапка возможна там, где под ней тёмный экран с фотографией:
   *  главная и страницы услуг с фоновым снимком. */
  const overHero = pathname === "/" || pathname.startsWith("/uslugi/");
  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        overHero ? "a-hdr" : ""
      } ${
        solid
          ? `border-white/15 py-3 backdrop-blur-xl backdrop-saturate-150 ${
              overHero ? "bg-[rgba(34,38,44,.62)]" : "bg-[rgba(30,34,39,.94)]"
            }`
          : "border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1330px] items-center gap-6 px-8 max-lg:gap-3 max-lg:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Mark size={40} />
          <span>
            <span className="block whitespace-nowrap text-lg font-semibold leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,.4)]">
              {company.name}
            </span>
            <span className="mt-1 block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-white/75 max-lg:hidden">
              {company.tagline}
            </span>
          </span>
        </Link>

        <nav className="mx-auto flex shrink-0 items-center gap-7 max-lg:hidden">
          {nav.map((n) => {
            const menu =
              "menu" in n && n.menu === "about"
                ? aboutMenu
                : "menu" in n && n.menu === "services"
                  ? services.items.map((x) => ({ label: x.title, href: `/uslugi/${x.slug}` }))
                  : null;

            return menu ? (
              <NavDropdown key={n.href} label={n.label} href={n.href} items={menu} />
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap py-2 text-[15px] text-white/90 no-underline transition hover:text-amber [text-shadow:0_1px_12px_rgba(0,0,0,.4)]"
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 text-right leading-tight max-lg:hidden">
          <a href={company.phoneHref} className="whitespace-nowrap text-[17px] font-semibold text-white [text-shadow:0_1px_12px_rgba(0,0,0,.4)]">
            {company.phone}
          </a>
          <br />
          <a href={`mailto:${company.email}`} className="whitespace-nowrap text-[13px] text-white/80 max-lg:hidden">
            {company.email}
          </a>
        </div>

        <MobileMenu />

        <div className="flex shrink-0 items-center gap-1.5 max-lg:gap-0.5 [&_svg]:drop-shadow-[0_1px_6px_rgba(0,0,0,.35)]">
          {company.max && (<a href={company.max} target="_blank" rel="noopener" aria-label="Написать в MAX" className="grid h-11 w-11 place-items-center leading-none transition hover:-translate-y-0.5">
            <MaxIcon id="mxHdr" size={36} />
          </a>)}
          <a href={company.whatsapp} target="_blank" rel="noopener" aria-label="Написать в WhatsApp" className="grid h-11 w-11 place-items-center leading-none transition hover:-translate-y-0.5">
            <WhatsAppIcon size={36} />
          </a>
          <a href={`mailto:${company.email}`} aria-label="Написать на почту" className="grid h-11 w-11 place-items-center leading-none transition hover:-translate-y-0.5">
            <MailIcon size={36} />
          </a>
        </div>

        <button
          data-lead
          className="shrink-0 whitespace-nowrap rounded-full border border-amber bg-[rgba(18,21,25,.34)] px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-lt hover:bg-ink-deep hover:shadow-[0_4px_20px_rgba(242,167,59,.24)] max-lg:hidden"
        >
          Оставить заявку
        </button>
      </div>
    </header>
  );
}
