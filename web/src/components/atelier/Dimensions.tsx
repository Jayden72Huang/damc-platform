"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Dimension = {
  letter: "D" | "A" | "M" | "C";
  name: string;
  title: string;
  brief: string;
  image: string;
  imageAlt: string;
  definition: string;
  analyzes: readonly string[];
  subs: readonly string[];
  source: string;
  weight: string;
  weightNote?: string;
};

const dimensions: readonly Dimension[] = [
  {
    letter: "D",
    name: "Distillation Value",
    title: "蒸馏价值",
    brief: "你的经验值得被蒸馏成 AI Skill 吗？",
    image: "/atelier/dimensions/d-distillation.png",
    imageAlt: "蒸馏价值 — 蒸馏瓶提取金色精华",
    definition:
      "你的经验、判断和流程，是否能被沉淀成可被 AI 规模化执行的 Skill。这是 AI 时代「资产化你的隐性知识」的能力。",
    analyzes: [
      "你有哪些可以被编码的方法论与最佳实践",
      "哪些工作输出已经具备标准化的潜力",
      "当前市场对此类知识与流程的真实需求度",
      "你的领域专精度与 Skill 生态的契合度",
    ],
    subs: [
      "知识可编码性",
      "方法论独特性",
      "领域专精度",
      "输出标准化度",
      "市场需求度",
    ],
    source: "70% 自动扫描（自建 Skill · 工作流定义 · Skill 集中度） + 30% 角色推断",
    weight: "× 0.25",
  },
  {
    letter: "A",
    name: "Anti-Distillation",
    title: "抗蒸馏指数",
    brief: "AI 拿不走的能力有哪些？",
    image: "/atelier/dimensions/a-anti-distillation.png",
    imageAlt: "抗蒸馏 — 金色城堡与护城河",
    definition:
      "你身上 AI 无法复制的部分。这是创造力、情商、跨域综合判断与信任资产构成的护城河，决定你在 AI 时代的不可替代性。",
    analyzes: [
      "你的能力中是否包含原创性的创造力",
      "你的判断是否依赖情商、影响力与人际信任",
      "你处理模糊问题与跨域综合的水平",
      "你是否拥有需要身体在场或多年沉淀的信任资产",
    ],
    subs: [
      "创造力",
      "情商 / 影响力",
      "跨域综合力",
      "模糊决策力",
      "身体在场",
      "信任资产",
    ],
    source: "40% 自动扫描（创意类 / 社交类 / 安全审计类 Skill 信号） + 60% 角色推断",
    weight: "× 0.30",
    weightNote: "权重最高 · 不可替代性是 AI 时代最核心的价值",
  },
  {
    letter: "M",
    name: "AI Mastery",
    title: "AI 驾驭能力",
    brief: "你驾驭 Agent 工具的真实水平。",
    image: "/atelier/dimensions/m-mastery.png",
    imageAlt: "AI 驾驭 — 金色控制台与雷达",
    definition:
      "你将 Agent 当作合作伙伴的水平。从 Claude Code 配置深度到自定义 Skill、MCP、Hook、记忆系统的成熟运用 — 这是 100% 客观量化的维度。",
    analyzes: [
      "你的 Claude Code / .claude 环境配置深度",
      "Skill 生态规模与自建 Skill 数量",
      "Hook / MCP servers / 自动化集成度",
      "Memory 系统的使用程度与类型分布",
      "多项目配置 / Cron / Agent Team 等高级能力",
    ],
    subs: [
      "环境配置深度",
      "Skill 生态",
      "自动化与集成",
      "记忆系统",
      "高级功能使用",
    ],
    source: "100% 自动扫描 · 完全客观量化，不依赖任何自我评估",
    weight: "× 0.25",
  },
  {
    letter: "C",
    name: "Career Compass",
    title: "职业适配",
    brief: "你应该往哪个方向走？",
    image: "/atelier/dimensions/c-compass.png",
    imageAlt: "职业适配 — 古典铜质罗盘",
    definition:
      "基于 D / A / M 三维的综合得分，结合你的 MBTI 偏好，给出最适合你在 AI 时代发展的职业方向、推荐路径与对应等级（S–F）。",
    analyzes: [
      "你最匹配 8 大画像中的哪一种",
      "你的优势如何放到更高杠杆的位置",
      "MBTI 对协作 / 独立、战略 / 执行偏好的细化",
      "未来 90 天的可执行行动路径",
    ],
    subs: ["基础适配分", "推荐路径", "等级评定 (S–F)"],
    source: "f(D, A, M) + MBTI 调整",
    weight: "× 0.20",
  },
];

export function Dimensions(): React.ReactNode {
  return (
    <section className="atelier-section atelier-dimensions" id="framework">
      <div className="atelier-container">
        <p className="atelier-section-eyebrow">I · DAMC 框架</p>
        <h2 className="atelier-display atelier-section-title">
          4 个维度，22 个子项，看清你的全貌。
        </h2>
        <p className="atelier-section-sub">
          整体评分 = D × 0.25 + A × 0.30 + M × 0.25 + C × 0.20。
          点击下方任意字母，展开它的定义、子维度与配图。
        </p>

        <Accordion
          className="atelier-dim-accordion"
          collapsible
          defaultValue="dim-D"
          type="single"
        >
          {dimensions.map((dim) => (
            <AccordionItem
              className="atelier-dim-item"
              key={dim.letter}
              value={`dim-${dim.letter}`}
            >
              <AccordionTrigger className="atelier-dim-trigger">
                <span className="atelier-display atelier-dim-letter">
                  {dim.letter}
                </span>
                <span className="atelier-dim-headline">
                  <span className="atelier-dim-name">{dim.name}</span>
                  <span className="atelier-display atelier-dim-title">
                    {dim.title}
                  </span>
                  <span className="atelier-dim-brief">{dim.brief}</span>
                </span>
                <span className="atelier-dim-weight-badge">{dim.weight}</span>
              </AccordionTrigger>

              <AccordionContent className="atelier-dim-content">
                <div className="atelier-dim-content-grid">
                  <div className="atelier-dim-image">
                    <Image
                      src={dim.image}
                      alt={dim.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 42vw"
                    />
                  </div>

                  <div className="atelier-dim-body">
                    <p className="atelier-dim-definition">{dim.definition}</p>

                    <div className="atelier-dim-block">
                      <h4 className="atelier-dim-block-heading">
                        它在分析什么
                      </h4>
                      <ul className="atelier-dim-analyzes">
                        {dim.analyzes.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="atelier-dim-block">
                      <h4 className="atelier-dim-block-heading">
                        子维度（{dim.subs.length}）
                      </h4>
                      <ul className="atelier-dim-sub-list">
                        {dim.subs.map((sub) => (
                          <li key={sub}>{sub}</li>
                        ))}
                      </ul>
                    </div>

                    <dl className="atelier-dim-meta">
                      <div>
                        <dt>数据来源</dt>
                        <dd>{dim.source}</dd>
                      </div>
                      <div>
                        <dt>权重</dt>
                        <dd>
                          {dim.weight}
                          {dim.weightNote ? (
                            <span className="atelier-dim-weight-note">
                              {" "}
                              · {dim.weightNote}
                            </span>
                          ) : null}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
