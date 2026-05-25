import { CopyCommand } from "./CopyCommand";

export function FinalCTA(): React.ReactNode {
  return (
    <section id="get-started" className="sk-cta-section">
      <div className="sk-container" style={{ textAlign: "center" }}>
        <p className="sk-cta-title">
          准备好看到
          <br />
          真实的自己了吗？
        </p>

        <a
          href="#pricing"
          className="sk-stamp"
          style={{ fontSize: 18, padding: "14px 36px" }}
        >
          立即免费体检
        </a>

        <div style={{ maxWidth: 480, margin: "32px auto 0" }}>
          <CopyCommand command="npx skills add Jayden72Huang/damc-skill" />
        </div>
      </div>
    </section>
  );
}
