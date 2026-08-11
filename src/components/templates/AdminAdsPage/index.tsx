import { useMutation, useQuery, useQueryClient } from "react-query";
import { AmdinAdsBox } from "@/components/organisms/AdminAdsBox";
import { AdminAdsPreview } from "@/components/organisms/AdminAdsPreview";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { Category, CitySub } from "@/apis/categoryApi";
import {
  AdsLink,
  AdsScope,
  AdsSettings,
  getAdsSettingsApi,
  updateAdsSettingApi,
} from "@/apis/adsApi";
import useApiError from "@/lib/hooks/useApiError";

import * as S from "./adminAdsPage.style";

/** 탭·설정 카드·확인 문구가 같은 이름을 쓰도록 한 곳에서 관리한다 */
const SCOPE_LABELS: Record<AdsScope, string> = {
  main: "메인 페이지 배너",
  category: "전체 카테고리 배너",
};

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
  cities: CitySub[];
  /** 선택된 노출 지역 (전 지역 공통은 "CITY-ALL") */
  selectedCity: string;
  setSelectedCity: (code: string) => void;
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
  cities,
  selectedCity,
  setSelectedCity,
  stores,
  getLink,
  onChangeLink,
}: AdminAdsPageProps) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  /**
   * 범위별 배너 노출 설정.
   * 이미지 등록과 무관한 전역 설정이라 등록 폼의 드래프트 규약을 타지 않고 즉시 저장한다
   * (점검 모드 화면 AdminSettingsPage 와 같은 흐름).
   */
  const {
    data: adsSettings,
    isLoading: isSettingsLoading,
    isError: isSettingsError,
  } = useQuery<AdsSettings>(["getAdsSettings"], getAdsSettingsApi, {
    retry: 1,
    onError: (error: any) => handleError(error),
  });

  const settingMutation = useMutation(
    ({ scope, useYn }: { scope: AdsScope; useYn: "Y" | "N" }) =>
      updateAdsSettingApi(scope, useYn),
    {
      onSuccess: (saved, { scope, useYn }) => {
        queryClient.setQueryData(["getAdsSettings"], saved);
        alert(
          useYn === "Y"
            ? `${SCOPE_LABELS[scope]} 노출을 켰습니다.`
            : `${SCOPE_LABELS[scope]} 노출을 껐습니다.`
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message ?? "변경 중 오류가 발생했습니다.");
      },
    }
  );

  const scopeLabel = SCOPE_LABELS[activeTab];
  const isExposed = adsSettings?.[activeTab] === "Y";
  /** 설정을 못 읽은 동안은 '숨김'으로 단정하지 않는다 (미리보기 안내 문구 오탐 방지) */
  const isHidden = !!adsSettings && !isExposed;

  const onToggleExposure = () => {
    const next: "Y" | "N" = isExposed ? "N" : "Y";
    const confirmMessage =
      next === "Y"
        ? `${scopeLabel}를 노출하시겠습니까?`
        : `${scopeLabel}를 숨기시겠습니까?\n유저 화면에서 배너 영역이 통째로 보이지 않게 됩니다.`;
    if (!window.confirm(confirmMessage)) return;
    settingMutation.mutate({ scope: activeTab, useYn: next });
  };

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
            {SCOPE_LABELS.main}
          </S.TabButton>
          <S.TabButton
            type="button"
            role="tab"
            aria-selected={activeTab === "category"}
            $active={activeTab === "category"}
            onClick={() => setActiveTab("category")}
          >
            {SCOPE_LABELS.category}
          </S.TabButton>
        </S.TabList>
        <S.LeftColumn>
          <AdminAdsPreview
            scope={activeTab}
            imgPreview={imgPreview}
            adsData={adsData}
            uploadingLabels={uploadingLabels}
            adCategoryCode={selectedCategory}
            adCityCode={selectedCity}
            isHidden={isHidden}
          />
          <S.ExposureCard>
            <S.ExposureTit>{scopeLabel} 노출</S.ExposureTit>
            <S.ExposureDesc>
              노출을 끄면 유저 화면에서 {scopeLabel} 영역이 통째로 보이지
              않습니다. 등록된 이미지는 지워지지 않으며, 위 미리보기와
              등록·삭제는 그대로 사용할 수 있습니다.
            </S.ExposureDesc>
            {isSettingsLoading ? (
              <S.ExposureStatus>불러오는 중입니다.</S.ExposureStatus>
            ) : isSettingsError || !adsSettings ? (
              <S.ExposureErrorStatus>
                배너 노출 설정을 불러오지 못했습니다.
              </S.ExposureErrorStatus>
            ) : (
              <>
                <S.StateRow>
                  <span>현재 상태</span>
                  <S.StateBadge $exposed={isExposed}>
                    {isExposed ? "노출 중" : "숨김"}
                  </S.StateBadge>
                </S.StateRow>
                <S.ToggleButton
                  type="button"
                  $exposed={isExposed}
                  disabled={settingMutation.isLoading}
                  onClick={onToggleExposure}
                >
                  {settingMutation.isLoading
                    ? "변경 중..."
                    : isExposed
                    ? `${scopeLabel} 숨기기`
                    : `${scopeLabel} 노출하기`}
                </S.ToggleButton>
              </>
            )}
          </S.ExposureCard>
        </S.LeftColumn>
        <AmdinAdsBox
          scope={activeTab}
          adCategoryCode={selectedCategory}
          categories={categories}
          onChangeCategory={setSelectedCategory}
          adCityCode={selectedCity}
          cities={cities}
          onChangeCity={setSelectedCity}
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
