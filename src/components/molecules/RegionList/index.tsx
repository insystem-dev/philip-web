import { getLandingRegionListApi } from "@/apis/categoryApi";
import RegionItem from "@/components/atoms/RegionItem";
import { useQuery } from "react-query";
import * as S from "./regionList.style";

export const RegionList = () => {
  /** 첫 화면은 비활성 도시도 준비 중 카드로 보여주는 전용 목록을 사용한다 */
  const { data: cityItem } = useQuery(
    "getLandingRegionListApi",
    getLandingRegionListApi
  );

  return (
    <S.RegionList>
      {cityItem?.map((option: any) => {
        return <RegionItem data={option} key={option.oid} />;
      })}
    </S.RegionList>
  );
};
