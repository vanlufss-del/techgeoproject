import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { company } from "@/copy";

const schema = z.object({
  name: z.string().trim().min(2, "Слишком короткое имя").max(80),
  phone: z.string().trim().min(10).max(24),
  source: z.string().max(40).optional(),
  company: z.string().max(0).optional(), // honeypot: заполнено только ботом
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { name, phone, source } = parsed.data;

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 11) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  // без ключа не падаем — в разработке просто пишем в консоль
  if (!key || !to || !from) {
    console.warn("[lead] RESEND не настроен, заявка не отправлена:", { name, phone, source, ip });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);

    await resend.emails.send({
      from,
      to,
      subject: `Заявка с сайта: ${name}, ${phone}`,
      text: [
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Откуда: ${source ?? "—"}`,
        `IP: ${ip}`,
        `Время: ${new Date().toLocaleString("ru-RU")}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[lead] ошибка отправки:", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
