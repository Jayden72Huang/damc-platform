import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Skill 是免费的吗？",
    answer: "是，永远免费。完整报告才需要付费。",
  },
  {
    question: "不付费能看到什么？",
    answer: "4 维总分 + 画像 + Top 1 风险提示",
  },
  {
    question: "报告每次结果会变吗？",
    answer: "会。配置越好分数越高，鼓励持续优化。",
  },
  {
    question: "数据安全吗？",
    answer: "见上方隐私承诺。Skill 代码全部开源在 GitHub。",
  },
  {
    question: "支持中文吗？",
    answer: "全中文界面、报告、Coach 对话。",
  },
  {
    question: "怎么取消订阅？",
    answer: "平台一键取消，不留尾巴。",
  },
] as const;

export function FAQ(): React.ReactNode {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          FAQ
        </h2>

        <Accordion
          type="single"
          collapsible
          className="mt-10 rounded-lg border border-white/10 bg-white/[0.04] px-4 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-white/10"
            >
              <AccordionTrigger className="text-base text-white hover:text-cyan-100 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-7 text-white/62">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
