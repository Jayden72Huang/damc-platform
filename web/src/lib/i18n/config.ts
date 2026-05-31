export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "damc_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function normalizeLocale(value: string | undefined | null): Locale {
  const normalized = value?.trim().toLowerCase();
  return normalized === "zh" || normalized?.startsWith("zh-")
    ? "zh"
    : DEFAULT_LOCALE;
}

export function localeToHtmlLang(locale: Locale): "zh-CN" | "en" {
  return locale === "zh" ? "zh-CN" : "en";
}
