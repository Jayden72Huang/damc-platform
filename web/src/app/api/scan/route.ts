import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { generateSlug } from "@/lib/slug";

export const runtime = "nodejs";

type ScanPayload = {
  scores: unknown;
  archetype: string;
  archetype_emoji?: string;
  archetype_code?: string;
  overall?: number;
  role?: string;
  mbti?: string;
  insights?: unknown;
  scan_summary?: unknown;
  env?: unknown;
};

function isValidPayload(body: unknown): body is ScanPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.scores === "object" &&
    b.scores !== null &&
    typeof b.archetype === "string" &&
    b.archetype.length > 0
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing required fields: scores, archetype" },
      { status: 400 }
    );
  }

  const session = await auth();
  const userId = session?.user?.id ?? null;

  let slug = generateSlug();
  for (let attempt = 0; attempt < 3; attempt++) {
    const existing = await db
      .select({ slug: schema.reports.slug })
      .from(schema.reports)
      .where(eq(schema.reports.slug, slug))
      .limit(1);
    if (existing.length === 0) break;
    slug = generateSlug();
  }

  try {
    const [inserted] = await db
      .insert(schema.reports)
      .values({
        slug,
        userId,
        scores: body.scores as object,
        archetype: body.archetype,
        archetypeEmoji: body.archetype_emoji ?? null,
        archetypeCode: body.archetype_code ?? null,
        overall: body.overall ?? null,
        role: body.role ?? null,
        mbti: body.mbti ?? null,
        insights: (body.insights as object) ?? null,
        scanSummary: (body.scan_summary as object) ?? null,
        env: (body.env as object) ?? null,
      })
      .returning({ slug: schema.reports.slug });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get("origin") ||
      "https://damc.space";

    return NextResponse.json({
      token: inserted.slug,
      url: `${siteUrl}/r/${inserted.slug}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save report" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    method: "POST",
    schema: {
      scores: { D: { total: 0 }, A: { total: 0 }, M: { total: 0 }, C: { total: 0 } },
      archetype: "string (required)",
      archetype_emoji: "string (optional)",
      archetype_code: "string (optional)",
      overall: "number (optional)",
      role: "string (optional)",
      mbti: "string (optional)",
      insights: "object (optional)",
      scan_summary: "object (optional)",
      env: "object (optional)",
    },
  });
}
