import { NextResponse } from "next/server";

/**
 * Contact form + newsletter endpoint.
 *
 * Set CONTACT_WEBHOOK_URL (Slack, Zapier, Make, or your own API) and every submission is
 * forwarded there as JSON. Without it, development accepts and logs the message; production
 * answers 503 so the form never pretends it sent.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pick = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const topic = pick("topic", 20) === "newsletter" ? "newsletter" : "contact";
  const email = pick("email", 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const data =
    topic === "newsletter"
      ? { topic, email }
      : {
          topic,
          email,
          name: pick("name", 120),
          institution: pick("institution", 200),
          subject: pick("subject", 200),
          message: pick("message", 4000),
        };

  if (topic === "contact" && (!("name" in data) || !data.name || !data.message)) {
    return NextResponse.json({ error: "Missing fields" }, { status: 422 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] (dev, no webhook configured)", data);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ source: "acadex-website", ...data }),
  });
  if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
