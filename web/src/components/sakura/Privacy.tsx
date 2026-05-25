const uploadItems = [
  "4 个总分 + 22 子维度",
  "角色 + MBTI（可选）",
  "桌面环境信息",
  "扫描统计摘要",
] as const;

const privateItems = [
  "CLAUDE.md 全文",
  "MEMORY.md 内容",
  "git commit 原文",
  "skill 名称列表",
  "项目路径 + 邮箱",
] as const;

const promises = [
  "🔒 本地优先 — 所有原始数据仅在你电脑处理",
  "🚫 不二次使用 — 绝不训练 AI / 卖广告",
  "🗑️ 一键删除 — damc.ai/account/delete",
] as const;

export function Privacy(): React.ReactNode {
  return (
    <section id="privacy" className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">07</span>
          你的数据，你的电脑
        </div>

        <div className="sk-privacy-grid">
          <div className="sk-data-table">
            <div className="sk-data-heading" style={{ color: "var(--color-m)" }}>
              上传 ✅（都是数字）
            </div>
            <ul className="sk-data-list">
              {uploadItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="sk-data-table">
            <div className="sk-data-heading" style={{ color: "var(--color-a)" }}>
              永不上传 ❌
            </div>
            <ul className="sk-data-list">
              {privateItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sk-promises">
          {promises.map((p) => (
            <span key={p} className="sk-promise">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
