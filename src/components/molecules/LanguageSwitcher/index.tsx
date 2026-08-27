import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import * as S from "./languageSwitcher.style";

export const LanguageSwitcher = () => {
  const { locale, message, changeLocale } = usePhilipLocale();

  return (
    <S.Switcher role="group" aria-label={message.common.languageSelector}>
      <S.Globe aria-hidden="true">
        <span />
      </S.Globe>
      <S.Option
        type="button"
        $active={locale === "ko"}
        aria-pressed={locale === "ko"}
        onClick={() => changeLocale("ko")}
      >
        {message.common.korean}
      </S.Option>
      <S.Divider aria-hidden="true" />
      <S.Option
        type="button"
        $active={locale === "en"}
        aria-pressed={locale === "en"}
        onClick={() => changeLocale("en")}
      >
        {message.common.english}
      </S.Option>
    </S.Switcher>
  );
};

export default LanguageSwitcher;
