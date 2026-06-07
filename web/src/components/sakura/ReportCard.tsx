"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    loading: "Loading report...",
    notFoundTitle: "报告未找到",
    notFoundDesc: "该报告不存在或已被删除",
    backHome: "返回首页",
    participantsSuffix: "位参与者中",
    insightDistill: "值得蒸馏",
    insightMoat: "护城河",
    insightRisk: "风险点",
    insightAction: "90 天行动",
    bindTitle: "绑定你的结果",
    bindDesc: "登录 GitHub 账号后，你的评分将出现在排行榜，还能加入团队排名。",
    bindCta: "用 GitHub 登录绑定 →",
    binding: "正在绑定到你的账号...",
    bound: "已绑定！你的评分已加入排行榜",
    copied: "✓ 已复制",
    copyShare: "复制分享文本",
    testYours: "测测你的 DAMC",
    shareLine: "测测你的 AI 时代价值 →",
    skillsTitle: "值得上架的 SKILLS",
    skillsDesc: "AI 从你的环境识别出这些高价值能力 — 上架到平台即可变现或影响他人",
    skillsCta: "去 Dashboard 上架 →",
    skillsPending: "待上架",
    skillsPublished: "已上架",
    skillsValuation: "估值",
    teamTitle: "组队冲榜",
    teamDesc: "邀请同事或好友一起测 DAMC，看谁是团队 AI 战力第一，登上团队排行榜",
    teamCta: "创建团队 / 加入 →",
    dateLocale: "zh-CN",
  },
  en: {
    loading: "Loading report...",
    notFoundTitle: "Report not found",
    notFoundDesc: "This report doesn't exist or has been deleted",
    backHome: "Back to home",
    participantsSuffix: "participants",
    insightDistill: "Worth Distilling",
    insightMoat: "Moats",
    insightRisk: "Risks",
    insightAction: "90-Day Actions",
    bindTitle: "Bind your results",
    bindDesc:
      "Sign in with GitHub and your scores will appear on the leaderboard — plus you can join team rankings.",
    bindCta: "Sign in with GitHub to bind →",
    binding: "Binding to your account...",
    bound: "Bound! Your scores are now on the leaderboard",
    copied: "✓ Copied",
    copyShare: "Copy share text",
    testYours: "Test your own DAMC",
    shareLine: "Measure your AI-era value →",
    skillsTitle: "SKILLS WORTH PUBLISHING",
    skillsDesc: "AI identified these high-value capabilities from your setup — publish them to monetize or share",
    skillsCta: "Publish on Dashboard →",
    skillsPending: "Pending",
    skillsPublished: "Published",
    skillsValuation: "Value",
    teamTitle: "TEAM RANKING",
    teamDesc: "Invite teammates or friends to take DAMC — see who tops your team's AI leaderboard",
    teamCta: "Create / Join a team →",
    dateLocale: "en-US",
  },
};

interface ReportData {
  id: string;
  slug: string;
  overall: number | null;
  scores: Record<string, number> | null;
  archetype: string | null;
  archetypeEmoji: string | null;
  archetypeCode: string | null;
  role: string | null;
  mbti: string | null;
  insights: {
    distillTargets?: string[];
    moats?: string[];
    risks?: string[];
    actions?: string[];
  } | null;
  scanSummary: Record<string, number> | null;
  skills?: Array<{
    id: string;
    name: string;
    displayName: string;
    iconEmoji: string | null;
    valuation: { score?: number; reasoning?: string } | null;
    status: string;
    visibility: string;
    installCommand: string;
  }> | null;
  createdAt: string;
  userId: string | null;
  userName: string | null;
  userImage: string | null;
  grade: string;
  percentile: number;
  percentileLabel: string;
  globalTotal: number;
}

function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="sk-dash-bar">
      <span className="sk-dash-bar-label" style={{ color }}>
        {label}
      </span>
      <div className="sk-dash-bar-track">
        <div
          className="sk-dash-bar-fill"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="sk-dash-bar-val" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function InsightBlock({
  title,
  emoji,
  items,
  color,
}: {
  title: string;
  emoji: string;
  items: string[];
  color: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="sk-rpt-insight-block">
      <div className="sk-rpt-insight-title" style={{ color }}>
        {emoji} {title}
      </div>
      <ul className="sk-rpt-insight-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ReportCard({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bindState, setBindState] = useState<"idle" | "binding" | "bound">("idle");

  useEffect(() => {
    fetch(`/api/reports/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!data || data.userId || bindState !== "idle") return;
    fetch("/api/me")
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((me) => {
        if (!me?.user?.id) return;
        setBindState("binding");
        return fetch("/api/reports/bind", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: data.slug }),
        });
      })
      .then((res) => {
        if (res?.ok) {
          setBindState("bound");
          setData((prev) => prev ? { ...prev, userId: "bound" } : prev);
        }
      })
      .catch(() => {});
  }, [data, bindState]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.4 }}>
        {c.loading}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="sk-dash-unauth">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
        <p className="sk-display" style={{ fontSize: 24 }}>
          {c.notFoundTitle}
        </p>
        <p style={{ opacity: 0.5, marginTop: 8 }}>{c.notFoundDesc}</p>
        <a href="/" className="sk-btn" style={{ marginTop: 24 }}>
          {c.backHome}
        </a>
      </div>
    );
  }

  const s = (data.scores ?? {}) as Record<string, number>;
  const ins = data.insights;
  const shareUrl = `https://damc.space/r/${data.slug}`;

  function handleCopy() {
    const text = [
      `${data!.archetypeEmoji ?? "📊"} ${data!.archetype ?? "DAMC Report"}`,
      "",
      `D ${data!.scores?.D ?? "—"} | A ${data!.scores?.A ?? "—"} | M ${data!.scores?.M ?? "—"} | C ${data!.scores?.C ?? "—"}`,
      `Overall: ${data!.overall}/100 · Grade ${data!.grade} · ${data!.percentileLabel}`,
      "",
      `${c.shareLine} ${shareUrl}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="sk-rpt">
      {/* Header card */}
      <div className="sk-rpt-card">
        {/* Profile row */}
        {(data.userName || data.role) && (
          <div className="sk-rpt-profile">
            {data.userImage && (
              <img src={data.userImage} alt="" className="sk-dash-avatar" />
            )}
            <div>
              {data.userName && (
                <div className="sk-display" style={{ fontSize: 20 }}>
                  {data.userName}
                </div>
              )}
              {data.role && (
                <div
                  className="sk-mono"
                  style={{ fontSize: 11, opacity: 0.5 }}
                >
                  {data.role}
                  {data.mbti ? ` · ${data.mbti}` : ""}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Archetype */}
        <div className="sk-rpt-archetype">
          <span className="sk-rpt-archetype-emoji">
            {data.archetypeEmoji ?? "📊"}
          </span>
          <span className="sk-display">{data.archetype ?? "DAMC Report"}</span>
        </div>

        {/* Score hero */}
        <div className="sk-rpt-score-hero">
          <div className="sk-rpt-overall">
            <span className="sk-dash-overall-num">{data.overall ?? 0}</span>
            <span className="sk-dash-overall-unit">/100</span>
          </div>
          <div className="sk-dash-grade-badge" data-grade={data.grade}>
            {data.grade}
          </div>
          <div className="sk-dash-percentile">
            {data.percentileLabel} · {data.globalTotal} {c.participantsSuffix}
          </div>
        </div>

        {/* DAMC Bars */}
        <div className="sk-dash-bars">
          <ScoreBar label="D" value={s.D ?? 0} color="var(--color-d)" />
          <ScoreBar label="A" value={s.A ?? 0} color="var(--color-a)" />
          <ScoreBar label="M" value={s.M ?? 0} color="var(--color-m)" />
          <ScoreBar label="C" value={s.C ?? 0} color="var(--color-c)" />
        </div>

        {/* Meta */}
        <div className="sk-rpt-meta">
          <span>
            {new Date(data.createdAt).toLocaleDateString(c.dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="sk-mono" style={{ opacity: 0.3, fontSize: 10 }}>
            #{data.slug}
          </span>
        </div>
      </div>

      {/* Insights */}
      {ins && (
        <div className="sk-rpt-insights">
          <div
            className="sk-display"
            style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20 }}
          >
            INSIGHTS
          </div>
          <div className="sk-rpt-insights-grid">
            <InsightBlock
              title={c.insightDistill}
              emoji="🧪"
              items={ins.distillTargets ?? []}
              color="var(--color-d)"
            />
            <InsightBlock
              title={c.insightMoat}
              emoji="🛡️"
              items={ins.moats ?? []}
              color="var(--color-m)"
            />
            <InsightBlock
              title={c.insightRisk}
              emoji="⚠️"
              items={ins.risks ?? []}
              color="var(--color-a)"
            />
            <InsightBlock
              title={c.insightAction}
              emoji="🎯"
              items={ins.actions ?? []}
              color="var(--color-c)"
            />
          </div>
        </div>
      )}

      {/* CTA 区：值得上架的 Skills + 组队冲榜（上下排列）*/}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        {/* 1. 值得上架的 Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="sk-rpt-insights">
            <div
              className="sk-display"
              style={{ fontSize: 14, letterSpacing: 2, marginBottom: 8 }}
            >
              💎 {c.skillsTitle}
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-light)", marginBottom: 16 }}>
              {c.skillsDesc}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginBottom: 18,
              }}
            >
              {data.skills.map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "var(--paper-lt)",
                    border: "1px solid var(--ink-faint)",
                    borderRadius: 8,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{s.iconEmoji ?? "🧩"}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {s.displayName}
                    </div>
                    {s.valuation?.score != null && (
                      <div style={{ fontSize: 12, color: "var(--ink-light)" }}>
                        {c.skillsValuation} {s.valuation.score}/100
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 100,
                      whiteSpace: "nowrap",
                      background:
                        s.status === "published"
                          ? "var(--color-m-dim)"
                          : "var(--color-c-dim)",
                      color:
                        s.status === "published"
                          ? "var(--color-m)"
                          : "var(--ink)",
                    }}
                  >
                    {s.status === "published"
                      ? c.skillsPublished
                      : c.skillsPending}
                  </span>
                </div>
              ))}
            </div>
            {data.skills.some((s) => s.status !== "published") && (
              <a href="/dashboard#skills" className="sk-btn sk-btn-primary">
                {c.skillsCta}
              </a>
            )}
          </div>
        )}

        {/* 2. 组队冲榜 */}
        <div className="sk-rpt-insights">
          <div
            className="sk-display"
            style={{ fontSize: 14, letterSpacing: 2, marginBottom: 8 }}
          >
            🏆 {c.teamTitle}
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-light)", marginBottom: 16 }}>
            {c.teamDesc}
          </p>
          <a href="/leaderboard" className="sk-btn sk-btn-primary">
            {c.teamCta}
          </a>
        </div>
      </div>

      {/* Scan summary */}
      {data.scanSummary && (
        <div className="sk-rpt-scan">
          <div
            className="sk-display"
            style={{ fontSize: 14, letterSpacing: 2, marginBottom: 16 }}
          >
            SCAN SUMMARY
          </div>
          <div className="sk-rpt-scan-grid">
            {data.scanSummary.totalSkills != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.totalSkills}
                </span>
                <span className="sk-rpt-scan-label">Skills</span>
              </div>
            )}
            {data.scanSummary.customSkills != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.customSkills}
                </span>
                <span className="sk-rpt-scan-label">Custom</span>
              </div>
            )}
            {data.scanSummary.mcpServers != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.mcpServers}
                </span>
                <span className="sk-rpt-scan-label">MCP</span>
              </div>
            )}
            {data.scanSummary.memoryFiles != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.memoryFiles}
                </span>
                <span className="sk-rpt-scan-label">Memory</span>
              </div>
            )}
            {data.scanSummary.aiCommits != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.aiCommits}/{data.scanSummary.totalCommits ?? "?"}
                </span>
                <span className="sk-rpt-scan-label">AI Commits</span>
              </div>
            )}
            {data.scanSummary.hooksCount != null && (
              <div className="sk-rpt-scan-item">
                <span className="sk-rpt-scan-val">
                  {data.scanSummary.hooksCount}
                </span>
                <span className="sk-rpt-scan-label">Hooks</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bind prompt */}
      {bindState === "bound" && (
        <div className="sk-rpt-bind-prompt" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--ink)" }}>
            {c.bound}
          </p>
        </div>
      )}
      {bindState === "binding" && (
        <div className="sk-rpt-bind-prompt" style={{ textAlign: "center", opacity: 0.5 }}>
          <p style={{ fontSize: 13 }}>{c.binding}</p>
        </div>
      )}
      {!data.userId && bindState === "idle" && (
        <div className="sk-rpt-bind-prompt">
          <p className="sk-display" style={{ fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>
            {c.bindTitle}
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-light)", marginBottom: 12 }}>
            {c.bindDesc}
          </p>
          <a href="/login" className="sk-btn sk-btn-primary">
            {c.bindCta}
          </a>
        </div>
      )}

      {/* Share bar */}
      <div className="sk-rpt-share">
        <button className="sk-btn" onClick={handleCopy}>
          {copied ? c.copied : c.copyShare}
        </button>
        <a href="/" className="sk-btn-outline">
          {c.testYours}
        </a>
      </div>
    </div>
  );
}
