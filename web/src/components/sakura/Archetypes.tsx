"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const archetypes = [
  {
    emoji: "🏆",
    name: { zh: "AI 架构师", en: "AI Architect" },
    code: "D↑ A↑ M↑",
    desc: {
      zh: "全能型选手，既能驾驭 AI 又有不可替代的核心能力",
      en: "All-rounder — commands AI and brings irreplaceable core skills",
    },
    image: "/atelier/archetypes/01.png",
  },
  {
    emoji: "🎯",
    name: { zh: "待觉醒专家", en: "Dormant Expert" },
    code: "D↑ A↑ M↓",
    desc: {
      zh: "深厚专业底蕴，一旦学会用 AI 就是王炸",
      en: "Deep expertise — unstoppable once you learn to wield AI",
    },
    image: "/atelier/archetypes/03.png",
  },
  {
    emoji: "⚡",
    name: { zh: "效率怪兽", en: "Efficiency Beast" },
    code: "D↑ A↓ M↑",
    desc: {
      zh: "AI 用得飞起，但缺少不可替代的独特优势",
      en: "Lightning-fast with AI, but missing an irreplaceable edge",
    },
    image: "/atelier/archetypes/02.png",
  },
  {
    emoji: "🚨",
    name: { zh: "危险区", en: "Danger Zone" },
    code: "D↑ A↓ M↓",
    desc: {
      zh: "工作容易被 AI 替代，又还没学会用 AI",
      en: "Easily automated work, and not yet leveraging AI",
    },
    image: "/atelier/archetypes/08.png",
  },
  {
    emoji: "🌟",
    name: { zh: "AI 原生创造者", en: "AI-Native Creator" },
    code: "D↓ A↑ M↑",
    desc: {
      zh: "AI 时代的创作者，用 AI 放大独特创造力",
      en: "An AI-era creator who amplifies unique creativity with AI",
    },
    image: "/atelier/archetypes/04.png",
  },
  {
    emoji: "💎",
    name: { zh: "未雕琢的钻石", en: "Uncut Diamond" },
    code: "D↓ A↑ M↓",
    desc: {
      zh: "有独特天赋，还没被发掘和放大",
      en: "Rare talent that hasn't been uncovered and scaled yet",
    },
    image: "/atelier/archetypes/05.png",
  },
  {
    emoji: "🔧",
    name: { zh: "AI 工具人", en: "AI Operator" },
    code: "D↓ A↓ M↑",
    desc: {
      zh: "会用 AI 工具但缺乏深度，容易被更便宜的人替代",
      en: "Handy with AI tools but lacks depth — replaceable by cheaper hands",
    },
    image: "/atelier/archetypes/06.png",
  },
  {
    emoji: "📚",
    name: { zh: "探索者", en: "Explorer" },
    code: "D↓ A↓ M↓",
    desc: {
      zh: "刚开始探索 AI 世界，潜力无限",
      en: "Just starting to explore the AI world — limitless potential",
    },
    image: "/atelier/archetypes/07.png",
  },
] as const;

const COPY = {
  zh: {
    header: "8 种画像，你是哪一种？",
    sub: (
      <>
        DAMC 根据三个维度的高低组合把你归入 8 种画像：
        <strong>D（蒸馏价值）</strong>= 你的工作有多容易被 AI 学走；
        <strong>A（反蒸馏）</strong>= 你有多少 AI 拿不走的能力；
        <strong>M（AI 驾驭力）</strong>= 你用 AI 有多溜。找到自己的画像，就知道该往哪个方向发力。
      </>
    ),
  },
  en: {
    header: "8 archetypes — which one are you?",
    sub: (
      <>
        DAMC sorts you into 8 archetypes from the highs and lows of three dimensions:{" "}
        <strong>D (Distillation Value)</strong> = how easily AI can learn your work;{" "}
        <strong>A (Anti-Distillation)</strong> = how many abilities AI can&apos;t take;{" "}
        <strong>M (AI Mastery)</strong> = how fluent you are with AI. Find your archetype and you&apos;ll know where to push.
      </>
    ),
  },
};

export function Archetypes(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section id="archetypes" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">03</span>

          {c.header}
        </div>
        <p className="sk-section-sub">{c.sub}</p>

        <div className="sk-archetype-grid">
          {archetypes.map((a) => (
            <div key={a.code} className="sk-archetype-card">
              <div className="sk-archetype-img">
                <Image
                  src={a.image}
                  alt={a.name[locale]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="sk-archetype-info">
                <span className="sk-archetype-emoji">{a.emoji}</span>
                <div className="sk-archetype-name">{a.name[locale]}</div>
                <div className="sk-archetype-code">{a.code}</div>
                <div className="sk-archetype-desc">{a.desc[locale]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
