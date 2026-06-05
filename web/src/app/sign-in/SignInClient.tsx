"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShinyText } from "@/components/atelier/ShinyText";

const benefits = [
  { kind: "保存", body: "把每一份匿名报告认领到账户，永久保留" },
  { kind: "复测", body: "每月自动重测，看 D / A / M / C 进步曲线" },
  { kind: "Coach", body: "解锁 24/7 AI 教练，基于你的画像给周计划" },
] as const;

export function SignInClient(): React.ReactNode {
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";
  const errorMsg = params.get("error");
  const [pending, setPending] = useState(false);

  async function handleGitHub() {
    setPending(true);
    await signIn("github", { callbackUrl: next });
  }

  return (
    <div className="atelier-root atelier-signin-root">
      <main className="atelier-signin">
        <div className="atelier-signin-grid">
          <aside className="atelier-signin-aside" aria-hidden="true">
            <div className="atelier-signin-aside-image">
              <Image
                src="/atelier/hero-agent.png"
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="atelier-signin-aside-overlay" />
            </div>
            <div className="atelier-signin-aside-copy">
              <p className="atelier-section-eyebrow">Atelier Noir · Vault</p>
              <h2 className="atelier-display atelier-signin-aside-title">
                <ShinyText
                  text="把你的画像"
                  speed={5}
                  color="#F2EFE7"
                  shineColor="#FFFFFF"
                  spread={220}
                />
                <br />
                <span className="atelier-accent">
                  <ShinyText
                    text="锁进 Vault。"
                    speed={5}
                    delay={0.4}
                    color="#C9A96E"
                    shineColor="#F4D58A"
                    spread={200}
                  />
                </span>
              </h2>
              <p className="atelier-signin-aside-sub">
                Hermès Birkin 的锁芯 — 原始内容永不上传，分数永不二次使用。
              </p>
            </div>
          </aside>

          <section className="atelier-signin-card">
            <p className="atelier-section-eyebrow">Sign In · DAMC.AI</p>
            <h1 className="atelier-display atelier-signin-title">
              用 GitHub 登录
            </h1>
            <p className="atelier-signin-sub">
              无需密码，关联你的所有 Agent 体检报告与历史复测。
            </p>

            <ul className="atelier-signin-benefits">
              {benefits.map((b) => (
                <li key={b.kind}>
                  <span className="atelier-signin-benefit-dot" aria-hidden="true" />
                  <span className="atelier-signin-benefit-kind">{b.kind}</span>
                  <span className="atelier-signin-benefit-body">{b.body}</span>
                </li>
              ))}
            </ul>

            {errorMsg ? (
              <p className="atelier-signin-error" role="alert">
                登录失败：{errorMsg}
              </p>
            ) : null}

            <button
              type="button"
              className="atelier-button atelier-button-primary atelier-signin-btn"
              disabled={pending}
              onClick={handleGitHub}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.77 1.06.77 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              <span>{pending ? "正在跳转 GitHub..." : "用 GitHub 登录"}</span>
            </button>

            <div className="atelier-signin-divider" aria-hidden="true">
              <span />
              <span>或</span>
              <span />
            </div>

            <a className="atelier-text-link atelier-signin-skip" href="/atelier#process">
              先看看 5 步怎么用 →
            </a>

            <p className="atelier-signin-fineprint">
              登录即表示你同意我们的隐私承诺：原始内容永不上传，分数永不二次使用。{" "}
              <a href="/atelier#privacy">查看完整隐私承诺</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
