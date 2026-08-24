import { CategoryList } from "@/components/molecules/CategoryList";
import { LinkBox } from "@/components/molecules/LinkBox";
import { Banner } from "@/components/atoms/Banner";
import { ActiveNoticePopups } from "@/components/molecules/ActiveNoticePopups";
import { AdsSettings, getAdsData, getAdsSettingsApi } from "@/apis/adsApi";
import { findCategoryAd } from "@/lib/adsMatch";
import { cityState } from "@/recoil/city";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import * as S from "./CategoryPage.style";

export const CategoryPage = () => {
  const router = useRouter();
  /** 선택된 지역 (배너 · 카테고리 목록 지역별 노출용) */
  const city = useRecoilValue(cityState);

  // 배너는 지역 전용이라 지역을 고르기 전에는 노출할 것이 없다 → 전체 목록을 헛되이 받지 않도록 막는다
  const { data: adsData = [] } = useQuery(
    ["getAdsData", city || null],
    getAdsData,
    { enabled: !!city }
  );

  /** 관리자가 켜고 끄는 범위별 배너 노출 설정 (비로그인도 조회 가능) */
  const { data: adsSettings, isLoading: isSettingsLoading } =
    useQuery<AdsSettings>(["getAdsSettings"], getAdsSettingsApi);

  /** 전체 카테고리 배너는 카테고리 축이 없고 지역은 정확 일치라 폴백이 없다 */
  const findAd = (label: string) => findCategoryAd(adsData, label, city).ads;
  const categoryTopAds = findAd("categoryTopAds");
  const categoryBottomAds = findAd("categoryBottomAds");
  const categoryTopBottom1 = findAd("categoryTopBottom1");
  const categoryTopBottom2 = findAd("categoryTopBottom2");
  const categoryTopBottom3 = findAd("categoryTopBottom3");

  /**
   * 전체 카테고리 배너 노출이 꺼져 있으면 상·하단 배너 영역을 통째로 그리지 않는다.
   * Banner atom 은 이미지가 없어도 회색 플레이스홀더를 그리므로 여기서 빼야 자리까지 사라진다.
   * 설정을 읽는 동안에도 그리지 않는다 — 잠깐 떴다 사라지는 깜빡임을 막기 위해서다.
   */
  const showBanners = !isSettingsLoading && adsSettings?.category === "Y";

  /** 업체 접근 가능 여부는 상세 API가 지역·카테고리 설정으로 최종 판정한다. */
  const onAdClick = (ads: any) => {
    if (ads?.adLinkUrl) {
      // http(s) 외 스킴(javascript:, data:)은 열지 않는다
      if (!/^https?:\/\//i.test(ads.adLinkUrl)) return;
      window.open(ads.adLinkUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (!ads?.adLinkPostOid) return;
    router.push(`/main/post/${ads.adLinkPostOid}`);
  };

  return (
    <S.CategoryPage>
      <S.FlagBackdrop aria-hidden="true">
        <S.FlagSurface>
          <S.FlagSun>✺</S.FlagSun>
          <S.FlagStar $position="left">★</S.FlagStar>
          <S.FlagStar $position="right">★</S.FlagStar>
          <S.FlagStar $position="bottom">★</S.FlagStar>
          <S.FlagFold $index={1} />
          <S.FlagFold $index={2} />
          <S.FlagFold $index={3} />
        </S.FlagSurface>
      </S.FlagBackdrop>
      <S.CategoryContent>
        <S.CategoryArea>
          <S.Brand aria-label="PhiliP">
            <S.BrandText data-text="PhiliP">PhiliP</S.BrandText>
            <S.BrandSparkle $position="left">✦</S.BrandSparkle>
            <S.BrandSparkle $position="top">✦</S.BrandSparkle>
            <S.BrandSparkle $position="right">✦</S.BrandSparkle>
            <S.BrandSparkle $position="bottom">✦</S.BrandSparkle>
          </S.Brand>
          <S.CategoryTxtBox>카테고리를 선택해 주세요.</S.CategoryTxtBox>
          {/* city 미선택 구간에는 cityCode 를 빼고 호출해 전역 목록으로 폴백한다 */}
          <CategoryList cityCode={city} />
        </S.CategoryArea>
        <S.ContactArea>
          <LinkBox inline />
        </S.ContactArea>
        {showBanners && (
          <S.TopBanner aria-label="전체 카테고리 상단 광고">
            <Banner order="LG" ads={categoryTopAds} onAdClick={onAdClick} />
            <Banner
              order="SM1"
              ads={categoryTopBottom1}
              onAdClick={onAdClick}
            />
            <Banner
              order="SM2"
              ads={categoryTopBottom2}
              onAdClick={onAdClick}
            />
            <Banner
              order="SM3"
              ads={categoryTopBottom3}
              onAdClick={onAdClick}
            />
          </S.TopBanner>
        )}
      </S.CategoryContent>
      {showBanners && (
        <S.BottomBanners aria-label="전체 카테고리 하단 광고">
          <Banner order="LG" ads={categoryBottomAds} onAdClick={onAdClick} />
        </S.BottomBanners>
      )}
      {/* 배너가 grid/z-index 쌓임 맥락에 갇히지 않도록 portal로 body에 직접 렌더링한다 */}
      <ActiveNoticePopups />
    </S.CategoryPage>
  );
};
