/** Согласие на аналитические cookie. Хранится локально, без отправки на сервер. */
export const CONSENT_KEY = "tgp-cookie-consent";
export type Consent = "all" | "necessary";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "all" || v === "necessary" ? v : null;
}

export function writeConsent(v: Consent) {
  window.localStorage.setItem(CONSENT_KEY, v);
  window.dispatchEvent(new CustomEvent("tgp:consent", { detail: v }));
}
