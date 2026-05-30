"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const scores = [
  { letter: "D", title: { zh: "蒸馏价值", en: "Distillation" }, value: 78 },
  { letter: "A", title: { zh: "抗蒸馏", en: "Anti-Distill" }, value: 62 },
  { letter: "M", title: { zh: "AI 驾驭", en: "AI Mastery" }, value: 85 },
  { letter: "C", title: { zh: "职业适配", en: "Career" }, value: 65 },
] as const;

const insights = [
  {
    kind: { zh: "护城河", en: "Moat" },
    body: {
      zh: "跨域综合力 + 信任资产 — 你的判断难以被蒸馏。",
      en: "Cross-domain synthesis + trust capital — your judgment resists distillation.",
    },
  },
  {
    kind: { zh: "可蒸馏", en: "Distillable" },
    body: {
      zh: "SEO 工作流 / 内容审稿规则 — 立刻沉淀为自建 Skill。",
      en: "SEO workflow / content review rules — bottle them into your own Skills now.",
    },
  },
  {
    kind: { zh: "Top 风险", en: "Top Risk" },
    body: {
      zh: "情商权重略低，建议在协作型项目中刻意练习。",
      en: "EQ scores slightly low — practice deliberately on collaborative projects.",
    },
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "示例报告 · SAMPLE",
    title: "报告长这样 — 一份你愿意分享的画像。",
    sub: "以下是「AI 架构师」画像的部分截图。Free 版只显示 4 维总分与画像；Insight 版解锁全部 22 子维度、可蒸馏清单与 90 天行动路径。",
    coverAlt: "DAMC 报告示例封面",
    archetype: "🏆 AI 架构师",
    grade: "等级 A · 高价值 AI 协作者",
    unlock: "解锁完整报告",
    seeHow: "看一下是怎么生成的",
  },
  en: {
    eyebrow: "SAMPLE REPORT",
    title: "Here's what a report looks like — a profile you'd want to share.",
    sub: 'Below is part of the "AI Architect" profile. The Free tier shows only the 4 dimension scores and archetype; the Insight tier unlocks all 22 sub-dimensions, the distillation checklist, and a 90-day action path.',
    coverAlt: "DAMC sample report cover",
    archetype: "🏆 AI Architect",
    grade: "Grade A · High-Value AI Collaborator",
    unlock: "Unlock the full report",
    seeHow: "See how it's generated",
  },
};

export function SampleReport(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section atelier-sample" id="sample">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>
        <p className="atelier-section-sub">{c.sub}</p>

        <div className="atelier-sample-grid">
          <div className="atelier-sample-cover">
            <Image
              src="/atelier/hero-agent.png"
              alt={c.coverAlt}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>

          <div className="atelier-sample-body">
            <div className="atelier-sample-meta">
              <span className="atelier-sample-archetype">{c.archetype}</span>
              <span className="atelier-sample-grade">{c.grade}</span>
            </div>

            <ul className="atelier-sample-bars">
              {scores.map((score) => (
                <li className="atelier-sample-bar" key={score.letter}>
                  <span className="atelier-sample-bar-letter">{score.letter}</span>
                  <span className="atelier-sample-bar-title">{score.title[locale]}</span>
                  <span className="atelier-sample-bar-track">
                    <span
                      className="atelier-sample-bar-fill"
                      style={{ width: `${score.value}%` }}
                    />
                  </span>
                  <span className="atelier-numbers atelier-sample-bar-value">
                    {score.value}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="atelier-sample-insights">
              {insights.map((insight) => (
                <li key={insight.kind.en}>
                  <span className="atelier-sample-insight-kind">{insight.kind[locale]}</span>
                  <span className="atelier-sample-insight-body">{insight.body[locale]}</span>
                </li>
              ))}
            </ul>

            <div className="atelier-sample-actions">
              <a className="atelier-button atelier-button-primary" href="#pricing">
                {c.unlock}
              </a>
              <a className="atelier-text-link" href="#process">
                {c.seeHow}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
