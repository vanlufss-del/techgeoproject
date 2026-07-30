import Link from "next/link";
import { company } from "@/copy";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center bg-dark px-6 text-center text-white">
      <div>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-amber">Ошибка 404</p>
        <h1 className="mb-5 text-[clamp(32px,5vw,58px)] font-semibold leading-tight tracking-tight">
          Такой страницы нет
        </h1>
        <p className="mx-auto mb-9 max-w-[52ch] text-lg leading-relaxed text-white/80">
          Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную или позвоните — подскажем.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-amber bg-ink-deep px-10 py-4 font-semibold text-white no-underline transition hover:border-amber-lt hover:bg-dark"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-amber" />
            На главную
          </Link>
          <a
            href={company.phoneHref}
            className="num-tab inline-flex items-center rounded-full border border-white/40 px-10 py-4 font-semibold text-white no-underline transition hover:border-white hover:bg-white/10"
          >
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
