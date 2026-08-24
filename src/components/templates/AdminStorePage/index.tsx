import * as S from "./adminStorePage.style";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminStoreBox } from "@/components/organisms/AdminStoreBox";

export interface AdminStorePageProps {
  setStoreSearchKeyword: (value: string) => void;
  setPromotion: (value: boolean) => void;
  dataSource: any[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rowNumberOffset: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  error: string;
  promotionHandler: (data: any) => void;
  hiddenHandler: (data: any) => void;
  orderOptions: any[];
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  sortOptions: any[];
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  goEdit: (e: any) => void;
}

export const AdminStorePage = ({
  setStoreSearchKeyword,
  setPromotion,
  dataSource,
  isLoading,
  page,
  pageSize,
  total,
  totalPages,
  rowNumberOffset,
  onPageChange,
  onPageSizeChange,
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
    <AdminLayout title="업체관리" link="store/post" linkLabel="신규등록">
      <S.AdminStorePage>
        <AdminStoreBox
          setStoreSearchKeyword={setStoreSearchKeyword}
          setPromotion={setPromotion}
          dataSource={dataSource}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          total={total}
          totalPages={totalPages}
          rowNumberOffset={rowNumberOffset}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          error={error}
          promotionHandler={promotionHandler}
          hiddenHandler={hiddenHandler}
          orderOptions={orderOptions}
          onChangeOrder={onChangeOrder}
          sortOptions={sortOptions}
          onChangeSort={onChangeSort}
          goEdit={goEdit}
        />
      </S.AdminStorePage>
    </AdminLayout>
  );
};
