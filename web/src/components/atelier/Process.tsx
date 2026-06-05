import { CopyButton } from "./CopyButton";

type IconProps = { className?: string };

function IconTerminal({ className }: IconProps): React.ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4" width="19" height="16" rx="1" />
      <path d="M6 9l3 3-3 3" />
      <path d="M12 15h6" />
    </svg>
  );
}

function IconShield({ className }: IconProps): React.ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconRadar({ className }: IconProps): React.ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 12l6.4-6.4" />
    </svg>
  );
}

function IconChat({ className }: IconProps): React.ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H3V5z" />
      <path d="M21 9v8a2 2 0 0 1-2 2h-4" />
    </svg>
  );
}

function IconReport({ className }: IconProps): React.ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M16 3v3h3" />
      <path d="M8 11h8" />
      <path d="M8 15h8" />
      <path d="M8 19h5" />
    </svg>
  );
}

const steps = [
  {
    number: "01",
    title: "装 Skill",
    body: "一行命令，把 DAMC 测评能力加入你的 Claude Code 工作环境。",
    command: "npx skills add Jayden72Huang/damc-skill",
    Icon: IconTerminal,
  },
  {
    number: "02",
    title: "确认隐私边界",
    body: "首次触发时，DAMC 会显示完整的扫描清单。你可选「同意上传分数」或「本地模式」。",
    command: "→ 同意 / 本地模式 / 取消",
    Icon: IconShield,
  },
  {
    number: "03",
    title: "自动扫描",
    body: "扫描 ~/.claude 配置、Skill 生态、Memory 系统、git 协作历史。原始内容永不上传。",
    command: "/damc",
    Icon: IconRadar,
  },
  {
    number: "04",
    title: "3 个对话问题",
    body: "不是问卷 — 只问职业角色、核心产出、MBTI（可选）。用于 D 与 A 的角色推断部分。",
    command: "→ 角色 / 产出 / MBTI",
    Icon: IconChat,
  },
  {
    number: "05",
    title: "生成报告",
    body: "本地 LITE 报告即刻保存到桌面；同意上传后，可解锁完整 22 子维度 + 行动路径。",
    command: "~/Desktop/DAMC-Report-{date}.html",
    Icon: IconReport,
  },
] as const;

export function Process(): React.ReactNode {
  return (
    <section className="atelier-section" id="process">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">IV · 5 步流程</p>
        <h2 className="atelier-display atelier-section-title">
          从安装到报告，30 秒。
        </h2>
        <p className="atelier-section-sub">
          每一步都对应 DAMC Skill 的一个 Phase。隐私同意是第一道闸门 — 你不点头，扫描不开始。
        </p>

        <div className="atelier-process-grid atelier-process-grid-five">
          {steps.map((step) => (
            <article className="atelier-process-card" key={step.number}>
              <div className="atelier-process-icon" aria-hidden="true">
                <step.Icon className="atelier-process-icon-svg" />
              </div>
              <div className="atelier-display atelier-process-number">
                {step.number}
              </div>
              <h3 className="atelier-display atelier-process-title">
                {step.title}
              </h3>
              <p className="atelier-process-copy">{step.body}</p>
              <div className="atelier-process-cmd-row">
                <code className="atelier-code atelier-code-block">{step.command}</code>
                <CopyButton text={step.command} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
