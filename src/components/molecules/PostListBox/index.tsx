/**
 * PostListBox Molecule
 * 게시글 목록 표시 컴포넌트
 *
 * 변경사항:
 * - API 호출을 상위 컴포넌트(Main 페이지)로 이동
 * - props로 데이터 전달받음
 * - 선택 카테고리에 하위 카테고리가 있으면(categoryChildren) 하위 카테고리별
 *   섹션(타이틀 + 목록)으로 나눠서 보여준다. 없으면 기존 flat 목록 그대로.
 */
import { useMemo } from "react";
import { PostItem } from "@/components/atoms/PostItem";
import * as S from "./postListBox.style";

interface PostListBoxProps {
  /** 게시글 목록 데이터 */
  postListData: any[];
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 선택 카테고리의 직계 하위 카테고리 (sort 순 정렬, 없으면 flat 목록) */
  categoryChildren?: any[];
}

export const PostListBox = ({
  postListData,
  isLoading,
  categoryChildren,
}: PostListBoxProps) => {
  /**
   * 하위 카테고리별 섹션 구성.
   * 코드가 계층 접두사 구조(부모 CATEGORY-01 → 자식 CATEGORY-01-01)라서
   * 손자 이하 게시글도 접두사 매칭으로 해당 직계 하위 섹션에 합쳐진다.
   * 어느 하위에도 속하지 않는 게시글(상위 카테고리에 직접 등록)은 마지막 섹션으로 묶는다.
   */
  const groups = useMemo(() => {
    if (!categoryChildren?.length || !postListData?.length) return null;

    const sections = categoryChildren.map((child: any) => ({
      key: child.oid,
      title: child.name,
      posts: postListData.filter(
        (item: any) =>
          item.category_oid === child.oid ||
          item.category_oid?.startsWith(`${child.oid}-`)
      ),
    }));

    const groupedOids = new Set(
      sections.flatMap((section) => section.posts.map((item: any) => item.oid))
    );
    const leftover = postListData.filter(
      (item: any) => !groupedOids.has(item.oid)
    );
    if (leftover.length) {
      sections.push({
        key: "__leftover__",
        title: leftover[0].category || "기타",
        posts: leftover,
      });
    }

    return sections.filter((section) => section.posts.length > 0);
  }, [postListData, categoryChildren]);

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

      {groups ? (
        groups.map((group) => (
          <S.PostGroupSection key={group.key}>
            <S.PostGroupTitle>
              {group.title}
              <em>{group.posts.length}곳</em>
            </S.PostGroupTitle>
            <S.PostList>
              {group.posts.map((item: any, idx: number) => {
                return (
                  <PostItem
                    item={item}
                    key={`${item.oid || "post"}-${idx}`}
                  />
                );
              })}
            </S.PostList>
          </S.PostGroupSection>
        ))
      ) : (
        <S.PostList>
          {postListData?.map((item: any, idx: number) => {
            return (
              <PostItem item={item} key={`${item.oid || "post"}-${idx}`} />
            );
          })}
        </S.PostList>
      )}
    </S.PostListBox>
  );
};

export default PostListBox;
