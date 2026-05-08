import Image from "next/image";

const archetypes = [
  {
    emoji: "🏆",
    chinese: "AI 架构师",
    code: "高 D · 高 A · 高 M",
    tagline: "你站在 AI 时代的食物链顶端 — 有料、不可替代、还会用 AI。",
    image: "/atelier/archetypes/01.png",
  },
  {
    emoji: "🎯",
    chinese: "待觉醒专家",
    code: "高 D · 高 A · 低 M",
    tagline: "你有钻石级的经验和不可替代性，但还没用 AI 放大它。",
    image: "/atelier/archetypes/03.png",
  },
  {
    emoji: "⚡",
    chinese: "效率怪兽",
    code: "高 D · 低 A · 高 M",
    tagline: "AI 时代的高效执行者 — 但你的工作最容易被纯 AI 替代。",
    image: "/atelier/archetypes/02.png",
  },
  {
    emoji: "🚨",
    chinese: "危险区",
    code: "高 D · 低 A · 低 M",
    tagline: "知识可被蒸馏，又没有不可替代性，还不会用 AI — 立刻行动。",
    image: "/atelier/archetypes/08.png",
  },
  {
    emoji: "🌟",
    chinese: "AI 原生创造者",
    code: "低 D · 高 A · 高 M",
    tagline: "你的价值在于独特的创造力和判断力 — 加上 AI 如虎添翼。",
    image: "/atelier/archetypes/04.png",
  },
  {
    emoji: "💎",
    chinese: "未雕琢的钻石",
    code: "低 D · 高 A · 低 M",
    tagline: "你有不可替代的独特价值，但还没找到用 AI 放大它的方式。",
    image: "/atelier/archetypes/05.png",
  },
  {
    emoji: "🔧",
    chinese: "AI 工具人",
    code: "低 D · 低 A · 高 M",
    tagline: "你很会用 AI 工具 — 但「会用工具」本身在贬值。",
    image: "/atelier/archetypes/06.png",
  },
  {
    emoji: "📚",
    chinese: "探索者",
    code: "低 D · 低 A · 低 M",
    tagline: "刚入职场或正在转型 — 现在是最好的重新定位时机。",
    image: "/atelier/archetypes/07.png",
  },
] as const;

export function Archetypes(): React.ReactNode {
  return (
    <section className="atelier-section" id="archetypes">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">III · 8 种画像</p>
        <h2 className="atelier-display atelier-section-title">
          8 种画像，你是哪一种？
        </h2>
        <p className="atelier-section-sub">
          按 D / A / M 三个维度的高低组合，AI 时代的人群可分为 8 类。每一类都有自己的护城河、风险与下一步。
        </p>

        <div className="atelier-archetype-grid">
          {archetypes.map((archetype) => (
            <article className="atelier-archetype-card" key={archetype.chinese}>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
