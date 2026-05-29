"use client";

import { useEffect, useState } from "react";
import { CopyCommand } from "./CopyCommand";

interface SkillListing {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  installCommand: string;
  iconEmoji: string | null;
  tags: string[] | null;
  features: string[] | null;
  stats: { downloads: number; rating: number; reviews: number } | null;
  valuation: {
    score: number;
    reasoning: string;
    marketFit: string;
    uniqueness: string;
  } | null;
  sellerName: string | null;
  sellerImage: string | null;
}

const CATEGORIES = [
  { id: "all", label: "All Skills", emoji: "🔥" },
  { id: "automation", label: "Automation", emoji: "⚡" },
  { id: "content", label: "Content", emoji: "✍️" },
  { id: "dev-tools", label: "Dev Tools", emoji: "🛠️" },
  { id: "seo", label: "SEO & Growth", emoji: "📈" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "data", label: "Data & Analytics", emoji: "📊" },
  { id: "productivity", label: "Productivity", emoji: "🚀" },
];

const DEMO_SKILLS: SkillListing[] = [
  {
    id: "demo-1",
    slug: "seo-pipeline",
    name: "seo-pipeline",
    displayName: "SEO Pipeline Pro",
    description:
      "End-to-end SEO workflow: keyword research → content generation → on-page optimization → programmatic page creation. Built by a top-ranked DAMC AI Architect.",
    category: "seo",
    price: 29,
    currency: "USD",
    installCommand: "npx skills add Jayden72Huang/seo-pipeline-pro",
    iconEmoji: "🔍",
    tags: ["SEO", "Content", "Programmatic"],
    features: [
      "Automated keyword clustering",
      "AI content generation with brand voice",
      "On-page SEO scoring",
      "Bulk page generation",
    ],
    stats: { downloads: 342, rating: 4.8, reviews: 47 },
    valuation: {
      score: 92,
      reasoning: "Unique workflow automation with proven ROI",
      marketFit: "High demand for SEO automation",
      uniqueness: "Combines 5 tools into one skill",
    },
    sellerName: "@Jayden72Huang",
    sellerImage: null,
  },
  {
    id: "demo-2",
    slug: "deploy-guardian",
    name: "deploy-guardian",
    displayName: "Deploy Guardian",
    description:
      "Pre-deployment checklist automation: runs security scan, performance audit, accessibility check, and SEO validation before every deploy.",
    category: "dev-tools",
    price: 0,
    currency: "USD",
    installCommand: "npx skills add alexwang-dev/deploy-guardian",
    iconEmoji: "🛡️",
    tags: ["DevOps", "Security", "CI/CD"],
    features: [
      "Security vulnerability scan",
      "Lighthouse performance audit",
      "Accessibility compliance check",
      "Zero-config setup",
    ],
    stats: { downloads: 218, rating: 4.9, reviews: 31 },
    valuation: {
      score: 88,
      reasoning: "Solves a universal pain point",
      marketFit: "Every dev team needs deployment checks",
      uniqueness: "All-in-one pre-deploy audit",
    },
    sellerName: "@alexwang-dev",
    sellerImage: null,
  },
  {
    id: "demo-3",
    slug: "brand-voice-writer",
    name: "brand-voice-writer",
    displayName: "Brand Voice Writer",
    description:
      "Train AI to write in your brand's exact tone. Analyzes your existing content, extracts style patterns, and generates on-brand copy for any channel.",
    category: "content",
    price: 39,
    currency: "USD",
    installCommand: "npx skills add sarahli-writes/brand-voice-writer",
    iconEmoji: "🎙️",
    tags: ["Writing", "Brand", "Marketing"],
    features: [
      "Auto-extract brand voice from samples",
      "Multi-channel adaptation",
      "Tone consistency scoring",
      "Style guide generation",
    ],
    stats: { downloads: 156, rating: 4.7, reviews: 22 },
    valuation: {
      score: 85,
      reasoning: "High-value content creation niche",
      marketFit: "Growing demand for brand consistency",
      uniqueness: "Voice extraction + enforcement",
    },
    sellerName: "@sarahli-writes",
    sellerImage: null,
  },
  {
    id: "demo-4",
    slug: "data-pipeline-builder",
    name: "data-pipeline-builder",
    displayName: "Data Pipeline Builder",
    description:
      "Describe your data flow in natural language → get a production-ready ETL pipeline. Supports PostgreSQL, BigQuery, S3, and API sources.",
    category: "data",
    price: 49,
    currency: "USD",
    installCommand: "npx skills add kevinzhou-data/data-pipeline-builder",
    iconEmoji: "🔄",
    tags: ["ETL", "Data", "Pipeline"],
    features: [
      "Natural language to pipeline",
      "Multi-source connectors",
      "Auto-scheduling",
      "Error handling & retry logic",
    ],
    stats: { downloads: 89, rating: 4.6, reviews: 14 },
    valuation: {
      score: 91,
      reasoning: "Complex automation with high switching cost",
      marketFit: "Data engineering is expensive",
      uniqueness: "NL-to-pipeline is novel",
    },
    sellerName: "@kevinzhou-data",
    sellerImage: null,
  },
  {
    id: "demo-5",
    slug: "ui-component-gen",
    name: "ui-component-gen",
    displayName: "UI Component Generator",
    description:
      "Describe a UI component → get production-ready React/Vue/Svelte code with Tailwind styling, accessibility, and responsive design built in.",
    category: "design",
    price: 0,
    currency: "USD",
    installCommand: "npx skills add lisameng-ui/ui-component-gen",
    iconEmoji: "🎨",
    tags: ["UI", "React", "Components"],
    features: [
      "Multi-framework output",
      "WCAG 2.1 accessible",
      "Responsive by default",
      "Dark mode support",
    ],
    stats: { downloads: 278, rating: 4.5, reviews: 38 },
    valuation: {
      score: 79,
      reasoning: "Competitive space but good execution",
      marketFit: "Universal need for UI components",
      uniqueness: "Multi-framework + accessibility focus",
    },
    sellerName: "@lisameng-ui",
    sellerImage: null,
  },
  {
    id: "demo-6",
    slug: "meeting-to-tasks",
    name: "meeting-to-tasks",
    displayName: "Meeting → Tasks",
    description:
      "Drop a meeting transcript or recording → get structured action items, assignees, deadlines, and follow-up emails. Integrates with Linear, Notion, and Slack.",
    category: "productivity",
    price: 0,
    currency: "USD",
    installCommand: "npx skills add mikerui/meeting-to-tasks",
    iconEmoji: "📋",
    tags: ["Meetings", "Tasks", "Productivity"],
    features: [
      "Transcript → action items",
      "Auto-assign by context",
      "Linear/Notion integration",
      "Follow-up email drafts",
    ],
    stats: { downloads: 412, rating: 4.8, reviews: 56 },
    valuation: {
      score: 87,
      reasoning: "Solves daily pain for every team",
      marketFit: "Meeting fatigue is universal",
      uniqueness: "End-to-end: transcript to tracked tasks",
    },
    sellerName: "@mikerui",
    sellerImage: null,
  },
];

function StarRating({ rating }: { rating: number }): React.ReactNode {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="sk-mp-stars">
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
      <span className="sk-mp-rating-num">{rating.toFixed(1)}</span>
    </span>
  );
}

function CopyInstall({ command }: { command: string }): React.ReactNode {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="sk-mp-install-btn"
      onClick={() => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? "✓ Copied!" : "Install →"}
    </button>
  );
}

export function MarketplaceContent(): React.ReactNode {
  const [activeCategory, setActiveCategory] = useState("all");
  const [allSkills, setAllSkills] = useState<SkillListing[]>(DEMO_SKILLS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        if (data.skills && data.skills.length > 0) {
          setAllSkills([...data.skills, ...DEMO_SKILLS]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "all"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <>
      <section className="sk-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
        <div className="sk-container">
          <div className="sk-mp-hero">
            <h1 className="sk-mp-title">SeKill Marketplace</h1>
            <p className="sk-mp-subtitle">
              Sell your Skills. Buy Superpowers.
            </p>
            <p className="sk-mp-desc">
              AI 时代最值钱的不是代码，是被验证过的工作流。
              在这里你可以发现、安装其他开发者打造的 AI Agent Skills，
              也可以把自己的 Skills 上架分享或出售。
            </p>

            <div className="sk-mp-how">
              <div className="sk-mp-how-item">
                <span className="sk-mp-how-num">1</span>
                <div>
                  <strong>找 Skill</strong>
                  <p>浏览下方列表，按分类筛选你需要的能力。</p>
                </div>
              </div>
              <div className="sk-mp-how-item">
                <span className="sk-mp-how-num">2</span>
                <div>
                  <strong>一键安装</strong>
                  <p>复制卡片底部的安装命令，粘贴到你的 Agent 终端即可使用。</p>
                </div>
              </div>
              <div className="sk-mp-how-item">
                <span className="sk-mp-how-num">3</span>
                <div>
                  <strong>上架你的 Skill</strong>
                  <p>在 Agent 中运行下方命令，自动扫描并上架你的 Skills。</p>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: 520, margin: "0 auto" }}>
              <CopyCommand command="/damc-scan-skill" />
              <p style={{ fontSize: 11, color: "var(--ink-light)", opacity: 0.4, marginTop: 6, textAlign: "center" }}>
                已安装 DAMC 的用户直接运行 · 需要 GitHub 登录
              </p>
            </div>

            <div className="sk-mp-cta-row">
              <span className="sk-mp-stat">
                {allSkills.length} skills listed · Free & Premium
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="sk-section">
        <div className="sk-container">
          <div className="sk-mp-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`sk-mp-filter${activeCategory === cat.id ? " sk-mp-filter-active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0", opacity: 0.4 }}>
              Loading...
            </div>
          ) : (
            <div className="sk-mp-grid">
              {filtered.map((skill) => (
                <article key={skill.id} className="sk-mp-card">
                  <div className="sk-mp-card-header">
                    <span className="sk-mp-icon">{skill.iconEmoji ?? "🔧"}</span>
                    <div className="sk-mp-card-meta">
                      <h3 className="sk-mp-card-name">{skill.displayName}</h3>
                      <span className="sk-mp-card-seller">
                        {skill.sellerName ?? "Anonymous"}
                      </span>
                    </div>
                    <div className="sk-mp-price">
                      {skill.price === 0 ? (
                        <span className="sk-mp-free">FREE</span>
                      ) : (
                        <span>${skill.price}</span>
                      )}
                    </div>
                  </div>
                  {skill.price === 0 ? (
                    <span className="sk-mp-badge sk-mp-badge-free">Open Source</span>
                  ) : (
                    <span className="sk-mp-badge sk-mp-badge-paid">Premium</span>
                  )}

                  <p className="sk-mp-card-desc">{skill.description}</p>

                  {skill.features && skill.features.length > 0 ? (
                    <ul className="sk-mp-features">
                      {skill.features.slice(0, 3).map((f, i) => (
                        <li key={i}>✓ {f}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="sk-mp-card-footer">
                    <div className="sk-mp-card-stats">
                      {skill.stats ? (
                        <>
                          <StarRating rating={skill.stats.rating} />
                          <span className="sk-mp-downloads">
                            ↓ {skill.stats.downloads}
                          </span>
                        </>
                      ) : null}
                    </div>

                    {skill.valuation ? (
                      <div className="sk-mp-valuation">
                        SeKill Score: {skill.valuation.score}/100
                      </div>
                    ) : null}
                  </div>

                  {skill.tags && skill.tags.length > 0 ? (
                    <div className="sk-mp-tags">
                      {skill.tags.map((t) => (
                        <span key={t} className="sk-mp-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="sk-mp-card-actions">
                    <code className="sk-mp-install-cmd">
                      {skill.installCommand}
                    </code>
                    <CopyInstall command={skill.installCommand} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
