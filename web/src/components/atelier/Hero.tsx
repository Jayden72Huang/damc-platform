import Image from "next/image";
import { ShinyText } from "./ShinyText";
import { CopyButton } from "./CopyButton";

const installCommand = "npx skills add Jayden72Huang/damc-skill";

export function Hero(): React.ReactNode {
  return (
    <section className="atelier-hero">
      <div className="atelier-container">
        <div className="atelier-hero-inner">
          <div>
            <p className="atelier-eyebrow">AGENT 时代的能力测评</p>
            <h1 className="atelier-display atelier-hero-title">
              <ShinyText
                text="你的 Agent"
                speed={4}
                color="#F2EFE7"
                shineColor="#FFFFFF"
                spread={220}
              />
              <br />
              <span className="atelier-accent">
                <ShinyText
                  text="体检报告"
                  speed={4}
                  delay={0.6}
                  color="#C9A96E"
                  shineColor="#F4D58A"
                  spread={200}
                />
              </span>
            </h1>
            <p className="atelier-hero-subtitle">
              看清你的 AI 时代个人价值。
            </p>
            <div className="atelier-hero-actions">
              <a className="atelier-button atelier-button-primary" href="#process">
                立即免费体检
              </a>
              <a className="atelier-text-link" href="#sample">
                查看示例报告
              </a>
            </div>
            <div className="atelier-code-row" aria-label="安装命令">
              <span className="atelier-code atelier-code-prompt">$</span>
              <span className="atelier-code">{installCommand}</span>
              <CopyButton text={installCommand} />
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
