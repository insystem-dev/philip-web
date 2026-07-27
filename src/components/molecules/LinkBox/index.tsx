import { KakaoLink } from "@/components/atoms/KakaoLink";
import { VIPLink } from "@/components/atoms/VIPLink";
import * as S from "./linkBox.style";

interface LinkBoxProps {
  /** 모바일에서 같은 화면에 fixed로 떠 있는 CounterBox와 겹치지 않도록 위로 띄울지 여부 */
  stacked?: boolean;
}

export const LinkBox = ({ stacked }: LinkBoxProps = {}) => {
  return (
    <S.LinkBox $stacked={stacked}>
      {/* <VIPLink /> */}
      <KakaoLink />
    </S.LinkBox>
  );
};
