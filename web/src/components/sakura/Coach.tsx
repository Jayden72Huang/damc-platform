const bullets = [
  "知道你的 DAMC 画像，对话有上下文",
  "每周自动重扫你的环境，量化你的进步",
  "90 天能力强化路径，每周可执行任务",
  "智能推荐你下一步该学的 Skill",
] as const;

export function Coach(): React.ReactNode {
  return (
    <section id="coach" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">06</span>
          AI Coach
        </div>

        <div className="sk-coach-grid">
          <div>
            <h3 className="sk-coach-title">
              不是一份报告，
              <br />
              是你的 24/7 AI 教练
            </h3>
            <ul className="sk-coach-list">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="sk-coach-demo">
            <div className="sk-coach-demo-header">
              <div
                className="sk-coach-demo-dot"
                style={{ background: "var(--color-d)" }}
              />
              <div
                className="sk-coach-demo-dot"
                style={{ background: "var(--color-a)" }}
              />
              <div
                className="sk-coach-demo-dot"
                style={{ background: "var(--color-m)" }}
              />
              <span className="sk-coach-demo-title">DAMC Coach</span>
            </div>
            <div className="sk-coach-demo-body">
              我看到你 M 分这周 +5 了，说明你装的那 3 个 skill
              已经在用了。下一步建议把你那个 SEO 方法论做成 skill —
              你的 D 分还有空间。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
