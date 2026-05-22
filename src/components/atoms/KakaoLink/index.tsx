import { useRouter } from "next/router";
import * as S from "./kakaoLink.style";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";

export const KakaoLink = () => {
  const router = useRouter();
  const goKakao = () => {
    router.push("/main");
  };

  return (
    <S.KakaoLink onClick={goKakao}>
      <S.KakaoLinkTitBox>
        <IconKakao />
        <S.KakaoLinkTxtSpan>
          카카오톡 <strong>1:1 광고문의</strong>
        </S.KakaoLinkTxtSpan>
      </S.KakaoLinkTitBox>
      <IconLinkArrow />
    </S.KakaoLink>
  );
};
