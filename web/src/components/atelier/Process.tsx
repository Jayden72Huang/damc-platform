"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const steps = [
  {
    number: "01",
    title: { zh: "装 Skill", en: "Install the Skill" },
    body: {
      zh: "一行命令，把 DAMC 测评能力加入你的 Claude Code 工作环境。",
      en: "One command adds DAMC's assessment capability to your Claude Code environment.",
    },
    command: { zh: "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code", en: "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code" },
  },
  {
    number: "02",
    title: { zh: "确认隐私边界", en: "Confirm privacy boundary" },
    body: {
      zh: "首次触发时，DAMC 会显示完整的扫描清单。你可选「同意上传分数」或「本地模式」。",
      en: 'On first run, DAMC shows the full scan checklist. You can choose "agree to upload scores" or "local mode".',
    },
    command: { zh: "→ 同意 / 本地模式 / 取消", en: "→ Agree / Local mode / Cancel" },
  },
  {
    number: "03",
    title: { zh: "自动扫描", en: "Auto-scan" },
    body: {
      zh: "扫描 ~/.claude 配置、Skill 生态、Memory 系统、git 协作历史。原始内容永不上传。",
      en: "Scans your ~/.claude config, Skill ecosystem, Memory system, and git collaboration history. Raw content is never uploaded.",
    },
    command: { zh: "/damc", en: "/damc" },
  },
  {
    number: "04",
    title: { zh: "3 个对话问题", en: "3 conversational questions" },
    body: {
      zh: "不是问卷 — 只问职业角色、核心产出、MBTI（可选）。用于 D 与 A 的角色推断部分。",
      en: "Not a survey — just your role, core output, and MBTI (optional). Used for the role-inference parts of D and A.",
    },
    command: { zh: "→ 角色 / 产出 / MBTI", en: "→ Role / Output / MBTI" },
  },
  {
    number: "05",
    title: { zh: "生成报告", en: "Generate the report" },
    body: {
      zh: "本地 LITE 报告即刻保存到桌面；同意上传后，可解锁完整 22 子维度 + 行动路径。",
      en: "A local LITE report saves to your desktop instantly; once you agree to upload, unlock the full 22 sub-dimensions + action path.",
    },
    command: { zh: "~/Desktop/DAMC-Report-{date}.html", en: "~/Desktop/DAMC-Report-{date}.html" },
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "II · 5 步流程",
    title: "从安装到报告，30 秒。",
    sub: "每一步都对应 DAMC Skill 的一个 Phase。隐私同意是第一道闸门 — 你不点头，扫描不开始。",
  },
  en: {
    eyebrow: "II · 5-STEP FLOW",
    title: "From install to report, 30 seconds.",
    sub: "Each step maps to a Phase of the DAMC Skill. Privacy consent is the first gate — no nod, no scan.",
  },
};

export function Process(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="process">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>
        <p className="atelier-section-sub">{c.sub}</p>

        <div className="atelier-process-grid atelier-process-grid-five">
          {steps.map((step) => (
            <article className="atelier-process-card" key={step.number}>
              <div className="atelier-display atelier-process-number">
                {step.number}
              </div>
              <h3 className="atelier-display atelier-process-title">
                {step.title[locale]}
              </h3>
              <p className="atelier-process-copy">{step.body[locale]}</p>
              <code className="atelier-code atelier-code-block">{step.command[locale]}</code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
