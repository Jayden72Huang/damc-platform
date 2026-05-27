export function Pricing(): React.ReactNode {
  return (
    <section id="pricing" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">06</span>
          Pricing
        </div>

        <div className="sk-pricing-free">
          <div className="sk-pricing-free-badge">FREE</div>
          <h3 className="sk-pricing-free-title">完全免费，开箱即用</h3>
          <p className="sk-pricing-free-desc">
            DAMC 目前处于公测阶段，所有功能免费开放。安装 Skill 即可体验完整的 4 维评估、22 子维度报告、画像匹配和团队排行。
          </p>
          <ul className="sk-pricing-free-list">
            <li>4 维总分 + 22 子维度拆解</li>
            <li>AI 时代画像匹配</li>
            <li>护城河识别 + 可蒸馏清单</li>
            <li>团队排行榜</li>
            <li>SeKill 商城浏览</li>
          </ul>
          <a href="#get-started" className="sk-stamp" style={{ fontSize: 16, padding: "12px 32px" }}>
            立即免费体检
          </a>
        </div>
      </div>
    </section>
  );
}
