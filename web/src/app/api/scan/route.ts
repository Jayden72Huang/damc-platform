import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { generateSlug } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { scores, archetype, role, mbti, env, scan_summary, insights } = body;

    if (!scores || !archetype) {
      return NextResponse.json(
        { error: "scores and archetype are required" },
        { status: 400 }
      );
    }

    const session = await auth();
    const userId = session?.user?.id ?? null;

    const d = scores.D ?? scores.d ?? 0;
    const a = scores.A ?? scores.a ?? 0;
    const m = scores.M ?? scores.m ?? 0;
    const c = scores.C ?? scores.c ?? 0;
    const overall =
      body.overall ?? Math.round(d * 0.25 + a * 0.3 + m * 0.25 + c * 0.2);

    const slug = generateSlug();

    const archetypeEmoji =
      body.archetype_emoji ?? body.archetypeEmoji ?? null;
    const archetypeCode =
      body.archetype_code ?? body.archetypeCode ?? null;

    const [inserted] = await db
      .insert(reports)
      .values({
        slug,
        userId,
        scores,
        archetype,
        archetypeEmoji,
        archetypeCode,
        overall,
        role: role ?? null,
        mbti: mbti ?? null,
        insights: insights ?? null,
        scanSummary: scan_summary ?? body.scanSummary ?? null,
        env: env ?? null,
      })
      .returning({ id: reports.id, slug: reports.slug });

    return NextResponse.json({
      token: inserted.slug,
      url: `/r/${inserted.slug}`,
      id: inserted.id,
    });
  } catch (error) {
    console.error("Scan API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
