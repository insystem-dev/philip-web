import { RegionList } from "@/components/molecules/RegionList";
import * as S from "./RegionPage.style";

export const RegionPage = () => {
  return (
    <S.RegionPage>
      <S.RegionTxtBox>여행하시는 지역을 선택해주세요.</S.RegionTxtBox>
      <RegionList />
    </S.RegionPage>
  );
};

export default RegionPage;
