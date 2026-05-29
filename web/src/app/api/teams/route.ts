import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teams, teamMembers, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await db
    .select({
      teamId: teams.id,
      teamName: teams.name,
      teamSlug: teams.slug,
      description: teams.description,
      inviteCode: teams.inviteCode,
      ownerId: teams.ownerId,
      role: teamMembers.role,
      createdAt: teams.createdAt,
    })
    .from(teamMembers)
    .innerJoin(teams, eq(teamMembers.teamId, teams.id))
    .where(eq(teamMembers.userId, session.user.id));

  return NextResponse.json({ teams: memberships });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description } = body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Team name is required" }, { status: 400 });
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) + "-" + randomBytes(3).toString("hex");

  const inviteCode = randomBytes(4).toString("hex");

  const [team] = await db
    .insert(teams)
    .values({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      inviteCode,
      ownerId: session.user.id,
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: session.user.id,
    role: "owner",
  });

  return NextResponse.json({ team }, { status: 201 });
}
