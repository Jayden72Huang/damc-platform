"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    title: "不是一份报告，是一个 24/7 的 AI 教练。",
    bullets: [
      "知道你的 DAMC 画像，对话天然带着上下文。",
      "每周重扫你的环境，把进步变成可见的数字。",
      "90 天能力强化路径，每周给出可执行任务。",
      "根据你的职业方向，持续调整学习和蒸馏重点。",
    ],
    portraitAlt: "DAMC Coach 肖像",
    dialogLabel: "DAMC Coach 对话示例",
    dialog:
      "我看到你的 M 分这周上升了 5 分。下一步，不是多装工具，而是把你最稳定的 SEO 判断流程蒸馏成 Skill。",
    signature: "— DAMC Coach",
  },
  en: {
    title: "Not a report — a 24/7 AI coach.",
    bullets: [
      "It knows your DAMC profile, so every chat carries context.",
      "It rescans your environment weekly, turning progress into visible numbers.",
      "A 90-day capability plan with actionable tasks every week.",
      "It continuously tunes your learning and distillation focus to your career direction.",
    ],
    portraitAlt: "DAMC Coach portrait",
    dialogLabel: "DAMC Coach sample dialog",
    dialog:
      "I see your M score rose 5 points this week. Next step isn't more tools — it's distilling your most reliable SEO judgment process into a Skill.",
    signature: "— DAMC Coach",
  },
};

export function Coach(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="coach">
      <div className="atelier-container">
        <div className="atelier-coach-grid">
          <div>
            <h2 className="atelier-display atelier-coach-title">{c.title}</h2>
            <ul className="atelier-coach-list">
              {c.bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="atelier-coach-dot" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="atelier-coach-aside">
            <div className="atelier-coach-portrait">
              <Image
                src="/atelier/coach-portrait.png"
                alt={c.portraitAlt}
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
              />
            </div>
            <aside className="atelier-dialog-card" aria-label={c.dialogLabel}>
              <p className="atelier-display atelier-dialog-text">{c.dialog}</p>
              <p className="atelier-dialog-signature">{c.signature}</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
