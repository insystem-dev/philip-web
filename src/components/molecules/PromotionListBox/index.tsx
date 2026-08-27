import { PostItem } from "@/components/atoms/PostItem";
import * as S from "./promotionListBox.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface PromotionListBoxProp {
  postItem: any[];
}
export const PromotionListBox = ({ postItem }: PromotionListBoxProp) => {
  const { message } = usePhilipLocale();
  if (!postItem?.length) return null;

  return (
    <S.PromotionListBox>
      <S.PropmotionTitSpan>{message.main.promotion}</S.PropmotionTitSpan>
      <S.PromotionList>
        {postItem?.map((item: any, idx: number) => {
          return <PostItem item={item} key={idx} />;
        })}
      </S.PromotionList>
    </S.PromotionListBox>
  );
};
