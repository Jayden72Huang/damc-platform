import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";

import "./sakura.css";
import { Header } from "@/components/sakura/Header";
import { Hero } from "@/components/sakura/Hero";
import { WhatIsDamc } from "@/components/sakura/WhatIsDamc";
import { Benefits } from "@/components/sakura/Benefits";
import { Archetypes } from "@/components/sakura/Archetypes";
import { HowToUse } from "@/components/sakura/HowToUse";
import { SocialProof } from "@/components/sakura/SocialProof";
import { Pricing } from "@/components/sakura/Pricing";
import { FinalCTA } from "@/components/sakura/FinalCTA";
import { Footer } from "@/components/sakura/Footer";

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

export default function Home(): React.ReactNode {
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <Hero />
      <WhatIsDamc />
      <Benefits />
      <Archetypes />
      <HowToUse />
      <SocialProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
