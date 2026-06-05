import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Header } from "@/components/atelier/Header";
import "./globals.css";
import "./atelier/atelier.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const numbers = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-numbers",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const code = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DAMC.ai | 你的 Agent 体检报告",
  description:
    "一个命令扫描你的 Agent 配置和 git 历史，量化评估 AI 时代的 4 个能力维度。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`dark h-full scroll-smooth antialiased ${display.variable} ${numbers.variable} ${body.variable} ${code.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
