/**
 * Пинг IndexNow: сообщает поисковикам о новых и обновлённых страницах.
 * Яндекс и Bing забирают их за часы вместо недель обычного обхода.
 *
 *   node scripts/indexnow.mjs                     — все страницы из sitemap
 *   node scripts/indexnow.mjs /stati/nazvanie     — только указанные
 *
 * Ключ лежит в public/<ключ>.txt — файл должен быть доступен по адресу
 * https://tehgeoproekt.ru/<ключ>.txt, иначе запрос отклонят.
 */

const KEY = "76b163893eddde21e2267f0bc011bcce";
const HOST = "tehgeoproekt.ru";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml вернул ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`) : await urlsFromSitemap();

if (urlList.length === 0) {
  console.log("Нечего отправлять.");
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});

console.log(`Отправлено адресов: ${urlList.length}`);
urlList.forEach((u) => console.log("  " + u));
console.log(`Ответ: ${res.status} ${res.statusText}`);

if (res.status === 403) console.log("403 — файл с ключом недоступен по адресу keyLocation.");
if (res.status === 422) console.log("422 — адреса не принадлежат указанному хосту.");
