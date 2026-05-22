import { useRouter } from "next/router";
import * as S from "./vipLink.style";
import IconVIP from "public/assets/svg/icon-vip.svg";
import IconLinkArrow from "public/assets/svg/icon-link-arrow.svg";

export const VIPLink = () => {
  const router = useRouter();
  const goVIP = () => {
    router.push("/main");
  };

  return (
    <S.VIPLink onClick={goVIP}>
      <S.VIPLinkTitBox>
        <IconVIP />
        <S.VIPLinkTxtSpan>VIP 이용안내</S.VIPLinkTxtSpan>
      </S.VIPLinkTitBox>
      <IconLinkArrow />
    </S.VIPLink>
  );
};
