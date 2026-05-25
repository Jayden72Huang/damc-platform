const dimensions = [
  {
    letter: "D",
    name: "Distillation Value",
    title: "蒸馏价值",
    copy: "你的经验值得做成 Skill 吗？领域深度、方法论独特性、知识可编码性。",
    weight: "25%",
    colorClass: "sk-color-d",
    bgClass: "sk-bg-d",
  },
  {
    letter: "A",
    name: "Anti-Distillation",
    title: "抗蒸馏指数",
    copy: "AI 拿不走的能力有哪些？创造力、情商、跨域综合、模糊决策、信任资产。",
    weight: "30%",
    colorClass: "sk-color-a",
    bgClass: "sk-bg-a",
  },
  {
    letter: "M",
    name: "AI Mastery",
    title: "AI 驾驭能力",
    copy: "你用 AI 工具的水平如何？100% 自动扫描你的环境、skills、配置。",
    weight: "25%",
    colorClass: "sk-color-m",
    bgClass: "sk-bg-m",
  },
  {
    letter: "C",
    name: "Career Compass",
    title: "职业适配",
    copy: "你应该往哪个方向走？基于 D/A/M 三维 + MBTI 推导的职业路径。",
    weight: "20%",
    colorClass: "sk-color-c",
    bgClass: "sk-bg-c",
  },
] as const;

export function Dimensions(): React.ReactNode {
  return (
    <section className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">01</span>
          DAMC Framework
        </div>

        <div className="sk-dim-grid">
          {dimensions.map((dim) => (
            <div key={dim.letter} className="sk-card">
              <div className={`sk-card-strip ${dim.bgClass}`} />
              <div className="sk-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className={`sk-dim-letter ${dim.colorClass}`}>
                      {dim.letter}
                    </div>
                    <div className="sk-dim-name">{dim.name}</div>
                  </div>
                  <div className="sk-dim-weight">WEIGHT {dim.weight}</div>
                </div>
                <div className="sk-dim-title">{dim.title}</div>
                <div className="sk-dim-copy">{dim.copy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
