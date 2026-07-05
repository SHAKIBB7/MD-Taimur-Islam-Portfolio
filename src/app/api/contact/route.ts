import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/features/contact/contact-schema";
import { isDatabaseConfigured } from "@/lib/env";

/**
 * Contact endpoint: validated with zod, rate-limited per IP,
 * persisted to Postgres. Input is schema-constrained (length-capped,
 * typed), which neutralizes injection/XSS payloads at the boundary.
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
