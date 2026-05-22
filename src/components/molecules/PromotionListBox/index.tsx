import { PostItem } from "@/components/atoms/PostItem";
import * as S from "./promotionListBox.style";

interface PromotionListBoxProp {
  postItem: [];
}
export const PromotionListBox = ({ postItem }: PromotionListBoxProp) => {
  return (
    <S.PromotionListBox>
      <S.PropmotionTitSpan>이달의 프로모션</S.PropmotionTitSpan>
      <S.PromotionList>
        {postItem?.map((item: any, idx: number) => {
          return <PostItem item={item} key={idx} />;
        })}
      </S.PromotionList>
    </S.PromotionListBox>
  );
};
