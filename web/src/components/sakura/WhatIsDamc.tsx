const dimensions = [
  {
    letter: "D",
    color: "var(--color-d)",
    strip: "sk-bg-d",
    letterClass: "sk-color-d",
    name: "Distillation Value",
    title: "蒸馏价值",
    copy: "你的经验值得被蒸馏成 AI Skill 吗？衡量你的方法论、专业知识和工作流的可编码程度。",
    weight: "25%",
  },
  {
    letter: "A",
    color: "var(--color-a)",
    strip: "sk-bg-a",
    letterClass: "sk-color-a",
    name: "Anti-Distillation",
    title: "抗蒸馏能力",
    copy: "你的哪些能力是 AI 拿不走的？创造力、情商、跨域思维、模糊决策等人类独有的护城河。",
    weight: "30%",
  },
  {
    letter: "M",
    color: "var(--color-m)",
    strip: "sk-bg-m",
    letterClass: "sk-color-m",
    name: "AI Mastery",
    title: "AI 驾驭力",
    copy: "你驾驭 AI 工具的水平如何？基于你的 .claude/ 配置、Skills、MCP、自动化等实际数据量化评估。",
    weight: "25%",
  },
  {
    letter: "C",
    color: "var(--color-c)",
    strip: "sk-bg-c",
    letterClass: "sk-color-c",
    name: "Career Compass",
    title: "职业适配",
    copy: "基于 D/A/M 三个维度的交叉分析，为你匹配最适合的 AI 时代发展路径和画像。",
    weight: "20%",
  },
] as const;

export function WhatIsDamc(): React.ReactNode {
  return (
    <section id="what" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">01</span>
          What is DAMC
        </div>

        <p className="sk-what-intro">
          DAMC 是一个 AI 时代的个人价值评估模型。一个命令扫描你的本地开发环境、AI
          工具配置和 Git 历史，从 4 个维度量化你在 AI 时代的竞争力坐标。
        </p>

        <div className="sk-dim-grid">
          {dimensions.map((d) => (
            <div className="sk-card" key={d.letter}>
              <div className={`sk-card-strip ${d.strip}`} />
              <div className="sk-card-body">
                <div className={`sk-dim-letter ${d.letterClass}`}>{d.letter}</div>
                <div className="sk-dim-name">{d.name}</div>
                <div className="sk-dim-title">{d.title}</div>
                <p className="sk-dim-copy">{d.copy}</p>
                <div className="sk-dim-weight">Weight: {d.weight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
