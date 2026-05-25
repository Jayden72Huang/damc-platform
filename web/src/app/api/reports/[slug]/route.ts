import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, users } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { getGrade, getPercentileLabel } from "@/lib/scoring";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const [report] = await db
      .select({
        id: reports.id,
        slug: reports.slug,
        overall: reports.overall,
        scores: reports.scores,
        archetype: reports.archetype,
        archetypeEmoji: reports.archetypeEmoji,
        archetypeCode: reports.archetypeCode,
        role: reports.role,
        mbti: reports.mbti,
        insights: reports.insights,
        scanSummary: reports.scanSummary,
        createdAt: reports.createdAt,
        userId: reports.userId,
        userName: users.name,
        userImage: users.image,
      })
      .from(reports)
      .leftJoin(users, eq(reports.userId, users.id))
      .where(eq(reports.slug, slug))
      .limit(1);

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const allScores = await db
      .select({ overall: reports.overall })
      .from(reports)
      .where(sql`${reports.overall} IS NOT NULL`);

    const scoreValues = allScores
      .map((r) => r.overall)
      .filter((v): v is number => v !== null);

    const below = scoreValues.filter(
      (s) => s < (report.overall ?? 0)
    ).length;
    const percentile =
      scoreValues.length > 0
        ? Math.round((below / scoreValues.length) * 100)
        : 100;

    return NextResponse.json({
      ...report,
      grade: getGrade(report.overall ?? 0),
      percentile,
      percentileLabel: getPercentileLabel(percentile),
      globalTotal: scoreValues.length,
    });
  } catch (error) {
    console.error("Report API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
