import * as S from "./adminStorePage.style";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminStoreBox } from "@/components/organisms/AdminStoreBox";
import { adminState } from "@/recoil/adminToken";
import { useRecoilState } from "recoil";

export interface AdminStorePageProps {
  setStoreSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setPromotion: React.Dispatch<React.SetStateAction<boolean>>;
  dataSource: [];
  isLoading: boolean;
  error: string;
  promotionHandler: (data: any) => void;
  orderOptions: any[];
  onChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  goEdit: (e: any) => void;
}

export const AdminStorePage = ({
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
    <AdminLayout title="업체관리" link="store/post" linkLabel="신규등록">
      <S.AdminStorePage>
        <AdminStoreBox
          setStoreSearchKeyword={setStoreSearchKeyword}
          setPromotion={setPromotion}
          dataSource={dataSource}
          isLoading={isLoading}
          error={error}
          promotionHandler={promotionHandler}
          orderOptions={orderOptions}
          onChangeOrder={onChangeOrder}
          goEdit={goEdit}
        />
      </S.AdminStorePage>
    </AdminLayout>
  );
};
