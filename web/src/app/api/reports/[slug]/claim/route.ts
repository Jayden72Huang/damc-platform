import { NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, { params }: Params) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    const url = new URL(request.url);
    return NextResponse.redirect(
      new URL(`/sign-in?next=${encodeURIComponent(`/r/${slug}?claim=1`)}`, url.origin),
      { status: 303 }
    );
  }

  const result = await db
    .update(schema.reports)
    .set({ userId })
    .where(
      and(eq(schema.reports.slug, slug), isNull(schema.reports.userId))
    )
    .returning({ slug: schema.reports.slug });

  const url = new URL(request.url);
  return NextResponse.redirect(
    new URL(result.length ? `/r/${slug}` : `/r/${slug}?error=already_claimed`, url.origin),
    { status: 303 }
  );
}
