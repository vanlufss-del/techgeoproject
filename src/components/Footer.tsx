import Link from "next/link";
import { company, footer } from "@/copy";
import { Mark } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-dark pb-11 text-white/80">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-lg:px-5">
        <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-12 border-t border-white/10 pb-11 pt-14 max-lg:grid-cols-1 max-lg:gap-9">
          <div>
            <Link href="/" className="flex items-start gap-3">
              <Mark size={48} />
              <span>
                <span className="block text-lg font-semibold leading-tight text-white">{company.name}</span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/75">{company.tagline}</span>
              </span>
            </Link>
            <div className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/45">{footer.strapline}</div>
            <div className="mt-2 text-sm">{footer.geography}</div>
          </div>

          <div>
            <div className="mb-5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/45">{footer.navTitle}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {footer.links.map((l) => (
                <Link key={l.href + l.label} href={l.href} className="inline-flex min-h-[40px] items-center text-[15px] text-white no-underline transition hover:text-amber break-anywhere">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white/45">{footer.contactsTitle}</div>
            <div className="flex flex-col gap-3">
              <a href={company.phoneHref} className="num-tab text-xl font-semibold text-white no-underline transition hover:text-amber">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-[40px] items-center text-[15px] text-white no-underline transition hover:text-amber break-anywhere">
                {company.email}
              </a>
              <div className="text-sm text-white/55">{company.city}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 border-t border-white/10 pt-6 text-[12.5px] leading-[1.7] text-white/40">
          <div>
            Лицензия на производство маркшейдерских работ: № {company.license}
            <br />© {new Date().getFullYear()} {company.legal} · ИНН {company.inn} · ОГРН {company.ogrn}
          </div>
          <div>
            {footer.offer}
            <br />
            <Link href="/politika" className="inline-flex min-h-[40px] items-center text-white/75 no-underline hover:text-amber">Политика конфиденциальности</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
