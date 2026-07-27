import { useQuery } from "react-query";
import { getContactPhoneApi } from "@/apis/categoryApi";
import * as S from "./kakaoLink.style";
import IconPhone from "public/assets/svg/icon-phone.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";

export const KakaoLink = () => {
  const { data: phone } = useQuery(["getContactPhoneApi"], getContactPhoneApi);

  const goCall = () => {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
  };

  return (
    <S.KakaoLink onClick={goCall} aria-disabled={!phone}>
      <S.KakaoLinkTitBox>
        <S.IconCircle>
          <IconPhone />
        </S.IconCircle>
        <S.KakaoLinkTxtSpan>1:1 문의하기</S.KakaoLinkTxtSpan>
      </S.KakaoLinkTitBox>
      <S.ArrowIcon>
        <IconLinkArrow />
      </S.ArrowIcon>
    </S.KakaoLink>
  );
};
