import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { ReportView } from "@/components/atelier/ReportView";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await db
    .select()
    .from(schema.reports)
    .where(eq(schema.reports.slug, slug))
    .limit(1);
  const report = rows[0];

  if (!report) {
    return { title: "报告未找到 | DAMC.ai" };
  }

  return {
    title: `${report.archetype} · DAMC 体检报告 | DAMC.ai`,
    description: `${report.archetype}画像的 Agent 体检报告 — 4 维评分与 22 子项细节。`,
  };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;

  const rows = await db
    .select()
    .from(schema.reports)
    .where(eq(schema.reports.slug, slug))
    .limit(1);

  const report = rows[0];
  if (!report) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.id && session.user.id === report.userId;
  const canSave = !report.userId; // anonymous report — anyone logged in can claim

  return (
    <ReportView
      report={report}
      isLoggedIn={!!session?.user}
      isOwner={!!isOwner}
      canSave={canSave}
    />
  );
}
