"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { company, lead } from "@/copy";
import { reachGoal } from "@/lib/metrika";
import { MaxIcon, WhatsAppIcon } from "./Icons";

type State = "form" | "sending" | "done" | "error";
type ErrorKind = "generic" | "tooMany" | "invalid" | "server";

/** Короткая форма заявки: имя + телефон. Открывается из любой кнопки с data-lead. */
export function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<State>("form");
  const [errorKind, setErrorKind] = useState<ErrorKind>("generic");
  const [phone, setPhone] = useState("");

  const open = useCallback(() => {
    setState("form");
    ref.current?.showModal();
    setTimeout(() => ref.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 60);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const t = (e.target as HTMLElement)?.closest?.("[data-lead]");
      if (t) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  function formatPhone(raw: string) {
    const d = raw.replace(/\D/g, "").replace(/^8/, "7").replace(/^([^7])/, "7$1").slice(0, 11);
    if (d.length <= 1) return "";
    let o = "+7";
    if (d.length > 1) o += " (" + d.slice(1, 4);
    if (d.length >= 5) o += ") " + d.slice(4, 7);
    if (d.length >= 8) o += "-" + d.slice(7, 9);
    if (d.length >= 10) o += "-" + d.slice(9, 11);
    return o;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const digits = String(fd.get("phone") ?? "").replace(/\D/g, "");
    if (!name || digits.length < 11) return;
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: String(fd.get("phone")),
          company: String(fd.get("company") ?? ""),
          source: "modal",
        }),
      });
      if (res.ok) {
        setState("done");
        reachGoal("lead_submit");
        return;
      }
      // код ответа подсказывает, что человеку делать дальше
      setErrorKind(res.status === 429 ? "tooMany" : res.status === 400 ? "invalid" : "server");
      setState("error");
    } catch {
      // сюда попадаем при обрыве сети: сервер не ответил вовсе
      setErrorKind("generic");
      setState("error");
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-cream py-4 pl-12 pr-4 text-base text-ink placeholder:text-[#A9A294] focus:border-amber focus:outline-none focus:ring-[3px] focus:ring-amber/20";

  return (
    <dialog
      ref={ref}
      aria-labelledby="leadTitle"
      className="m-auto w-[min(430px,calc(100%-2rem))] overflow-visible rounded-2xl bg-white p-0 text-ink shadow-[0_24px_70px_rgba(0,0,0,.42)]"
      onClick={(e) => {
        const r = ref.current!.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
          ref.current?.close();
      }}
    >
      <button
        onClick={() => ref.current?.close()}
        aria-label="Закрыть"
        className="absolute -right-3.5 -top-3.5 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-ink-deep text-white transition hover:border-amber hover:bg-amber hover:text-ink max-[520px]:right-2 max-[520px]:top-2"
      >
        ✕
      </button>

      {state === "done" ? (
        <div className="px-9 py-11 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-cream text-amber-dk">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-semibold tracking-tight">{lead.doneTitle}</h3>
          <p className="text-[15px] leading-relaxed text-muted">
            {lead.doneText}{" "}
            <a href={company.phoneHref} className="font-semibold text-ink">
              {company.phone}
            </a>
          </p>
        </div>
      ) : (
        <div className="p-9 max-[520px]:px-6 max-[520px]:py-7">
          <div className="mb-3 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-amber-dk">{lead.tag}</div>
          <h3 id="leadTitle" className="mb-2.5 text-[25px] font-semibold leading-tight tracking-tight">
            {lead.title}
          </h3>
          <p className="mb-6 text-[15px] leading-relaxed text-muted">{lead.sub}</p>

          <form onSubmit={submit} noValidate>
            {/* ловушка для ботов — люди её не видят */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0" />

            <div className="relative mb-3">
              <input name="name" type="text" required autoComplete="name" aria-label={lead.namePlaceholder} placeholder={lead.namePlaceholder} className={field} />
              <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B0A896]" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </div>

            <div className="relative mb-3">
              <input
                name="phone"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                aria-label="Номер телефона"
                placeholder={lead.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={field}
              />
              <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B0A896]" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6.5 3h3l2 5-2.5 1.5a12 12 0 0 0 5.5 5.5L16 12.5l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
              </svg>
            </div>

            <label className="mb-4 mt-3.5 flex gap-2.5 text-[12.5px] leading-snug text-muted">
              <input type="checkbox" required defaultChecked className="mt-0.5 shrink-0 accent-amber-dk" />
              <span>
                {lead.agree}{" "}
                <a href="/politika" className="text-graphite underline">
                  {lead.agreeLink}
                </a>
              </span>
            </label>

            {state === "error" && (
              <p className="mb-3 text-sm leading-snug text-[#A32D2D]">
                {errorKind === "tooMany"
                  ? lead.errorTooMany
                  : errorKind === "invalid"
                    ? lead.errorInvalid
                    : errorKind === "server"
                      ? lead.errorServer
                      : lead.errorText}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full rounded-lg border border-amber bg-ink-deep p-[17px] text-base font-semibold text-white transition hover:border-amber-lt hover:bg-dark hover:shadow-[0_6px_24px_rgba(242,167,59,.2)] disabled:opacity-60"
            >
              {state === "sending" ? lead.sending : lead.submit}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3 border-t border-line pt-5">
            <span className="text-[13.5px] text-muted">{lead.altLine}</span>
            {company.max && (<a href={company.max} target="_blank" rel="noopener" aria-label="MAX" className="leading-none transition hover:-translate-y-0.5">
              <MaxIcon id="mxDlg" size={38} />
            </a>)}
            <a href={company.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="leading-none transition hover:-translate-y-0.5">
              <WhatsAppIcon size={38} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
