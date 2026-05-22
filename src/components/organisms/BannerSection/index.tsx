import { Banner } from "@/components/atoms/Banner";
import { useEffect } from "react";
import { useQuery } from "react-query";
import * as S from "./bannerSection.style";

interface BannerSectionProp {
  adsData?: [];
}

export const BannerSection = ({ adsData }: BannerSectionProp) => {
  const topAds = adsData?.find((ads: any) => ads.label === "topAds");
  const btm1 = adsData?.find((ads: any) => ads.label === "bottom1");
  const btm2 = adsData?.find((ads: any) => ads.label === "bottom2");
  const btm3 = adsData?.find((ads: any) => ads.label === "bottom3");

  return (
    <S.BannerSection>
      <Banner order="LG" ads={topAds} />
      <Banner order="SM1" ads={btm1} />
      <Banner order="SM2" ads={btm2} />
      <Banner order="SM3" ads={btm3} />
    </S.BannerSection>
  );
};
