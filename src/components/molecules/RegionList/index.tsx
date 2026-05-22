import { getCityListApi } from "@/apis/categoryApi";
import RegionItem from "@/components/atoms/RegionItem";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as S from "./regionList.style";

export const RegionList = () => {
  /** 시티 select 목록 불러오기 */
  const { data: cityItem } = useQuery("getCityListApi", getCityListApi);

  return (
    <S.RegionList>
      {cityItem?.map((option: any, idx: number) => {
        return <RegionItem data={option} key={idx} />;
      })}
    </S.RegionList>
  );
};
