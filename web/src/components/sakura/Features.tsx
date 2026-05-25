const features = [
  {
    icon: "📈",
    title: "进度追踪",
    desc: "每次扫描自动保存历史记录。看到你的 D/A/M/C 分数如何随时间变化，量化你的成长轨迹。不再是一次性测试，而是持续的能力监控仪表盘。",
    tag: "Progress Tracking",
    tagColor: "var(--color-d)",
    stripColor: "var(--color-d)",
  },
  {
    icon: "🧠",
    title: "智能推荐",
    desc: "基于你的弱项维度，AI 自动推荐下一步该学什么 Skill、该强化哪项能力。不是泛泛的建议，而是针对你当前分数量身定制的行动方案。",
    tag: "Smart Recommendations",
    tagColor: "var(--color-m)",
    stripColor: "var(--color-m)",
  },
  {
    icon: "🏆",
    title: "团队排行榜",
    desc: "绑定公司或社群群组，看看谁是你身边与 Agent 协作最强的人。分享你的 Skill、互相学习，让 AI 协作能力变成团队的共同语言。",
    tag: "Team Leaderboard",
    tagColor: "var(--color-a)",
    stripColor: "var(--color-a)",
  },
] as const;

export function Features(): React.ReactNode {
  return (
    <section className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">02</span>
          不只是测试，是成长引擎
        </div>

        <div className="sk-feature-grid">
          {features.map((f) => (
            <div key={f.title} className="sk-card">
              <div
                className="sk-card-strip"
                style={{ background: f.stripColor }}
              />
              <div className="sk-card-body">
                <span className="sk-feature-icon">{f.icon}</span>
                <div className="sk-feature-title">{f.title}</div>
                <div className="sk-feature-desc">{f.desc}</div>
                <span
                  className="sk-feature-tag"
                  style={{ color: f.tagColor, borderColor: f.tagColor }}
                >
                  {f.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
