const painPoints = [
  "🤔 我在 AI 时代的位置到底在哪？",
  "🎯 我的能力护城河是什么？",
  "🚀 下一步该学什么、该往哪走？",
] as const;

export function PainPoints(): React.ReactNode {
  return (
    <section className="sk-section">
      <div className="sk-container">
        <p className="sk-pain-quote">
          你不是怕被 AI 取代，
          <br />
          而是不知道自己在哪。
        </p>
        <p className="sk-pain-sub">
          95% 的人对自己在 Agent 时代的位置一无所知。
        </p>

        <div className="sk-pain-grid">
          {painPoints.map((item) => (
            <div key={item} className="sk-pain-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
