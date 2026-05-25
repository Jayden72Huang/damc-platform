const features = [
  {
    num: "01",
    title: "进度追踪",
    subtitle: "Progress Tracking",
    desc: "每次扫描自动保存历史。看到 D/A/M/C 如何随时间变化，量化你的成长。",
    detail: "本地存储 ~/.claude/damc-history/，隐私安全。",
  },
  {
    num: "02",
    title: "智能推荐",
    subtitle: "Smart Recommendations",
    desc: "基于弱项维度，AI 自动推荐该学什么 Skill、该强化哪项能力。",
    detail: "不是泛泛建议，而是针对你的分数量身定制。",
  },
  {
    num: "03",
    title: "团队排行榜",
    subtitle: "Team Leaderboard",
    desc: "找到你身边与 Agent 协作最6的人！绑定公司群组，互相学习。",
    detail: "分享 Skill、对比成长、建立 AI 协作文化。",
  },
] as const;

export function V2Features(): React.ReactNode {
  return (
    <div className="atelier-section atelier-sample">
      <div className="atelier-container">
        <span className="atelier-section-eyebrow">What&apos;s New in V2</span>

        <h2 className="atelier-section-title">
          不只是测试，
          <br />
          是<span className="atelier-accent"> 成长引擎</span>
        </h2>

        <p className="atelier-section-sub">
          DAMC v2 从一次性评估进化为持续陪伴平台。
          追踪 → 推荐 → 比较 → 成长，形成正向飞轮。
        </p>

        <div
          className="atelier-process-grid"
          style={{ gap: 28 }}
        >
          {features.map((f) => (
            <div key={f.num} className="atelier-process-card">
              <div className="atelier-process-number atelier-display">
                {f.num}
              </div>
              <h3 className="atelier-process-title atelier-display">
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--gold)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  marginBottom: 12,
                }}
              >
                {f.subtitle}
              </p>
              <p className="atelier-process-copy">{f.desc}</p>
              <p
                style={{
                  color: "var(--text-dim)",
                  fontSize: 12,
                  lineHeight: 1.6,
                  borderTop: "1px dashed var(--border)",
                  paddingTop: 12,
                  marginTop: 8,
                }}
              >
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
