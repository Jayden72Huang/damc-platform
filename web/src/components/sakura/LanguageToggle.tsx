"use client";

import { useLocale } from "@/lib/i18n/I18nProvider";

export function LanguageToggle(): React.ReactNode {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--ink-light, rgba(255,255,255,0.18))",
        borderRadius: 999,
        overflow: "hidden",
        fontSize: 12,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        aria-pressed={locale === "zh"}
        onClick={() => setLocale("zh")}
        style={{
          padding: "5px 10px",
          background: locale === "zh" ? "var(--ink, #1a1a1a)" : "transparent",
          color:
            locale === "zh"
              ? "var(--paper, #fff)"
              : "var(--ink-light, rgba(255,255,255,0.6))",
          border: "none",
          cursor: "pointer",
          fontWeight: locale === "zh" ? 600 : 400,
          letterSpacing: "0.02em",
        }}
      >
        中
      </button>
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        style={{
          padding: "5px 10px",
          background: locale === "en" ? "var(--ink, #1a1a1a)" : "transparent",
          color:
            locale === "en"
              ? "var(--paper, #fff)"
              : "var(--ink-light, rgba(255,255,255,0.6))",
          border: "none",
          cursor: "pointer",
          fontWeight: locale === "en" ? 600 : 400,
          letterSpacing: "0.04em",
        }}
      >
        EN
      </button>
    </div>
  );
}
