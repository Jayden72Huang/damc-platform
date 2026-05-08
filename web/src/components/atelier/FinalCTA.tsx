const installCommand = "npx skills add Jayden72Huang/damc-skill";

export function FinalCTA(): React.ReactNode {
  return (
    <section className="atelier-final" id="get-started">
      <div className="atelier-container">
        <h2 className="atelier-display atelier-final-title">
          30 秒，拿到你的第一份 Agent 体检。
        </h2>
        <p className="atelier-final-sub">
          不收集邮箱，不需要登录。一行命令，扫描你的 Claude Code 环境，立刻看到 D / A / M / C 4 维分数。
        </p>

        <div className="atelier-final-actions">
          <a className="atelier-button atelier-button-primary" href="#process">
            立即免费体检
          </a>
          <div className="atelier-code-row" aria-label="安装命令">
            <span className="atelier-code atelier-code-prompt">$</span>
            <span className="atelier-code">{installCommand}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
