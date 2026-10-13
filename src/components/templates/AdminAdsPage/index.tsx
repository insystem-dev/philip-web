import { useMemo } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
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
import { CATEGORY_ALL } from "@/lib/adsMatch";

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
   * 배너 등록용 카테고리 선택과 별개로, 노출 여부는 모든 카테고리를 한 화면에서
   * 각각 조정한다. CATEGORY-ALL은 메인에서 "전체"를 선택했을 때의 범위다.
   */
  const categoryExposureItems = useMemo(() => {
    const byCode = new Map(categories.map((item) => [item.oid, item]));
    const depthOf = (item: Category) => {
      let depth = 0;
      let parent = item.parentOid ? byCode.get(item.parentOid) : undefined;
      while (parent) {
        depth += 1;
        parent = parent.parentOid ? byCode.get(parent.parentOid) : undefined;
      }
      return depth;
    };
    const pathOf = (item: Category) => {
      const path = [item.name];
      let parent = item.parentOid ? byCode.get(item.parentOid) : undefined;
      while (parent) {
        path.unshift(parent.name);
        parent = parent.parentOid ? byCode.get(parent.parentOid) : undefined;
      }
      return path.join(" > ");
    };

    return [
      {
        oid: CATEGORY_ALL,
        name: "전체",
        path: "전체 카테고리 선택 시",
        depth: 0,
        useYn: "Y" as const,
      },
      ...categories
        .filter((item) => item.oid !== CATEGORY_ALL)
        .map((item) => ({
          oid: item.oid,
          name: item.name,
          path: pathOf(item),
          depth: depthOf(item),
          useYn: item.useYn,
        })),
    ];
  }, [categories]);

  const categorySettingQueries = useQueries(
    categoryExposureItems.map((item) => ({
      queryKey: ["getAdsSettings", item.oid],
      queryFn: getAdsSettingsApi,
      retry: 1,
      enabled: activeTab === "main",
    }))
  );

  /** 메인 배너는 선택 카테고리별, 전체 카테고리 페이지 배너는 전역으로 즉시 저장한다. */
  const settingsCategoryCode =
    activeTab === "main" ? selectedCategory : CATEGORY_ALL;
  const {
    data: adsSettings,
    isLoading: isSettingsLoading,
    isError: isSettingsError,
  } = useQuery<AdsSettings>(
    ["getAdsSettings", settingsCategoryCode],
    getAdsSettingsApi,
    {
      retry: 1,
      onError: (error: any) => handleError(error),
    }
  );

  const settingMutation = useMutation(
    ({
      scope,
      useYn,
      categoryCode,
      displayLabel,
    }: {
      scope: AdsScope;
      useYn: "Y" | "N";
      categoryCode?: string;
      displayLabel?: string;
    }) => updateAdsSettingApi(scope, useYn, categoryCode),
    {
      onSuccess: (saved, { scope, useYn, categoryCode, displayLabel }) => {
        queryClient.setQueryData(
          ["getAdsSettings", categoryCode || CATEGORY_ALL],
          saved
        );
        alert(
          useYn === "Y"
            ? `${displayLabel || SCOPE_LABELS[scope]} 노출을 켰습니다.`
            : `${displayLabel || SCOPE_LABELS[scope]} 노출을 껐습니다.`
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message ?? "변경 중 오류가 발생했습니다.");
      },
    }
  );

  const bulkSettingMutation = useMutation(
    async (useYn: "Y" | "N") =>
      Promise.all(
        categoryExposureItems.map(async (item) => ({
          categoryCode: item.oid,
          settings: await updateAdsSettingApi("main", useYn, item.oid),
        }))
      ),
    {
      onSuccess: (rows, useYn) => {
        rows.forEach(({ categoryCode, settings }) => {
          queryClient.setQueryData(
            ["getAdsSettings", categoryCode],
            settings
          );
        });
        alert(
          useYn === "Y"
            ? "모든 카테고리의 배너 노출을 켰습니다."
            : "모든 카테고리의 배너 노출을 껐습니다."
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(
          error?.response?.data?.message ??
            "카테고리 노출 설정을 일괄 변경하지 못했습니다."
        );
      },
    }
  );

  const selectedCategoryName =
    selectedCategory === CATEGORY_ALL
      ? "전체"
      : categories.find((item) => item.oid === selectedCategory)?.name ||
        selectedCategory;
  const scopeLabel =
    activeTab === "main"
      ? `${selectedCategoryName} 메인 페이지 배너`
      : SCOPE_LABELS.category;
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
    settingMutation.mutate({
      scope: activeTab,
      useYn: next,
      categoryCode:
        activeTab === "main" ? selectedCategory : undefined,
    });
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
          {activeTab === "main" ? (
            <S.ExposureCard>
              <S.ExposureHeader>
                <div>
                  <S.ExposureTit>카테고리별 배너 노출 설정</S.ExposureTit>
                  <S.ExposureDesc>
                    각 카테고리의 배너 영역을 개별로 켜거나 끕니다. 이미지는
                    삭제되지 않으며 설정은 즉시 저장됩니다.
                  </S.ExposureDesc>
                </div>
                <S.BulkActions>
                  <button
                    type="button"
                    disabled={bulkSettingMutation.isLoading}
                    onClick={() => bulkSettingMutation.mutate("Y")}
                  >
                    전체 노출
                  </button>
                  <button
                    type="button"
                    disabled={bulkSettingMutation.isLoading}
                    onClick={() => {
                      if (
                        window.confirm(
                          "모든 카테고리에서 메인 배너를 숨기시겠습니까?"
                        )
                      ) {
                        bulkSettingMutation.mutate("N");
                      }
                    }}
                  >
                    전체 숨김
                  </button>
                </S.BulkActions>
              </S.ExposureHeader>
              <S.CategoryExposureList>
                {categoryExposureItems.map((item, index) => {
                  const query = categorySettingQueries[index];
                  const exposed = query?.data?.main === "Y";
                  const changing =
                    settingMutation.isLoading &&
                    settingMutation.variables?.categoryCode === item.oid;
                  return (
                    <S.CategoryExposureRow
                      key={item.oid}
                      $depth={item.depth}
                    >
                      <S.CategoryExposureName>
                        <strong>{item.name}</strong>
                        <span>{item.path}</span>
                        {item.useYn === "N" && <em>카테고리 비활성</em>}
                      </S.CategoryExposureName>
                      {query?.isLoading ? (
                        <S.InlineStatus>불러오는 중</S.InlineStatus>
                      ) : query?.isError || !query?.data ? (
                        <S.InlineError>조회 실패</S.InlineError>
                      ) : (
                        <S.CategoryToggle
                          type="button"
                          role="switch"
                          aria-checked={exposed}
                          $exposed={exposed}
                          disabled={
                            settingMutation.isLoading ||
                            bulkSettingMutation.isLoading
                          }
                          onClick={() =>
                            settingMutation.mutate({
                              scope: "main",
                              useYn: exposed ? "N" : "Y",
                              categoryCode: item.oid,
                              displayLabel: `${item.name} 카테고리 배너`,
                            })
                          }
                        >
                          <span aria-hidden />
                          {changing
                            ? "저장 중"
                            : exposed
                            ? "노출"
                            : "숨김"}
                        </S.CategoryToggle>
                      )}
                    </S.CategoryExposureRow>
                  );
                })}
              </S.CategoryExposureList>
            </S.ExposureCard>
          ) : (
            <S.ExposureCard>
              <S.ExposureTit>{scopeLabel} 노출</S.ExposureTit>
              <S.ExposureDesc>
                노출을 끄면 유저 화면에서 {scopeLabel} 영역이 통째로 보이지
                않습니다. 등록된 이미지는 지워지지 않습니다.
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
          )}
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
