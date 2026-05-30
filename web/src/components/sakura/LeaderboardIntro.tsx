"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    intro:
      "所有完成 DAMC 扫描并登录 GitHub 的用户按 AI 时代综合分排名。找到你身边与 Agent 协作最强的人。",
    rankTitle: "上榜",
    rankDesc: "运行 /damc 完成扫描，用 GitHub 登录后自动排名",
    createTitle: "建团队",
    createDesc: "点击「+ 创建」，获取邀请码发给队友，组队 PK",
    joinTitle: "加入团队",
    joinDesc: "点击「🔗 加入」，输入邀请码即可查看团队排名",
  },
  en: {
    intro:
      "Everyone who completes a DAMC scan and signs in with GitHub is ranked by their AI-era overall score. Find the strongest Agent collaborators around you.",
    rankTitle: "Get ranked",
    rankDesc: "Run /damc to scan, then sign in with GitHub to rank automatically",
    createTitle: "Create a team",
    createDesc: 'Click "+ Create", get an invite code, and send it to your teammates to compete',
    joinTitle: "Join a team",
    joinDesc: 'Click "🔗 Join" and enter an invite code to see your team ranking',
  },
};

export function LeaderboardIntro(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <>
      <p className="sk-what-intro">{c.intro}</p>

      <div className="sk-lb-guide">
        <div className="sk-lb-guide-item">
          <strong>{c.rankTitle}</strong>
          <span>{c.rankDesc}</span>
        </div>
        <div className="sk-lb-guide-sep">·</div>
        <div className="sk-lb-guide-item">
          <strong>{c.createTitle}</strong>
          <span>{c.createDesc}</span>
        </div>
        <div className="sk-lb-guide-sep">·</div>
        <div className="sk-lb-guide-item">
          <strong>{c.joinTitle}</strong>
          <span>{c.joinDesc}</span>
        </div>
      </div>
    </>
  );
}
