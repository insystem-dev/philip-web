import { useQuery } from "react-query";
import { getContactKakaoApi, getContactPhoneApi } from "@/apis/categoryApi";
import * as S from "./kakaoLink.style";
import IconPhone from "public/assets/svg/icon-phone.svg";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";

interface KakaoLinkProps {
  layout?: "row" | "column";
}

export const KakaoLink = ({ layout = "column" }: KakaoLinkProps) => {
  const { data: phone } = useQuery(["getContactPhoneApi"], getContactPhoneApi);
  const { data: kakaoId } = useQuery(
    ["getContactKakaoApi"],
    getContactKakaoApi
  );

  const goCall = () => {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
  };

  const copyKakaoId = async () => {
    if (!kakaoId) return;
    try {
      await navigator.clipboard.writeText(kakaoId);
      alert(`카카오톡 아이디 ${kakaoId}가 복사되었습니다.`);
    } catch {
      window.prompt("카카오톡 아이디를 복사해주세요.", kakaoId);
    }
  };

  return (
    <S.ContactBox $layout={layout}>
      <S.KakaoLink onClick={goCall} aria-disabled={!phone} title="전화 문의">
        <S.KakaoLinkTitBox>
          <S.IconCircle>
            <IconPhone />
          </S.IconCircle>
          <S.KakaoLinkTxtSpan>전화로 문의하기</S.KakaoLinkTxtSpan>
        </S.KakaoLinkTitBox>
        <S.ArrowIcon>
          <IconLinkArrow />
        </S.ArrowIcon>
      </S.KakaoLink>
      <S.KakaoLink
        onClick={copyKakaoId}
        aria-disabled={!kakaoId}
        title={`카카오톡 문의${kakaoId ? ` (${kakaoId})` : ""}`}
      >
        <S.KakaoLinkTitBox>
          <S.IconCircle>
            <IconKakao />
          </S.IconCircle>
          <S.KakaoLinkTxtSpan>카카오톡으로 문의하기</S.KakaoLinkTxtSpan>
        </S.KakaoLinkTitBox>
        <S.ArrowIcon>
          <IconLinkArrow />
        </S.ArrowIcon>
      </S.KakaoLink>
    </S.ContactBox>
  );
};
