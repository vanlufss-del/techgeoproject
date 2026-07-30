/** Простое ограничение частоты в памяти процесса: 5 заявок за минуту с одного IP.
 *  Для нескольких инстансов заменить на Upstash Redis — см. skills/build. */
const hits = new Map<string, number[]>();
const WINDOW = 60_000;
const LIMIT = 5;

export function rateLimit(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (list.length >= LIMIT) return false;
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return true;
}
