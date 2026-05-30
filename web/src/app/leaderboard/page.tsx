import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "../sakura.css";
import { Header } from "@/components/sakura/Header";
import { Footer } from "@/components/sakura/Footer";
import { LeaderboardTable } from "@/components/sakura/LeaderboardTable";
import { LeaderboardIntro } from "@/components/sakura/LeaderboardIntro";

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
          <LeaderboardIntro />

          <LeaderboardTable />
        </div>
      </section>
      <Footer />
    </main>
  );
}
