import { AmdinAdsBox } from "@/components/organisms/AdminAdsBox";
import { AdminAdsPreview } from "@/components/organisms/AdminAdsPreview";
import { AdminLayout } from "@/components/organisms/AdminLayout";

import * as S from "./adminAdsPage.style";

interface AdminAdsPageProps {
  imgPreview: any;
  setImgPreview: React.Dispatch<React.SetStateAction<any>>;
  adsData: [];
  onChangeImages: (e: any) => void;
  onDeleteOne: (id: string) => void;
  onSubmit: (e: Event) => void;
  onRemovePreviewImage: (isAds: any) => void;
  onDeleteAll: () => void;
}
export const AdminAdsPage = ({
  imgPreview,
  setImgPreview,
  adsData,
  onDeleteOne,
  onSubmit,
  onRemovePreviewImage,
  onDeleteAll,
  onChangeImages,
}: AdminAdsPageProps) => {
  return (
    <AdminLayout title="광고관리">
      <S.AdminAdsPage>
        <AdminAdsPreview imgPreview={imgPreview} adsData={adsData} />
        <AmdinAdsBox
          setImgPreview={setImgPreview}
          imgPreview={imgPreview}
          adsData={adsData}
          onChangeImages={onChangeImages}
          onDeleteOne={onDeleteOne}
          onSubmit={onSubmit}
          onRemovePreviewImage={onRemovePreviewImage}
          onDeleteAll={onDeleteAll}
        />
      </S.AdminAdsPage>
    </AdminLayout>
  );
};
