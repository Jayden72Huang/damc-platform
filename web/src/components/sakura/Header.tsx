"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/I18nProvider";
import { LanguageToggle } from "./LanguageToggle";

interface UserSession {
  name: string | null;
  image: string | null;
}

const COPY = {
  zh: {
    about: "关于",
    sekill: "技能市场",
    leaderboard: "排行榜",
    dashboard: "控制台",
    signIn: "登录",
    logout: "退出",
  },
  en: {
    about: "About",
    sekill: "SeKill",
    leaderboard: "Leaderboard",
    dashboard: "Dashboard",
    signIn: "Sign In",
    logout: "Logout",
  },
};

export function Header(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    function onScroll(): void {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <header className={`sk-header${scrolled ? " sk-header-scrolled" : ""}`}>
      <div className="sk-container">
        <div className="sk-header-inner">
          <a href="/" className="sk-logo">
            <span className="sk-logo-dot" style={{ background: "var(--color-d)" }} />
            <span className="sk-logo-dot" style={{ background: "var(--color-a)" }} />
            <span className="sk-logo-dot" style={{ background: "var(--color-m)" }} />
            <span className="sk-logo-dot" style={{ background: "var(--color-c)" }} />
            DAMC
          </a>
          <nav className="sk-nav">
            <a href="/#what">{c.about}</a>
            <a href="/marketplace">{c.sekill}</a>
            <a href="/leaderboard">{c.leaderboard}</a>
            {user ? (
              <>
                <a href="/dashboard">{c.dashboard}</a>
                <div className="sk-auth-area">
                  {user.image ? (
                    <img src={user.image} alt="" className="sk-auth-avatar" />
                  ) : null}
                  <span className="sk-auth-name">{user.name}</span>
                  <a href="/api/auth/signout" className="sk-auth-signout">
                    {c.logout}
                  </a>
                </div>
              </>
            ) : (
              <a href="/login" className="sk-nav-cta">
                {c.signIn}
              </a>
            )}
            <LanguageToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
