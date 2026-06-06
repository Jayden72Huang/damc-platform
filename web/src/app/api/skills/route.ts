import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import type { NewSkill } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { generateSlug } from "@/lib/slug";

export const runtime = "nodejs";

type SkillInput = {
  name: string;
  displayName: string;
  description: string;
  category?: string;
  installCommand?: string;
  repoUrl?: string;
  demoUrl?: string;
  iconEmoji?: string;
  tags?: string[];
  features?: string[];
  visibility?: string;
  valuation?: unknown;
};

function isValidSkillInput(s: unknown): s is SkillInput {
  if (!s || typeof s !== "object") return false;
  const o = s as Record<string, unknown>;
  return (
    typeof o.name === "string" && o.name.length > 0 &&
    typeof o.displayName === "string" && o.displayName.length > 0 &&
    typeof o.description === "string" && o.description.length > 0
  );
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  if (!slug) slug = generateSlug();
  for (let i = 0; i < 5; i++) {
    const candidate = i === 0 ? slug : `${slug}-${generateSlug().slice(0, 4)}`;
    const existing = await db
      .select({ id: schema.skills.id })
      .from(schema.skills)
      .where(eq(schema.skills.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
  }
  return `${slug}-${generateSlug()}`;
}

// POST /api/skills
// Auth: session cookie (browser) OR reportToken (CLI — links skill to report's owner)
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { reportToken, skills: rawSkills } = body as Record<string, unknown>;

  if (!Array.isArray(rawSkills) || rawSkills.length === 0) {
    return NextResponse.json({ error: "skills array required" }, { status: 400 });
  }
  if (rawSkills.length > 50) {
    return NextResponse.json({ error: "max 50 skills per request" }, { status: 400 });
  }

  // Resolve userId: session first, then reportToken lookup
  let userId: string | null = null;
  let reportSlug: string | null = null;

  const session = await auth();
  if (session?.user?.id) {
    userId = session.user.id;
  } else if (typeof reportToken === "string" && reportToken.length > 0) {
    const rows = await db
      .select({ userId: schema.reports.userId, slug: schema.reports.slug })
      .from(schema.reports)
      .where(eq(schema.reports.slug, reportToken))
      .limit(1);
    if (rows[0]) {
      userId = rows[0].userId;
      reportSlug = rows[0].slug;
    }
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized — log in at damc.space or provide a valid reportToken" },
      { status: 401 }
    );
  }

  const inserted: Array<{ id: string; name: string; slug: string; status: string }> = [];
  const failed: Array<{ name: string; error: string }> = [];

  for (const raw of rawSkills) {
    if (!isValidSkillInput(raw)) {
      failed.push({ name: String((raw as Record<string, unknown>)?.name ?? "?"), error: "missing required fields (name, displayName, description)" });
      continue;
    }

    try {
      const slug = await uniqueSlug(raw.name);
      const [row] = await db
        .insert(schema.skills)
        .values({
          slug,
          userId,
          reportSlug: reportSlug ?? null,
          name: raw.name.trim().toLowerCase().replace(/\s+/g, "-"),
          displayName: raw.displayName.trim(),
          description: raw.description.trim(),
          category: raw.category ?? "other",
          installCommand: raw.installCommand ?? "",
          repoUrl: raw.repoUrl ?? null,
          demoUrl: raw.demoUrl ?? null,
          iconEmoji: raw.iconEmoji ?? null,
          tags: raw.tags ?? null,
          features: raw.features ?? null,
          visibility: raw.visibility === "premium" ? "premium" : "public",
          valuation: (raw.valuation ?? null) as NewSkill["valuation"],
          status: "draft",
        })
        .returning({
          id: schema.skills.id,
          name: schema.skills.name,
          slug: schema.skills.slug,
          status: schema.skills.status,
        });

      inserted.push(row);
    } catch (e) {
      failed.push({ name: raw.name, error: e instanceof Error ? e.message : "db error" });
    }
  }

  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/dashboard#skills`;

  return NextResponse.json({
    drafted: inserted.length,
    failed: failed.length,
    items: inserted,
    errors: failed.length > 0 ? failed : undefined,
    dashboardUrl,
  });
}

// GET /api/skills — list current user's skills
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(schema.skills)
    .where(eq(schema.skills.userId, session.user.id));

  return NextResponse.json({ skills: rows });
}
