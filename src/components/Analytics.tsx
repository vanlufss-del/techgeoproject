"use client";

import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

const COUNTER = process.env.NEXT_PUBLIC_METRIKA_ID;
const TAG_SRC = "https://mc.yandex.ru/metrika/tag.js";

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

/** Яндекс.Метрика подключается только при согласии на аналитические cookie
 *  и только если задан номер счётчика.
 *
 *  Раньше сниппет вставлялся через next/script одной строкой, и вызов ym('init')
 *  выполнялся раньше, чем определялась сама функция: в консоли появлялось
 *  «ym is not a function», а счётчик молча не работал. Теперь порядок задаётся
 *  явно — сначала заглушка-очередь, потом загрузка tag.js, и только затем init. */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent() === "all");
    sync();
    const onConsent = (e: Event) => setAllowed((e as CustomEvent).detail === "all");
    window.addEventListener("tgp:consent", onConsent);
    return () => window.removeEventListener("tgp:consent", onConsent);
  }, []);

  useEffect(() => {
    if (!allowed || !COUNTER) return;

    const w = window as unknown as { ym?: YmFn };

    // очередь вызовов: всё, что позовём до загрузки tag.js, отработает после неё
    if (typeof w.ym !== "function") {
      const stub = function (...args: unknown[]) {
        (stub.a = stub.a || []).push(args);
      } as YmFn;
      stub.l = Date.now();
      w.ym = stub;
    }

    if (!document.querySelector(`script[src="${TAG_SRC}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = TAG_SRC;
      document.head.appendChild(script);
    }

    w.ym(Number(COUNTER), "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }, [allowed]);

  if (!allowed || !COUNTER) return null;

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://mc.yandex.ru/watch/${COUNTER}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
    </noscript>
  );
}
