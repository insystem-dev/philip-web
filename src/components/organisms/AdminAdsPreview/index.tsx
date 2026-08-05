import { Banner } from "@/components/atoms/Banner";
import { adsState } from "@/recoil/ads";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import * as S from "./adminAdsPreview.style";

interface AdminAdsPreviewProps {
  scope: "main" | "category";
  imgPreview: any;
  adsData: [];
  uploadingLabels?: string[];
  adCategoryCode: string;
}

export const AdminAdsPreview = ({
  scope,
  imgPreview,
  adsData,
  uploadingLabels = [],
  adCategoryCode,
}: AdminAdsPreviewProps) => {
  const [todoAds, setAdsList] = useRecoilState(adsState);

  const mainAd = (label: string) => adsData?.find((ads: any) =>
    ads.label === label && (ads.adCategoryCode || "CATEGORY-ALL") === adCategoryCode);
  const topAds = mainAd("topAds");
  const btm1 = mainAd("bottom1");
  const btm2 = mainAd("bottom2");
  const btm3 = mainAd("bottom3");
  const categoryTopAds = adsData?.find(
    (ads: any) => ads.label === "categoryTopAds"
  );
  const categoryBottomAds = adsData?.find(
    (ads: any) => ads.label === "categoryBottomAds"
  );
  const categoryTopBottom1 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom1"
  );
  const categoryTopBottom2 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom2"
  );
  const categoryTopBottom3 = adsData?.find(
    (ads: any) => ads.label === "categoryTopBottom3"
  );

  const newMainAd = (label: string) => imgPreview?.find((ads: any) =>
    ads.label === label && ads.adCategoryCode === adCategoryCode);
  const newTopAds = newMainAd("topAds");
  const newBtm1 = newMainAd("bottom1");
  const newBtm2 = newMainAd("bottom2");
  const newBtm3 = newMainAd("bottom3");
  const newCategoryTopAds = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopAds"
  );
  const newCategoryBottomAds = imgPreview?.find(
    (ads: any) => ads.label === "categoryBottomAds"
  );
  const newCategoryTopBottom1 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom1"
  );
  const newCategoryTopBottom2 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom2"
  );
  const newCategoryTopBottom3 = imgPreview?.find(
    (ads: any) => ads.label === "categoryTopBottom3"
  );

  useEffect(() => {
    setAdsList([
      {
        topAds: topAds || newTopAds,
        bottom1: btm1 || newBtm1,
        bottom2: btm2 || newBtm2,
        bottom3: btm3 || newBtm3,
      },
    ]);
  }, [adsData, imgPreview, adCategoryCode]);

  return (
    <S.AdminAdsPreview>
      <S.AdminAdsPreviewTit>
        {scope === "main"
          ? "메인 페이지 배너 미리보기"
          : "전체 카테고리 배너 미리보기"}
      </S.AdminAdsPreviewTit>
      {scope === "main" ? (
        <S.AdminAdsPreviewBox>
          <Banner
            order="LG"
            ads={topAds || newTopAds}
            admin={true}
            loading={uploadingLabels.includes("topAds")}
          />
          <Banner
            order="SM1"
            ads={btm1 || newBtm1}
            admin={true}
            loading={uploadingLabels.includes("bottom1")}
          />
          <Banner
            order="SM2"
            ads={btm2 || newBtm2}
            admin={true}
            loading={uploadingLabels.includes("bottom2")}
          />
          <Banner
            order="SM3"
            ads={btm3 || newBtm3}
            admin={true}
            loading={uploadingLabels.includes("bottom3")}
          />
        </S.AdminAdsPreviewBox>
      ) : (
        <S.CategoryPreviewGroups>
          <S.AdminAdsPreviewBox>
            <Banner
              order="LG"
              ads={categoryTopAds || newCategoryTopAds}
              admin={true}
              loading={uploadingLabels.includes("categoryTopAds")}
            />
            <Banner
              order="SM1"
              ads={categoryTopBottom1 || newCategoryTopBottom1}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom1")}
            />
            <Banner
              order="SM2"
              ads={categoryTopBottom2 || newCategoryTopBottom2}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom2")}
            />
            <Banner
              order="SM3"
              ads={categoryTopBottom3 || newCategoryTopBottom3}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom3")}
            />
          </S.AdminAdsPreviewBox>
          <S.BottomPreviewLabel>전체 카테고리 하단배너</S.BottomPreviewLabel>
          <S.CategoryAdsPreviewBox>
            <Banner
              order="LG"
              ads={categoryBottomAds || newCategoryBottomAds}
              admin={true}
              loading={uploadingLabels.includes("categoryBottomAds")}
            />
          </S.CategoryAdsPreviewBox>
        </S.CategoryPreviewGroups>
      )}
    </S.AdminAdsPreview>
  );
};
