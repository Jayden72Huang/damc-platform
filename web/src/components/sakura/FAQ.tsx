"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Skill 是免费的吗？",
    a: "是，永远免费开源。完整报告和 AI Coach 才需要付费。",
  },
  {
    q: "不付费能看到什么？",
    a: "4 维总分 + 画像 + Top 1 风险提示 + 本地进度追踪。",
  },
  {
    q: "报告每次结果会变吗？",
    a: "会。配置越好分数越高，鼓励持续优化。每次扫描都会保存历史，你可以看到成长轨迹。",
  },
  {
    q: "数据安全吗？",
    a: "见上方隐私承诺。原始内容永远不离开本地。Skill 代码全部开源在 GitHub。",
  },
  {
    q: "团队排行榜怎么用？",
    a: "创建群组码，分享给团队成员。大家测完后自动加入排行榜，找到团队中 Agent 协作最强的人。",
  },
  {
    q: "怎么取消订阅？",
    a: "平台一键取消，不留尾巴。",
  },
] as const;

export function FAQ(): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="sk-section">
      <div className="sk-container">
        <div className="sk-section-header">
          <span className="sk-section-num">08</span>
          FAQ
        </div>

        <div className="sk-faq-list">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="sk-faq-item"
              data-open={openIndex === i ? "true" : "false"}
            >
              <button
                type="button"
                className="sk-faq-q"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span className="sk-faq-arrow">+</span>
              </button>
              <div className="sk-faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
