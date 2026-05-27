"use client";

import { useState } from "react";

const features = [
  {
    id: "breakdown",
    icon: "📊",
    title: "22 子维度深度拆解",
    summary: "精准定位强项和短板",
    desc: "不只是一个总分。每个维度下 5-6 个子项精准评估，帮你找到最值得提升的短板和最该放大的长板。",
    tag: "Insight",
    tagColor: "var(--color-d)",
    preview: "breakdown",
  },
  {
    id: "distill",
    icon: "🧬",
    title: "可蒸馏清单",
    summary: "哪些工作流能变成 AI 替你干",
    desc: "自动识别你最高频、最有价值的工作流，告诉你哪些可以蒸馏为 AI Skill 来放大你的影响力。",
    tag: "Distill",
    tagColor: "var(--color-m)",
    preview: "distill",
  },
  {
    id: "moat",
    icon: "🛡️",
    title: "护城河识别",
    summary: "哪些能力 AI 拿不走",
    desc: "找出你最难被 AI 替代的核心能力。跨领域整合、社区信任、模糊决策 — 你的不可蒸馏优势。",
    tag: "Moat",
    tagColor: "var(--color-a)",
    preview: "moat",
  },
  {
    id: "track",
    icon: "📈",
    title: "进度追踪",
    summary: "每次复测看到成长曲线",
    desc: "本地追踪你的 DAMC 分数变化。每次复测都看到进步曲线，让成长可量化、可感知。",
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "track",
  },
  {
    id: "recommend",
    icon: "🎯",
    title: "智能 Skill 推荐",
    summary: "AI 教练帮你补短板",
    desc: "基于你的维度短板和职业画像，AI Coach 推荐最适合你的技能学习路径和 Skill 工具。",
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "recommend",
  },
  {
    id: "team",
    icon: "🏆",
    title: "团队排行榜",
    summary: "看看谁是团队里的 AI 高手",
    desc: "找到你身边与 Agent 协作最强的人！团队内 DAMC 排名、Skill 互相分享、季度团队报告。",
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "team",
  },
] as const;

function BreakdownPreview(): React.ReactNode {
  const subs = [
    { name: "Expertise", val: 82 },
    { name: "Methodology", val: 65 },
    { name: "Codifiability", val: 88 },
    { name: "Standardization", val: 72 },
    { name: "Demand", val: 83 },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-d">
        <span>D · Distillation Value</span>
        <span className="sk-bp-card-score">78/100</span>
      </div>
      <div className="sk-bp-card-body">
        {subs.map((s) => (
          <div className="sk-bp-bar-row" key={s.name}>
            <span className="sk-bp-bar-label">{s.name}</span>
            <div className="sk-bp-bar-track">
              <div
                className="sk-bp-bar-fill"
                style={{ width: `${s.val}%`, background: "var(--color-d)" }}
              />
            </div>
            <span className="sk-bp-bar-val">{s.val}</span>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">💡</span>
          Codifiability 是你的最强子项 — 你的工作流高度结构化，非常适合蒸馏。
        </div>
      </div>
    </div>
  );
}

function DistillPreview(): React.ReactNode {
  const items = [
    { name: "SEO 内容工作流", from: "article-rewriter → programmatic-seo → backlink", priority: "High" },
    { name: "代码审查方法论", from: "review checklist → PR template → auto-check", priority: "High" },
    { name: "数据分析流程", from: "data-pull → clean → visualize → report", priority: "Medium" },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-m">
        <span>可蒸馏清单</span>
        <span className="sk-bp-card-score">3 items</span>
      </div>
      <div className="sk-bp-card-body">
        {items.map((item, i) => (
          <div className="sk-bp-distill-item" key={i}>
            <div className="sk-bp-distill-header">
              <span className="sk-bp-distill-name">{item.name}</span>
              <span
                className="sk-bp-distill-priority"
                style={{
                  color: item.priority === "High" ? "var(--color-a)" : "var(--color-c)",
                }}
              >
                {item.priority}
              </span>
            </div>
            <div className="sk-bp-distill-flow">{item.from}</div>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🧬</span>
          这些工作流蒸馏为 Skill 后，预计每周可节省 6-8 小时。
        </div>
      </div>
    </div>
  );
}

function MoatPreview(): React.ReactNode {
  const moats = [
    { name: "跨领域整合", val: 78, desc: "技术+内容+营销三栖能力" },
    { name: "社区信任", val: 72, desc: "行业人脉和信誉资产" },
    { name: "模糊决策", val: 68, desc: "不确定性下的判断力" },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-a">
        <span>护城河分析</span>
        <span className="sk-bp-card-score">A · Anti-Distillation</span>
      </div>
      <div className="sk-bp-card-body">
        {moats.map((m) => (
          <div className="sk-bp-moat-item" key={m.name}>
            <div className="sk-bp-moat-top">
              <span className="sk-bp-moat-name">🛡️ {m.name}</span>
              <span className="sk-bp-moat-val" style={{ color: "var(--color-a)" }}>{m.val}</span>
            </div>
            <div className="sk-bp-moat-desc">{m.desc}</div>
            <div className="sk-bp-bar-track">
              <div
                className="sk-bp-bar-fill"
                style={{ width: `${m.val}%`, background: "var(--color-a)" }}
              />
            </div>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🛡️</span>
          你的跨领域整合能力是最强护城河 — AI 难以复制跨域经验积累。
        </div>
      </div>
    </div>
  );
}

function TrackPreview(): React.ReactNode {
  const history = [
    { date: "Mar 12", d: 65, a: 58, m: 72, c: 55 },
    { date: "Apr 02", d: 70, a: 60, m: 78, c: 60 },
    { date: "Apr 25", d: 74, a: 62, m: 82, c: 63 },
    { date: "May 15", d: 78, a: 65, m: 85, c: 72 },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-c">
        <span>分数趋势</span>
        <span className="sk-bp-card-score">+18 pts / 3mo</span>
      </div>
      <div className="sk-bp-card-body">
        <div className="sk-bp-timeline">
          {history.map((h, i) => (
            <div className="sk-bp-timeline-row" key={i}>
              <span className="sk-bp-timeline-date">{h.date}</span>
              <div className="sk-bp-timeline-scores">
                <span style={{ color: "var(--color-d)" }}>D:{h.d}</span>
                <span style={{ color: "var(--color-a)" }}>A:{h.a}</span>
                <span style={{ color: "var(--color-m)" }}>M:{h.m}</span>
                <span style={{ color: "var(--color-c)" }}>C:{h.c}</span>
              </div>
              <span className="sk-bp-timeline-total">
                {Math.round(h.d * 0.25 + h.a * 0.3 + h.m * 0.25 + h.c * 0.2)}
              </span>
            </div>
          ))}
        </div>
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">📈</span>
          M 维度增长最快（+13），AI 驾驭力显著提升。
        </div>
      </div>
    </div>
  );
}

function RecommendPreview(): React.ReactNode {
  const recs = [
    { skill: "prompt-engineer", reason: "补强 M·Advanced 子维度", match: 94 },
    { skill: "code-reviewer", reason: "提升 D·Methodology 蒸馏价值", match: 88 },
    { skill: "cross-domain-thinker", reason: "强化 A·CrossDomain 护城河", match: 82 },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-c">
        <span>Skill 推荐</span>
        <span className="sk-bp-card-score">AI Coach</span>
      </div>
      <div className="sk-bp-card-body">
        {recs.map((r, i) => (
          <div className="sk-bp-rec-item" key={i}>
            <div className="sk-bp-rec-top">
              <span className="sk-bp-rec-skill">⚡ {r.skill}</span>
              <span className="sk-bp-rec-match">{r.match}% match</span>
            </div>
            <div className="sk-bp-rec-reason">{r.reason}</div>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🎯</span>
          基于你的 M·Advanced 短板，优先推荐 prompt-engineer skill。
        </div>
      </div>
    </div>
  );
}

function TeamPreview(): React.ReactNode {
  const members = [
    { rank: 1, name: "Alex W.", score: 82, archetype: "AI 架构师" },
    { rank: 2, name: "你", score: 75, archetype: "AI 架构师", isYou: true },
    { rank: 3, name: "Sarah L.", score: 71, archetype: "跨界整合者" },
    { rank: 4, name: "Kevin Z.", score: 68, archetype: "效率工匠" },
  ];
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <span>Team Leaderboard</span>
        <span className="sk-bp-card-score" style={{ color: "var(--paper)", opacity: 0.6 }}>10 members</span>
      </div>
      <div className="sk-bp-card-body">
        {members.map((m) => (
          <div
            className={`sk-bp-team-row${m.isYou ? " sk-bp-team-you" : ""}`}
            key={m.rank}
          >
            <span className="sk-bp-team-rank">#{m.rank}</span>
            <span className="sk-bp-team-name">{m.name}</span>
            <span className="sk-bp-team-arch">{m.archetype}</span>
            <span className="sk-bp-team-score">{m.score}</span>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🏆</span>
          你距离团队 #1 只差 7 分 — 重点提升 A 维度可超越！
        </div>
      </div>
    </div>
  );
}

const previews: Record<string, () => React.ReactNode> = {
  breakdown: BreakdownPreview,
  distill: DistillPreview,
  moat: MoatPreview,
  track: TrackPreview,
  recommend: RecommendPreview,
  team: TeamPreview,
};

export function Benefits(): React.ReactNode {
  const [active, setActive] = useState("breakdown");

  const Preview = previews[active];

  return (
    <section id="benefits" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">04</span>
          Why DAMC
        </div>

        <p className="sk-section-intro">
          别人只给你一个模糊的"AI 能力分"。DAMC 拆到 22 个子维度，告诉你<strong>哪些工作流该交给 AI、哪些能力是你的护城河、下一步该练什么</strong>。一次扫描，看清自己在 AI 时代的真实位置。
        </p>

        <div className="sk-benefits-layout">
          <div className="sk-benefits-tabs">
            {features.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`sk-benefits-tab${active === f.id ? " sk-benefits-tab-active" : ""}`}
                onClick={() => setActive(f.id)}
              >
                <div className="sk-benefits-tab-header">
                  <span className="sk-benefits-tab-icon">{f.icon}</span>
                  <div className="sk-benefits-tab-text">
                    <span className="sk-benefits-tab-title">{f.title}</span>
                    <span className="sk-benefits-tab-summary">{f.summary}</span>
                  </div>
                  {f.tag.includes("V2") && (
                    <span
                      className="sk-benefits-tab-tag"
                      style={{ borderColor: f.tagColor, color: f.tagColor }}
                    >
                      New
                    </span>
                  )}
                </div>
                {active === f.id && (
                  <div className="sk-benefits-tab-body">
                    <p className="sk-benefits-tab-desc">{f.desc}</p>
                    <span
                      className="sk-feature-tag"
                      style={{ borderColor: f.tagColor, color: f.tagColor }}
                    >
                      {f.tag}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="sk-benefits-preview">
            {Preview ? <Preview /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
