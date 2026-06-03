import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, session.user.id))
      .orderBy(desc(skills.createdAt));

    return NextResponse.json({ skills: rows });
  } catch (error) {
    console.error("My skills error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
