import * as S from "./kakaoLoginBox.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const KakaoLoginBox = () => {
  const { message } = usePhilipLocale();
  const [firstLine, secondLine] = message.auth.kakaoProcessingDescription.split("\n");

  return (
    <S.KakaoLoginBox role="status" aria-live="polite">
      <S.Spinner aria-hidden="true" />
      <S.KakaoLoginTit>{message.auth.kakaoProcessing}</S.KakaoLoginTit>
      <S.KakaoLoginDesc>
        {firstLine}
        <br />
        {secondLine}
      </S.KakaoLoginDesc>
    </S.KakaoLoginBox>
  );
};
