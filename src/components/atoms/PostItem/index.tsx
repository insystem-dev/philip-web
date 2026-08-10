import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";
import * as S from "./postItem.style";
import { useMutation } from "react-query";
import { fetchCountViews } from "@/apis/postsApi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userTokenState } from "@/recoil/userToken";
import { adminState } from "@/recoil/adminToken";
import { AlertModal } from "@/components/molecules/AlertModal";

export const PostItem = ({ item }: any) => {
  const router = useRouter();
  const admin = useRecoilValue(adminState);
  /** 고객 토큰관리 */
  const userToken = useRecoilValue(userTokenState);
  /** 비로그인 상태로 게시물 클릭 시 로그인 안내 모달 */
  const [showLoginModal, setShowLoginModal] = useState(false);

  /** 게시물 클릭시 해당 게시물 조회수 count api */
  const mutation = useMutation(["fetchCountViews"], fetchCountViews);

  /** 게시물 클릭시 로그인 토큰 값(userToken) 이 없다면 알림 */
  const goDetail = (e: any) => {
    if (userToken || admin) router.push(`/main/post/${item.oid}`);
    else setShowLoginModal(true);
    // router.push(`/main/post/${item.oid}`);
  };

  /** 게시물 클릭시 handler (로그인 상태일 때만 조회수 증가) */
  const countViews = () => {
    if (userToken || admin) mutation.mutate(item.oid);
  };

  return (
    <S.PostItem
      onClick={() => {
        (goDetail(item), countViews());
      }}
    >
      {item.thumb ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.thumb}`}
          layout="fill"
          sizes="(max-width: 768px) 33vw, 220px"
          alt="업체 이미지"
        />
      ) : (
        <S.PostItemNoImage aria-label="등록된 이미지 없음" />
      )}
      <S.PostItemSpan>
        <span>{item.category}</span>
        {item.store_name}
      </S.PostItemSpan>
      {/* li(position: relative + z-index)의 쌓임 맥락에 갇히면 다른 카드 뒤로
          모달이 숨으므로 portal로 body에 직접 렌더링해 최상위에 띄운다 */}
      {showLoginModal &&
        createPortal(
          // portal이어도 React 이벤트는 li의 onClick으로 버블링되므로 차단 유지
          <div onClick={(e) => e.stopPropagation()}>
            <AlertModal
              title="로그인이 필요합니다"
              message={
                "로그인이 필요한 서비스 입니다.\n로그인 후 이용해주세요."
              }
              confirmLabel="로그인하기"
              onConfirm={() => router.push("/auth/login")}
            />
          </div>,
          document.body
        )}
    </S.PostItem>
  );
};
