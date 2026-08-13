import { CategoryList } from "@/components/molecules/CategoryList";
import { LinkBox } from "@/components/molecules/LinkBox";
import { Banner } from "@/components/atoms/Banner";
import { AlertModal } from "@/components/molecules/AlertModal";
import { NoticePopupModal } from "@/components/molecules/NoticePopupModal";
import { AdsSettings, getAdsData, getAdsSettingsApi } from "@/apis/adsApi";
import { getActivePopupsApi, PopupItem } from "@/apis/popupApi";
import { findCategoryAd } from "@/lib/adsMatch";
import { userTokenState } from "@/recoil/userToken";
import { cityState } from "@/recoil/city";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import * as S from "./CategoryPage.style";

export const CategoryPage = () => {
  const router = useRouter();
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);
  /** 선택된 지역 (배너 · 카테고리 목록 지역별 노출용) */
  const city = useRecoilValue(cityState);
  /** 비로그인 상태로 업체 연결 배너 클릭 시 로그인 안내 모달 */
  const [showLoginModal, setShowLoginModal] = useState(false);
  /** 관리자가 설정한 팝업 중 오늘 숨김 처리되지 않은 항목을 노출 순서대로 보관 */
  const [popupQueue, setPopupQueue] = useState<PopupItem[]>([]);
  const [popupTotal, setPopupTotal] = useState(0);
  const popupInitialized = useRef(false);

  const { data: activePopups, isSuccess: popupLoaded } = useQuery(
    ["activePopups"],
    getActivePopupsApi,
    { staleTime: 60_000 }
  );

  useEffect(() => {
    if (!popupLoaded || popupInitialized.current) return;
    popupInitialized.current = true;
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const visible = (activePopups || []).filter(
      (popup) =>
        localStorage.getItem(`philip:popup:hidden:${popup.oid}`) !== today
    );
    setPopupQueue(visible);
    setPopupTotal(visible.length);
  }, [activePopups, popupLoaded]);

  const closeCurrentPopup = useCallback(() => {
    setPopupQueue((current) => current.slice(1));
  }, []);

  const hideCurrentPopupToday = useCallback(() => {
    setPopupQueue((current) => {
      const popup = current[0];
      if (popup) {
        const today = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Seoul",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date());
        localStorage.setItem(`philip:popup:hidden:${popup.oid}`, today);
      }
      return current.slice(1);
    });
  }, []);

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

  /** 배너 클릭 이동 (외부 URL 은 새 탭, 업체는 PostItem 과 동일하게 userToken 게이팅) */
  const onAdClick = (ads: any) => {
    if (ads?.adLinkUrl) {
      // http(s) 외 스킴(javascript:, data:)은 열지 않는다
      if (!/^https?:\/\//i.test(ads.adLinkUrl)) return;
      window.open(ads.adLinkUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (!ads?.adLinkPostOid) return;
    if (userToken) router.push(`/main/post/${ads.adLinkPostOid}`);
    else setShowLoginModal(true);
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
            <Banner order="SM1" ads={categoryTopBottom1} onAdClick={onAdClick} />
            <Banner order="SM2" ads={categoryTopBottom2} onAdClick={onAdClick} />
            <Banner order="SM3" ads={categoryTopBottom3} onAdClick={onAdClick} />
          </S.TopBanner>
        )}
      </S.CategoryContent>
      {showBanners && (
        <S.BottomBanners aria-label="전체 카테고리 하단 광고">
          <Banner order="LG" ads={categoryBottomAds} onAdClick={onAdClick} />
        </S.BottomBanners>
      )}
      {/* 배너가 grid/z-index 쌓임 맥락에 갇히지 않도록 portal로 body에 직접 렌더링한다 */}
      {popupQueue[0] &&
        createPortal(
          <NoticePopupModal
            popup={popupQueue[0]}
            current={popupTotal - popupQueue.length + 1}
            total={popupTotal}
            onClose={closeCurrentPopup}
            onHideToday={hideCurrentPopupToday}
          />,
          document.body
        )}
      {showLoginModal &&
        createPortal(
          <AlertModal
            title="로그인이 필요합니다"
            message={"로그인이 필요한 서비스 입니다.\n로그인 후 이용해주세요."}
            confirmLabel="로그인하기"
            onConfirm={() => router.push("/auth/login")}
          />,
          document.body
        )}
    </S.CategoryPage>
  );
};
