import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import { Banner } from "@/components/atoms/Banner";
import { AlertModal } from "@/components/molecules/AlertModal";
import { userTokenState } from "@/recoil/userToken";
import * as S from "./bannerSection.style";

interface BannerSectionProp {
  adsData?: any[];
  categoryCode?: string;
}

export const BannerSection = ({ adsData, categoryCode = "CATEGORY-ALL" }: BannerSectionProp) => {
  const router = useRouter();
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);
  /** 비로그인 상태로 업체 연결 배너 클릭 시 로그인 안내 모달 */
  const [showLoginModal, setShowLoginModal] = useState(false);

  const findAd = (label: string) =>
    adsData?.find((ads: any) => ads.label === label && ads.adCategoryCode === categoryCode) ||
    adsData?.find((ads: any) => ads.label === label && (ads.adCategoryCode || "CATEGORY-ALL") === "CATEGORY-ALL");
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
