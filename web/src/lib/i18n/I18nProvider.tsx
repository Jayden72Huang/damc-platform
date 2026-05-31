"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  type Locale,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeToHtmlLang,
  normalizeLocale,
} from "@/lib/i18n/config";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function persistLocale(locale: Locale) {
  const normalizedLocale = normalizeLocale(locale);

  if (typeof document !== "undefined") {
    document.cookie = `${LOCALE_COOKIE}=${normalizedLocale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
    document.documentElement.lang = localeToHtmlLang(normalizedLocale);
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LOCALE_COOKIE, normalizedLocale);
    } catch {
      // 隐私模式下忽略存储异常
    }
  }
}

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    normalizeLocale(initialLocale),
  );

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(normalizeLocale(next));
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "zh" ? "en" : "zh";
      return next;
    });
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useLocale 必须在 <I18nProvider> 内使用");
  }
  return ctx;
}

/**
 * 在双语对象中按当前语言取值的小工具。
 * 用法：const t = useT({ zh: {...}, en: {...} })
 */
export function useT<T>(
  content: Partial<Record<Locale, T>> & Record<typeof DEFAULT_LOCALE, T>,
): T {
  const { locale } = useLocale();
  return content[locale] ?? content[DEFAULT_LOCALE];
}
