import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teams, teamMembers } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { inviteCode } = body;

  if (!inviteCode || typeof inviteCode !== "string") {
    return NextResponse.json({ error: "Invite code is required" }, { status: 400 });
  }

  const [team] = await db
    .select()
    .from(teams)
    .where(eq(teams.inviteCode, inviteCode.trim()));

  if (!team) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
  }

  try {
    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: session.user.id,
      role: "member",
    });
  } catch {
    return NextResponse.json({ error: "Already a member" }, { status: 409 });
  }

  return NextResponse.json({ team: { id: team.id, name: team.name, slug: team.slug } });
}
