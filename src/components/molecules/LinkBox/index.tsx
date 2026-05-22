import { KakaoLink } from "@/components/atoms/KakaoLink";
import { VIPLink } from "@/components/atoms/VIPLink";
import * as S from "./linkBox.style";

export const LinkBox = () => {
  return (
    <S.LinkBox>
      {/* <VIPLink /> */}
      <KakaoLink />
    </S.LinkBox>
  );
};
