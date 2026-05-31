"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const installCommand = "npx skills add Jayden72Huang/damc-skill -g -y --agent claude-code";

const COPY = {
  zh: {
    title: "30 秒，拿到你的第一份 Agent 体检。",
    sub: "不收集邮箱，不需要登录。一行命令，扫描你的 Claude Code 环境，立刻看到 D / A / M / C 4 维分数。",
    primary: "立即免费体检",
    cmdLabel: "安装命令",
  },
  en: {
    title: "Get your first Agent checkup in 30 seconds.",
    sub: "No email, no login. One command scans your Claude Code environment and instantly shows your D / A / M / C scores.",
    primary: "Scan me free",
    cmdLabel: "Install command",
  },
};

export function FinalCTA(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-final" id="get-started">
      <div className="atelier-container">
        <h2 className="atelier-display atelier-final-title">{c.title}</h2>
        <p className="atelier-final-sub">{c.sub}</p>

        <div className="atelier-final-actions">
          <a className="atelier-button atelier-button-primary" href="#process">
            {c.primary}
          </a>
          <div className="atelier-code-row" aria-label={c.cmdLabel}>
            <span className="atelier-code atelier-code-prompt">$</span>
            <span className="atelier-code">{installCommand}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
