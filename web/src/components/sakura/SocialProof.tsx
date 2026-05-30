"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    intro: (
      <>
        DAMC 不只是一次测评。围绕你的评估结果，我们构建了<strong>技能交易</strong>和<strong>团队协作</strong>两个延伸场景，让评估结果真正产生价值。
      </>
    ),
    sekillTitle: "SeKill 技能商城",
    sekillDesc:
      "扫描你本地的 Claude Code Skills，AI 自动评估每个 Skill 的商业价值并给出 SeKill Score。高分 Skill 可以一键上架，让别人付费使用你的工作流。",
    sekillList: [
      "自动扫描本地 Skills 并估值",
      "SeKill Score 商业潜力评分",
      "一键上架，分享或出售",
    ],
    sekillCta: "浏览商城 →",
    teamTitle: "团队排行与协作",
    teamDesc:
      "创建或加入一个团队，所有成员的 DAMC 分数汇总到同一个排行榜。看看谁是团队里的 AI 高手，互相学习对方的高分 Skill。",
    teamList: [
      "创建团队，邀请成员加入",
      "团队内 DAMC 排名对比",
      "高手 Skill 互相分享学习",
    ],
    teamCta: "查看排行榜 →",
  },
  en: {
    intro: (
      <>
        DAMC is more than a one-time test. Around your results we built two follow-on layers — <strong>a skill marketplace</strong> and <strong>team collaboration</strong> — so your assessment actually creates value.
      </>
    ),
    sekillTitle: "SeKill Marketplace",
    sekillDesc:
      "Scan your local Claude Code Skills and let AI value each one with a SeKill Score. High-scoring Skills can be listed in one click so others pay to use your workflows.",
    sekillList: [
      "Auto-scan and value local Skills",
      "SeKill Score for commercial potential",
      "List in one click — share or sell",
    ],
    sekillCta: "Browse marketplace →",
    teamTitle: "Team Rankings & Collaboration",
    teamDesc:
      "Create or join a team and pool every member's DAMC score into one leaderboard. See who's the AI pro on your team and learn from each other's top Skills.",
    teamList: [
      "Create a team and invite members",
      "Compare DAMC rankings within the team",
      "Share and learn from top Skills",
    ],
    teamCta: "View leaderboard →",
  },
};

export function SocialProof(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section id="ecosystem" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">05</span>
          Ecosystem
        </div>

        <p className="sk-section-intro">{c.intro}</p>

        <div className="sk-eco-grid">
          <div className="sk-eco-card">
            <div className="sk-eco-icon">🏪</div>
            <h3 className="sk-eco-title">{c.sekillTitle}</h3>
            <p className="sk-eco-desc">{c.sekillDesc}</p>
            <ul className="sk-eco-list">
              {c.sekillList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="/marketplace" className="sk-process-link">
              {c.sekillCta}
            </a>
          </div>

          <div className="sk-eco-card">
            <div className="sk-eco-icon">👥</div>
            <h3 className="sk-eco-title">{c.teamTitle}</h3>
            <p className="sk-eco-desc">{c.teamDesc}</p>
            <ul className="sk-eco-list">
              {c.teamList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="/leaderboard" className="sk-process-link">
              {c.teamCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
