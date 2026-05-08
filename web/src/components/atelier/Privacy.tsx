import Image from "next/image";

const uploadItems = [
  "4 个总分",
  "22 个子维度",
  "角色",
  "桌面环境",
  "MBTI（可选）",
] as const;

const localItems = [
  "CLAUDE.md 全文",
  "MEMORY.md 内容",
  "git commit 内容",
  "skill 名称列表",
  "项目路径",
] as const;

const promises = [
  "本地优先：所有原始数据在你的电脑处理",
  "不二次使用：数据只用于生成报告，绝不用于训练 AI 或卖广告",
  "一键删除：damc.ai/account/delete 立即清空所有数据",
] as const;

export function Privacy(): React.ReactNode {
  return (
    <section className="atelier-section" id="privacy">
      <div className="atelier-container">
        <div className="atelier-privacy-emblem">
          <Image
            src="/atelier/vault.png"
            alt="Atelier Vault — 锁芯"
            fill
            sizes="160px"
          />
        </div>
        <h2 className="atelier-display atelier-privacy-title">
          你的数据，你的电脑。
        </h2>
        <p className="atelier-privacy-sub">
          Hermès Birkin 的锁芯 — 原始内容永远不离开你的本地。
        </p>

        <div className="atelier-privacy-grid">
          <DataTable title="上传 ✓" items={uploadItems} />
          <DataTable title="永不上传 ×" items={localItems} />
        </div>

        <div className="atelier-promises">
          {promises.map((promise) => (
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
