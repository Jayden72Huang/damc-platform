"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n/I18nProvider";

interface Skill {
  id: string;
  slug: string;
  displayName: string;
  description: string;
  category: string;
  price: number;
  iconEmoji: string | null;
  visibility: string;
  status: string;
  installCommand: string;
  valuation: { score: number } | null;
  createdAt: string;
}

const COPY = {
  zh: {
    title: "MY SKILLS",
    draft: "草稿",
    listed: "已上架",
    premium: "Premium",
    public: "公开",
    free: "FREE",
    publish: "确认上架",
    unpublish: "下架",
    delete: "删除",
    noSkills: "还没有上传 Skills",
    noSkillsDesc: "在 Agent 中运行 /damc 评估后可以上传你的 Skills",
    goMarketplace: "前往技能商城",
    confirmPublish: "确认要上架这个 Skill 吗？",
    confirmDelete: "确认要删除这个 Skill 吗？",
    setVisibility: "设置可见性",
  },
  en: {
    title: "MY SKILLS",
    draft: "Draft",
    listed: "Listed",
    premium: "Premium",
    public: "Public",
    free: "FREE",
    publish: "Publish",
    unpublish: "Unlist",
    delete: "Delete",
    noSkills: "No Skills uploaded yet",
    noSkillsDesc: "Run /damc in your Agent to assess and upload your Skills",
    goMarketplace: "Go to Marketplace",
    confirmPublish: "Publish this Skill?",
    confirmDelete: "Delete this Skill?",
    setVisibility: "Set visibility",
  },
};

export function MySkills(): React.ReactNode {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"draft" | "listed">("draft");

  useEffect(() => {
    fetch("/api/skills/mine")
      .then((r) => r.json())
      .then((data) => setSkills(data.skills ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const drafts = skills.filter((s) => s.status === "draft");
  const listed = skills.filter((s) => s.status === "listed");
  const filtered = tab === "draft" ? drafts : listed;

  async function updateSkill(id: string, updates: Record<string, unknown>) {
    const res = await fetch(`/api/skills/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updated = await res.json();
      setSkills((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
      );
    }
  }

  async function deleteSkill(id: string) {
    if (!confirm(c.confirmDelete)) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSkills((prev) => prev.filter((s) => s.id !== id));
    }
  }

  if (loading) return null;

  if (skills.length === 0) {
    return (
      <div className="sk-dash-skills">
        <div
          className="sk-display"
          style={{ fontSize: 14, marginBottom: 16, letterSpacing: 2 }}
        >
          {c.title}
        </div>
        <div style={{ textAlign: "center", padding: "24px 0", opacity: 0.5 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🧩</div>
          <p style={{ fontSize: 13 }}>{c.noSkills}</p>
          <p style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            {c.noSkillsDesc}
          </p>
          <a
            href="/marketplace"
            className="sk-btn"
            style={{ marginTop: 16, fontSize: 12, padding: "8px 16px" }}
          >
            {c.goMarketplace}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="sk-dash-skills">
      <div
        className="sk-display"
        style={{ fontSize: 14, marginBottom: 16, letterSpacing: 2 }}
      >
        {c.title} ({skills.length})
      </div>

      <div className="sk-dash-skills-tabs">
        <button
          className={`sk-dash-skills-tab${tab === "draft" ? " active" : ""}`}
          onClick={() => setTab("draft")}
        >
          {c.draft} ({drafts.length})
        </button>
        <button
          className={`sk-dash-skills-tab${tab === "listed" ? " active" : ""}`}
          onClick={() => setTab("listed")}
        >
          {c.listed} ({listed.length})
        </button>
      </div>

      <div className="sk-dash-skills-list">
        {filtered.map((skill) => (
          <div key={skill.id} className="sk-dash-skill-item">
            <div className="sk-dash-skill-header">
              <span className="sk-dash-skill-icon">
                {skill.iconEmoji ?? "🔧"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sk-dash-skill-name">{skill.displayName}</div>
                <div className="sk-dash-skill-meta">
                  {skill.category}
                  {skill.visibility === "premium" ? (
                    <span className="sk-dash-skill-badge premium">
                      {c.premium}
                    </span>
                  ) : (
                    <span className="sk-dash-skill-badge public">
                      {skill.price === 0 ? c.free : `$${skill.price}`}
                    </span>
                  )}
                  {skill.valuation ? (
                    <span className="sk-dash-skill-score">
                      SeKill {skill.valuation.score}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="sk-dash-skill-desc">{skill.description}</p>

            <div className="sk-dash-skill-actions">
              {skill.status === "draft" ? (
                <>
                  <select
                    className="sk-dash-skill-select"
                    value={skill.visibility}
                    onChange={(e) =>
                      updateSkill(skill.id, { visibility: e.target.value })
                    }
                  >
                    <option value="public">{c.public}</option>
                    <option value="premium">{c.premium}</option>
                  </select>
                  <button
                    className="sk-dash-skill-btn publish"
                    onClick={() => {
                      if (confirm(c.confirmPublish)) {
                        updateSkill(skill.id, { status: "listed" });
                      }
                    }}
                  >
                    {c.publish}
                  </button>
                </>
              ) : (
                <button
                  className="sk-dash-skill-btn"
                  onClick={() => updateSkill(skill.id, { status: "draft" })}
                >
                  {c.unpublish}
                </button>
              )}
              <button
                className="sk-dash-skill-btn delete"
                onClick={() => deleteSkill(skill.id)}
              >
                {c.delete}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
