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
      onError(err: any) {
        if (err.response.status === 401) {
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
