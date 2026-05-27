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

        <div style={{ maxWidth: 480, margin: "0 auto 24px" }}>
          <CopyCommand command="npx skills add Jayden72Huang/damc-skill" />
        </div>

        <p style={{ fontSize: 13, color: "var(--ink-light)", opacity: 0.6 }}>
          安装后在终端输入 /damc 即可开始
        </p>
      </div>
    </section>
  );
}
