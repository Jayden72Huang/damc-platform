const steps = [
  {
    number: "01",
    title: "装 Skill",
    body: "一行命令，把 DAMC 测评能力加入你的 Claude Code 工作环境。",
    command: "npx skills add Jayden72Huang/damc-skill",
  },
  {
    number: "02",
    title: "确认隐私边界",
    body: "首次触发时，DAMC 会显示完整的扫描清单。你可选「同意上传分数」或「本地模式」。",
    command: "→ 同意 / 本地模式 / 取消",
  },
  {
    number: "03",
    title: "自动扫描",
    body: "扫描 ~/.claude 配置、Skill 生态、Memory 系统、git 协作历史。原始内容永不上传。",
    command: "/damc",
  },
  {
    number: "04",
    title: "3 个对话问题",
    body: "不是问卷 — 只问职业角色、核心产出、MBTI（可选）。用于 D 与 A 的角色推断部分。",
    command: "→ 角色 / 产出 / MBTI",
  },
  {
    number: "05",
    title: "生成报告",
    body: "本地 LITE 报告即刻保存到桌面；同意上传后，可解锁完整 22 子维度 + 行动路径。",
    command: "~/Desktop/DAMC-Report-{date}.html",
  },
] as const;

export function Process(): React.ReactNode {
  return (
    <section className="atelier-section" id="process">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">II · 5 步流程</p>
        <h2 className="atelier-display atelier-section-title">
          从安装到报告，30 秒。
        </h2>
        <p className="atelier-section-sub">
          每一步都对应 DAMC Skill 的一个 Phase。隐私同意是第一道闸门 — 你不点头，扫描不开始。
        </p>

        <div className="atelier-process-grid atelier-process-grid-five">
          {steps.map((step) => (
            <article className="atelier-process-card" key={step.number}>
              <div className="atelier-display atelier-process-number">
                {step.number}
              </div>
              <h3 className="atelier-display atelier-process-title">
                {step.title}
              </h3>
              <p className="atelier-process-copy">{step.body}</p>
              <code className="atelier-code atelier-code-block">{step.command}</code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
