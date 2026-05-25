import {
  Big_Shoulders,
  Albert_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "../sakura.css";
import { Header } from "@/components/sakura/Header";
import { LoginForm } from "@/components/sakura/LoginForm";

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
  title: "Login | DAMC.ai",
};

export default function LoginPage(): React.ReactNode {
  return (
    <main
      className={`sakura-root ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <Header />
      <section
        className="sk-section"
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="sk-container">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
