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
  orderOptions,
  onChangeOrder,
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
        orderOptions={orderOptions}
        onChangeOrder={onChangeOrder}
        goEdit={goEdit}
      />
    </S.AdminStoreBox>
  );
};
