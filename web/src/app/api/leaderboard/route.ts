import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, users } from "@/lib/schema";
import { desc, eq, sql } from "drizzle-orm";
import { getGrade, getPercentileLabel } from "@/lib/scoring";

export async function GET() {
  try {
    const allScores = await db
      .select({ overall: reports.overall })
      .from(reports)
      .where(sql`${reports.overall} IS NOT NULL`);

    const scoreValues = allScores
      .map((r) => r.overall)
      .filter((v): v is number => v !== null);

    const ranked = await db
      .select({
        reportId: reports.id,
        slug: reports.slug,
        overall: reports.overall,
        archetype: reports.archetype,
        archetypeEmoji: reports.archetypeEmoji,
        scores: reports.scores,
        role: reports.role,
        createdAt: reports.createdAt,
        userId: reports.userId,
        userName: users.name,
        userImage: users.image,
      })
      .from(reports)
      .leftJoin(users, eq(reports.userId, users.id))
      .where(sql`${reports.overall} IS NOT NULL`)
      .orderBy(desc(reports.overall))
      .limit(50);

    const leaderboard = ranked.map((r, index) => {
      const below = scoreValues.filter(
        (s) => s < (r.overall ?? 0)
      ).length;
      const percentile = Math.round((below / scoreValues.length) * 100);

      return {
        rank: index + 1,
        slug: r.slug,
        overall: r.overall,
        grade: getGrade(r.overall ?? 0),
        percentile,
        percentileLabel: getPercentileLabel(percentile),
        archetype: r.archetype,
        archetypeEmoji: r.archetypeEmoji,
        scores: r.scores,
        role: r.role,
        userName: r.userName ?? "Anonymous",
        userImage: r.userImage,
        userId: r.userId,
        createdAt: r.createdAt,
      };
    });

    return NextResponse.json({
      total: scoreValues.length,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
