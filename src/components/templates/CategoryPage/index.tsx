import { CategoryList } from "@/components/molecules/CategoryList";
import { LinkBox } from "@/components/molecules/LinkBox";
import { Banner } from "@/components/atoms/Banner";
import { AlertModal } from "@/components/molecules/AlertModal";
import { getAdsData } from "@/apis/adsApi";
import { userTokenState } from "@/recoil/userToken";
import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import * as S from "./CategoryPage.style";

export const CategoryPage = () => {
  const router = useRouter();
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);
  /** 비로그인 상태로 업체 연결 배너 클릭 시 로그인 안내 모달 */
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      <S.CategoryContent>
        <S.TopBanner aria-label="전체 카테고리 상단 광고">
          <Banner order="LG" ads={categoryTopAds} onAdClick={onAdClick} />
          <Banner order="SM1" ads={categoryTopBottom1} onAdClick={onAdClick} />
          <Banner order="SM2" ads={categoryTopBottom2} onAdClick={onAdClick} />
          <Banner order="SM3" ads={categoryTopBottom3} onAdClick={onAdClick} />
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
        <Banner order="LG" ads={categoryBottomAds} onAdClick={onAdClick} />
      </S.BottomBanners>
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
    </S.CategoryPage>
  );
};
