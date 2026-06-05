import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "怎么安装 DAMC Skill？",
    answer:
      "推荐：npx skills add Jayden72Huang/damc-skill。也可以 git clone https://github.com/Jayden72Huang/damc-skill.git ~/.claude/skills/damc。安装后在 Claude Code 中输入 /damc 即可触发。",
  },
  {
    question: "Skill 是免费的吗？",
    answer: "是，Skill 永远免费。完整报告（Insight）和持续 Coach 才需要付费。",
  },
  {
    question: "本地模式 vs 同意上传，区别在哪？",
    answer:
      "同意上传：仅评分数字（4 维总分 + 22 子维度）+ 画像名 + 角色 + MBTI 上传到 damc.ai，可生成可分享的网页报告。本地模式：跳过上传，只在 ~/Desktop 生成 LITE 版 HTML，不能用平台功能。两种模式都不上传 CLAUDE.md / MEMORY.md / git commit 原文。",
  },
  {
    question: "评分公式是怎么算的？",
    answer:
      "Overall = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20。A 维度权重最高，因为在 AI 时代，不可替代性是最核心的价值。M 100% 来自自动扫描，D 和 A 由扫描数据 + 角色推断混合，C 是前三者的函数 + MBTI 调整。",
  },
  {
    question: "不付费能看到什么？",
    answer:
      "终端显示 4 维总分、画像名、Top 1 风险提示；本地桌面会保存一份 LITE HTML 报告（含 4 维条形 + 画像，无子维度）。",
  },
  {
    question: "报告每次结果会变吗？",
    answer:
      "会。你的 Claude Code 配置、Skill 安装、自建 Skill、记忆系统、git 协作历史变化后，分数会随之更新。Coach 订阅会每周自动复测。",
  },
  {
    question: "数据安全吗？",
    answer:
      "原始内容（CLAUDE.md 全文、MEMORY.md、git commit 原文、skill 名称列表、项目路径）永不上传。只上传分数数字。任何时候可在 damc.ai/account/delete 一键清空所有数据。",
  },
  {
    question: "支持中文吗？",
    answer: "支持。界面、报告和 Coach 对话都面向中文工作流设计。",
  },
  {
    question: "怎么取消订阅？",
    answer: "在账户页一键取消。取消后保留已购买周期内的访问权限，不再自动续费。",
  },
] as const;

export function FAQ(): React.ReactNode {
  return (
    <section className="atelier-section" id="faq">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">VIII · FAQ</p>
        <h2 className="atelier-display atelier-section-title">
          FAQ — 你可能想问的
        </h2>

        <Accordion
          className="atelier-faq-list"
          collapsible
          type="single"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              className="atelier-faq-item"
              key={faq.question}
              value={`faq-${index}`}
            >
              <AccordionTrigger className="atelier-faq-trigger">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="atelier-faq-content">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
