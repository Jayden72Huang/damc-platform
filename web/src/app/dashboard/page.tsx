import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "../sakura.css";
import { Header } from "@/components/sakura/Header";
import { Footer } from "@/components/sakura/Footer";
import { DashboardContent } from "@/components/sakura/DashboardContent";

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
  title: "Dashboard | DAMC.ai",
  description: "你的 DAMC 评估历史和分数趋势",
};

export default function DashboardPage(): React.ReactNode {
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <section className="sk-section" style={{ minHeight: "70vh" }}>
        <div className="sk-container">
          <div className="sk-section-header">
            <span className="sk-section-num">◆</span>
            Dashboard
          </div>
          <DashboardContent />
        </div>
      </section>
      <Footer />
    </main>
  );
}
