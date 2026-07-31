import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { company } from "@/copy";
import { siteUrl } from "@/lib/site";
import { JsonLd, localBusinessSchema, organizationSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadDialog } from "@/components/LeadDialog";
import { CookieNotice } from "@/components/CookieNotice";
import { Analytics } from "@/components/Analytics";
import { ScrollTop } from "@/components/ScrollTop";
import { MobileBar } from "@/components/MobileBar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Проектные и маркшейдерские работы для горных предприятий",
    template: "%s | ТехГеоПроект",
  },
  description:
    "Аэрофотосъёмка карьеров, подсчёт объёмов, вынос границ, планы развития горных работ и аудит. Считаем смету под задачу — цены ниже рынка. Лицензия на маркшейдерские работы.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: company.legal,
    url: siteUrl,
    title: "Проектные и маркшейдерские работы для горных предприятий",
    description:
      "Проектирование разработки месторождений, ПРГР, аэрофотосъёмка и подсчёт объёмов. Смета под задачу, цены ниже рынка.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: company.legal }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      // Яндекс охотнее берёт иконку 120×120 — без неё в выдаче остаётся глобус
      { url: "/icon-120.png", sizes: "120x120", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { themeColor: "#2B3036" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning — класс js дописывается инлайн-скриптом до гидратации,
  // и без этого React считает разметку расходящейся
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        {/* ставит метку до отрисовки контента: под ней прячутся блоки с анимацией появления */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#svc"
          className="absolute left-4 top-[-60px] z-[300] rounded-lg border border-amber bg-ink-deep px-6 py-3 text-[15px] font-semibold text-white no-underline transition-[top] focus:top-4"
        >
          Перейти к содержанию
        </a>
        <Header />
        <main>{children}</main>
        <Footer />
        <LeadDialog />
        <ScrollTop />
        <MobileBar />
        <CookieNotice />
        <Analytics />
        <JsonLd data={organizationSchema()} />
        {localBusinessSchema() && <JsonLd data={localBusinessSchema()!} />}
      </body>
    </html>
  );
}
