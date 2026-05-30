"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const archetypes = [
  {
    emoji: "🏆",
    name: { zh: "AI 架构师", en: "AI Architect" },
    code: { zh: "高 D · 高 A · 高 M", en: "High D · High A · High M" },
    tagline: {
      zh: "你站在 AI 时代的食物链顶端 — 有料、不可替代、还会用 AI。",
      en: "You sit at the top of the AI-era food chain — substantial, irreplaceable, and fluent with AI.",
    },
    image: "/atelier/archetypes/01.png",
  },
  {
    emoji: "🎯",
    name: { zh: "待觉醒专家", en: "Dormant Expert" },
    code: { zh: "高 D · 高 A · 低 M", en: "High D · High A · Low M" },
    tagline: {
      zh: "你有钻石级的经验和不可替代性，但还没用 AI 放大它。",
      en: "You have diamond-grade experience and irreplaceability, but haven't amplified it with AI yet.",
    },
    image: "/atelier/archetypes/03.png",
  },
  {
    emoji: "⚡",
    name: { zh: "效率怪兽", en: "Efficiency Beast" },
    code: { zh: "高 D · 低 A · 高 M", en: "High D · Low A · High M" },
    tagline: {
      zh: "AI 时代的高效执行者 — 但你的工作最容易被纯 AI 替代。",
      en: "A high-efficiency operator in the AI era — but your work is the easiest to automate away.",
    },
    image: "/atelier/archetypes/02.png",
  },
  {
    emoji: "🚨",
    name: { zh: "危险区", en: "Danger Zone" },
    code: { zh: "高 D · 低 A · 低 M", en: "High D · Low A · Low M" },
    tagline: {
      zh: "知识可被蒸馏，又没有不可替代性，还不会用 AI — 立刻行动。",
      en: "Your knowledge is distillable, you lack irreplaceability, and you don't use AI yet — act now.",
    },
    image: "/atelier/archetypes/08.png",
  },
  {
    emoji: "🌟",
    name: { zh: "AI 原生创造者", en: "AI-Native Creator" },
    code: { zh: "低 D · 高 A · 高 M", en: "Low D · High A · High M" },
    tagline: {
      zh: "你的价值在于独特的创造力和判断力 — 加上 AI 如虎添翼。",
      en: "Your value lies in unique creativity and judgment — and AI gives it wings.",
    },
    image: "/atelier/archetypes/04.png",
  },
  {
    emoji: "💎",
    name: { zh: "未雕琢的钻石", en: "Uncut Diamond" },
    code: { zh: "低 D · 高 A · 低 M", en: "Low D · High A · Low M" },
    tagline: {
      zh: "你有不可替代的独特价值，但还没找到用 AI 放大它的方式。",
      en: "You hold irreplaceable, unique value, but haven't found a way to amplify it with AI.",
    },
    image: "/atelier/archetypes/05.png",
  },
  {
    emoji: "🔧",
    name: { zh: "AI 工具人", en: "AI Operator" },
    code: { zh: "低 D · 低 A · 高 M", en: "Low D · Low A · High M" },
    tagline: {
      zh: "你很会用 AI 工具 — 但「会用工具」本身在贬值。",
      en: "You're great with AI tools — but “using tools” itself is depreciating.",
    },
    image: "/atelier/archetypes/06.png",
  },
  {
    emoji: "📚",
    name: { zh: "探索者", en: "Explorer" },
    code: { zh: "低 D · 低 A · 低 M", en: "Low D · Low A · Low M" },
    tagline: {
      zh: "刚入职场或正在转型 — 现在是最好的重新定位时机。",
      en: "Early in your career or pivoting — now is the best time to reposition.",
    },
    image: "/atelier/archetypes/07.png",
  },
] as const;

const COPY = {
  zh: {
    eyebrow: "III · 8 种画像",
    title: "8 种画像，你是哪一种？",
    sub: "按 D / A / M 三个维度的高低组合，AI 时代的人群可分为 8 类。每一类都有自己的护城河、风险与下一步。",
  },
  en: {
    eyebrow: "III · 8 ARCHETYPES",
    title: "8 archetypes — which one are you?",
    sub: "By the highs and lows of D / A / M, people in the AI era fall into 8 types. Each has its own moat, risk, and next step.",
  },
};

export function Archetypes(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="archetypes">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>
        <p className="atelier-section-sub">{c.sub}</p>

        <div className="atelier-archetype-grid">
          {archetypes.map((archetype) => (
            <article className="atelier-archetype-card" key={archetype.name.en}>
              <div className="atelier-archetype-image">
                <Image
                  src={archetype.image}
                  alt={`${archetype.name[locale]} · ${archetype.code[locale]}`}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                />
              </div>
              <div className="atelier-archetype-meta">
                <div className="atelier-archetype-emoji" aria-hidden="true">
                  {archetype.emoji}
                </div>
                <h3 className="atelier-archetype-title">
                  {archetype.name[locale]}
                </h3>
                <p className="atelier-archetype-code">{archetype.code[locale]}</p>
                <p className="atelier-archetype-tagline">{archetype.tagline[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
