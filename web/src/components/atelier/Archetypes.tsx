"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Archetype = {
  slug: string;
  emoji: string;
  chinese: string;
  english: string;
  code: string;
  tagline: string;
  image: string;
  features: readonly string[];
  risk: string;
  advices: readonly string[];
  direction: string;
};

const archetypes: readonly Archetype[] = [
  {
    slug: "architect",
    emoji: "🏆",
    chinese: "AI 架构师",
    english: "Architect",
    code: "高 D · 高 A · 高 M",
    tagline: "你站在 AI 时代的食物链顶端 — 有料、不可替代、还会用 AI。",
    image: "/atelier/archetypes/v2/architect.png",
    features: [
      "深度领域专家，有独特方法论",
      "同时具备 AI 无法复制的软实力（领导力 / 创造力 / 跨域思维）",
      "AI 工具使用娴熟，能构建 Skill 和自动化工作流",
    ],
    risk: "几乎没有。最大风险是低估自己的价值，没有主动蒸馏和规模化。",
    advices: [
      "立刻蒸馏你的核心方法论为 Skill，让 AI 帮你规模化",
      "你应该教别人怎么用 AI，而不是担心 AI 取代你",
      "考虑做顾问 / 教练 / 内容创作者，放大你的影响力",
    ],
    direction: "AI 战略顾问、技术 Leader、Skill 生态构建者、独立咨询师",
  },
  {
    slug: "awakening",
    emoji: "🎯",
    chinese: "待觉醒专家",
    english: "Awakening Expert",
    code: "高 D · 高 A · 低 M",
    tagline: "你有钻石级的经验和不可替代性，但还没用 AI 放大它。",
    image: "/atelier/archetypes/v2/awakening.png",
    features: [
      "行业深耕多年，有独到见解和方法论",
      "人际能力强，有不可替代的软实力",
      "但 AI 工具使用停留在基础对话，远没有发挥倍增效应",
    ],
    risk: "中等。你不会被 AI 取代，但会被「同等水平 + 会用 AI」的人超越。",
    advices: [
      "最高优先级：提升 AI 工具使用能力，从 prompt engineering 开始",
      "找一个日常高频任务，用 AI 工具重做一遍",
      "你的经验 + AI 熟练度 = 超级个体，组合极其强大",
    ],
    direction: "当前领域的 AI 增强版（AI-Augmented Expert）",
  },
  {
    slug: "craftsman",
    emoji: "⚡",
    chinese: "效率怪兽",
    english: "Craftsman",
    code: "高 D · 低 A · 高 M",
    tagline: "AI 时代的高效执行者 — 但你的工作最容易被纯 AI 替代。",
    image: "/atelier/archetypes/v2/craftsman.png",
    features: [
      "有可编码的领域知识和标准化输出",
      "AI 工具用得很溜",
      "但缺乏 AI 无法复制的软实力（创造力 / 人际 / 跨域偏弱）",
    ],
    risk: "高。你的知识可以被蒸馏成 Skill，而 AI 工具能力不构成护城河。",
    advices: [
      "紧急：发展你的抗蒸馏能力 — 选 1-2 个 A 维度子项重点突破",
      "主动蒸馏自己的最佳实践，但同时要建立「Skill 之上」的价值",
      "考虑转向需要更多判断力和人际互动的角色",
    ],
    direction: "AI 工具链专家、Skill 开发者、技术教育者",
  },
  {
    slug: "risk",
    emoji: "🚨",
    chinese: "危险区",
    english: "At Risk",
    code: "高 D · 低 A · 低 M",
    tagline: "知识可被蒸馏，又没有不可替代性，还不会用 AI — 立刻行动。",
    image: "/atelier/archetypes/v2/risk.png",
    features: [
      "有一定的领域知识，但主要是执行层面",
      "缺乏 AI 无法复制的独特价值",
      "AI 工具使用能力薄弱",
    ],
    risk: "极高。你做的工作可以被 AI Skill 替代，而你还没准备好应对。",
    advices: [
      "两条路同时走：提升 AI 使用能力（M）+ 发展不可替代性（A）",
      "短期用 M 维度提升保持竞争力，长期用 A 维度建立护城河",
      "认真思考自己真正独特的地方在哪里",
    ],
    direction: "需要根据 A 维度提升方向重新定位",
  },
  {
    slug: "native",
    emoji: "🌟",
    chinese: "AI 原生创造者",
    english: "AI Native",
    code: "低 D · 高 A · 高 M",
    tagline: "你的价值在于独特的创造力和判断力 — 加上 AI 如虎添翼。",
    image: "/atelier/archetypes/v2/native.png",
    features: [
      "核心价值在于创造性思维、审美判断或人际影响力",
      "这些能力难以被蒸馏成标准化 Skill",
      "同时精通 AI 工具，能把 AI 当作创造力的放大器",
    ],
    risk: "低。你的核心价值正是 AI 最难复制的。",
    advices: [
      "继续深化你的独特优势，这是永远的护城河",
      "用 AI 加速创造过程，而不是让 AI 替代创造本身",
      "你可以把 AI 工具能力教给其他创造者",
    ],
    direction: "创意总监、设计 Leader、AI + 创意领域的先锋",
  },
  {
    slug: "diamond",
    emoji: "💎",
    chinese: "未雕琢的钻石",
    english: "Raw Diamond",
    code: "低 D · 高 A · 低 M",
    tagline: "你有不可替代的独特价值，但还没找到用 AI 放大它的方式。",
    image: "/atelier/archetypes/v2/diamond.png",
    features: [
      "核心竞争力在于人际能力、创造力或跨域思维",
      "这些能力天然抗蒸馏",
      "但对 AI 工具不熟悉，没有发挥出科技倍增器的效果",
    ],
    risk: "中低。你不会被取代，但可能被同类型 + 会用 AI 的人超越。",
    advices: [
      "你的基础非常好（高 A 是最难培养的），现在只需要加上 AI 能力",
      "不需要成为技术专家，但要学会用 AI 处理日常重复性工作",
      "把节省出的时间投入到你真正擅长的高价值活动中",
    ],
    direction: "当前方向不变，加上 AI 工具赋能即可",
  },
  {
    slug: "wrench",
    emoji: "🔧",
    chinese: "AI 工具人",
    english: "Tool User",
    code: "低 D · 低 A · 高 M",
    tagline: "你很会用 AI 工具 — 但「会用工具」本身在贬值。",
    image: "/atelier/archetypes/v2/wrench.png",
    features: [
      "AI 工具使用熟练",
      "但没有深度领域知识，也缺乏不可替代的软实力",
      "容易成为「用 AI 跑腿的人」",
    ],
    risk: "中高。AI 工具使用门槛在持续降低，这个优势会快速消失。",
    advices: [
      "选定一个领域深耕（提升 D 维度）— AI 工具能力 + 领域知识 = 真正的价值",
      "或者发展一项不可替代的软实力（提升 A 维度）",
      "不要只满足于「我会用 AI」，这很快会成为基本技能",
    ],
    direction: "AI 培训师（短期红利）、选定领域后的 AI 增强专家",
  },
  {
    slug: "seedling",
    emoji: "📚",
    chinese: "探索者",
    english: "Seedling",
    code: "低 D · 低 A · 低 M",
    tagline: "刚入职场或正在转型 — 现在是最好的重新定位时机。",
    image: "/atelier/archetypes/v2/seedling.png",
    features: [
      "还没有深度的领域积累",
      "还没有建立不可替代的独特价值",
      "AI 工具使用尚在起步",
    ],
    risk: "取决于行动速度。越早行动，选择越多。",
    advices: [
      "好消息：没有包袱，可以从零开始按 AI 时代的逻辑来构建能力",
      "优先级：先提升 M（AI 驾驭能力），这是投资回报最快的维度",
      "同时思考你真正热爱什么 → 选定领域深耕（提升 D）",
      "A 维度需要时间积累，但可以从现在开始刻意练习",
    ],
    direction: "AI 原生岗位（AI 运营 / AI 产品 / Prompt Engineer）→ 逐步找到专精方向",
  },
];

export function Archetypes(): React.ReactNode {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const open = useCallback((slug: string) => setOpenSlug(slug), []);
  const close = useCallback(() => setOpenSlug(null), []);

  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openSlug, close]);

  const active = archetypes.find((a) => a.slug === openSlug) ?? null;

  return (
    <section className="atelier-section atelier-archetypes" id="archetypes">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">II · 8 种画像</p>
        <h2 className="atelier-display atelier-section-title">
          8 种画像，你是哪一种？
        </h2>
        <p className="atelier-section-sub">
          按 D / A / M 三个维度的高低组合，AI 时代的人群可分为 8 类。点击任意一张卡片，查看完整画像与建议。
        </p>

        <div className="atelier-archetype-grid">
          {archetypes.map((archetype) => (
            <button
              type="button"
              className="atelier-archetype-card"
              key={archetype.slug}
              onClick={() => open(archetype.slug)}
              aria-haspopup="dialog"
            >
              <div className="atelier-archetype-image">
                <Image
                  src={archetype.image}
                  alt={`${archetype.chinese} · ${archetype.code}`}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                />
              </div>
              <div className="atelier-archetype-meta">
                <div className="atelier-archetype-emoji" aria-hidden="true">
                  {archetype.emoji}
                </div>
                <h3 className="atelier-archetype-title">
                  {archetype.chinese}
                </h3>
                <p className="atelier-archetype-code">{archetype.code}</p>
                <p className="atelier-archetype-tagline">{archetype.tagline}</p>
                <span className="atelier-archetype-cta" aria-hidden="true">
                  查看完整画像 →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="atelier-archetype-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`archetype-${active.slug}-title`}
        >
          <button
            type="button"
            className="atelier-archetype-backdrop"
            aria-label="关闭画像详情"
            onClick={close}
          />
          <div className="atelier-archetype-dialog-content">
            <button
              type="button"
              className="atelier-archetype-close"
              onClick={close}
              aria-label="关闭"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>

            <div className="atelier-archetype-dialog-grid">
              <div className="atelier-archetype-dialog-image">
                <Image
                  src={active.image}
                  alt={`${active.chinese} 大图`}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>

              <div className="atelier-archetype-dialog-body">
                <p className="atelier-archetype-dialog-eyebrow">
                  {active.code}
                </p>
                <h3
                  id={`archetype-${active.slug}-title`}
                  className="atelier-display atelier-archetype-dialog-title"
                >
                  <span className="atelier-archetype-dialog-emoji" aria-hidden="true">
                    {active.emoji}
                  </span>
                  {active.chinese}
                </h3>
                <p className="atelier-archetype-dialog-english">{active.english}</p>
                <p className="atelier-archetype-dialog-tagline">
                  {active.tagline}
                </p>

                <section className="atelier-archetype-dialog-block">
                  <h4>特征</h4>
                  <ul>
                    {active.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </section>

                <section className="atelier-archetype-dialog-block atelier-archetype-dialog-risk">
                  <h4>风险</h4>
                  <p>{active.risk}</p>
                </section>

                <section className="atelier-archetype-dialog-block">
                  <h4>建议</h4>
                  <ul>
                    {active.advices.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </section>

                <section className="atelier-archetype-dialog-block atelier-archetype-dialog-direction">
                  <h4>适合方向</h4>
                  <p>{active.direction}</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
