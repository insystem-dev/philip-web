import { useRouter } from "next/router";
import * as S from "./vipLink.style";
import IconVIP from "public/assets/svg/icon-vip.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const VIPLink = () => {
  const router = useRouter();
  const { message } = usePhilipLocale();
  const goVIP = () => {
    router.push("/main");
  };

  return (
    <S.VIPLink onClick={goVIP}>
      <S.VIPLinkTitBox>
        <IconVIP />
        <S.VIPLinkTxtSpan>{message.contact.vip}</S.VIPLinkTxtSpan>
      </S.VIPLinkTitBox>
      <IconLinkArrow />
    </S.VIPLink>
  );
};
