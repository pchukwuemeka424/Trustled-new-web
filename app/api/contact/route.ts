import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length <= RATE_MAX;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const honey = String(body?._honey || "");
    if (honey) {
      return NextResponse.json({ ok: true });
    }

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const organisation = String(body?.organisation || "").trim();
    const sector = String(body?.sector || "").trim();
    const topic = String(body?.topic || "").trim();
    const message = String(body?.message || "").trim();
    const page = String(body?.page || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "hello@trustledai.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "TrustLed AI <hello@trustledai.com>";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New enquiry from trustledai.com — ${topic || "General"}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organisation: ${organisation || "—"}`,
        `Sector: ${sector || "—"}`,
        `Topic: ${topic || "—"}`,
        `Page: ${page || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Could not send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}
