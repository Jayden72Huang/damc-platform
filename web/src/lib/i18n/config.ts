export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "damc_locale";

export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "zh" ? "zh" : "en";
}
