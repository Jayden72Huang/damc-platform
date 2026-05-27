import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";

import "../sakura.css";
import "./marketplace.css";
import { Header } from "@/components/sakura/Header";
import { Footer } from "@/components/sakura/Footer";
import { MarketplaceContent } from "@/components/sakura/MarketplaceContent";

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

export default function MarketplacePage(): React.ReactNode {
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <MarketplaceContent />
      <Footer />
    </main>
  );
}
