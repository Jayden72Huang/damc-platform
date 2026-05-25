import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq, desc, sql } from "drizzle-orm";
import { getGrade, getPercentileLabel } from "@/lib/scoring";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allScores = await db
      .select({ overall: reports.overall })
      .from(reports)
      .where(sql`${reports.overall} IS NOT NULL`);

    const scoreValues = allScores
      .map((r) => r.overall)
      .filter((v): v is number => v !== null);

    const myReports = await db
      .select()
      .from(reports)
      .where(eq(reports.userId, session.user.id))
      .orderBy(desc(reports.createdAt));

    const latest = myReports[0] ?? null;
    const latestOverall = latest?.overall ?? 0;

    const below = scoreValues.filter((s) => s < latestOverall).length;
    const percentile =
      scoreValues.length > 0
        ? Math.round((below / scoreValues.length) * 100)
        : 100;

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
      },
      latest: latest
        ? {
            slug: latest.slug,
            overall: latest.overall,
            grade: getGrade(latestOverall),
            percentile,
            percentileLabel: getPercentileLabel(percentile),
            archetype: latest.archetype,
            archetypeEmoji: latest.archetypeEmoji,
            scores: latest.scores,
            insights: latest.insights,
            createdAt: latest.createdAt,
          }
        : null,
      history: myReports.map((r) => ({
        slug: r.slug,
        overall: r.overall,
        grade: getGrade(r.overall ?? 0),
        archetype: r.archetype,
        archetypeEmoji: r.archetypeEmoji,
        scores: r.scores,
        createdAt: r.createdAt,
      })),
      totalReports: myReports.length,
      globalTotal: scoreValues.length,
    });
  } catch (error) {
    console.error("Me API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
