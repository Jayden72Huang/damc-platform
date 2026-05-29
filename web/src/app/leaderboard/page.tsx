import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "../sakura.css";
import { Header } from "@/components/sakura/Header";
import { Footer } from "@/components/sakura/Footer";
import { LeaderboardTable } from "@/components/sakura/LeaderboardTable";

const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--sk-font-display",
  display: "swap",
});

const body = Albert_Sans({
  subsets: ["latin"],
  variable: "--sk-font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--sk-font-mono",
  display: "swap",
});

export const metadata = {
  title: "Leaderboard | DAMC.ai",
  description: "DAMC 全球排行榜 — 找到你身边与 Agent 协作最6的人！",
};

export default function LeaderboardPage(): React.ReactNode {
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <section className="sk-section" style={{ minHeight: "70vh" }}>
        <div className="sk-container">
          <div className="sk-section-header">
            <span className="sk-section-num">★</span>
            Leaderboard
          </div>
          <p className="sk-what-intro">
            所有完成 DAMC 扫描并登录 GitHub 的用户按 AI 时代综合分排名。
            找到你身边与 Agent 协作最强的人。
          </p>

          <div className="sk-lb-guide">
            <div className="sk-lb-guide-item">
              <strong>上榜</strong>
              <span>运行 /damc 完成扫描，用 GitHub 登录后自动排名</span>
            </div>
            <div className="sk-lb-guide-sep">·</div>
            <div className="sk-lb-guide-item">
              <strong>建团队</strong>
              <span>点击「+ 创建」，获取邀请码发给队友，组队 PK</span>
            </div>
            <div className="sk-lb-guide-sep">·</div>
            <div className="sk-lb-guide-item">
              <strong>加入团队</strong>
              <span>点击「🔗 加入」，输入邀请码即可查看团队排名</span>
            </div>
          </div>

          <LeaderboardTable />
        </div>
      </section>
      <Footer />
    </main>
  );
}
