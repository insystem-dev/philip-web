import { CategoryList } from "@/components/molecules/CategoryList";
import { LinkBox } from "@/components/molecules/LinkBox";
import { Banner } from "@/components/atoms/Banner";
import { getAdsData } from "@/apis/adsApi";
import { useQuery } from "react-query";
import * as S from "./CategoryPage.style";

export const CategoryPage = () => {
  const { data: adsData = [] } = useQuery("getAdsData", getAdsData);
  const categoryTopAds = adsData.find(
    (ads: any) => ads.label === "categoryTopAds"
  );
  const categoryBottomAds = adsData.find(
    (ads: any) => ads.label === "categoryBottomAds"
  );
  const categoryTopBottom1 = adsData.find(
    (ads: any) => ads.label === "categoryTopBottom1"
  );
  const categoryTopBottom2 = adsData.find(
    (ads: any) => ads.label === "categoryTopBottom2"
  );
  const categoryTopBottom3 = adsData.find(
    (ads: any) => ads.label === "categoryTopBottom3"
  );

  return (
    <S.CategoryPage>
      <S.CategoryContent>
        <S.TopBanner aria-label="전체 카테고리 상단 광고">
          <Banner order="LG" ads={categoryTopAds} />
          <Banner order="SM1" ads={categoryTopBottom1} />
          <Banner order="SM2" ads={categoryTopBottom2} />
          <Banner order="SM3" ads={categoryTopBottom3} />
        </S.TopBanner>

        <S.CategoryArea>
          <S.CategoryTxtBox>카테고리를 선택해 주세요.</S.CategoryTxtBox>
          <CategoryList />
        </S.CategoryArea>

      </S.CategoryContent>
      <S.ContactArea>
        <LinkBox inline />
      </S.ContactArea>
      <S.BottomBanners aria-label="전체 카테고리 하단 광고">
        <Banner order="LG" ads={categoryBottomAds} />
      </S.BottomBanners>
    </S.CategoryPage>
  );
};
