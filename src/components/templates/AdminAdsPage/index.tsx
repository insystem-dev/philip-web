import { AmdinAdsBox } from "@/components/organisms/AdminAdsBox";
import { AdminAdsPreview } from "@/components/organisms/AdminAdsPreview";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { Category } from "@/apis/categoryApi";
import { AdsLink } from "@/apis/adsApi";

import * as S from "./adminAdsPage.style";

interface AdminAdsPageProps {
  imgPreview: any;
  setImgPreview: React.Dispatch<React.SetStateAction<any>>;
  uploadingLabels: string[];
  adsData: [];
  onChangeImages: (e: any) => void;
  onDeleteOne: (id: string) => void;
  onSubmit: (e: Event) => void;
  onRemovePreviewImage: (isAds: any) => void;
  onDeleteAll: () => void;
  activeTab: "main" | "category";
  setActiveTab: (tab: "main" | "category") => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (code: string) => void;
  /** 배너 연결 대상으로 고를 수 있는 등록 업체 목록 */
  stores: any[];
  /** label별 연결 대상 입력값 조회 */
  getLink: (label: string) => AdsLink;
  /** label별 연결 대상 변경 */
  onChangeLink: (label: string, next: AdsLink) => void;
}
export const AdminAdsPage = ({
  imgPreview,
  setImgPreview,
  uploadingLabels,
  adsData,
  onDeleteOne,
  onSubmit,
  onRemovePreviewImage,
  onDeleteAll,
  onChangeImages,
  activeTab,
  setActiveTab,
  categories,
  selectedCategory,
  setSelectedCategory,
  stores,
  getLink,
  onChangeLink,
}: AdminAdsPageProps) => {
  return (
    <AdminLayout title="광고관리">
      <S.AdminAdsPage>
        <S.TabList role="tablist" aria-label="광고 관리 구분">
          <S.TabButton
            type="button"
            role="tab"
            aria-selected={activeTab === "main"}
            $active={activeTab === "main"}
            onClick={() => setActiveTab("main")}
          >
            메인 페이지 배너
          </S.TabButton>
          <S.TabButton
            type="button"
            role="tab"
            aria-selected={activeTab === "category"}
            $active={activeTab === "category"}
            onClick={() => setActiveTab("category")}
          >
            전체 카테고리 배너
          </S.TabButton>
        </S.TabList>
        <AdminAdsPreview
          scope={activeTab}
          imgPreview={imgPreview}
          adsData={adsData}
          uploadingLabels={uploadingLabels}
          adCategoryCode={selectedCategory}
        />
        <AmdinAdsBox
          scope={activeTab}
          adCategoryCode={selectedCategory}
          categories={categories}
          onChangeCategory={setSelectedCategory}
          setImgPreview={setImgPreview}
          imgPreview={imgPreview}
          adsData={adsData}
          onChangeImages={onChangeImages}
          onDeleteOne={onDeleteOne}
          onSubmit={onSubmit}
          onRemovePreviewImage={onRemovePreviewImage}
          onDeleteAll={onDeleteAll}
          stores={stores}
          getLink={getLink}
          onChangeLink={onChangeLink}
        />
      </S.AdminAdsPage>
    </AdminLayout>
  );
};
