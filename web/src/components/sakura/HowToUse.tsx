"use client";

import { useState } from "react";
import { CopyCommand } from "./CopyCommand";

const agents = [
  {
    id: "claude",
    name: "Claude Code",
    icon: "⚡",
    steps: [
      { num: "01", title: "安装 Skill", desc: "一行命令安装 DAMC 评估 Skill。", command: "npx skills add Jayden72Huang/damc-skill" },
      { num: "02", title: "运行扫描", desc: "在任意项目目录输入 /damc，自动扫描你的所有 AI Agent 环境。", command: "/damc" },
      { num: "03", title: "获取报告", desc: "终端即时输出 4 维总分 + 画像。上传到 damc.space 解锁完整分析。", command: null },
    ],
  },
  {
    id: "universal",
    name: "通用安装",
    icon: "🌐",
    steps: [
      { num: "01", title: "克隆仓库", desc: "一行命令下载 DAMC Skill 到本地，适用于任何 AI Agent。", command: "git clone https://github.com/Jayden72Huang/damc-skill.git" },
      { num: "02", title: "运行扫描", desc: '打开你的 Agent（Cursor、Windsurf、Trae 等），说「读取 damc-skill/SKILL.md 并执行」。', command: null },
      { num: "03", title: "获取报告", desc: "DAMC 自动扫描系统中所有 AI Agent 环境，生成 4 维评分报告。上传到 damc.space 解锁完整分析。", command: null },
    ],
  },
] as const;

export function HowToUse(): React.ReactNode {
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
              {a.name}
            </button>
          ))}
        </div>

        <div className="sk-agent-compat">
          支持 Claude Code · Codex · Cursor · Windsurf · Trae · 通义灵码 · MarsCode · CodeGeeX · Comate · Continue · Aider · WorkBuddy
        </div>

        <div className="sk-process-grid">
          {agent.steps.map((s) => (
            <div key={s.num}>
              <div className="sk-process-num">{s.num}</div>
              <div className="sk-process-title">{s.title}</div>
              <p className="sk-process-desc">{s.desc}</p>
              {s.command ? <CopyCommand command={s.command} /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
