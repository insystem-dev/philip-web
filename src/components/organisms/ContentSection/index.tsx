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
}

export const ContentSection = ({
  postItem,
  postListData,
  isPostLoading,
}: ContentSectionProp) => {
  return (
    <S.ContentSection>
      <PromotionListBox postItem={postItem} />
      <PostListBox postListData={postListData} isLoading={isPostLoading} />
    </S.ContentSection>
  );
};

export default ContentSection;
