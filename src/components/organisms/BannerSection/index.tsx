import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Banner } from "@/components/atoms/Banner";
import { AlertModal } from "@/components/molecules/AlertModal";
import { AdsSettings, getAdsSettingsApi } from "@/apis/adsApi";
import { userTokenState } from "@/recoil/userToken";
import { CATEGORY_ALL, findMainAd } from "@/lib/adsMatch";
import * as S from "./bannerSection.style";

interface BannerSectionProp {
  adsData?: any[];
  categoryCode?: string;
  /** 선택된 지역 (code_sub.code). 배너는 지역 전용이라 미선택이면 아무것도 노출되지 않는다 */
  cityCode?: string | null;
}

export const BannerSection = ({
  adsData,
  categoryCode = CATEGORY_ALL,
  cityCode = null,
}: BannerSectionProp) => {
  const router = useRouter();
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);
  /** 비로그인 상태로 업체 연결 배너 클릭 시 로그인 안내 모달 */
  const [showLoginModal, setShowLoginModal] = useState(false);
  /** 관리자가 켜고 끄는 범위별 배너 노출 설정 (비로그인도 조회 가능) */
  const { data: adsSettings, isLoading: isSettingsLoading } =
    useQuery<AdsSettings>(["getAdsSettings"], getAdsSettingsApi);

  /** 지역은 정확 일치, 카테고리만 2단 폴백 (philip_api/docs/ads-banners.md 의 노출 폴백 순서) */
  const findAd = (label: string) =>
    findMainAd(adsData, label, categoryCode, cityCode).ads;
  const topAds = findAd("topAds");
  const btm1 = findAd("bottom1");
  const btm2 = findAd("bottom2");
  const btm3 = findAd("bottom3");

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

  /**
   * 메인 배너 노출이 꺼져 있으면 섹션 자체를 그리지 않는다.
   * Banner atom 은 이미지가 없어도 회색 플레이스홀더를 그리므로 여기서 통째로 빼야 자리까지 사라진다.
   * 설정을 읽는 동안에도 그리지 않는다 — 잠깐 떴다 사라지는 깜빡임을 막기 위해서다.
   */
  if (isSettingsLoading || adsSettings?.main !== "Y") return null;

  return (
    <S.BannerSection>
      <Banner order="LG" ads={topAds} onAdClick={onAdClick} />
      <Banner order="SM1" ads={btm1} onAdClick={onAdClick} />
      <Banner order="SM2" ads={btm2} onAdClick={onAdClick} />
      <Banner order="SM3" ads={btm3} onAdClick={onAdClick} />
      {/* 배너가 grid/z-index 쌓임 맥락에 갇히지 않도록 portal로 body에 직접 렌더링한다 */}
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
    </S.BannerSection>
  );
};
