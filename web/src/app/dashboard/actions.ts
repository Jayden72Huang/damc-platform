"use server";

import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function publishSkill(skillId: string) {
  const session = await auth();
  if (!session?.user?.id) return;
  await db
    .update(schema.skills)
    .set({ status: "published" })
    .where(and(eq(schema.skills.id, skillId), eq(schema.skills.userId, session.user.id)));
  revalidatePath("/dashboard");
}

export async function deleteSkill(skillId: string) {
  const session = await auth();
  if (!session?.user?.id) return;
  await db
    .delete(schema.skills)
    .where(and(eq(schema.skills.id, skillId), eq(schema.skills.userId, session.user.id)));
  revalidatePath("/dashboard");
}
