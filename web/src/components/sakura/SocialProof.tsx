const stats = [
  { value: "2,400+", label: "Users Scanned" },
  { value: "18,000+", label: "Scans Completed" },
  { value: "340+", label: "Skills Distilled" },
  { value: "12", label: "Countries" },
] as const;

export function SocialProof(): React.ReactNode {
  return (
    <section className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">04</span>
          Community
        </div>

        <div className="sk-stats-grid">
          {stats.map((s) => (
            <div className="sk-stat-item" key={s.label}>
              <span className="sk-stat-check">●</span>
              <div className="sk-stat-value">{s.value}</div>
              <div className="sk-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="sk-social-quote">
          &ldquo;跑完 DAMC 才发现，我以为自己很会用 AI，其实连 Skill
          都没用过。现在每周蒸馏一个工作流。&rdquo;
          <br />
          <span style={{ fontSize: 13, opacity: 0.5 }}>
            — 某 SaaS 公司 CTO
          </span>
        </p>
      </div>
    </section>
  );
}
