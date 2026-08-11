import { Banner } from "@/components/atoms/Banner";
import { adsState } from "@/recoil/ads";
import { AdMatch, findCategoryAd, findMainAd } from "@/lib/adsMatch";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import * as S from "./adminAdsPreview.style";

/**
 * 배너 label → 실제 노출 위치 태그.
 * 미리보기 오버레이와 등록 카드(AdminAdsBox)가 같은 문구를 쓰도록 여기서 단일 관리한다.
 */
export const AD_POSITION_LABELS: Record<string, string> = {
  topAds: "상단",
  bottom1: "왼쪽 하단",
  bottom2: "가운데 하단",
  bottom3: "오른쪽 하단",
  categoryTopAds: "상단",
  categoryTopBottom1: "왼쪽 하단",
  categoryTopBottom2: "가운데 하단",
  categoryTopBottom3: "오른쪽 하단",
  categoryBottomAds: "페이지 최하단",
};

/** 카테고리 폴백으로 잡힌 배너에 붙는 태그 (메인 배너 전용) */
const CATEGORY_FALLBACK_LABEL = "전체 카테고리";

interface AdminAdsPreviewProps {
  scope: "main" | "category";
  imgPreview: any;
  adsData: [];
  uploadingLabels?: string[];
  adCategoryCode: string;
  adCityCode: string;
  /**
   * 이 범위의 배너가 유저 화면에 노출되지 않는 상태인지 (범위 노출 설정 off).
   * 미리보기·등록·삭제는 설정과 무관하게 그대로 동작하고, 안내 문구만 덧붙인다.
   */
  isHidden?: boolean;
}

export const AdminAdsPreview = ({
  scope,
  imgPreview,
  adsData,
  uploadingLabels = [],
  adCategoryCode,
  adCityCode,
  isHidden = false,
}: AdminAdsPreviewProps) => {
  const [todoAds, setAdsList] = useRecoilState(adsState);

  /**
   * 저장된 배너는 유저 화면과 동일한 폴백 순서로 고른다.
   * (지역은 정확 일치이고, 메인 배너만 카테고리 2단 폴백을 탄다)
   * 폴백으로 잡힌 배너는 이 카테고리 전용이 아니므로 태그로 구분해 표시한다.
   */
  const mainAd = (label: string) =>
    findMainAd(adsData, label, adCategoryCode, adCityCode);
  const topAds = mainAd("topAds");
  const btm1 = mainAd("bottom1");
  const btm2 = mainAd("bottom2");
  const btm3 = mainAd("bottom3");

  const categoryAd = (label: string) =>
    findCategoryAd(adsData, label, adCityCode);
  const categoryTopAds = categoryAd("categoryTopAds");
  const categoryBottomAds = categoryAd("categoryBottomAds");
  const categoryTopBottom1 = categoryAd("categoryTopBottom1");
  const categoryTopBottom2 = categoryAd("categoryTopBottom2");
  const categoryTopBottom3 = categoryAd("categoryTopBottom3");

  /**
   * 새로 업로드된 프리뷰 이미지 (아직 저장 안됨).
   * 업로드 시점의 카테고리·지역이 그대로 태깅돼 있으므로 폴백 없이 정확히 일치하는 것만 본다.
   */
  const newMainAd = (label: string) =>
    imgPreview?.find(
      (ads: any) =>
        ads.label === label &&
        ads.adCategoryCode === adCategoryCode &&
        ads.adCityCode === adCityCode
    );
  const newTopAds = newMainAd("topAds");
  const newBtm1 = newMainAd("bottom1");
  const newBtm2 = newMainAd("bottom2");
  const newBtm3 = newMainAd("bottom3");

  const newCategoryAd = (label: string) =>
    imgPreview?.find(
      (ads: any) => ads.label === label && ads.adCityCode === adCityCode
    );
  const newCategoryTopAds = newCategoryAd("categoryTopAds");
  const newCategoryBottomAds = newCategoryAd("categoryBottomAds");
  const newCategoryTopBottom1 = newCategoryAd("categoryTopBottom1");
  const newCategoryTopBottom2 = newCategoryAd("categoryTopBottom2");
  const newCategoryTopBottom3 = newCategoryAd("categoryTopBottom3");

  /**
   * 미리보기에 실제로 그릴 배너.
   * 이 지역·카테고리에 정확히 걸린 저장본이 최우선이고,
   * 없으면 방금 올린 프리뷰(저장 시 이 조합으로 들어갈 이미지), 그것도 없으면 폴백 배너를 보여준다.
   */
  const shown = (match: AdMatch, preview: any) =>
    match.isExact ? match.ads : preview || match.ads;

  /**
   * 폴백으로 잡힌 배너의 범위 태그.
   * 정확히 일치하는 저장본이거나 방금 올린 프리뷰를 보여주는 중이면 붙이지 않는다.
   */
  const scopeTagOf = (match: AdMatch, preview: any) => {
    if (match.isExact || preview || !match.ads) return undefined;
    return match.isCategoryFallback ? CATEGORY_FALLBACK_LABEL : undefined;
  };

  useEffect(() => {
    setAdsList([
      {
        topAds: shown(topAds, newTopAds),
        bottom1: shown(btm1, newBtm1),
        bottom2: shown(btm2, newBtm2),
        bottom3: shown(btm3, newBtm3),
      },
    ]);
  }, [adsData, imgPreview, adCategoryCode, adCityCode]);

  return (
    <S.AdminAdsPreview>
      <S.AdminAdsPreviewTit>
        {scope === "main"
          ? "메인 페이지 배너 미리보기"
          : "전체 카테고리 배너 미리보기"}
      </S.AdminAdsPreviewTit>
      {isHidden && (
        <S.AdminAdsHiddenNotice>
          현재 이 배너는 유저 화면에 노출되지 않습니다. 위 노출 설정을 켜면
          아래 미리보기 그대로 보이게 됩니다.
        </S.AdminAdsHiddenNotice>
      )}
      {scope === "main" ? (
        <S.AdminAdsPreviewBox>
          <Banner
            order="LG"
            ads={shown(topAds, newTopAds)}
            admin={true}
            loading={uploadingLabels.includes("topAds")}
            positionLabel={AD_POSITION_LABELS.topAds}
            scopeLabel={scopeTagOf(topAds, newTopAds)}
          />
          <Banner
            order="SM1"
            ads={shown(btm1, newBtm1)}
            admin={true}
            loading={uploadingLabels.includes("bottom1")}
            positionLabel={AD_POSITION_LABELS.bottom1}
            scopeLabel={scopeTagOf(btm1, newBtm1)}
          />
          <Banner
            order="SM2"
            ads={shown(btm2, newBtm2)}
            admin={true}
            loading={uploadingLabels.includes("bottom2")}
            positionLabel={AD_POSITION_LABELS.bottom2}
            scopeLabel={scopeTagOf(btm2, newBtm2)}
          />
          <Banner
            order="SM3"
            ads={shown(btm3, newBtm3)}
            admin={true}
            loading={uploadingLabels.includes("bottom3")}
            positionLabel={AD_POSITION_LABELS.bottom3}
            scopeLabel={scopeTagOf(btm3, newBtm3)}
          />
        </S.AdminAdsPreviewBox>
      ) : (
        <S.CategoryPreviewGroups>
          <S.AdminAdsPreviewBox>
            <Banner
              order="LG"
              ads={shown(categoryTopAds, newCategoryTopAds)}
              admin={true}
              loading={uploadingLabels.includes("categoryTopAds")}
              positionLabel={AD_POSITION_LABELS.categoryTopAds}
              scopeLabel={scopeTagOf(categoryTopAds, newCategoryTopAds)}
            />
            <Banner
              order="SM1"
              ads={shown(categoryTopBottom1, newCategoryTopBottom1)}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom1")}
              positionLabel={AD_POSITION_LABELS.categoryTopBottom1}
              scopeLabel={scopeTagOf(categoryTopBottom1, newCategoryTopBottom1)}
            />
            <Banner
              order="SM2"
              ads={shown(categoryTopBottom2, newCategoryTopBottom2)}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom2")}
              positionLabel={AD_POSITION_LABELS.categoryTopBottom2}
              scopeLabel={scopeTagOf(categoryTopBottom2, newCategoryTopBottom2)}
            />
            <Banner
              order="SM3"
              ads={shown(categoryTopBottom3, newCategoryTopBottom3)}
              admin={true}
              loading={uploadingLabels.includes("categoryTopBottom3")}
              positionLabel={AD_POSITION_LABELS.categoryTopBottom3}
              scopeLabel={scopeTagOf(categoryTopBottom3, newCategoryTopBottom3)}
            />
          </S.AdminAdsPreviewBox>
          <S.BottomPreviewLabel>전체 카테고리 하단배너</S.BottomPreviewLabel>
          <S.CategoryAdsPreviewBox>
            <Banner
              order="LG"
              ads={shown(categoryBottomAds, newCategoryBottomAds)}
              admin={true}
              loading={uploadingLabels.includes("categoryBottomAds")}
              positionLabel={AD_POSITION_LABELS.categoryBottomAds}
              scopeLabel={scopeTagOf(categoryBottomAds, newCategoryBottomAds)}
            />
          </S.CategoryAdsPreviewBox>
        </S.CategoryPreviewGroups>
      )}
    </S.AdminAdsPreview>
  );
};
