export function SocialProof(): React.ReactNode {
  return (
    <section id="ecosystem" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">05</span>
          Ecosystem
        </div>

        <p className="sk-section-intro">
          DAMC 不只是一次测评。围绕你的评估结果，我们构建了<strong>技能交易</strong>和<strong>团队协作</strong>两个延伸场景，让评估结果真正产生价值。
        </p>

        <div className="sk-eco-grid">
          <div className="sk-eco-card">
            <div className="sk-eco-icon">🏪</div>
            <h3 className="sk-eco-title">SeKill 技能商城</h3>
            <p className="sk-eco-desc">
              扫描你本地的 Claude Code Skills，AI 自动评估每个 Skill 的商业价值并给出 SeKill Score。高分 Skill 可以一键上架，让别人付费使用你的工作流。
            </p>
            <ul className="sk-eco-list">
              <li>自动扫描本地 Skills 并估值</li>
              <li>SeKill Score 商业潜力评分</li>
              <li>一键上架，分享或出售</li>
            </ul>
            <a href="/marketplace" className="sk-process-link">
              浏览商城 →
            </a>
          </div>

          <div className="sk-eco-card">
            <div className="sk-eco-icon">👥</div>
            <h3 className="sk-eco-title">团队排行与协作</h3>
            <p className="sk-eco-desc">
              创建或加入一个团队，所有成员的 DAMC 分数汇总到同一个排行榜。看看谁是团队里的 AI 高手，互相学习对方的高分 Skill。
            </p>
            <ul className="sk-eco-list">
              <li>创建团队，邀请成员加入</li>
              <li>团队内 DAMC 排名对比</li>
              <li>高手 Skill 互相分享学习</li>
            </ul>
            <a href="/leaderboard" className="sk-process-link">
              查看排行榜 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
