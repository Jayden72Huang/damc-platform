import Image from "next/image";
import type { Report } from "@/lib/schema";

type ScoreEntry = {
  total: number;
  subs?: Record<string, number>;
  fit?: string;
  paths?: string[];
};

type Scores = Partial<Record<"D" | "A" | "M" | "C", ScoreEntry>>;

type Insights = {
  distillTargets?: string[];
  moats?: string[];
  risks?: string[];
  actions?: string[];
};

type ScanSummary = {
  totalSkills?: number;
  customSkills?: number;
  mcpServers?: number;
  memoryFiles?: number;
  aiCommits?: number;
  totalCommits?: number;
  agentsCount?: number;
  hooksCount?: number;
};

type Props = {
  report: Report;
  isLoggedIn: boolean;
  isOwner: boolean;
  canSave: boolean;
};

const dimensionMeta = [
  {
    key: "D" as const,
    title: "蒸馏价值",
    desc: "你的经验值得被蒸馏成 AI Skill 吗？",
    image: "/atelier/dimensions/d-distillation.png",
  },
  {
    key: "A" as const,
    title: "抗蒸馏指数",
    desc: "你的哪些能力是 AI 拿不走的？",
    image: "/atelier/dimensions/a-anti-distillation.png",
  },
  {
    key: "M" as const,
    title: "AI 驾驭能力",
    desc: "你驾驭 AI 工具的水平如何？",
    image: "/atelier/dimensions/m-mastery.png",
  },
  {
    key: "C" as const,
    title: "职业适配",
    desc: "基于以上三维，你该往哪走？",
    image: "/atelier/dimensions/c-compass.png",
  },
];

const SUB_LABELS: Record<string, string> = {
  expertise: "领域专精",
  methodology: "方法论",
  codifiability: "可编码性",
  standardization: "标准化",
  demand: "市场需求",
  creativity: "创造力",
  eq: "情商 / 人际",
  crossDomain: "跨域综合",
  ambiguity: "处理模糊",
  physical: "物理在场",
  trust: "信任资产",
  environment: "工具生态",
  skills: "Skills 体系",
  automation: "自动化集成",
  memory: "持久记忆",
  advanced: "高级功能",
};

// M 维度各子项满分不同（环境20/Skill25/自动化20/记忆15/高级20），
// 统一归一化到 0-100，与 D/A 子项同量纲展示。
const M_SUB_MAX: Record<string, number> = {
  environment: 20,
  skills: 25,
  automation: 20,
  memory: 15,
  advanced: 20,
};

function gradeFromScore(score: number): string {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

export function ReportView({ report, isLoggedIn, isOwner, canSave }: Props): React.ReactNode {
  const scores = (report.scores ?? {}) as Scores;
  const insights = (report.insights ?? {}) as Insights;
  const scanSummary = (report.scanSummary ?? {}) as ScanSummary;
  const created = new Date(report.createdAt).toLocaleDateString("zh-CN");
  const overall = report.overall;
  const grade = overall != null ? gradeFromScore(overall) : null;
  const cDim = scores["C"];

  const hasSubs = dimensionMeta.some((d) => {
    const subs = scores[d.key]?.subs ?? {};
    return Object.keys(subs).length > 0;
  });

  const hasInsights =
    (insights.moats?.length ?? 0) > 0 ||
    (insights.distillTargets?.length ?? 0) > 0 ||
    (insights.risks?.length ?? 0) > 0 ||
    (insights.actions?.length ?? 0) > 0;

  const hasScanData = Object.keys(scanSummary).length > 0;

  return (
    <div className="atelier-root atelier-report-root">
      <main className="atelier-report">
        <div className="atelier-container">

          {/* Header */}
          <header className="atelier-report-header">
            <p className="atelier-section-eyebrow">DAMC 体检报告 · {created}</p>
            <h1 className="atelier-display atelier-report-title">
              <span className="atelier-report-emoji">{report.archetypeEmoji ?? "🏆"}</span>
              {report.archetype}
            </h1>
            {report.archetypeCode ? (
              <p className="atelier-report-code">{report.archetypeCode}</p>
            ) : null}
            {report.role ? (
              <p className="atelier-report-meta">
                {report.role}
                {report.mbti ? ` · ${report.mbti}` : null}
              </p>
            ) : null}

            {overall != null ? (
              <div className="atelier-report-overall">
                <span className="atelier-report-overall-score atelier-numbers">{overall}</span>
                <span className="atelier-report-overall-sep">/100</span>
                <span className="atelier-report-overall-grade">{grade}</span>
              </div>
            ) : null}
          </header>

          {/* 4 维总分 */}
          <section className="atelier-report-section">
            <h2 className="atelier-display atelier-report-h2">4 维评分</h2>
            <ul className="atelier-report-bars">
              {dimensionMeta.map((dim) => {
                const value = scores[dim.key]?.total ?? 0;
                return (
                  <li className="atelier-report-bar" key={dim.key}>
                    <span className="atelier-report-bar-letter">{dim.key}</span>
                    <span className="atelier-report-bar-title">{dim.title}</span>
                    <span
                      className="atelier-report-bar-track"
                      role="progressbar"
                      aria-valuenow={value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${dim.title} 得分 ${value}`}
                    >
                      <span
                        className="atelier-report-bar-fill"
                        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                      />
                    </span>
                    <span className="atelier-numbers atelier-report-bar-value">{value}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 22 子维度 */}
          {hasSubs ? (
            <section className="atelier-report-section">
              <h2 className="atelier-display atelier-report-h2">22 子维度详情</h2>
              <div className="atelier-report-subs-grid">
                {dimensionMeta.map((dim) => {
                  const subs = scores[dim.key]?.subs ?? {};
                  const entries = Object.entries(subs);
                  if (entries.length === 0) return null;
                  return (
                    <article className="atelier-report-sub-card" key={dim.key}>
                      <div className="atelier-report-sub-image">
                        <Image
                          src={dim.image}
                          alt={dim.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 24vw"
                        />
                      </div>
                      <div className="atelier-report-sub-body">
                        <h3 className="atelier-display atelier-report-sub-title">
                          <span>{dim.key}</span> · {dim.title}
                        </h3>
                        <p className="atelier-report-sub-dim-desc">{dim.desc}</p>
                        <ul className="atelier-report-sub-list">
                          {entries.map(([name, score]) => {
                            const val =
                              dim.key === "C"
                                ? score
                                : dim.key === "M"
                                  ? Math.round((score / (M_SUB_MAX[name] ?? 100)) * 100)
                                  : score;
                            const pct = Math.min(100, Math.max(0, val));
                            return (
                              <li key={name}>
                                <span>{SUB_LABELS[name] ?? name}</span>
                                <span className="atelier-report-sub-bar-wrap">
                                  <span
                                    className="atelier-report-sub-bar-fill"
                                    style={{ width: `${pct}%` }}
                                  />
                                </span>
                                <span className="atelier-numbers">{val}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* C 维度职业路径 */}
          {cDim?.fit || (cDim?.paths && cDim.paths.length > 0) ? (
            <section className="atelier-report-section">
              <h2 className="atelier-display atelier-report-h2">职业适配 · 推荐路径</h2>
              <div className="atelier-report-career">
                {cDim.fit ? (
                  <div className="atelier-report-career-fit">
                    <p className="atelier-report-insight-kind">适配类型</p>
                    <p className="atelier-report-career-fit-value">{cDim.fit}</p>
                  </div>
                ) : null}
                {cDim.paths && cDim.paths.length > 0 ? (
                  <div className="atelier-report-career-paths">
                    <p className="atelier-report-insight-kind">推荐路径</p>
                    <ol className="atelier-report-career-path-list">
                      {cDim.paths.map((path, i) => (
                        <li key={i}>{path}</li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* 洞察与行动 */}
          {hasInsights ? (
            <section className="atelier-report-section">
              <h2 className="atelier-display atelier-report-h2">洞察与行动</h2>
              <div className="atelier-report-insights">
                {insights.moats?.length ? (
                  <article className="atelier-report-insight">
                    <h3 className="atelier-report-insight-kind">护城河 · AI 拿不走的</h3>
                    <ul>
                      {insights.moats.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                  </article>
                ) : null}
                {insights.distillTargets?.length ? (
                  <article className="atelier-report-insight">
                    <h3 className="atelier-report-insight-kind">立即可蒸馏 · 变现优先</h3>
                    <ul>
                      {insights.distillTargets.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                  </article>
                ) : null}
                {insights.risks?.length ? (
                  <article className="atelier-report-insight atelier-report-insight-risk">
                    <h3 className="atelier-report-insight-kind">风险警示</h3>
                    <ul>
                      {insights.risks.map((m) => <li key={m}>{m}</li>)}
                    </ul>
                  </article>
                ) : null}
                {insights.actions?.length ? (
                  <article className="atelier-report-insight">
                    <h3 className="atelier-report-insight-kind">90 天行动计划</h3>
                    <ul>
                      {insights.actions.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </article>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* 扫描摘要 */}
          {hasScanData ? (
            <section className="atelier-report-section">
              <h2 className="atelier-display atelier-report-h2">环境扫描摘要</h2>
              <div className="atelier-report-scan-grid">
                {[
                  { label: "AI Agents", value: scanSummary.agentsCount },
                  { label: "技能总数", value: scanSummary.totalSkills },
                  { label: "自建 Skills", value: scanSummary.customSkills },
                  { label: "MCP 服务", value: scanSummary.mcpServers },
                  { label: "持久记忆", value: scanSummary.memoryFiles },
                  { label: "Hooks", value: scanSummary.hooksCount },
                  { label: "AI 协作 Commits", value: scanSummary.aiCommits },
                  { label: "总 Commits", value: scanSummary.totalCommits },
                ]
                  .filter((item) => item.value != null)
                  .map((item) => (
                    <div key={item.label} className="atelier-report-scan-item">
                      <span className="atelier-numbers atelier-report-scan-value">{item.value}</span>
                      <span className="atelier-report-scan-label">{item.label}</span>
                    </div>
                  ))}
              </div>
            </section>
          ) : null}

          {/* CTA */}
          <section className="atelier-report-cta">
            {isOwner ? (
              <p className="atelier-report-cta-note">这是你的报告 · 已保存到账户</p>
            ) : canSave ? (
              isLoggedIn ? (
                <ClaimForm slug={report.slug} />
              ) : (
                <a
                  className="atelier-button atelier-button-primary"
                  href={`/sign-in?next=${encodeURIComponent(`/r/${report.slug}?claim=1`)}`}
                >
                  保存到我的账户
                </a>
              )
            ) : (
              <p className="atelier-report-cta-note">这份报告已属于其他账户</p>
            )}
            <a className="atelier-text-link" href="/atelier#process">
              想生成自己的报告？看 5 步流程 →
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

function ClaimForm({ slug }: { slug: string }): React.ReactNode {
  return (
    <form action={`/api/reports/${slug}/claim`} method="post">
      <button type="submit" className="atelier-button atelier-button-primary">
        保存到我的账户
      </button>
    </form>
  );
}
