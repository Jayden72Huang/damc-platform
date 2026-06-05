const tiers = [
  {
    name: "FREE 体验",
    price: "$0",
    unit: "",
    features: ["终端 4 维总分", "画像名", "Top 1 风险提示", "本地扫描提示"],
    cta: "免费开始",
    featured: false,
  },
  {
    name: "INSIGHT 完整报告",
    price: "$9.99",
    unit: "一次性",
    features: [
      "Free 全部内容",
      "22 子维度拆解",
      "可蒸馏清单",
      "护城河识别",
      "90 天行动建议",
    ],
    cta: "解锁报告",
    featured: false,
  },
  {
    name: "COACH 持续陪伴",
    price: "$29",
    unit: "/月",
    features: [
      "Insight 全部内容",
      "AI Coach 个性化计划",
      "每周复盘",
      "月度复测追踪",
      "持续上下文对话",
    ],
    cta: "开始订阅",
    featured: true,
  },
  {
    name: "TEAM 团队版",
    price: "$99",
    unit: "/月",
    features: [
      "Coach 全部内容",
      "团队仪表板（10 人）",
      "季度团队报告",
      "角色结构分析",
      "管理者行动建议",
    ],
    cta: "联系我们",
    featured: false,
  },
] as const;

export function Pricing(): React.ReactNode {
  return (
    <section className="atelier-section" id="pricing">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">V · 选择你的路径</p>
        <h2 className="atelier-display atelier-section-title">
          从一次体检，到持续陪伴。
        </h2>

        <div className="atelier-pricing-grid">
          {tiers.map((tier) => (
            <article
              className={
                tier.featured
                  ? "atelier-price-card atelier-price-card-featured"
                  : "atelier-price-card"
              }
              key={tier.name}
            >
              {tier.featured ? (
                <span className="atelier-price-badge">推荐</span>
              ) : null}
              <h3 className="atelier-price-tier">{tier.name}</h3>
              <div className="atelier-price-amount">
                <span className="atelier-numbers">{tier.price}</span>
                {tier.unit ? (
                  <span className="atelier-price-unit">{tier.unit}</span>
                ) : null}
              </div>
              <ul className="atelier-price-features">
                {tier.features.map((feature) => (
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
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
