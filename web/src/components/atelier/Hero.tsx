"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const installCommand = "npx skills add Jayden72Huang/damc-skill";

const COPY = {
  zh: {
    eyebrow: "AGENT 时代的能力测评",
    titleA: "你的 Agent",
    titleB: "体检报告",
    subtitle:
      "在 AI 时代，看清你的真实坐标。一个命令，扫描你的 Agent 配置和 git 历史，量化评估 4 个维度。",
    primary: "立即免费体检",
    secondary: "查看示例报告",
    cmdLabel: "安装命令",
    coverAlt: "DAMC Agent 体检报告封面",
  },
  en: {
    eyebrow: "CAPABILITY ASSESSMENT FOR THE AGENT ERA",
    titleA: "Your Agent",
    titleB: "Health Report",
    subtitle:
      "See where you really stand in the AI era. One command scans your Agent setup and git history to quantify 4 dimensions.",
    primary: "Scan me free",
    secondary: "See a sample report",
    cmdLabel: "Install command",
    coverAlt: "DAMC Agent health report cover",
  },
};

export function Hero(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-hero">
      <div className="atelier-container">
        <div className="atelier-hero-inner">
          <div>
            <p className="atelier-eyebrow">{c.eyebrow}</p>
            <h1 className="atelier-display atelier-hero-title">
              {c.titleA}
              <br />
              <span className="atelier-accent">{c.titleB}</span>
            </h1>
            <p className="atelier-hero-subtitle">{c.subtitle}</p>
            <div className="atelier-hero-actions">
              <a className="atelier-button atelier-button-primary" href="#pricing">
                {c.primary}
              </a>
              <a className="atelier-text-link" href="#archetypes">
                {c.secondary}
              </a>
            </div>
            <div className="atelier-code-row" aria-label={c.cmdLabel}>
              <span className="atelier-code atelier-code-prompt">$</span>
              <span className="atelier-code">{installCommand}</span>
            </div>
          </div>

          <div className="atelier-cover-card">
            <Image
              src="/atelier/hero-agent.png"
              alt={c.coverAlt}
              fill
              priority
              sizes="(max-width: 1100px) 520px, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
