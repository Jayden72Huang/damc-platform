"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const tiers = [
  {
    name: { zh: "FREE 体验", en: "FREE" },
    price: "$0",
    unit: { zh: "", en: "" },
    features: {
      zh: ["终端 4 维总分", "画像名", "Top 1 风险提示", "本地进度追踪"],
      en: ["4 dimension scores in terminal", "Archetype name", "Top 1 risk alert", "Local progress tracking"],
    },
    cta: { zh: "免费开始", en: "Start free" },
    featured: false,
  },
  {
    name: { zh: "INSIGHT 完整报告", en: "INSIGHT" },
    price: "$9.99",
    unit: { zh: "一次性", en: "one-time" },
    features: {
      zh: ["Free 全部内容", "22 子维度拆解", "可蒸馏清单", "护城河识别", "90 天行动建议"],
      en: [
        "Everything in Free",
        "22 sub-dimension breakdown",
        "Distillation checklist",
        "Moat detection",
        "90-day action plan",
      ],
    },
    cta: { zh: "解锁报告", en: "Unlock report" },
    featured: false,
  },
  {
    name: { zh: "COACH 持续陪伴", en: "COACH" },
    price: "$29",
    unit: { zh: "/月", en: "/mo" },
    features: {
      zh: [
        "Insight 全部内容",
        "AI Coach 个性化计划",
        "智能 Skill 推荐",
        "每周复盘 + 月度复测",
        "持续上下文对话",
      ],
      en: [
        "Everything in Insight",
        "Personalized AI Coach plan",
        "Smart Skill recommendations",
        "Weekly review + monthly rescan",
        "Continuous, context-aware chat",
      ],
    },
    cta: { zh: "开始订阅", en: "Subscribe" },
    featured: true,
  },
  {
    name: { zh: "TEAM 团队版", en: "TEAM" },
    price: "$99",
    unit: { zh: "/月", en: "/mo" },
    features: {
      zh: [
        "Coach 全部内容",
        "团队排行榜（10 人）",
        "成员 Skill 互相分享",
        "季度团队报告",
        "管理者行动建议",
      ],
      en: [
        "Everything in Coach",
        "Team leaderboard (10 seats)",
        "Members share Skills",
        "Quarterly team report",
        "Manager action insights",
      ],
    },
    cta: { zh: "联系我们", en: "Contact us" },
    featured: false,
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "IV · 选择你的路径",
    title: "从一次体检，到持续陪伴。",
    badge: "推荐",
  },
  en: {
    eyebrow: "IV · CHOOSE YOUR PATH",
    title: "From a one-time checkup to a lasting companion.",
    badge: "Popular",
  },
};

export function Pricing(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="pricing">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>

        <div className="atelier-pricing-grid">
          {tiers.map((tier) => (
            <article
              className={
                tier.featured
                  ? "atelier-price-card atelier-price-card-featured"
                  : "atelier-price-card"
              }
              key={tier.name.en}
            >
              {tier.featured ? (
                <span className="atelier-price-badge">{c.badge}</span>
              ) : null}
              <h3 className="atelier-price-tier">{tier.name[locale]}</h3>
              <div className="atelier-price-amount">
                <span className="atelier-numbers">{tier.price}</span>
                {tier.unit[locale] ? (
                  <span className="atelier-price-unit">{tier.unit[locale]}</span>
                ) : null}
              </div>
              <ul className="atelier-price-features">
                {tier.features[locale].map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className={
                  tier.featured
                    ? "atelier-button atelier-button-primary"
                    : "atelier-button"
                }
                href={tier.featured ? "#coach" : "#process"}
              >
                {tier.cta[locale]}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
