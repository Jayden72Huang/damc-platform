import Image from "next/image";

const scores = [
  { letter: "D", title: "蒸馏价值", value: 78 },
  { letter: "A", title: "抗蒸馏", value: 62 },
  { letter: "M", title: "AI 驾驭", value: 85 },
  { letter: "C", title: "职业适配", value: 65 },
] as const;

const insights = [
  { kind: "护城河", body: "跨域综合力 + 信任资产 — 你的判断难以被蒸馏。" },
  { kind: "可蒸馏", body: "SEO 工作流 / 内容审稿规则 — 立刻沉淀为自建 Skill。" },
  { kind: "Top 风险", body: "情商权重略低，建议在协作型项目中刻意练习。" },
] as const;

export function SampleReport(): React.ReactNode {
  return (
    <section className="atelier-section atelier-sample" id="sample">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">示例报告 · SAMPLE</p>
        <h2 className="atelier-display atelier-section-title">
          报告长这样 — 一份你愿意分享的画像。
        </h2>
        <p className="atelier-section-sub">
          以下是「AI 架构师」画像的部分截图。Free 版只显示 4 维总分与画像；Insight 版解锁全部 22 子维度、可蒸馏清单与 90 天行动路径。
        </p>

        <div className="atelier-sample-grid">
          <div className="atelier-sample-cover">
            <Image
              src="/atelier/hero-agent.png"
              alt="DAMC 报告示例封面"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>

          <div className="atelier-sample-body">
            <div className="atelier-sample-meta">
              <span className="atelier-sample-archetype">🏆 AI 架构师</span>
              <span className="atelier-sample-grade">等级 A · 高价值 AI 协作者</span>
            </div>

            <ul className="atelier-sample-bars">
              {scores.map((score) => (
                <li className="atelier-sample-bar" key={score.letter}>
                  <span className="atelier-sample-bar-letter">{score.letter}</span>
                  <span className="atelier-sample-bar-title">{score.title}</span>
                  <span className="atelier-sample-bar-track">
                    <span
                      className="atelier-sample-bar-fill"
                      style={{ width: `${score.value}%` }}
                    />
                  </span>
                  <span className="atelier-numbers atelier-sample-bar-value">
                    {score.value}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="atelier-sample-insights">
              {insights.map((insight) => (
                <li key={insight.kind}>
                  <span className="atelier-sample-insight-kind">{insight.kind}</span>
                  <span className="atelier-sample-insight-body">{insight.body}</span>
                </li>
              ))}
            </ul>

            <div className="atelier-sample-actions">
              <a className="atelier-button atelier-button-primary" href="#pricing">
                解锁完整报告
              </a>
              <a className="atelier-text-link" href="#process">
                看一下是怎么生成的
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
