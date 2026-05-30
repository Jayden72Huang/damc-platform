"use client";

import { CopyCommand } from "./CopyCommand";
import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    title: (
      <>
        准备好看到
        <br />
        真实的自己了吗？
      </>
    ),
    claude: "Claude Code 用户安装后输入 /damc 即可开始",
    other:
      "其他 Agent？运行 git clone https://github.com/Jayden72Huang/damc-skill.git 然后说「读取 SKILL.md 并执行」",
  },
  en: {
    title: (
      <>
        Ready to see
        <br />
        the real you?
      </>
    ),
    claude: "Claude Code users: install, then type /damc to start",
    other:
      'Other Agent? Run git clone https://github.com/Jayden72Huang/damc-skill.git, then say "Read SKILL.md and run it"',
  },
};

export function FinalCTA(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section id="get-started" className="sk-cta-section">
      <div className="sk-container" style={{ textAlign: "center" }}>
        <p className="sk-cta-title">{c.title}</p>

        <div style={{ maxWidth: 480, margin: "0 auto 16px" }}>
          <CopyCommand command="npx skills add Jayden72Huang/damc-skill" />
        </div>

        <p style={{ fontSize: 13, color: "var(--ink-light)", opacity: 0.6 }}>
          {c.claude}
        </p>

        <p style={{ fontSize: 12, color: "var(--ink-light)", opacity: 0.45, marginTop: 12 }}>
          {c.other}
        </p>
      </div>
    </section>
  );
}
