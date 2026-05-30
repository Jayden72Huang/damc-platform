"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const features = [
  {
    num: "01",
    title: { zh: "进度追踪", en: "Progress Tracking" },
    subtitle: "Progress Tracking",
    desc: {
      zh: "每次扫描自动保存历史。看到 D/A/M/C 如何随时间变化，量化你的成长。",
      en: "Every scan saves history automatically. Watch D/A/M/C change over time and quantify your growth.",
    },
    detail: {
      zh: "本地存储 ~/.claude/damc-history/，隐私安全。",
      en: "Stored locally in ~/.claude/damc-history/ — private and safe.",
    },
  },
  {
    num: "02",
    title: { zh: "智能推荐", en: "Smart Recommendations" },
    subtitle: "Smart Recommendations",
    desc: {
      zh: "基于弱项维度，AI 自动推荐该学什么 Skill、该强化哪项能力。",
      en: "Based on your weak dimensions, AI recommends which Skills to learn and which abilities to strengthen.",
    },
    detail: {
      zh: "不是泛泛建议，而是针对你的分数量身定制。",
      en: "Not generic advice — tailored to your exact scores.",
    },
  },
  {
    num: "03",
    title: { zh: "团队排行榜", en: "Team Leaderboard" },
    subtitle: "Team Leaderboard",
    desc: {
      zh: "找到你身边与 Agent 协作最强的人！绑定公司群组，互相学习。",
      en: "Find the strongest Agent collaborators around you! Link your company group and learn from each other.",
    },
    detail: {
      zh: "分享 Skill、对比成长、建立 AI 协作文化。",
      en: "Share Skills, compare growth, and build an AI collaboration culture.",
    },
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "What's New in V2",
    titleA: "不只是测试，",
    titleB: "成长引擎",
    sub: "DAMC v2 从一次性评估进化为持续陪伴平台。追踪 → 推荐 → 比较 → 成长，形成正向飞轮。",
  },
  en: {
    eyebrow: "What's New in V2",
    titleA: "Not just a test —",
    titleB: "a growth engine",
    sub: "DAMC v2 evolves from a one-time assessment into a continuous companion platform. Track → recommend → compare → grow, a virtuous flywheel.",
  },
};

export function V2Features(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <div className="atelier-section atelier-sample">
      <div className="atelier-container">
        <span className="atelier-section-eyebrow">{c.eyebrow}</span>

        <h2 className="atelier-section-title">
          {c.titleA}
          <br />
          <span className="atelier-accent"> {c.titleB}</span>
        </h2>

        <p className="atelier-section-sub">{c.sub}</p>

        <div className="atelier-process-grid" style={{ gap: 28 }}>
          {features.map((f) => (
            <div key={f.num} className="atelier-process-card">
              <div className="atelier-process-number atelier-display">
                {f.num}
              </div>
              <h3 className="atelier-process-title atelier-display">
                {f.title[locale]}
              </h3>
              <p
                style={{
                  color: "var(--gold)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginBottom: 12,
                }}
              >
                {f.subtitle}
              </p>
              <p className="atelier-process-copy">{f.desc[locale]}</p>
              <p
                style={{
                  color: "var(--text-dim)",
                  fontSize: 12,
                  lineHeight: 1.6,
                  borderTop: "1px dashed var(--border)",
                  paddingTop: 12,
                  marginTop: 8,
                }}
              >
                {f.detail[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
