import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import "./atelier.css";

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
  title: "Atelier Noir | DAMC.ai",
  description: "DAMC.ai Agent 时代能力测评的 Atelier Noir 风格落地页。",
};

export default function AtelierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <section
      className={`dark ${display.variable} ${numbers.variable} ${body.variable} ${code.variable}`}
    >
      {children}
    </section>
  );
}
