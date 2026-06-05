import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier Noir | DAMC.ai",
  description: "DAMC.ai Agent 时代能力测评的 Atelier Noir 风格落地页。",
};

export default function AtelierLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactNode {
  return <>{children}</>;
}
