import Image from "next/image";

const archetypes = [
  { emoji: "🏆", name: "AI 架构师", code: "D↑ A↑ M↑", desc: "全能型选手，既能驾驭 AI 又有不可替代的核心能力", image: "/atelier/archetypes/01.png" },
  { emoji: "🎯", name: "待觉醒专家", code: "D↑ A↑ M↓", desc: "深厚专业底蕴，一旦学会用 AI 就是王炸", image: "/atelier/archetypes/03.png" },
  { emoji: "⚡", name: "效率怪兽", code: "D↑ A↓ M↑", desc: "AI 用得飞起，但缺少不可替代的独特优势", image: "/atelier/archetypes/02.png" },
  { emoji: "🚨", name: "危险区", code: "D↑ A↓ M↓", desc: "工作容易被 AI 替代，又还没学会用 AI", image: "/atelier/archetypes/08.png" },
  { emoji: "🌟", name: "AI 原生创造者", code: "D↓ A↑ M↑", desc: "AI 时代的创作者，用 AI 放大独特创造力", image: "/atelier/archetypes/04.png" },
  { emoji: "💎", name: "未雕琢的钻石", code: "D↓ A↑ M↓", desc: "有独特天赋，还没被发掘和放大", image: "/atelier/archetypes/05.png" },
  { emoji: "🔧", name: "AI 工具人", code: "D↓ A↓ M↑", desc: "会用 AI 工具但缺乏深度，容易被更便宜的人替代", image: "/atelier/archetypes/06.png" },
  { emoji: "📚", name: "探索者", code: "D↓ A↓ M↓", desc: "刚开始探索 AI 世界，潜力无限", image: "/atelier/archetypes/07.png" },
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
          DAMC 根据三个维度的高低组合把你归入 8 种画像：<strong>D（蒸馏价值）</strong>= 你的工作有多容易被 AI 学走；<strong>A（反蒸馏）</strong>= 你有多少 AI 拿不走的能力；<strong>M（AI 驾驭力）</strong>= 你用 AI 有多溜。找到自己的画像，就知道该往哪个方向发力。
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
                <div className="sk-archetype-desc">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
