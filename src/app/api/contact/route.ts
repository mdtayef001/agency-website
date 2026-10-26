import { NextResponse } from "next/server";

import { contactSchema, type ContactResponse } from "@/lib/contact-schema";
import { deliverInquiry } from "@/lib/inquiry-delivery";

/**
 * In-memory rate limit: 5 submissions per IP per 10 minutes.
 *
 * Good enough for a brochure site on a single instance. If the site ever runs
 * across several instances, move this to a shared store (Upstash Redis, Vercel
 * Queues) — until then it resets whenever the server restarts.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: "Too many messages from this connection. Try again in a few minutes.",
      },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, message: "We couldn't read that request." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      },
      { status: 422 },
    );
  }

  // Honeypot: a filled hidden field means a bot. Accept silently so it stops.
  if (parsed.data.website) {
    return NextResponse.json<ContactResponse>({ ok: true });
  }

  const result = await deliverInquiry(parsed.data);

  if (!result.delivered) {
    // In development, a missing provider shouldn't block testing the form.
    if (
      result.reason === "not-configured" &&
      process.env.NODE_ENV !== "production"
    ) {
      return NextResponse.json<ContactResponse>({ ok: true });
    }

    return NextResponse.json<ContactResponse>(
      {
        ok: false,
        message:
          "Something went wrong sending that. Please email or message us on WhatsApp instead — the links are just below.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json<ContactResponse>({ ok: true });
}
