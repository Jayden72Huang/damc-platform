import Image from "next/image";

const archetypes = [
  { emoji: "🏆", name: "AI 架构师", code: "D↑ A↑ M↑", image: "/atelier/archetypes/01.png" },
  { emoji: "🎯", name: "待觉醒专家", code: "D↑ A↑ M↓", image: "/atelier/archetypes/03.png" },
  { emoji: "⚡", name: "效率怪兽", code: "D↑ A↓ M↑", image: "/atelier/archetypes/02.png" },
  { emoji: "🚨", name: "危险区", code: "D↑ A↓ M↓", image: "/atelier/archetypes/08.png" },
  { emoji: "🌟", name: "AI 原生创造者", code: "D↓ A↑ M↑", image: "/atelier/archetypes/04.png" },
  { emoji: "💎", name: "未雕琢的钻石", code: "D↓ A↑ M↓", image: "/atelier/archetypes/05.png" },
  { emoji: "🔧", name: "AI 工具人", code: "D↓ A↓ M↑", image: "/atelier/archetypes/06.png" },
  { emoji: "📚", name: "探索者", code: "D↓ A↓ M↓", image: "/atelier/archetypes/07.png" },
] as const;

export function Archetypes(): React.ReactNode {
  return (
    <section id="archetypes" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">03</span>
          8 种画像，你是哪一种？
        </div>
        <p className="sk-section-sub">
          按 D / A / M 三个维度的高低组合，AI 时代的人群可分为 8 类。每一类都有自己的护城河、风险与下一步。
        </p>

        <div className="sk-archetype-grid">
          {archetypes.map((a) => (
            <div key={a.name} className="sk-archetype-card">
              <div className="sk-archetype-img">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="sk-archetype-info">
                <span className="sk-archetype-emoji">{a.emoji}</span>
                <div className="sk-archetype-name">{a.name}</div>
                <div className="sk-archetype-code">{a.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
