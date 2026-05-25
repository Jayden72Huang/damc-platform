const tiers = [
  {
    tier: "Free 体验",
    price: "$0",
    unit: "",
    features: ["终端 4 维总分", "画像名", "Top 1 风险提示", "进度追踪（本地）"],
    cta: "免费开始",
    featured: false,
  },
  {
    tier: "Insight 报告",
    price: "$9.99",
    unit: "一次性",
    features: [
      "Free 全部内容",
      "22 子维度详解",
      "可蒸馏清单",
      "护城河识别",
      "90 天行动建议",
    ],
    cta: "解锁报告",
    featured: false,
  },
  {
    tier: "Coach 陪伴",
    price: "$29",
    unit: "/月 ★ 推荐",
    features: [
      "Insight 全部内容",
      "AI Coach 个性化计划",
      "智能 Skill 推荐",
      "周复盘 + 月度复测",
    ],
    cta: "开始订阅",
    featured: true,
  },
  {
    tier: "Team 团队版",
    price: "$99",
    unit: "/月",
    features: [
      "Coach 全部内容",
      "团队排行榜（10 人）",
      "成员 Skill 共享",
      "季度团队报告",
    ],
    cta: "联系我们",
    featured: false,
  },
] as const;

export function Pricing(): React.ReactNode {
  return (
    <section id="pricing" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">05</span>
          Pricing
        </div>

        <div className="sk-pricing-grid">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className={`sk-price-card ${t.featured ? "sk-price-featured" : ""}`}
            >
              <div className="sk-price-tier">{t.tier}</div>
              <div>
                <span className="sk-price-amount">{t.price}</span>
                {t.unit ? (
                  <span className="sk-price-unit"> {t.unit}</span>
                ) : null}
              </div>
              <ul className="sk-price-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#get-started" className="sk-price-btn">
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
