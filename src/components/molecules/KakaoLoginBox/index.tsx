import * as S from "./kakaoLoginBox.style";

export const KakaoLoginBox = () => {
  return (
    <S.KakaoLoginBox role="status" aria-live="polite">
      <S.Spinner aria-hidden="true" />
      <S.KakaoLoginTit>로그인 중입니다</S.KakaoLoginTit>
      <S.KakaoLoginDesc>
        카카오 인증을 확인하고 있어요.
        <br />
        잠시만 기다려 주세요.
      </S.KakaoLoginDesc>
    </S.KakaoLoginBox>
  );
};
