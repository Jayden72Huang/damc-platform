import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq, and, isNull } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const [updated] = await db
      .update(reports)
      .set({ userId: session.user.id })
      .where(and(eq(reports.slug, slug), isNull(reports.userId)))
      .returning({ id: reports.id, slug: reports.slug });

    if (!updated) {
      return NextResponse.json(
        { error: "Report not found or already bound" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, slug: updated.slug });
  } catch (error) {
    console.error("Bind report error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
