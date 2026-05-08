import Image from "next/image";

const installCommand = "npx skills add Jayden72Huang/damc-skill";

export function Hero(): React.ReactNode {
  return (
    <section className="atelier-hero">
      <div className="atelier-container">
        <div className="atelier-hero-inner">
          <div>
            <p className="atelier-eyebrow">AGENT 时代的能力测评</p>
            <h1 className="atelier-display atelier-hero-title">
              你的 Agent
              <br />
              <span className="atelier-accent">体检报告</span>
            </h1>
            <p className="atelier-hero-subtitle">
              在 AI 时代，看清你的真实坐标。一个命令，扫描你的 Agent
              配置和 git 历史，量化评估 4 个维度。
            </p>
            <div className="atelier-hero-actions">
              <a className="atelier-button atelier-button-primary" href="#pricing">
                立即免费体检
              </a>
              <a className="atelier-text-link" href="#archetypes">
                查看示例报告
              </a>
            </div>
            <div className="atelier-code-row" aria-label="安装命令">
              <span className="atelier-code atelier-code-prompt">$</span>
              <span className="atelier-code">{installCommand}</span>
            </div>
          </div>

          <div className="atelier-cover-card">
            <Image
              src="/atelier/hero-agent.png"
              alt="DAMC Agent 体检报告封面"
              fill
              priority
              sizes="(max-width: 1100px) 520px, 42vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
