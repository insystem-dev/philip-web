import { PostPage } from "@/components/templates/PostPage";
import { useQuery } from "react-query";
import { getOnePostInfoApi } from "@/apis/postsApi";
import { useRouter } from "next/router";
import { getAdsData } from "@/apis/adsApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userTokenState } from "@/recoil/userToken";
import { cityState } from "@/recoil/city";
import { useState } from "react";
import { AlertModal } from "@/components/molecules/AlertModal";

export const Post = () => {
  const router = useRouter();
  const [, setUserToken] = useRecoilState(userTokenState);
  /** 선택된 지역 (배너 지역별 노출용) */
  const city = useRecoilValue(cityState);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const queryFn = () => getOnePostInfoApi(router.query.id);

  /** 광고 배너 데이터 (선택 지역 전용 — 지역 미선택이면 노출할 배너가 없어 조회하지 않는다) */
  const { data: adsData } = useQuery(
    ["getAdsData", city || null],
    getAdsData,
    { enabled: !!city }
  );

  /** 업체 상세 데이터 */
  const { data: detailItem, isError } = useQuery(
    ["detailItem", router.query.id],
    queryFn,
    {
      retry: 0,
      // 라우터 준비 후에만 조회 (/posts/undefined 요청 방지)
      enabled: router.isReady,
      onError(err: any) {
        // 응답이 없는 네트워크 에러 방어
        if (!err.response) {
          alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
        if (err.response?.status === 401) {
          // 유저 토큰만 localStorage + Recoil 양쪽에서 초기화 (UI가 로그인 상태로 남는 버그 방지)
          // admin 항목은 건드리지 않는다 — 유저 화면 요청에는 admin 토큰이 실리지 않으므로
          // 유저 쪽 401로 관리자 로그인까지 날아갈 이유가 없다
          localStorage.removeItem("kakaoSignKey");
          setUserToken(null);
          setShowSessionExpired(true);
        }
      },
    }
  );

  return (
    <>
      <PostPage detailItem={detailItem} adsData={adsData} cityCode={city} />
      {showSessionExpired && (
        <AlertModal
          title="로그인이 필요합니다"
          message={`세션이 만료되어 다시 로그인해야 합니다.`}
          confirmLabel="로그인하기"
          onConfirm={() => router.replace("/auth/login")}
        />
      )}
    </>
  );
};

export default Post;
