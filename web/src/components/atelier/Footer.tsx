const links = [
  { label: "GitHub · Skill", href: "https://github.com/Jayden72Huang/damc-skill" },
  { label: "GitHub · Platform", href: "https://github.com/Jayden72Huang/damc-platform" },
  { label: "隐私承诺", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Footer(): React.ReactNode {
  return (
    <footer className="atelier-footer">
      <div className="atelier-container">
        <div className="atelier-footer-hairline" aria-hidden="true" />
        <div className="atelier-display atelier-footer-wordmark">
          DAMC<span className="atelier-footer-dot">.</span>AI
        </div>
        <div className="atelier-footer-inner">
          <div>
            <p className="atelier-footer-brand">Atelier Noir · Limited Edition I</p>
            <p className="atelier-footer-tagline">
              Agent 时代的能力测评 — 不是恐吓你会被取代，而是帮你看清自己的真实坐标。
            </p>
          </div>
          <nav className="atelier-footer-links" aria-label="Footer">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="atelier-footer-copy">© 2026 DAMC.ai · MIT License</p>
      </div>
    </footer>
  );
}
