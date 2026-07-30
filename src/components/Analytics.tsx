"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent } from "@/lib/consent";

const COUNTER = process.env.NEXT_PUBLIC_METRIKA_ID;

/** Яндекс.Метрика подключается только при согласии на аналитические cookie
 *  и только если задан номер счётчика. */
export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readConsent() === "all");
    sync();
    const onConsent = (e: Event) => setAllowed((e as CustomEvent).detail === "all");
    window.addEventListener("tgp:consent", onConsent);
    return () => window.removeEventListener("tgp:consent", onConsent);
  }, []);

  if (!allowed || !COUNTER) return null;

  return (
    <>
      <Script id="ym" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
        ym(${COUNTER},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://mc.yandex.ru/watch/${COUNTER}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
      </noscript>
    </>
  );
}
