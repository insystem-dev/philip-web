import { CategoryItem } from "@/components/atoms/CategoryItem";
import * as S from "./categoryList.style";
import { useQuery } from "react-query";
import { getCategoryNavApi } from "@/apis/categoryApi";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface CategoryListProps {
  /** 선택된 지역 코드 — 주면 그 지역의 노출 설정(숨김 제외 + 지역 순서)이 적용된다 */
  cityCode?: string | null;
}

export const CategoryList = ({ cityCode }: CategoryListProps) => {
  const { locale } = usePhilipLocale();
  /** Nav 카테고리 가져오기 (지역이 바뀌면 key 가 바뀌어 재조회된다) */
  const { data: categoryItem, isLoading } = useQuery(
    ["getCategoryNavApi", cityCode ?? null, locale],
    getCategoryNavApi
  );

  return (
    <S.CategoryList aria-busy={isLoading}>
      {categoryItem?.map((item: any, idx: number) => {
        return <CategoryItem item={item} index={idx} key={item.oid ?? idx} />;
      })}
    </S.CategoryList>
  );
};
