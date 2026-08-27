export const SUPPORTED_LOCALES = ["ko", "en"] as const;

export type PhilipLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: PhilipLocale = "ko";

export const normalizeLocale = (locale?: string | null): PhilipLocale =>
  SUPPORTED_LOCALES.includes(locale as PhilipLocale)
    ? (locale as PhilipLocale)
    : DEFAULT_LOCALE;
