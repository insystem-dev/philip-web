/**
 * PostListBox Molecule
 * 게시글 목록 표시 컴포넌트
 *
 * 변경사항:
 * - API 호출을 상위 컴포넌트(Main 페이지)로 이동
 * - props로 데이터 전달받음
 */
import { PostItem } from "@/components/atoms/PostItem";
import * as S from "./postListBox.style";

interface PostListBoxProps {
  /** 게시글 목록 데이터 */
  postListData: any[];
  /** 로딩 상태 */
  isLoading?: boolean;
}

export const PostListBox = ({ postListData, isLoading }: PostListBoxProps) => {
  if (isLoading) {
    return (
      <S.PostListBox>
        <S.PostCountSpan>로딩 중...</S.PostCountSpan>
      </S.PostListBox>
    );
  }

  return (
    <S.PostListBox>
      <S.PostCountSpan>검색결과 총 {postListData?.length ?? 0}건</S.PostCountSpan>
      <S.PostList>
        {postListData?.map((item: any, idx: number) => {
          return <PostItem item={item} key={item.oid || idx} />;
        })}
      </S.PostList>
    </S.PostListBox>
  );
};

export default PostListBox;
