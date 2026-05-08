import Image from "next/image";

const bullets = [
  "知道你的 DAMC 画像，对话天然带着上下文。",
  "每周重扫你的环境，把进步变成可见的数字。",
  "90 天能力强化路径，每周给出可执行任务。",
  "根据你的职业方向，持续调整学习和蒸馏重点。",
] as const;

export function Coach(): React.ReactNode {
  return (
    <section className="atelier-section" id="coach">
      <div className="atelier-container">
        <div className="atelier-coach-grid">
          <div>
            <h2 className="atelier-display atelier-coach-title">
              不是一份报告，是一个 24/7 的 AI 教练。
            </h2>
            <ul className="atelier-coach-list">
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="atelier-coach-dot" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="atelier-coach-aside">
            <div className="atelier-coach-portrait">
              <Image
                src="/atelier/coach-portrait.png"
                alt="DAMC Coach 肖像"
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
              />
            </div>
            <aside className="atelier-dialog-card" aria-label="DAMC Coach 对话示例">
              <p className="atelier-display atelier-dialog-text">
                我看到你的 M 分这周上升了 5 分。下一步，不是多装工具，而是把你最稳定的 SEO 判断流程蒸馏成 Skill。
              </p>
              <p className="atelier-dialog-signature">— DAMC Coach</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
