"use client";

import { CopyCommand } from "./CopyCommand";
import { useLocale } from "@/lib/i18n/I18nProvider";

const R = 20;
const CIRC = 2 * Math.PI * R; // ~125.66

const scores = [
  { letter: "D", color: "var(--color-d)", value: 78, name: "Distillation" },
  { letter: "A", color: "var(--color-a)", value: 65, name: "Anti-Distill" },
  { letter: "M", color: "var(--color-m)", value: 85, name: "AI Mastery" },
  { letter: "C", color: "var(--color-c)", value: 72, name: "Career" },
] as const;

const COPY = {
  zh: {
    subtitle: "AI 时代价值评估 · Know Your Worth",
    tagline:
      "一个命令扫描你的 AI 环境配置和 Git 历史，从 4 个维度量化你在 Agent 时代的竞争力坐标。",
    scanNow: "立即免费体检",
    learnMore: "了解更多 →",
    archetype: "AI 架构师",
  },
  en: {
    subtitle: "AI-Era Value Assessment · Know Your Worth",
    tagline:
      "One command scans your AI setup and Git history, quantifying where you stand in the Agent era across 4 dimensions.",
    scanNow: "Scan me free",
    learnMore: "Learn more →",
    archetype: "AI Architect",
  },
};

export function Hero(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="sk-hero">
      <div className="sk-container">
        <div className="sk-hero-inner">
          <div>
            <h1 className="sk-hero-title">DAMC</h1>
            <p className="sk-hero-subtitle">{c.subtitle}</p>
            <p className="sk-hero-tagline">{c.tagline}</p>

            <div className="sk-hero-actions">
              <a href="#get-started" className="sk-stamp">
                {c.scanNow}
              </a>
              <a href="#what" className="sk-btn-outline sk-btn">
                {c.learnMore}
              </a>
            </div>

            <CopyCommand
              command="npx skills add Jayden72Huang/damc-skill"
              className="mt-6"
            />
          </div>

          {/* Certificate card */}
          <div className="sk-cert">
            <div className="sk-cert-inner">
              {/* Corner ornaments */}
              <span className="sk-cert-corner sk-cert-tl" />
              <span className="sk-cert-corner sk-cert-tr" />
              <span className="sk-cert-corner sk-cert-bl" />
              <span className="sk-cert-corner sk-cert-br" />

              {/* Watermark */}
              <div className="sk-cert-watermark" aria-hidden>
                DAMC
              </div>

              {/* Diagonal sash ribbon */}
              <div className="sk-cert-sash">Grade A</div>

              {/* Top header */}
              <div className="sk-cert-top">
                <div className="sk-cert-label">Agent Era Assessment</div>
                <div className="sk-cert-title">Skill Certificate</div>
                <div className="sk-cert-divider" />
              </div>

              {/* Recipient */}
              <div className="sk-cert-preamble">This certifies that</div>
              <div className="sk-cert-recipient">@Jayden72Huang</div>
              <div className="sk-cert-preamble">has been assessed as</div>
              <div className="sk-cert-archetype">
                <span className="sk-cert-emoji">🏆</span>
                {c.archetype}
              </div>

              {/* Score rings */}
              <div className="sk-cert-scores">
                {scores.map((s) => {
                  const offset = CIRC * (1 - s.value / 100);
                  return (
                    <div className="sk-cert-score-item" key={s.letter}>
                      <span
                        className="sk-cert-score-letter"
                        style={{ color: s.color }}
                      >
                        {s.letter}
                      </span>
                      <div className="sk-cert-score-ring">
                        <svg
                          viewBox="0 0 48 48"
                          width="48"
                          height="48"
                          className="sk-cert-ring-svg"
                        >
                          <circle
                            cx="24"
                            cy="24"
                            r={R}
                            fill="none"
                            stroke="rgba(58,37,22,0.15)"
                            strokeWidth="4"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r={R}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="4"
                            strokeDasharray={CIRC}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90 24 24)"
                          />
                        </svg>
                        <span
                          className="sk-cert-score-val"
                          style={{ color: s.color }}
                        >
                          {s.value}
                        </span>
                      </div>
                      <div className="sk-cert-score-name">{s.name}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom row: seal — overall — info */}
              <div className="sk-cert-bottom">
                <div className="sk-cert-seal">
                  <div className="sk-starburst-bg">
                    <div className="sk-starburst-inner">
                      <div className="sk-starburst-text" style={{ fontSize: 22 }}>
                        75
                      </div>
                      <div className="sk-starburst-sub" style={{ fontSize: 6 }}>
                        Overall
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sk-cert-meta">
                  <div className="sk-cert-overall">
                    75<span className="sk-cert-overall-unit"> /100</span>
                  </div>
                  <div className="sk-cert-percentile">Top 8% of builders</div>
                </div>

                <div className="sk-cert-info">
                  <div className="sk-cert-info-line">2026-05-25</div>
                  <div className="sk-cert-info-line">No. DAMC-2026-00042</div>
                  <div className="sk-cert-info-line">damc.space</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
