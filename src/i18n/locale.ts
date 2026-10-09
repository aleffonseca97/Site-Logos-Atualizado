export const LOCALES = ["pt-BR", "it", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";

export const LOCALE_COOKIE = "logos-locale";

export const LOCALE_STORAGE = "logos-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export const htmlLang: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  it: "it",
  en: "en",
};

export const intlLocale: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  it: "it-IT",
  en: "en-GB",
};

export const ogLocale: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  it: "it_IT",
  en: "en_GB",
};

export const languageOptions: { locale: Locale; label: string; flag: "br" | "it" | "gb" }[] = [
  { locale: "pt-BR", label: "Português", flag: "br" },
  { locale: "it", label: "Italiano", flag: "it" },
  { locale: "en", label: "English", flag: "gb" },
];

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? "" : String(vars[key]),
  );
}
