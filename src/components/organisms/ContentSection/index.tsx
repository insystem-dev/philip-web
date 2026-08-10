import { PostListBox } from "@/components/molecules/PostListBox";
import { PromotionListBox } from "@/components/molecules/PromotionListBox";
import * as S from "./contentSection.style";

interface ContentSectionProp {
  /** 프로모션 데이터 */
  postItem: any[];
  /** 전체 게시글 데이터 */
  postListData: any[];
  /** 게시글 로딩 상태 */
  isPostLoading: boolean;
  /** 선택 카테고리의 직계 하위 카테고리 (있으면 하위 카테고리별 섹션으로 표시) */
  categoryChildren?: any[];
}

export const ContentSection = ({
  postItem,
  postListData,
  isPostLoading,
  categoryChildren,
}: ContentSectionProp) => {
  return (
    <S.ContentSection>
      <PromotionListBox postItem={postItem} />
      <PostListBox
        postListData={postListData}
        isLoading={isPostLoading}
        categoryChildren={categoryChildren}
      />
    </S.ContentSection>
  );
};

export default ContentSection;
