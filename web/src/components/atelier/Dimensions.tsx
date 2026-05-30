"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const dimensions = [
  {
    letter: "D",
    name: "Distillation Value",
    title: { zh: "蒸馏价值", en: "Distillation Value" },
    copy: {
      zh: "你的经验、判断和流程，值得被蒸馏成 AI Skill 吗？",
      en: "Are your experience, judgment, and processes worth distilling into an AI Skill?",
    },
    source: {
      zh: "70% 自动扫描 · 30% 角色推断",
      en: "70% auto-scan · 30% role inference",
    },
    weight: { zh: "× 0.25", en: "× 0.25" },
    subs: {
      zh: ["知识可编码性", "方法论独特性", "领域专精度", "输出标准化度", "市场需求度"],
      en: [
        "Knowledge codifiability",
        "Methodology uniqueness",
        "Domain depth",
        "Output standardization",
        "Market demand",
      ],
    },
  },
  {
    letter: "A",
    name: "Anti-Distillation",
    title: { zh: "抗蒸馏指数", en: "Anti-Distillation Index" },
    copy: {
      zh: "AI 拿不走的能力有哪些？哪些护城河仍然站得住？",
      en: "Which abilities can AI never take? Which moats still hold?",
    },
    source: {
      zh: "40% 自动扫描 · 60% 角色推断",
      en: "40% auto-scan · 60% role inference",
    },
    weight: { zh: "× 0.30 · 权重最高", en: "× 0.30 · highest weight" },
    subs: {
      zh: ["创造力", "情商 / 影响力", "跨域综合力", "模糊决策力", "身体在场", "信任资产"],
      en: [
        "Creativity",
        "EQ / influence",
        "Cross-domain synthesis",
        "Decisions under ambiguity",
        "Physical presence",
        "Trust capital",
      ],
    },
  },
  {
    letter: "M",
    name: "AI Mastery",
    title: { zh: "AI 驾驭能力", en: "AI Mastery" },
    copy: {
      zh: "你使用 Agent、Prompt、Skill 和自动化工具的真实水平。",
      en: "Your real fluency with Agents, prompts, Skills, and automation tools.",
    },
    source: {
      zh: "100% 自动扫描 · 客观量化",
      en: "100% auto-scan · objectively quantified",
    },
    weight: { zh: "× 0.25", en: "× 0.25" },
    subs: {
      zh: ["环境配置深度", "Skill 生态", "自动化与集成", "记忆系统", "高级功能使用"],
      en: [
        "Environment depth",
        "Skill ecosystem",
        "Automation & integration",
        "Memory systems",
        "Advanced feature usage",
      ],
    },
  },
  {
    letter: "C",
    name: "Career Compass",
    title: { zh: "职业适配", en: "Career Compass" },
    copy: {
      zh: "你应该往哪个方向走，怎样把优势放到更高杠杆的位置。",
      en: "Which direction to take, and how to place your strengths where they get the most leverage.",
    },
    source: { zh: "f(D, A, M) + MBTI 调整", en: "f(D, A, M) + MBTI adjustment" },
    weight: { zh: "× 0.20", en: "× 0.20" },
    subs: {
      zh: ["基础适配分", "推荐路径", "等级评定 (S–F)"],
      en: ["Base fit score", "Recommended path", "Grade (S–F)"],
    },
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "I · DAMC FRAMEWORK",
    title: "4 个维度，22 个子项，看清你的全貌。",
    sub: "整体评分 = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20。A 维度权重最高，因为不可替代性是 AI 时代最核心的价值。",
  },
  en: {
    eyebrow: "I · DAMC FRAMEWORK",
    title: "4 dimensions, 22 sub-items, your full picture.",
    sub: "Overall = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20. A carries the highest weight, because irreplaceability is the most essential value in the AI era.",
  },
};

export function Dimensions(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="framework">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>
        <p className="atelier-section-sub">{c.sub}</p>

        <div className="atelier-dim-grid">
          {dimensions.map((dimension) => (
            <article className="atelier-dim-item" key={dimension.letter}>
              <div className="atelier-display atelier-dim-letter">
                {dimension.letter}
              </div>
              <p className="atelier-dim-name">{dimension.name}</p>
              <h3 className="atelier-dim-title">{dimension.title[locale]}</h3>
              <p className="atelier-dim-copy">{dimension.copy[locale]}</p>

              <ul className="atelier-dim-subs">
                {dimension.subs[locale].map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </ul>

              <div className="atelier-dim-meta">
                <span className="atelier-dim-source">{dimension.source[locale]}</span>
                <span className="atelier-dim-weight">{dimension.weight[locale]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
