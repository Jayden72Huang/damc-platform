import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "../../sakura.css";
import { Header } from "@/components/sakura/Header";
import { Footer } from "@/components/sakura/Footer";
import { ReportCard } from "@/components/sakura/ReportCard";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `DAMC Report ${slug} | DAMC.ai`,
    description: "查看 DAMC AI 时代个人价值评估报告",
    openGraph: {
      title: "DAMC — AI 时代个人价值评估",
      description: "看看 TA 在 AI 时代的真实坐标",
      url: `https://vibergo.space/r/${slug}`,
    },
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <section className="sk-section" style={{ minHeight: "70vh" }}>
        <div className="sk-container">
          <ReportCard slug={slug} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
