import Data from "@/data/dummy";
import { CategoryItem } from "@/components/atoms/CategoryItem";
import * as S from "./categoryList.style";
import { useQuery } from "react-query";
import { getCategoryNavApi } from "@/apis/categoryApi";

export const CategoryList = () => {
  /** Nav 카테고리 가져오기*/
  const { data: categoryItem, isLoading } = useQuery(
    "getCategoryNavApi",
    getCategoryNavApi
  );

  return (
    <S.CategoryList>
      {categoryItem?.map((item: any, idx: number) => {
        return <CategoryItem item={item} key={idx} />;
      })}
    </S.CategoryList>
  );
};
