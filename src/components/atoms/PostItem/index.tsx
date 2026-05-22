import Image from "next/image";
import { useRouter } from "next/router";
import * as S from "./postItem.style";
import Images from "@/data/dummy";
import { useMutation } from "react-query";
import { fetchCountViews } from "@/apis/postsApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userTokenState } from "@/recoil/userToken";
import { adminState } from "@/recoil/adminToken";

export const PostItem = ({ item }: any) => {
  const router = useRouter();
  const admin = useRecoilValue(adminState);
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);

  /** 게시물 클릭시 해당 게시물 조회수 count api */
  const mutation = useMutation(["fetchCountViews"], fetchCountViews);

  /** 게시물 클릭시 로그인 토큰 값(userToken) 이 없다면 알림 */
  const goDetail = (e: any) => {
    if (userToken || admin) router.push(`/main/post/${item.oid}`);
    else alert("로그인이 필요한 서비스 입니다.");
    // router.push(`/main/post/${item.oid}`);
  };

  /** 게시물 클릭시 handler */
  const countViews = () => {
    mutation.mutate(item.oid);
  };

  return (
    <S.PostItem
      onClick={() => {
        goDetail(item), countViews();
      }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.thumb}`}
        layout="fill"
        alt="업체 이미지"
      />
      <S.PostItemSpan>
        <span>{item.category}</span>
        {item.store_name}
      </S.PostItemSpan>
    </S.PostItem>
  );
};
