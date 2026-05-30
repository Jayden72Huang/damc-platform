"use client";

import { useState } from "react";
import { CopyCommand } from "./CopyCommand";
import { useLocale } from "@/lib/i18n/I18nProvider";

const agents = [
  {
    id: "claude",
    name: { zh: "Claude Code", en: "Claude Code" },
    icon: "⚡",
    steps: [
      {
        num: "01",
        title: { zh: "安装 Skill", en: "Install the Skill" },
        desc: {
          zh: "一行命令安装 DAMC 评估 Skill。",
          en: "Install the DAMC assessment Skill with one command.",
        },
        command: "npx skills add Jayden72Huang/damc-skill",
      },
      {
        num: "02",
        title: { zh: "运行扫描", en: "Run the scan" },
        desc: {
          zh: "在任意项目目录输入 /damc，自动扫描你的所有 AI Agent 环境。",
          en: "Type /damc in any project directory to auto-scan all your AI Agent environments.",
        },
        command: "/damc",
      },
      {
        num: "03",
        title: { zh: "获取报告", en: "Get your report" },
        desc: {
          zh: "终端即时输出 4 维总分 + 画像。上传到 damc.space 解锁完整分析。",
          en: "Get your 4-dimension scores + archetype instantly in the terminal. Upload to damc.space to unlock the full analysis.",
        },
        command: null,
      },
    ],
  },
  {
    id: "universal",
    name: { zh: "通用安装", en: "Universal Install" },
    icon: "🌐",
    steps: [
      {
        num: "01",
        title: { zh: "克隆仓库", en: "Clone the repo" },
        desc: {
          zh: "一行命令下载 DAMC Skill 到本地，适用于任何 AI Agent。",
          en: "Download the DAMC Skill locally with one command — works with any AI Agent.",
        },
        command: "git clone https://github.com/Jayden72Huang/damc-skill.git",
      },
      {
        num: "02",
        title: { zh: "运行扫描", en: "Run the scan" },
        desc: {
          zh: '打开你的 Agent（Cursor、Windsurf、Trae 等），说「读取 damc-skill/SKILL.md 并执行」。',
          en: 'Open your Agent (Cursor, Windsurf, Trae, etc.) and say "Read damc-skill/SKILL.md and run it".',
        },
        command: null,
      },
      {
        num: "03",
        title: { zh: "获取报告", en: "Get your report" },
        desc: {
          zh: "DAMC 自动扫描系统中所有 AI Agent 环境，生成 4 维评分报告。上传到 damc.space 解锁完整分析。",
          en: "DAMC auto-scans every AI Agent environment on your system and generates a 4-dimension report. Upload to damc.space to unlock the full analysis.",
        },
        command: null,
      },
    ],
  },
] as const;

const COPY = {
  zh: {
    compat:
      "支持 Claude Code · Codex · Cursor · Windsurf · Trae · 通义灵码 · MarsCode · CodeGeeX · Comate · Continue · Aider · WorkBuddy",
  },
  en: {
    compat:
      "Works with Claude Code · Codex · Cursor · Windsurf · Trae · Tongyi Lingma · MarsCode · CodeGeeX · Comate · Continue · Aider · WorkBuddy",
  },
};

export function HowToUse(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [activeAgent, setActiveAgent] = useState("claude");
  const agent = agents.find((a) => a.id === activeAgent) ?? agents[0];

  return (
    <section id="how" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">02</span>
          How to Use
        </div>

        <div className="sk-agent-tabs">
          {agents.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`sk-agent-tab${activeAgent === a.id ? " sk-agent-tab-active" : ""}`}
              onClick={() => setActiveAgent(a.id)}
            >
              <span className="sk-agent-tab-icon">{a.icon}</span>
              {a.name[locale]}
            </button>
          ))}
        </div>

        <div className="sk-agent-compat">{c.compat}</div>

        <div className="sk-process-grid">
          {agent.steps.map((s) => (
            <div key={s.num}>
              <div className="sk-process-num">{s.num}</div>
              <div className="sk-process-title">{s.title[locale]}</div>
              <p className="sk-process-desc">{s.desc[locale]}</p>
              {s.command ? <CopyCommand command={s.command} /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
