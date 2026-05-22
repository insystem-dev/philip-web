import { Banner } from "@/components/atoms/Banner";
import { adsState } from "@/recoil/ads";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import * as S from "./adminAdsPreview.style";

interface AdminAdsPreviewProps {
  imgPreview: any;
  adsData: [];
}

export const AdminAdsPreview = ({
  imgPreview,
  adsData,
}: AdminAdsPreviewProps) => {
  const [todoAds, setAdsList] = useRecoilState(adsState);

  const topAds = adsData?.find((ads: any) => ads.label === "topAds");
  const btm1 = adsData?.find((ads: any) => ads.label === "bottom1");
  const btm2 = adsData?.find((ads: any) => ads.label === "bottom2");
  const btm3 = adsData?.find((ads: any) => ads.label === "bottom3");

  const newTopAds = imgPreview?.find((ads: any) => ads.label === "topAds");
  const newBtm1 = imgPreview?.find((ads: any) => ads.label === "bottom1");
  const newBtm2 = imgPreview?.find((ads: any) => ads.label === "bottom2");
  const newBtm3 = imgPreview?.find((ads: any) => ads.label === "bottom3");

  useEffect(() => {
    setAdsList([
      {
        topAds: topAds || newTopAds,
        bottom1: btm1 || newBtm1,
        bottom2: btm2 || newBtm2,
        bottom3: btm3 || newBtm3,
      },
    ]);
  }, [adsData, imgPreview]);

  return (
    <S.AdminAdsPreview>
      <S.AdminAdsPreviewTit>배너 미리보기</S.AdminAdsPreviewTit>
      <S.AdminAdsPreviewBox>
        <Banner order="LG" ads={topAds || newTopAds} admin={true} />
        <Banner order="SM1" ads={btm1 || newBtm1} admin={true} />
        <Banner order="SM2" ads={btm2 || newBtm2} admin={true} />
        <Banner order="SM3" ads={btm3 || newBtm3} admin={true} />
      </S.AdminAdsPreviewBox>
    </S.AdminAdsPreview>
  );
};
