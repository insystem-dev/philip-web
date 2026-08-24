import { InputText } from "@/components/atoms/Input/InputText";
import { categoryState } from "@/recoil/category";
import { useRecoilState } from "recoil";
import * as S from "../adminSearchBox.style";
import { useQuery } from "react-query";
import { getCategoryTreeApi } from "@/apis/categoryApi";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { AdminCategoryDrilldown } from "@/components/molecules/AdminCategoryDrilldown";

interface StoreSearchProps {
  setStoreSearchKeyword: (value: string) => void;
  setPromotion: (value: boolean) => void;
}

export const StoreSearch = ({
  setStoreSearchKeyword,
  setPromotion,
}: StoreSearchProps) => {
  const [categoryInput, setCategoryInput] = useRecoilState(categoryState);
  const { data: categories = [] } = useQuery(
    "getCategoryTreeApi",
    getCategoryTreeApi
  );

  return (
    <S.AdminSearchBox>
      <S.AdminsearchItemBox>
        <S.AdminSearchTit>카테고리</S.AdminSearchTit>
        <S.AdminCategoryFilter>
          <AdminCategoryDrilldown
            categories={categories}
            value={categoryInput}
            onChange={setCategoryInput}
            allowAll
          />
        </S.AdminCategoryFilter>
      </S.AdminsearchItemBox>

      <S.AdminsearchItemBox>
        <S.AdminSearchTit>업체명</S.AdminSearchTit>
        <InputText
          layout="adminRow"
          size="sm"
          themeType="admin"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStoreSearchKeyword(e.target.value)
          }
        />
      </S.AdminsearchItemBox>

      <S.AdminsearchItemBox>
        <InputCheckbox
          layout="row"
          themeType="admin"
          displayValue="프로모션만 보기"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPromotion(e.target.checked)
          }
        />
      </S.AdminsearchItemBox>
    </S.AdminSearchBox>
  );
};
