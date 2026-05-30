"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

const links = [
  { label: { zh: "GitHub · Skill", en: "GitHub · Skill" }, href: "https://github.com/Jayden72Huang/damc-skill" },
  { label: { zh: "GitHub · Platform", en: "GitHub · Platform" }, href: "https://github.com/Jayden72Huang/damc-platform" },
  { label: { zh: "隐私承诺", en: "Privacy" }, href: "#privacy" },
  { label: { zh: "FAQ", en: "FAQ" }, href: "#faq" },
] as const;

const COPY = {
  zh: {
    tagline:
      "Agent 时代的能力测评 — 不是恐吓你会被取代，而是帮你看清自己的真实坐标。",
  },
  en: {
    tagline:
      "Capability assessment for the Agent era — not to scare you about replacement, but to help you see where you truly stand.",
  },
};

export function Footer(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <footer className="atelier-footer">
      <div className="atelier-container">
        <div className="atelier-footer-inner">
          <div>
            <p className="atelier-footer-brand">DAMC.ai · Atelier Noir</p>
            <p className="atelier-footer-tagline">{c.tagline}</p>
          </div>
          <nav className="atelier-footer-links" aria-label="Footer">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label[locale]}
              </a>
            ))}
          </nav>
        </div>
        <p className="atelier-footer-copy">© 2026 DAMC.ai · MIT License</p>
      </div>
    </footer>
  );
}
