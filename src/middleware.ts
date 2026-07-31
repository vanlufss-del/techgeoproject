import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Служебные адреса Vercel не должны попадать в поиск.
 *
 * Яндекс успел проиндексировать techgeoproject.vercel.app раньше, чем заработал
 * домен, и в выдаче появился дубль сайта. Canonical на это влияет слабо:
 * поисковик воспринимает его как рекомендацию, а не как правило.
 *
 * Поэтому основной служебный адрес уводим постоянным перенаправлением на домен,
 * а адреса предпросмотра оставляем рабочими, но закрываем от индексации.
 */

const SITE = "https://tehgeoproekt.ru";
const PRODUCTION_ALIAS = "techgeoproject.vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (!host.endsWith(".vercel.app")) return NextResponse.next();

  if (host === PRODUCTION_ALIAS) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE);
    return NextResponse.redirect(target, 308);
  }

  // ветки и предпросмотры: работают, но невидимы для поисковых роботов
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|pdf|txt|xml)$).*)"],
};
