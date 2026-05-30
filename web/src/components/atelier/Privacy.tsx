"use client";

import Image from "next/image";
import { useLocale } from "@/lib/i18n/I18nProvider";

const COPY = {
  zh: {
    emblemAlt: "Atelier Vault — 锁芯",
    title: "你的数据，你的电脑。",
    sub: "Hermès Birkin 的锁芯 — 原始内容永远不离开你的本地。",
    uploadTitle: "上传 ✓",
    localTitle: "永不上传 ×",
    uploadItems: ["4 个总分", "22 个子维度", "角色", "桌面环境", "MBTI（可选）"],
    localItems: ["CLAUDE.md 全文", "MEMORY.md 内容", "git commit 内容", "skill 名称列表", "项目路径"],
    promises: [
      "本地优先：所有原始数据在你的电脑处理",
      "不二次使用：数据只用于生成报告，绝不用于训练 AI 或卖广告",
      "一键删除：damc.ai/account/delete 立即清空所有数据",
    ],
  },
  en: {
    emblemAlt: "Atelier Vault — lock cylinder",
    title: "Your data, your machine.",
    sub: "Like a Hermès Birkin lock — raw content never leaves your device.",
    uploadTitle: "Uploaded ✓",
    localTitle: "Never uploaded ×",
    uploadItems: ["4 overall scores", "22 sub-dimensions", "Role", "Desktop environment", "MBTI (optional)"],
    localItems: [
      "Full CLAUDE.md",
      "MEMORY.md contents",
      "git commit contents",
      "Skill name list",
      "Project paths",
    ],
    promises: [
      "Local-first: all raw data is processed on your machine",
      "No secondary use: data is only used to generate your report — never to train AI or sell ads",
      "One-click delete: damc.ai/account/delete wipes all data instantly",
    ],
  },
};

export function Privacy(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="privacy">
      <div className="atelier-container">
        <div className="atelier-privacy-emblem">
          <Image
            src="/atelier/vault.png"
            alt={c.emblemAlt}
            fill
            sizes="160px"
          />
        </div>
        <h2 className="atelier-display atelier-privacy-title">{c.title}</h2>
        <p className="atelier-privacy-sub">{c.sub}</p>

        <div className="atelier-privacy-grid">
          <DataTable title={c.uploadTitle} items={c.uploadItems} />
          <DataTable title={c.localTitle} items={c.localItems} />
        </div>

        <div className="atelier-promises">
          {c.promises.map((promise) => (
            <span className="atelier-promise" key={promise}>
              {promise}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataTable({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}): React.ReactNode {
  return (
    <article className="atelier-data-table">
      <h3 className="atelier-data-heading">{title}</h3>
      <ul className="atelier-data-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
