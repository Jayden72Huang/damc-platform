"use client";

import { useEffect, useState } from "react";

interface ScoreEntry {
  slug: string;
  overall: number;
  grade: string;
  archetype: string;
  archetypeEmoji: string | null;
  scores: Record<string, number>;
  createdAt: string;
}

interface DashboardData {
  user: {
    id: string;
    name: string;
    image: string | null;
    email: string;
  };
  latest: {
    slug: string;
    overall: number;
    grade: string;
    percentile: number;
    percentileLabel: string;
    archetype: string;
    archetypeEmoji: string | null;
    scores: Record<string, number>;
    insights: Record<string, unknown>;
    createdAt: string;
  } | null;
  history: ScoreEntry[];
  totalReports: number;
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
}): React.ReactNode {
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

export function DashboardContent(): React.ReactNode {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (res.status === 401) throw new Error("unauthorized");
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", opacity: 0.4 }}>
        Loading...
      </div>
    );
  }

  if (error === "unauthorized") {
    return (
      <div className="sk-dash-unauth">
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <p className="sk-display" style={{ fontSize: 24 }}>
          请先登录
        </p>
        <p style={{ opacity: 0.5, marginTop: 8 }}>
          登录后查看你的 DAMC 评估历史和排名
        </p>
        <a href="/api/auth/signin" className="sk-btn" style={{ marginTop: 24 }}>
          GitHub 登录
        </a>
      </div>
    );
  }

  if (!data?.latest) {
    return (
      <div className="sk-dash-unauth">
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <p className="sk-display" style={{ fontSize: 24 }}>
          还没有评估记录
        </p>
        <p style={{ opacity: 0.5, marginTop: 8 }}>
          在 Claude Code 中运行 <code>/damc</code> 开始你的首次评估
        </p>
      </div>
    );
  }

  const { latest, history, globalTotal } = data;
  const s = latest.scores as Record<string, number>;

  return (
    <div className="sk-dash-layout">
      {/* Main card */}
      <div className="sk-dash-main">
        <div className="sk-dash-profile">
          {data.user.image ? (
            <img src={data.user.image} alt="" className="sk-dash-avatar" />
          ) : null}
          <div>
            <div className="sk-display" style={{ fontSize: 20 }}>
              {data.user.name}
            </div>
            <div className="sk-mono" style={{ fontSize: 11, opacity: 0.4 }}>
              {latest.archetypeEmoji} {latest.archetype}
            </div>
          </div>
        </div>

        <div className="sk-dash-score-hero">
          <div className="sk-dash-overall">
            <span className="sk-dash-overall-num">{latest.overall}</span>
            <span className="sk-dash-overall-unit">/100</span>
          </div>
          <div className="sk-dash-grade-badge" data-grade={latest.grade}>
            {latest.grade}
          </div>
          <div className="sk-dash-percentile">
            {latest.percentileLabel} · {globalTotal} 位参与者中
          </div>
        </div>

        <div className="sk-dash-bars">
          <ScoreBar label="D" value={s.D ?? 0} color="var(--color-d)" />
          <ScoreBar label="A" value={s.A ?? 0} color="var(--color-a)" />
          <ScoreBar label="M" value={s.M ?? 0} color="var(--color-m)" />
          <ScoreBar label="C" value={s.C ?? 0} color="var(--color-c)" />
        </div>
      </div>

      {/* History sidebar */}
      <div className="sk-dash-sidebar">
        <div
          className="sk-display"
          style={{ fontSize: 14, marginBottom: 16, letterSpacing: 2 }}
        >
          SCAN HISTORY ({history.length})
        </div>
        {history.map((h) => (
          <a href={`/r/${h.slug}`} className="sk-dash-history-item" key={h.slug}>
            <div className="sk-dash-history-top">
              <span className="sk-dash-history-score">{h.overall}</span>
              <span className="sk-dash-history-grade">{h.grade}</span>
            </div>
            <div className="sk-dash-history-meta">
              {h.archetypeEmoji} {h.archetype} ·{" "}
              {new Date(h.createdAt).toLocaleDateString()}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
