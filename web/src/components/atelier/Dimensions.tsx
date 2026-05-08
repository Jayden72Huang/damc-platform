const dimensions = [
  {
    letter: "D",
    name: "Distillation Value",
    title: "蒸馏价值",
    copy: "你的经验、判断和流程，值得被蒸馏成 AI Skill 吗？",
    source: "70% 自动扫描 · 30% 角色推断",
    weight: "× 0.25",
    subs: [
      "知识可编码性",
      "方法论独特性",
      "领域专精度",
      "输出标准化度",
      "市场需求度",
    ],
  },
  {
    letter: "A",
    name: "Anti-Distillation",
    title: "抗蒸馏指数",
    copy: "AI 拿不走的能力有哪些？哪些护城河仍然站得住？",
    source: "40% 自动扫描 · 60% 角色推断",
    weight: "× 0.30 · 权重最高",
    subs: [
      "创造力",
      "情商 / 影响力",
      "跨域综合力",
      "模糊决策力",
      "身体在场",
      "信任资产",
    ],
  },
  {
    letter: "M",
    name: "AI Mastery",
    title: "AI 驾驭能力",
    copy: "你使用 Agent、Prompt、Skill 和自动化工具的真实水平。",
    source: "100% 自动扫描 · 客观量化",
    weight: "× 0.25",
    subs: [
      "环境配置深度",
      "Skill 生态",
      "自动化与集成",
      "记忆系统",
      "高级功能使用",
    ],
  },
  {
    letter: "C",
    name: "Career Compass",
    title: "职业适配",
    copy: "你应该往哪个方向走，怎样把优势放到更高杠杆的位置。",
    source: "f(D, A, M) + MBTI 调整",
    weight: "× 0.20",
    subs: [
      "基础适配分",
      "推荐路径",
      "等级评定 (S–F)",
    ],
  },
] as const;

export function Dimensions(): React.ReactNode {
  return (
    <section className="atelier-section" id="framework">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">I · DAMC FRAMEWORK</p>
        <h2 className="atelier-display atelier-section-title">
          4 个维度，22 个子项，看清你的全貌。
        </h2>
        <p className="atelier-section-sub">
          整体评分 = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20。A 维度权重最高，因为不可替代性是 AI 时代最核心的价值。
        </p>

        <div className="atelier-dim-grid">
          {dimensions.map((dimension) => (
            <article className="atelier-dim-item" key={dimension.letter}>
              <div className="atelier-display atelier-dim-letter">
                {dimension.letter}
              </div>
              <p className="atelier-dim-name">{dimension.name}</p>
              <h3 className="atelier-dim-title">{dimension.title}</h3>
              <p className="atelier-dim-copy">{dimension.copy}</p>

              <ul className="atelier-dim-subs">
                {dimension.subs.map((sub) => (
                  <li key={sub}>{sub}</li>
                ))}
              </ul>

              <div className="atelier-dim-meta">
                <span className="atelier-dim-source">{dimension.source}</span>
                <span className="atelier-dim-weight">{dimension.weight}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
