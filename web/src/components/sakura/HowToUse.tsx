import { CopyCommand } from "./CopyCommand";

const steps = [
  {
    num: "01",
    title: "安装 Skill",
    desc: "一行命令安装 DAMC 评估 Skill 到你的 Claude Code 环境。",
    command: "npx skills add Jayden72Huang/damc-skill",
    link: null,
  },
  {
    num: "02",
    title: "运行扫描",
    desc: "在任意项目目录输入 /damc，自动扫描你的 AI 配置、Git 历史和开发环境。",
    command: "/damc",
    link: null,
  },
  {
    num: "03",
    title: "获取报告",
    desc: "终端即时输出 4 维总分 + 画像。上传分数到 damc.space 解锁完整分析：22 子维度、护城河识别、90 天行动路径。",
    command: "damc.space/r/你的报告",
    link: { text: "查看示例报告 →", href: "/r/demo" },
  },
] as const;

export function HowToUse(): React.ReactNode {
  return (
    <section id="how" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">02</span>
          How to Use
        </div>

        <div className="sk-process-grid">
          {steps.map((s) => (
            <div key={s.num}>
              <div className="sk-process-num">{s.num}</div>
              <div className="sk-process-title">{s.title}</div>
              <p className="sk-process-desc">{s.desc}</p>
              {s.command ? <CopyCommand command={s.command} /> : null}
              {s.link ? (
                <a href={s.link.href} className="sk-process-link">
                  {s.link.text}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
