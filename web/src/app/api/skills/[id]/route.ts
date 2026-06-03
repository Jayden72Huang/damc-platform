import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { skills } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const allowedFields: Record<string, unknown> = {};
    const editable = [
      "displayName",
      "description",
      "category",
      "price",
      "installCommand",
      "repoUrl",
      "demoUrl",
      "iconEmoji",
      "tags",
      "features",
      "visibility",
      "status",
    ] as const;

    for (const key of editable) {
      if (key in body) allowedFields[key] = body[key];
    }

    if (allowedFields.status && !["draft", "listed"].includes(allowedFields.status as string)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    if (allowedFields.visibility && !["public", "premium"].includes(allowedFields.visibility as string)) {
      return NextResponse.json({ error: "Invalid visibility" }, { status: 400 });
    }

    allowedFields.updatedAt = new Date();

    const [updated] = await db
      .update(skills)
      .set(allowedFields)
      .where(and(eq(skills.id, id), eq(skills.userId, session.user.id)))
      .returning({ id: skills.id, status: skills.status, visibility: skills.visibility });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Skill update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [deleted] = await db
      .delete(skills)
      .where(and(eq(skills.id, id), eq(skills.userId, session.user.id)))
      .returning({ id: skills.id });

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Skill delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
