"use client";

import { useEffect, useState } from "react";

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
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.4 }}>
        Loading report...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="sk-dash-unauth">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
        <p className="sk-display" style={{ fontSize: 24 }}>
          报告未找到
        </p>
        <p style={{ opacity: 0.5, marginTop: 8 }}>
          该报告不存在或已被删除
        </p>
        <a href="/" className="sk-btn" style={{ marginTop: 24 }}>
          返回首页
        </a>
      </div>
    );
  }

  const s = (data.scores ?? {}) as Record<string, number>;
  const ins = data.insights;
  const shareUrl = `https://vibergo.space/r/${data.slug}`;

  function handleCopy() {
    const text = [
      `${data!.archetypeEmoji ?? "📊"} ${data!.archetype ?? "DAMC Report"}`,
      "",
      `D ${data!.scores?.D ?? "—"} | A ${data!.scores?.A ?? "—"} | M ${data!.scores?.M ?? "—"} | C ${data!.scores?.C ?? "—"}`,
      `Overall: ${data!.overall}/100 · Grade ${data!.grade} · ${data!.percentileLabel}`,
      "",
      `测测你的 AI 时代价值 → ${shareUrl}`,
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
            {data.percentileLabel} · {data.globalTotal} 位参与者中
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
            {new Date(data.createdAt).toLocaleDateString("zh-CN", {
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
              title="值得蒸馏"
              emoji="🧪"
              items={ins.distillTargets ?? []}
              color="var(--color-d)"
            />
            <InsightBlock
              title="护城河"
              emoji="🛡️"
              items={ins.moats ?? []}
              color="var(--color-m)"
            />
            <InsightBlock
              title="风险点"
              emoji="⚠️"
              items={ins.risks ?? []}
              color="var(--color-a)"
            />
            <InsightBlock
              title="90 天行动"
              emoji="🎯"
              items={ins.actions ?? []}
              color="var(--color-c)"
            />
          </div>
        </div>
      )}

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

      {/* Share bar */}
      <div className="sk-rpt-share">
        <button className="sk-btn" onClick={handleCopy}>
          {copied ? "✓ 已复制" : "复制分享文本"}
        </button>
        <a href="/login" className="sk-btn-outline">
          测测你的 DAMC
        </a>
      </div>
    </div>
  );
}
