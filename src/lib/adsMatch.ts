/**
 * 광고 배너 매칭 규칙
 *
 * 배너는 (label, adCategoryCode, adCityCode) 3키로 저장된다.
 * - 카테고리 축: NULL 과 "CATEGORY-ALL" 이 같은 의미이므로(과거 데이터가 NULL) 정규화 후 폴백한다.
 * - 지역 축: 전 지역 공통 노출이 폐지되어 폴백 없이 **정확 일치**로만 비교한다.
 * 자세한 규약은 philip_api/docs/ads-banners.md 참고.
 *
 * 유저 화면(BannerSection / CategoryPage)과 관리자 미리보기(AdminAdsPreview)가
 * 같은 순서로 배너를 고르도록 여기서 단일 관리한다.
 * (관리자 "등록 카드"는 폴백 없이 정확히 일치하는 행만 다루므로 이 헬퍼를 쓰지 않는다)
 */

export const CATEGORY_ALL = "CATEGORY-ALL";
/**
 * 폐지된 전 지역 공통 코드.
 * 배너 매칭에서는 더 이상 쓰지 않지만, 공통코드에 남아 있는 이 가상 지역을
 * 선택지에서 걸러내야 하는 화면들이 참조하므로 상수 자체는 남긴다.
 */
export const CITY_ALL = "CITY-ALL";

/** 저장된 광고 행의 카테고리 값 정규화 (NULL = 전체 카테고리) */
export const adCategoryOf = (ads: any) => ads?.adCategoryCode || CATEGORY_ALL;
/**
 * 저장된 광고 행의 지역 값.
 * 지역은 정확 일치이므로 정규화하지 않는다 — 지역이 비어 있는 행(마이그레이션 전 잔여 데이터)은
 * 어떤 지역과도 매칭되지 않는 것이 맞다.
 */
export const adCityOf = (ads: any) => ads?.adCityCode || null;

export interface AdMatch {
  /** 매칭된 배너 (없으면 undefined) */
  ads?: any;
  /** 요청한 (카테고리, 지역) 조합에 정확히 일치하는 배너인지 (폴백이 아닌지) */
  isExact: boolean;
  /** 카테고리 폴백으로 잡힌 배너인지 — 전체 카테고리 배너가 대신 걸린 경우 */
  isCategoryFallback: boolean;
}

const pick = (
  adsData: any[] | undefined,
  label: string,
  categoryCode: string,
  cityCode: string
) =>
  adsData?.find(
    (ads: any) =>
      ads.label === label &&
      adCategoryOf(ads) === categoryCode &&
      adCityOf(ads) === cityCode
  );

/**
 * 메인 배너 매칭 — 지역은 정확 일치, 카테고리만 2단 폴백
 * 1. 카테고리 + 지역 → 2. 전체 카테고리 + 지역
 *
 * 지역을 고르지 않은 화면에서는 배너가 하나도 안 나오는 것이 정상이다.
 */
export const findMainAd = (
  adsData: any[] | undefined,
  label: string,
  categoryCode?: string | null,
  cityCode?: string | null
): AdMatch => {
  const category = categoryCode || CATEGORY_ALL;

  const ads = cityCode
    ? pick(adsData, label, category, cityCode) ??
      pick(adsData, label, CATEGORY_ALL, cityCode)
    : undefined;

  return {
    ads,
    isExact: !!ads && adCategoryOf(ads) === category,
    isCategoryFallback:
      !!ads && category !== CATEGORY_ALL && adCategoryOf(ads) === CATEGORY_ALL,
  };
};

/**
 * 전체 카테고리 배너 매칭 — 카테고리 축이 없고 지역은 정확 일치이므로 폴백이 없다.
 */
export const findCategoryAd = (
  adsData: any[] | undefined,
  label: string,
  cityCode?: string | null
): AdMatch => {
  const ads = cityCode
    ? adsData?.find(
        (ads: any) => ads.label === label && adCityOf(ads) === cityCode
      )
    : undefined;

  return {
    ads,
    isExact: !!ads,
    // 전체 카테고리 배너는 카테고리 축이 없어 항상 false
    isCategoryFallback: false,
  };
};
