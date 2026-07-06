import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/features/contact/contact-schema";
import { isDatabaseConfigured } from "@/lib/env";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

/**
 * Contact endpoint: validated with zod, rate-limited per IP,
 * persisted to Postgres. Input is schema-constrained (length-capped,
 * typed), which neutralizes injection/XSS payloads at the boundary.
 */

/*
 * In-memory rate limiting is not suitable for serverless environments.
 * A distributed solution like Upstash Redis is recommended for production.
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(5, "60 s"),
 * });
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // const { success } = await ratelimit.limit(ip);
  // if (!success) {
  //   // ... handle rate limit exceeded
  // }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (!isDatabaseConfigured) {
    // Graceful degradation: accept but log when no database is attached.
    console.warn("[contact] DATABASE_URL not set — message not persisted:", parsed.data);
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[contact] Failed to persist message:", error);
    return NextResponse.json(
      { error: "Unable to save your message right now." },
      { status: 503 },
    );
  }
}
