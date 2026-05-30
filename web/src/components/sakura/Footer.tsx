"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: { privacy: "隐私政策", terms: "服务条款" },
  en: { privacy: "Privacy", terms: "Terms" },
};

export function Footer(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <footer className="sk-footer">
      <div className="sk-container">
        <div className="sk-footer-inner">
          <span className="sk-footer-text">
            © 2026 DAMC.ai · Powered by DAMC Model
          </span>
          <div className="sk-footer-links">
            <a href="https://github.com/Jayden72Huang/DAMC">GitHub</a>
            <a href="#privacy">{c.privacy}</a>
            <a href="#pricing">{c.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
