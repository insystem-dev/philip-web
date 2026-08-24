import { StoreGrid } from "@/components/molecules/AdminGrid/StoreGrid";
import { StoreSearch } from "@/components/molecules/AdminSearchBox/StoreSearch";

import * as S from "./AdminStoreGrid.style";
import { AdminStorePageProps } from "@/components/templates/AdminStorePage";

export const AdminStoreBox = ({
  setStoreSearchKeyword,
  setPromotion,
  dataSource,
  isLoading,
  error,
  promotionHandler,
  hiddenHandler,
  orderOptions,
  onChangeOrder,
  sortOptions,
  onChangeSort,
  goEdit,
}: AdminStorePageProps) => {
  return (
    <S.AdminStoreBox>
      <StoreSearch
        setStoreSearchKeyword={setStoreSearchKeyword}
        setPromotion={setPromotion}
      />
      <StoreGrid
        dataSource={dataSource}
        isLoading={isLoading}
        error={error}
        promotionHandler={promotionHandler}
        hiddenHandler={hiddenHandler}
        orderOptions={orderOptions}
        onChangeOrder={onChangeOrder}
        sortOptions={sortOptions}
        onChangeSort={onChangeSort}
        goEdit={goEdit}
      />
    </S.AdminStoreBox>
  );
};
