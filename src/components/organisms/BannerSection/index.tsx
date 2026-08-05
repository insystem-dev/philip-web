import { Banner } from "@/components/atoms/Banner";
import * as S from "./bannerSection.style";

interface BannerSectionProp {
  adsData?: any[];
  categoryCode?: string;
}

export const BannerSection = ({ adsData, categoryCode = "CATEGORY-ALL" }: BannerSectionProp) => {
  const findAd = (label: string) =>
    adsData?.find((ads: any) => ads.label === label && ads.adCategoryCode === categoryCode) ||
    adsData?.find((ads: any) => ads.label === label && (ads.adCategoryCode || "CATEGORY-ALL") === "CATEGORY-ALL");
  const topAds = findAd("topAds");
  const btm1 = findAd("bottom1");
  const btm2 = findAd("bottom2");
  const btm3 = findAd("bottom3");

  return (
    <S.BannerSection>
      <Banner order="LG" ads={topAds} />
      <Banner order="SM1" ads={btm1} />
      <Banner order="SM2" ads={btm2} />
      <Banner order="SM3" ads={btm3} />
    </S.BannerSection>
  );
};
