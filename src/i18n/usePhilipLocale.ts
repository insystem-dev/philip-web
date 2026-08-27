import { useCallback } from "react";
import { useRouter } from "next/router";
import { normalizeLocale, PhilipLocale } from "./config";
import { messages } from "./messages";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const usePhilipLocale = () => {
  const router = useRouter();
  const locale = normalizeLocale(router.locale);

  const changeLocale = useCallback(
    async (nextLocale: PhilipLocale) => {
      if (nextLocale === locale) return;

      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
      await router.push(router.asPath, router.asPath, {
        locale: nextLocale,
        scroll: false,
      });
    },
    [locale, router]
  );

  return {
    locale,
    message: messages[locale],
    changeLocale,
  };
};
