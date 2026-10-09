"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dictionary } from "./dictionaries";
import {
  htmlLang,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_STORAGE,
  type Locale,
} from "./locale";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE, locale);
  } catch {
    // Storage can be unavailable in private mode.
  }
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  document.documentElement.lang = htmlLang[locale];
}

export function I18nProvider({
  initialLocale,
  hasCookie,
  children,
}: {
  initialLocale: Locale;
  hasCookie: boolean;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  useEffect(() => {
    if (!hasCookie) {
      try {
        const stored = localStorage.getItem(LOCALE_STORAGE);
        if (isLocale(stored) && stored !== initialLocale) {
          setLocaleState(stored);
          persistLocale(stored);
          return;
        }
      } catch {
        // Ignore storage read failures.
      }
    }
    persistLocale(initialLocale);
  }, [hasCookie, initialLocale]);

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function usePageMeta(title: string, description?: string) {
  const { locale } = useI18n();

  useEffect(() => {
    const apply = () => {
      if (document.title !== title) document.title = title;
      if (!description) return;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      if (meta.getAttribute("content") !== description) {
        meta.setAttribute("content", description);
      }
    };

    apply();
    const node = document.querySelector("title");
    if (!node) return;
    const observer = new MutationObserver(apply);
    observer.observe(node, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [title, description, locale]);
}
