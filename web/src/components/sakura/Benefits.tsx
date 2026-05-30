"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/config";

const features = [
  {
    id: "breakdown",
    icon: "📊",
    title: { zh: "22 子维度深度拆解", en: "22 Sub-Dimension Breakdown" },
    summary: { zh: "精准定位强项和短板", en: "Pinpoint your strengths and gaps" },
    desc: {
      zh: "不只是一个总分。每个维度下 5-6 个子项精准评估，帮你找到最值得提升的短板和最该放大的长板。",
      en: "Not just one score. Each dimension is scored across 5-6 sub-items, helping you find the gap worth closing and the strength worth amplifying.",
    },
    tag: "Insight",
    tagColor: "var(--color-d)",
    preview: "breakdown",
  },
  {
    id: "distill",
    icon: "🧬",
    title: { zh: "可蒸馏清单", en: "Distillation Checklist" },
    summary: {
      zh: "哪些工作流能变成 AI 替你干",
      en: "Which workflows AI can run for you",
    },
    desc: {
      zh: "自动识别你最高频、最有价值的工作流，告诉你哪些可以蒸馏为 AI Skill 来放大你的影响力。",
      en: "Automatically spots your most frequent, most valuable workflows and tells you which to distill into AI Skills to amplify your impact.",
    },
    tag: "Distill",
    tagColor: "var(--color-m)",
    preview: "distill",
  },
  {
    id: "moat",
    icon: "🛡️",
    title: { zh: "护城河识别", en: "Moat Detection" },
    summary: { zh: "哪些能力 AI 拿不走", en: "Which abilities AI can't take" },
    desc: {
      zh: "找出你最难被 AI 替代的核心能力。跨领域整合、社区信任、模糊决策 — 你的不可蒸馏优势。",
      en: "Surfaces the core abilities AI can least replace — cross-domain integration, community trust, judgment under ambiguity: your non-distillable edge.",
    },
    tag: "Moat",
    tagColor: "var(--color-a)",
    preview: "moat",
  },
  {
    id: "track",
    icon: "📈",
    title: { zh: "进度追踪", en: "Progress Tracking" },
    summary: { zh: "每次复测看到成长曲线", en: "See your growth curve each rescan" },
    desc: {
      zh: "本地追踪你的 DAMC 分数变化。每次复测都看到进步曲线，让成长可量化、可感知。",
      en: "Track your DAMC scores locally. Every rescan shows your progress curve, making growth measurable and tangible.",
    },
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "track",
  },
  {
    id: "recommend",
    icon: "🎯",
    title: { zh: "智能 Skill 推荐", en: "Smart Skill Recommendations" },
    summary: { zh: "AI 教练帮你补短板", en: "An AI coach to close your gaps" },
    desc: {
      zh: "基于你的维度短板和职业画像，AI Coach 推荐最适合你的技能学习路径和 Skill 工具。",
      en: "Based on your weak dimensions and career archetype, the AI Coach recommends the learning path and Skill tools that fit you best.",
    },
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "recommend",
  },
  {
    id: "team",
    icon: "🏆",
    title: { zh: "团队排行榜", en: "Team Leaderboard" },
    summary: {
      zh: "看看谁是团队里的 AI 高手",
      en: "See who's the AI pro on your team",
    },
    desc: {
      zh: "找到你身边与 Agent 协作最强的人！团队内 DAMC 排名、Skill 互相分享、季度团队报告。",
      en: "Find the strongest Agent collaborators around you! In-team DAMC rankings, shared Skills, and quarterly team reports.",
    },
    tag: "V2 · New",
    tagColor: "var(--color-c)",
    preview: "team",
  },
] as const;

function BreakdownPreview({ locale }: { locale: Locale }): React.ReactNode {
  const subs = [
    { name: "Expertise", val: 82 },
    { name: "Methodology", val: 65 },
    { name: "Codifiability", val: 88 },
    { name: "Standardization", val: 72 },
    { name: "Demand", val: 83 },
  ];
  const insight = {
    zh: "Codifiability 是你的最强子项 — 你的工作流高度结构化，非常适合蒸馏。",
    en: "Codifiability is your strongest sub-item — your workflows are highly structured and ideal for distilling.",
  };
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
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

function DistillPreview({ locale }: { locale: Locale }): React.ReactNode {
  const items = [
    {
      name: { zh: "SEO 内容工作流", en: "SEO content workflow" },
      from: "article-rewriter → programmatic-seo → backlink",
      priority: "High",
    },
    {
      name: { zh: "代码审查方法论", en: "Code review methodology" },
      from: "review checklist → PR template → auto-check",
      priority: "High",
    },
    {
      name: { zh: "数据分析流程", en: "Data analysis pipeline" },
      from: "data-pull → clean → visualize → report",
      priority: "Medium",
    },
  ];
  const head = { zh: "可蒸馏清单", en: "Distillation Checklist" };
  const insight = {
    zh: "这些工作流蒸馏为 Skill 后，预计每周可节省 6-8 小时。",
    en: "Distilled into Skills, these workflows could save an estimated 6-8 hours per week.",
  };
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-m">
        <span>{head[locale]}</span>
        <span className="sk-bp-card-score">3 items</span>
      </div>
      <div className="sk-bp-card-body">
        {items.map((item, i) => (
          <div className="sk-bp-distill-item" key={i}>
            <div className="sk-bp-distill-header">
              <span className="sk-bp-distill-name">{item.name[locale]}</span>
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
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

function MoatPreview({ locale }: { locale: Locale }): React.ReactNode {
  const moats = [
    {
      name: { zh: "跨领域整合", en: "Cross-domain integration" },
      val: 78,
      desc: { zh: "技术+内容+营销三栖能力", en: "Tech + content + marketing in one" },
    },
    {
      name: { zh: "社区信任", en: "Community trust" },
      val: 72,
      desc: { zh: "行业人脉和信誉资产", en: "Industry network and reputation capital" },
    },
    {
      name: { zh: "模糊决策", en: "Ambiguous decisions" },
      val: 68,
      desc: { zh: "不确定性下的判断力", en: "Judgment under uncertainty" },
    },
  ];
  const head = { zh: "护城河分析", en: "Moat Analysis" };
  const insight = {
    zh: "你的跨领域整合能力是最强护城河 — AI 难以复制跨域经验积累。",
    en: "Cross-domain integration is your strongest moat — AI struggles to replicate accumulated cross-field experience.",
  };
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-a">
        <span>{head[locale]}</span>
        <span className="sk-bp-card-score">A · Anti-Distillation</span>
      </div>
      <div className="sk-bp-card-body">
        {moats.map((m) => (
          <div className="sk-bp-moat-item" key={m.name.en}>
            <div className="sk-bp-moat-top">
              <span className="sk-bp-moat-name">🛡️ {m.name[locale]}</span>
              <span className="sk-bp-moat-val" style={{ color: "var(--color-a)" }}>{m.val}</span>
            </div>
            <div className="sk-bp-moat-desc">{m.desc[locale]}</div>
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
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

function TrackPreview({ locale }: { locale: Locale }): React.ReactNode {
  const history = [
    { date: "Mar 12", d: 65, a: 58, m: 72, c: 55 },
    { date: "Apr 02", d: 70, a: 60, m: 78, c: 60 },
    { date: "Apr 25", d: 74, a: 62, m: 82, c: 63 },
    { date: "May 15", d: 78, a: 65, m: 85, c: 72 },
  ];
  const head = { zh: "分数趋势", en: "Score Trend" };
  const insight = {
    zh: "M 维度增长最快（+13），AI 驾驭力显著提升。",
    en: "M grew the fastest (+13) — a clear jump in AI mastery.",
  };
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-c">
        <span>{head[locale]}</span>
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
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

function RecommendPreview({ locale }: { locale: Locale }): React.ReactNode {
  const recs = [
    {
      skill: "prompt-engineer",
      reason: { zh: "补强 M·Advanced 子维度", en: "Strengthens the M·Advanced sub-dimension" },
      match: 94,
    },
    {
      skill: "code-reviewer",
      reason: { zh: "提升 D·Methodology 蒸馏价值", en: "Raises D·Methodology distillation value" },
      match: 88,
    },
    {
      skill: "cross-domain-thinker",
      reason: { zh: "强化 A·CrossDomain 护城河", en: "Reinforces the A·CrossDomain moat" },
      match: 82,
    },
  ];
  const head = { zh: "Skill 推荐", en: "Skill Recommendations" };
  const insight = {
    zh: "基于你的 M·Advanced 短板，优先推荐 prompt-engineer skill。",
    en: "Given your M·Advanced gap, prompt-engineer is the top pick.",
  };
  return (
    <div className="sk-bp-card">
      <div className="sk-bp-card-head sk-bg-c">
        <span>{head[locale]}</span>
        <span className="sk-bp-card-score">AI Coach</span>
      </div>
      <div className="sk-bp-card-body">
        {recs.map((r, i) => (
          <div className="sk-bp-rec-item" key={i}>
            <div className="sk-bp-rec-top">
              <span className="sk-bp-rec-skill">⚡ {r.skill}</span>
              <span className="sk-bp-rec-match">{r.match}% match</span>
            </div>
            <div className="sk-bp-rec-reason">{r.reason[locale]}</div>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🎯</span>
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

function TeamPreview({ locale }: { locale: Locale }): React.ReactNode {
  const members = [
    { rank: 1, name: { zh: "Alex W.", en: "Alex W." }, score: 82, archetype: { zh: "AI 架构师", en: "AI Architect" } },
    { rank: 2, name: { zh: "你", en: "You" }, score: 75, archetype: { zh: "AI 架构师", en: "AI Architect" }, isYou: true },
    { rank: 3, name: { zh: "Sarah L.", en: "Sarah L." }, score: 71, archetype: { zh: "跨界整合者", en: "Cross-Domain Integrator" } },
    { rank: 4, name: { zh: "Kevin Z.", en: "Kevin Z." }, score: 68, archetype: { zh: "效率工匠", en: "Efficiency Craftsman" } },
  ];
  const insight = {
    zh: "你距离团队 #1 只差 7 分 — 重点提升 A 维度可超越！",
    en: "You're just 7 points from team #1 — focus on A to overtake!",
  };
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
            <span className="sk-bp-team-name">{m.name[locale]}</span>
            <span className="sk-bp-team-arch">{m.archetype[locale]}</span>
            <span className="sk-bp-team-score">{m.score}</span>
          </div>
        ))}
        <div className="sk-bp-insight">
          <span className="sk-bp-insight-icon">🏆</span>
          {insight[locale]}
        </div>
      </div>
    </div>
  );
}

const previews: Record<string, (props: { locale: Locale }) => React.ReactNode> = {
  breakdown: BreakdownPreview,
  distill: DistillPreview,
  moat: MoatPreview,
  track: TrackPreview,
  recommend: RecommendPreview,
  team: TeamPreview,
};

const COPY = {
  zh: {
    intro: (
      <>
        别人只给你一个模糊的&quot;AI 能力分&quot;。DAMC 拆到 22 个子维度，告诉你
        <strong>哪些工作流该交给 AI、哪些能力是你的护城河、下一步该练什么</strong>。一次扫描，看清自己在 AI 时代的真实位置。
      </>
    ),
  },
  en: {
    intro: (
      <>
        Others give you a vague &quot;AI score.&quot; DAMC breaks it into 22 sub-dimensions and tells you{" "}
        <strong>which workflows to hand to AI, which abilities are your moat, and what to practice next</strong>. One scan to see exactly where you stand in the AI era.
      </>
    ),
  },
};

export function Benefits(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [active, setActive] = useState("breakdown");

  const Preview = previews[active];

  return (
    <section id="benefits" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">04</span>
          Why DAMC
        </div>

        <p className="sk-section-intro">{c.intro}</p>

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
                    <span className="sk-benefits-tab-title">{f.title[locale]}</span>
                    <span className="sk-benefits-tab-summary">{f.summary[locale]}</span>
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
                    <p className="sk-benefits-tab-desc">{f.desc[locale]}</p>
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
            {Preview ? <Preview locale={locale} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
