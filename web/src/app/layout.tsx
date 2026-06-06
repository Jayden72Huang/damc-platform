import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { LOCALE_COOKIE, localeToHtmlLang, normalizeLocale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: "DAMC.ai | 你的 Agent 体检报告 / Know Your Worth",
  description:
    "一个命令扫描你的 Agent 配置和 git 历史，量化评估 AI 时代的 4 个能力维度。 One command scans your Agent setup and git history to quantify your 4 AI-era capability dimensions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={localeToHtmlLang(locale)}
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col">
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
