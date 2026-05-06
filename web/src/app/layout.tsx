import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAMC.ai | 你的 Agent 体检报告",
  description:
    "一个命令扫描你的 Agent 配置和 git 历史，量化评估 AI 时代的 4 个能力维度。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
