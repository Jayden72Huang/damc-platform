import { CopyCommand } from "./CopyCommand";

const steps = [
  {
    num: "01",
    title: "装 Skill",
    desc: "一行命令安装",
    command: "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code",
  },
  {
    num: "02",
    title: "触发扫描",
    desc: "在 Claude Code 中输入",
    command: "/damc",
  },
  {
    num: "03",
    title: "查看报告",
    desc: "本地 HTML + 平台完整分析",
    command: "open ~/Desktop/DAMC-Report-*.html",
  },
] as const;

export function Process(): React.ReactNode {
  return (
    <section className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">04</span>
          30 秒，3 个步骤
        </div>

        <div className="sk-process-grid">
          {steps.map((step) => (
            <div key={step.num} className="sk-card">
              <div className="sk-card-body">
                <div className="sk-process-num">{step.num}</div>
                <div className="sk-process-title">{step.title}</div>
                <div className="sk-process-desc">{step.desc}</div>
                <CopyCommand command={step.command} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
