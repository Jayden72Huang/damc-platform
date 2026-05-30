"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    quote: "你不是怕被 AI 取代，而是不知道自己在哪。",
    sub: "95% 的人对自己 Agent 时代的位置一无所知。",
    painPoints: [
      "我是焦虑，还是太自信？",
      "我的能力护城河在哪？",
      "下一步到底该学什么？",
    ],
  },
  en: {
    quote: "It's not that you fear being replaced by AI — you just don't know where you stand.",
    sub: "95% of people have no idea where they sit in the Agent era.",
    painPoints: [
      "Am I anxious, or overconfident?",
      "Where is my capability moat?",
      "What should I actually learn next?",
    ],
  },
};

export function PainPoints(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section atelier-pain">
      <div className="atelier-container">
        <blockquote className="atelier-display atelier-pain-quote">
          {c.quote}
        </blockquote>
        <p className="atelier-pain-sub">{c.sub}</p>

        <div className="atelier-pain-grid">
          {c.painPoints.map((item) => (
            <p className="atelier-pain-item" key={item}>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
