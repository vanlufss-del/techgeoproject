/** Отправка целей в Яндекс.Метрику.
 *
 *  Вызов безопасен всегда: если счётчик не подключён — например, посетитель
 *  выбрал «Только необходимые» в уведомлении о cookie, — функция просто ничего
 *  не делает. Поэтому её можно звать из любого места без проверок. */

const COUNTER = process.env.NEXT_PUBLIC_METRIKA_ID;

type YmFn = (...args: unknown[]) => void;

export type Goal =
  | "lead_submit"
  | "phone_click"
  | "whatsapp_click"
  | "max_click"
  | "email_click";

export function reachGoal(goal: Goal) {
  if (typeof window === "undefined" || !COUNTER) return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (typeof ym !== "function") return;
  ym(Number(COUNTER), "reachGoal", goal);
}
