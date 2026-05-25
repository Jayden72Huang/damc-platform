const archetypes = [
  { emoji: "🏆", name: "AI 架构师", code: "D↑ A↑ M↑" },
  { emoji: "🛠️", name: "AI 工匠", code: "D↑ A↓ M↑" },
  { emoji: "🧭", name: "AI 引路人", code: "D↓ A↑ M↑" },
  { emoji: "🎨", name: "创意原住民", code: "D↓ A↑ M↓" },
  { emoji: "📚", name: "经验沉淀者", code: "D↑ A↑ M↓" },
  { emoji: "🚀", name: "AI 早期玩家", code: "D↓ A↓ M↑" },
  { emoji: "🌱", name: "待觉醒者", code: "D↑ A↓ M↓" },
  { emoji: "⚠️", name: "高危区", code: "D↓ A↓ M↓" },
] as const;

export function Archetypes(): React.ReactNode {
  return (
    <section id="archetypes" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">03</span>
          8 种画像，你是哪一种？
        </div>

        <div className="sk-archetype-grid">
          {archetypes.map((a) => (
            <div key={a.name} className="sk-archetype-card">
              <span className="sk-archetype-emoji">{a.emoji}</span>
              <div className="sk-archetype-name">{a.name}</div>
              <div className="sk-archetype-code">{a.code}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
