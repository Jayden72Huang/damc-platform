"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/lib/i18n/I18nProvider";

const faqs = [
  {
    question: { zh: "怎么安装 DAMC Skill？", en: "How do I install the DAMC Skill?" },
    answer: {
      zh: "推荐：npx skills add Jayden72Huang/damc-skill。也可以 git clone https://github.com/Jayden72Huang/damc-skill.git ~/.claude/skills/damc。安装后在 Claude Code 中输入 /damc 即可触发。",
      en: "Recommended: npx skills add Jayden72Huang/damc-skill. Or git clone https://github.com/Jayden72Huang/damc-skill.git ~/.claude/skills/damc. After installing, type /damc in Claude Code to trigger it.",
    },
  },
  {
    question: { zh: "Skill 是免费的吗？", en: "Is the Skill free?" },
    answer: {
      zh: "是，Skill 永远免费。完整报告（Insight）和持续 Coach 才需要付费。",
      en: "Yes, the Skill is free forever. Only the full report (Insight) and the ongoing Coach are paid.",
    },
  },
  {
    question: {
      zh: "本地模式 vs 同意上传，区别在哪？",
      en: "What's the difference between local mode and agreeing to upload?",
    },
    answer: {
      zh: "同意上传：仅评分数字（4 维总分 + 22 子维度）+ 画像名 + 角色 + MBTI 上传到 damc.ai，可生成可分享的网页报告。本地模式：跳过上传，只在 ~/Desktop 生成 LITE 版 HTML，不能用平台功能。两种模式都不上传 CLAUDE.md / MEMORY.md / git commit 原文。",
      en: "Agree to upload: only score numbers (4 overall + 22 sub-dimensions) + archetype name + role + MBTI go to damc.ai, generating a shareable web report. Local mode: skips uploading and only writes a LITE HTML to ~/Desktop, without platform features. Neither mode uploads the raw CLAUDE.md / MEMORY.md / git commit content.",
    },
  },
  {
    question: { zh: "评分公式是怎么算的？", en: "How is the score calculated?" },
    answer: {
      zh: "Overall = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20。A 维度权重最高，因为在 AI 时代，不可替代性是最核心的价值。M 100% 来自自动扫描，D 和 A 由扫描数据 + 角色推断混合，C 是前三者的函数 + MBTI 调整。",
      en: "Overall = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20. A has the highest weight, because in the AI era irreplaceability is the most essential value. M is 100% from auto-scan; D and A mix scan data with role inference; C is a function of the first three plus an MBTI adjustment.",
    },
  },
  {
    question: { zh: "不付费能看到什么？", en: "What do I get without paying?" },
    answer: {
      zh: "终端显示 4 维总分、画像名、Top 1 风险提示；本地桌面会保存一份 LITE HTML 报告（含 4 维条形 + 画像，无子维度）。",
      en: "The terminal shows the 4 dimension scores, archetype name, and top 1 risk alert; a LITE HTML report (4 dimension bars + archetype, no sub-dimensions) is saved to your desktop.",
    },
  },
  {
    question: { zh: "报告每次结果会变吗？", en: "Do results change each time?" },
    answer: {
      zh: "会。你的 Claude Code 配置、Skill 安装、自建 Skill、记忆系统、git 协作历史变化后，分数会随之更新。Coach 订阅会每周自动复测。",
      en: "Yes. As your Claude Code config, installed Skills, custom Skills, memory system, and git collaboration history change, your scores update accordingly. The Coach subscription rescans automatically every week.",
    },
  },
  {
    question: { zh: "数据安全吗？", en: "Is my data safe?" },
    answer: {
      zh: "原始内容（CLAUDE.md 全文、MEMORY.md、git commit 原文、skill 名称列表、项目路径）永不上传。只上传分数数字。任何时候可在 damc.ai/account/delete 一键清空所有数据。",
      en: "Raw content (full CLAUDE.md, MEMORY.md, raw git commits, Skill name list, project paths) is never uploaded. Only score numbers are. You can wipe all data anytime at damc.ai/account/delete.",
    },
  },
  {
    question: { zh: "支持中文吗？", en: "Does it support Chinese?" },
    answer: {
      zh: "支持。界面、报告和 Coach 对话都面向中文工作流设计。",
      en: "Yes. The interface, reports, and Coach conversations are all designed for Chinese workflows, with full English support too.",
    },
  },
  {
    question: { zh: "怎么取消订阅？", en: "How do I cancel my subscription?" },
    answer: {
      zh: "在账户页一键取消。取消后保留已购买周期内的访问权限，不再自动续费。",
      en: "Cancel in one click from your account page. You keep access through the period you've paid for, with no auto-renewal afterward.",
    },
  },
] as const;

const COPY = {
  zh: { eyebrow: "VI · FAQ", title: "FAQ — 你可能想问的" },
  en: { eyebrow: "VI · FAQ", title: "FAQ — what you might be wondering" },
};

export function FAQ(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];

  return (
    <section className="atelier-section" id="faq">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">{c.eyebrow}</p>
        <h2 className="atelier-display atelier-section-title">{c.title}</h2>

        <Accordion className="atelier-faq-list" collapsible type="single">
          {faqs.map((faq, index) => (
            <AccordionItem
              className="atelier-faq-item"
              key={faq.question.en}
              value={`faq-${index}`}
            >
              <AccordionTrigger className="atelier-faq-trigger">
                {faq.question[locale]}
              </AccordionTrigger>
              <AccordionContent className="atelier-faq-content">
                {faq.answer[locale]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
