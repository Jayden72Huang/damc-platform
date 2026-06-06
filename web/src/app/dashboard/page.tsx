import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { auth, signOut } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import type { Skill } from "@/lib/schema";
import { publishSkill, deleteSkill } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "我的体检 · Dashboard | DAMC.ai" };

const CATEGORY_LABELS: Record<string, string> = {
  automation: "自动化",
  content: "内容创作",
  "dev-tools": "开发工具",
  seo: "SEO",
  design: "设计",
  data: "数据",
  productivity: "效率",
  other: "其他",
};

function SkillCard({ skill }: { skill: Skill }) {
  const categoryLabel = CATEGORY_LABELS[skill.category] ?? skill.category;
  const valuation = skill.valuation as Record<string, unknown> | null;

  const publishWithId = publishSkill.bind(null, skill.id);
  const deleteWithId = deleteSkill.bind(null, skill.id);

  return (
    <li className="atelier-skill-card">
      <div className="atelier-skill-card-left">
        <span className="atelier-skill-card-emoji">{skill.iconEmoji ?? "🧩"}</span>
        <div className="atelier-skill-card-info">
          <p className="atelier-skill-card-name">{skill.displayName}</p>
          <p className="atelier-skill-card-desc">{skill.description}</p>
          <div className="atelier-skill-card-meta">
            <span className="atelier-skill-badge-cat">{categoryLabel}</span>
            <span className={`atelier-skill-badge-vis${skill.visibility === "premium" ? " atelier-skill-badge-premium" : ""}`}>
              {skill.visibility === "premium" ? "Premium" : "免费"}
            </span>
            {valuation?.score ? (
              <span className="atelier-skill-badge-val">估值 {String(valuation.score)}</span>
            ) : null}
          </div>
          {skill.installCommand ? (
            <code className="atelier-code atelier-skill-install">{skill.installCommand}</code>
          ) : null}
        </div>
      </div>

      <div className="atelier-skill-card-right">
        <span className={`atelier-skill-status${skill.status === "published" ? " atelier-skill-status-pub" : ""}`}>
          {skill.status === "published" ? "已上架" : "草稿"}
        </span>

        <div className="atelier-skill-actions">
          {skill.status === "draft" ? (
            <form action={publishWithId}>
              <button type="submit" className="atelier-button atelier-button-primary atelier-button-sm">
                上架
              </button>
            </form>
          ) : null}
          <form action={deleteWithId}>
            <button type="submit" className="atelier-button atelier-button-sm atelier-button-danger">
              删除
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in?next=/dashboard");
  }

  const userId = session.user.id;
  const [reports, userSkills] = await Promise.all([
    db
      .select()
      .from(schema.reports)
      .where(eq(schema.reports.userId, userId))
      .orderBy(desc(schema.reports.createdAt)),
    db
      .select()
      .from(schema.skills)
      .where(eq(schema.skills.userId, userId))
      .orderBy(desc(schema.skills.createdAt)),
  ]);

  const latest = reports[0];
  const draftSkills = userSkills.filter((s) => s.status === "draft");
  const publishedSkills = userSkills.filter((s) => s.status === "published");

  return (
    <div className="atelier-root atelier-dashboard-root">
      <main className="atelier-dashboard">
        <div className="atelier-container">
          <header className="atelier-dashboard-header">
            <div>
              <p className="atelier-section-eyebrow">DAMC.AI · Dashboard</p>
              <h1 className="atelier-display atelier-dashboard-title">
                你好，{session.user.name ?? session.user.email ?? "同行者"}
              </h1>
              <p className="atelier-dashboard-sub">
                {reports.length === 0
                  ? "你还没有体检报告。在终端中运行 /damc 即可生成。"
                  : `${reports.length} 份报告${reports.length > 1 ? " · 可对比复测趋势" : ""} · ${userSkills.length} 个 Skills`}
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="atelier-button">
                登出
              </button>
            </form>
          </header>

          {/* 最新报告 */}
          {latest ? (
            <section className="atelier-dashboard-section">
              <h2 className="atelier-display atelier-dashboard-h2">最新报告</h2>
              <Link href={`/r/${latest.slug}`} className="atelier-dashboard-latest">
                <div className="atelier-dashboard-latest-meta">
                  <span className="atelier-dashboard-latest-emoji">
                    {latest.archetypeEmoji ?? "🏆"}
                  </span>
                  <div>
                    <p className="atelier-display atelier-dashboard-latest-name">
                      {latest.archetype}
                    </p>
                    <p className="atelier-dashboard-latest-date">
                      {new Date(latest.createdAt).toLocaleString("zh-CN")}
                      {latest.overall != null ? ` · 总分 ${latest.overall}` : null}
                    </p>
                  </div>
                </div>
                <span className="atelier-text-link">查看完整报告 →</span>
              </Link>
            </section>
          ) : null}

          {/* Skills 管理 */}
          <section className="atelier-dashboard-section" id="skills">
            <h2 className="atelier-display atelier-dashboard-h2">
              Skills 商城
              {userSkills.length > 0 ? (
                <span className="atelier-dashboard-skills-count">
                  {draftSkills.length > 0 ? ` ${draftSkills.length} 待上架` : ""}
                  {publishedSkills.length > 0 ? ` · ${publishedSkills.length} 已上架` : ""}
                </span>
              ) : null}
            </h2>

            {userSkills.length > 0 ? (
              <>
                {draftSkills.length > 0 ? (
                  <div className="atelier-skill-group">
                    <p className="atelier-skill-group-label">草稿箱 — 确认后方可上架</p>
                    <ul className="atelier-skill-list">
                      {draftSkills.map((s) => <SkillCard key={s.id} skill={s} />)}
                    </ul>
                  </div>
                ) : null}
                {publishedSkills.length > 0 ? (
                  <div className="atelier-skill-group">
                    <p className="atelier-skill-group-label">已上架</p>
                    <ul className="atelier-skill-list">
                      {publishedSkills.map((s) => <SkillCard key={s.id} skill={s} />)}
                    </ul>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="atelier-dashboard-empty">
                <p>还没有 Skills 草稿。</p>
                <p>运行 <code className="atelier-code">/damc</code> 并同意上架，系统会自动扫描你的自建 Skills。</p>
              </div>
            )}
          </section>

          {/* 所有报告 */}
          {reports.length > 0 ? (
            <section className="atelier-dashboard-section">
              <h2 className="atelier-display atelier-dashboard-h2">所有报告</h2>
              <ul className="atelier-dashboard-list">
                {reports.map((r) => (
                  <li key={r.id}>
                    <Link href={`/r/${r.slug}`} className="atelier-dashboard-row">
                      <span className="atelier-dashboard-row-emoji">{r.archetypeEmoji ?? "📊"}</span>
                      <span className="atelier-dashboard-row-title">{r.archetype}</span>
                      <span className="atelier-dashboard-row-date">
                        {new Date(r.createdAt).toLocaleDateString("zh-CN")}
                      </span>
                      <span className="atelier-numbers atelier-dashboard-row-score">
                        {r.overall ?? "—"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {reports.length === 0 && userSkills.length === 0 ? (
            <section className="atelier-dashboard-empty">
              <p>还没有数据？在终端运行：</p>
              <code className="atelier-code atelier-code-block">
                npx skills add Jayden72Huang/damc-skill
              </code>
              <p>然后输入 <code className="atelier-code">/damc</code> 即可生成第一份报告并上架 Skills。</p>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}
