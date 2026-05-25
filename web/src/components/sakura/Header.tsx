"use client";

import { useEffect, useState } from "react";

interface UserSession {
  name: string | null;
  image: string | null;
}

export function Header(): React.ReactNode {
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
            <a href="/#what">About</a>
            <a href="/leaderboard">Leaderboard</a>
            {user ? (
              <>
                <a href="/dashboard">Dashboard</a>
                <div className="sk-auth-area">
                  {user.image ? (
                    <img src={user.image} alt="" className="sk-auth-avatar" />
                  ) : null}
                  <span className="sk-auth-name">{user.name}</span>
                  <a href="/api/auth/signout" className="sk-auth-signout">
                    Logout
                  </a>
                </div>
              </>
            ) : (
              <a href="/login" className="sk-nav-cta">
                Sign In
              </a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
