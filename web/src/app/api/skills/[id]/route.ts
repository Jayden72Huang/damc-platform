import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/skills/[id] — publish or update a skill draft
export async function PATCH(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { status, visibility } = (body ?? {}) as Record<string, string>;

  const validStatuses = ["draft", "published", "listed"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const update: Record<string, string> = {};
  if (status) update.status = status;
  if (visibility === "public" || visibility === "premium") update.visibility = visibility;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const rows = await db
    .update(schema.skills)
    .set(update)
    .where(and(eq(schema.skills.id, id), eq(schema.skills.userId, session.user.id)))
    .returning({ id: schema.skills.id, status: schema.skills.status });

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, skill: rows[0] });
}

// DELETE /api/skills/[id] — delete a skill
export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const rows = await db
    .delete(schema.skills)
    .where(and(eq(schema.skills.id, id), eq(schema.skills.userId, session.user.id)))
    .returning({ id: schema.skills.id });

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
