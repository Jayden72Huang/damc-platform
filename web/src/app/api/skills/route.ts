import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills, users } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { and, desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);

    const query = db
      .select({
        id: skills.id,
        slug: skills.slug,
        name: skills.name,
        displayName: skills.displayName,
        description: skills.description,
        category: skills.category,
        price: skills.price,
        currency: skills.currency,
        installCommand: skills.installCommand,
        iconEmoji: skills.iconEmoji,
        tags: skills.tags,
        features: skills.features,
        stats: skills.stats,
        valuation: skills.valuation,
        visibility: skills.visibility,
        status: skills.status,
        createdAt: skills.createdAt,
        sellerName: users.name,
        sellerImage: users.image,
      })
      .from(skills)
      .leftJoin(users, eq(skills.userId, users.id))
      .where(eq(skills.status, "listed"))
      .orderBy(desc(skills.createdAt))
      .limit(limit);

    const rows = await query;

    return NextResponse.json({ skills: rows });
  } catch (error) {
    console.error("Skills list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      displayName,
      description,
      category,
      price,
      installCommand,
      repoUrl,
      demoUrl,
      iconEmoji,
      tags,
      features,
      valuation,
      visibility,
    } = body;

    if (!name || !displayName || !description || !category || !installCommand) {
      return NextResponse.json(
        { error: "name, displayName, description, category, installCommand are required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

    const [inserted] = await db
      .insert(skills)
      .values({
        slug,
        userId: session.user.id,
        name,
        displayName,
        description,
        category,
        price: price ?? 0,
        installCommand,
        repoUrl: repoUrl ?? null,
        demoUrl: demoUrl ?? null,
        iconEmoji: iconEmoji ?? "🔧",
        tags: tags ?? [],
        features: features ?? [],
        stats: { downloads: 0, rating: 0, reviews: 0 },
        valuation: valuation ?? null,
        visibility: visibility === "premium" ? "premium" : "public",
        status: "draft",
      })
      .returning({ id: skills.id, slug: skills.slug });

    return NextResponse.json({
      id: inserted.id,
      slug: inserted.slug,
      url: `/marketplace#${inserted.slug}`,
    });
  } catch (error) {
    console.error("Skill create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
