import { PostPage } from "@/components/templates/PostPage";
import { useQuery } from "react-query";
import { getOnePostInfoApi } from "@/apis/postsApi";
import { useRouter } from "next/router";
import { getAdsData } from "@/apis/adsApi";
export const Post = () => {
  const router = useRouter();
  const queryFn = () => getOnePostInfoApi(router.query.id);

  /** 광고 배너 데이터  */
  const { data: adsData } = useQuery("getAdsData", getAdsData);

  /** 업체 상세 데이터 */
  const { data: detailItem, isError } = useQuery(
    ["detailItem", router.query.id],
    queryFn,
    {
      retry: 1,
      // 라우터 준비 후에만 조회 (/posts/undefined 요청 방지)
      enabled: router.isReady,
      onError(err: any) {
        // 응답이 없는 네트워크 에러 방어
        if (!err.response) {
          alert("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
        if (err.response?.status === 401) {
          localStorage.removeItem("kakaoSignKey");
          router.replace("/main");
          alert("로그인 회원만 사용 가능합니다.");
        }
      },
    }
  );

  return <PostPage detailItem={detailItem} adsData={adsData} />;
};

export default Post;
