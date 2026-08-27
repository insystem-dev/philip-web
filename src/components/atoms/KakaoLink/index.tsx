import { useQuery } from "react-query";
import { getContactKakaoApi, getContactPhoneApi } from "@/apis/categoryApi";
import * as S from "./kakaoLink.style";
import IconPhone from "public/assets/svg/icon-phone.svg";
import IconKakao from "public/assets/svg/icon-kakao.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface KakaoLinkProps {
  layout?: "row" | "column";
}

export const KakaoLink = ({ layout = "column" }: KakaoLinkProps) => {
  const { message } = usePhilipLocale();
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
      alert(message.contact.kakaoCopied(kakaoId));
    } catch {
      window.prompt(message.contact.kakaoCopyPrompt, kakaoId);
    }
  };

  return (
    <S.ContactBox $layout={layout}>
      <S.KakaoLink
        type="button"
        onClick={goCall}
        disabled={!phone}
        aria-disabled={!phone}
        title={message.contact.phoneTitle}
      >
        <S.KakaoLinkTitBox>
          <S.IconCircle>
            <IconPhone />
          </S.IconCircle>
          <S.KakaoLinkTxtSpan>{message.contact.phone}</S.KakaoLinkTxtSpan>
        </S.KakaoLinkTitBox>
        <S.ArrowIcon>
          <IconLinkArrow />
        </S.ArrowIcon>
        <S.HoverShine aria-hidden="true" />
      </S.KakaoLink>
      <S.KakaoLink
        type="button"
        $variant="kakao"
        onClick={copyKakaoId}
        disabled={!kakaoId}
        aria-disabled={!kakaoId}
        title={message.contact.kakaoTitle(kakaoId)}
      >
        <S.KakaoLinkTitBox>
          <S.IconCircle>
            <IconKakao />
          </S.IconCircle>
          <S.KakaoLinkTxtSpan>{message.contact.kakao}</S.KakaoLinkTxtSpan>
        </S.KakaoLinkTitBox>
        <S.ArrowIcon>
          <IconLinkArrow />
        </S.ArrowIcon>
        <S.HoverShine aria-hidden="true" />
      </S.KakaoLink>
    </S.ContactBox>
  );
};
