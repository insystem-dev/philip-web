import { useMemo, useState } from "react";
import * as S from "./adminCategoryCityPage.style";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { CategoryCityGrid } from "@/components/molecules/AdminGrid/CategoryCityGrid";
import { AlertModal } from "@/components/molecules/AlertModal";
import { Button } from "@/components/atoms/Button";
import { CategoryCitySetting, CitySub } from "@/apis/categoryApi";

/** 카테고리 추가 경로 — 기존 공통 카테고리를 켜기 / 이 지역 전용으로 새로 만들기 */
export type CategoryAddMode = "existing" | "new";

const ADD_MODE_TABS: { key: CategoryAddMode; label: string }[] = [
  { key: "existing", label: "공통 카테고리에서 선택" },
  { key: "new", label: "이 지역 전용으로 새로 만들기" },
];

export interface AdminCategoryCityPageProps {
  cities: CitySub[];
  /** 선택된 지역 코드 (code_sub.code, main_cd='CITY') */
  cityCode: string;
  onChangeCity: (code: string) => void;
  items: CategoryCitySetting[];
  isLoading: boolean;
  error: string;
  notice: string;
  /** 화면에서 바꾼 값이 저장되지 않은 상태인지 */
  isDirty: boolean;
  /** 이 지역 전용 설정이 걸린 카테고리 수 */
  overriddenCount: number;
  /** 전역에서 숨겨져 이 지역에서만 보이는(= 이 지역 전용) 카테고리 수 */
  cityOnlyCount: number;
  /** 전역 공통코드에서 숨김(use_yn='N') 상태인 카테고리 코드 */
  globalHiddenCodes: Set<string>;
  /** 이름·노출·순서 편집 모드 (읽기 모드에서는 그리드가 모두 잠긴다) */
  isEditMode: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  /** 펼칠 수 있는 행 key — 수정모드 진입 시 전체 펼치기에 쓴다 */
  expandableRowKeys: string[];
  expandedRowKeys: string[];
  onChangeExpandedRowKeys: (keys: string[]) => void;
  getSortOptions: (parentCode: string | null) => any[];
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>, data: any) => void;
  onToggleUse: (data: any) => void;
  onChangeSort: (e: React.ChangeEvent<HTMLSelectElement>, data: any) => void;
  onSave: () => void;
  isSaving: boolean;
  onResetClick: () => void;
  isResetting: boolean;
  showResetConfirm: boolean;
  onConfirmReset: () => void;
  onCancelReset: () => void;
  showCreatePanel: boolean;
  onToggleCreatePanel: () => void;
  createMode: CategoryAddMode;
  onChangeCreateMode: (mode: CategoryAddMode) => void;
  /** 이 지역에서 숨김 상태라 추가 대상이 되는 카테고리 */
  hiddenItems: CategoryCitySetting[];
  /** 상위 경로까지 붙인 카테고리 이름 */
  getPathLabel: (categoryCode: string) => string;
  onAddExisting: (categoryCode: string) => void;
  newName: string;
  setNewName: (value: string) => void;
  newParentCode: string | null;
  setNewParentCode: (code: string | null) => void;
  onSubmitCreate: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
  /** 이 지역 전용 카테고리의 노출 해제 확인 대상 이름 (없으면 null) */
  pendingHideName: string | null;
  onConfirmHide: () => void;
  onCancelHide: () => void;
}

/**
 * 지역별 카테고리 노출·순서 관리 화면
 * 전역 공통코드(카테고리 자체)는 공통코드 관리 화면의 몫이고, 여기서는 "이 지역에서
 * 어떤 카테고리를 어떤 순서로 보여줄지"만 다룬다. 그래서 전 지역 공통(CITY-ALL)은 탭에 없다.
 */
export const AdminCategoryCityPage = ({
  cities,
  cityCode,
  onChangeCity,
  items,
  isLoading,
  error,
  notice,
  isDirty,
  overriddenCount,
  cityOnlyCount,
  globalHiddenCodes,
  isEditMode,
  onStartEdit,
  onCancelEdit,
  expandableRowKeys,
  expandedRowKeys,
  onChangeExpandedRowKeys,
  getSortOptions,
  onChangeName,
  onToggleUse,
  onChangeSort,
  onSave,
  isSaving,
  onResetClick,
  isResetting,
  showResetConfirm,
  onConfirmReset,
  onCancelReset,
  showCreatePanel,
  onToggleCreatePanel,
  createMode,
  onChangeCreateMode,
  hiddenItems,
  getPathLabel,
  onAddExisting,
  newName,
  setNewName,
  newParentCode,
  setNewParentCode,
  onSubmitCreate,
  isCreating,
  pendingHideName,
  onConfirmHide,
  onCancelHide,
}: AdminCategoryCityPageProps) => {
  const selectedCity = cities.find((city) => city.oid === cityCode);
  const [parentPickerOpen, setParentPickerOpen] = useState(false);

  /** 활성 지역을 앞에, 비활성 지역은 뒤로 보낸다 (각 그룹 안에서는 관리자 sort 순 유지) */
  const orderedCities = useMemo(
    () => [...cities].sort((a, b) => Number(a.disabled) - Number(b.disabled)),
    [cities]
  );

  const parentLabel = newParentCode
    ? getPathLabel(newParentCode)
    : "최상위 카테고리";

  // 저장은 편집 모드에서만 노출한다 — 읽기 모드 그리드는 잠겨 있어 바꿀 값이 없다
  const titleActions = isEditMode ? (
    <>
      <Button
        type="button"
        color="primary"
        layout="solid"
        width="90px"
        height={32}
        label={isSaving ? "저장 중..." : "저장"}
        onClick={onSave}
        disabled={isLoading || isSaving || isResetting || !isDirty}
      />
      <Button
        type="button"
        color="secondary"
        layout="solid"
        width="90px"
        height={32}
        label="취소"
        onClick={onCancelEdit}
        disabled={isSaving}
      />
    </>
  ) : (
    <Button
      type="button"
      color="primary"
      layout="solid"
      width="90px"
      height={32}
      label="수정"
      onClick={onStartEdit}
      disabled={isLoading || isSaving || isResetting || cities.length === 0}
    />
  );

  return (
    <AdminLayout title="지역별 카테고리" titleActions={titleActions}>
      <S.AdminCategoryCityPage>
        <S.CityTabs role="tablist" aria-label="지역 선택">
          {orderedCities.map((city) => (
            <S.CityTab
              key={city.oid}
              type="button"
              role="tab"
              aria-selected={cityCode === city.oid}
              disabled={city.disabled}
              $active={cityCode === city.oid}
              onClick={() => onChangeCity(city.oid)}
            >
              {city.name}
              {city.disabled ? " (비활성)" : ""}
            </S.CityTab>
          ))}
        </S.CityTabs>

        {cities.length === 0 ? (
          <S.EmptyMsg>
            등록된 지역이 없습니다. 공통코드 관리에서 지역을 먼저 추가해 주세요.
          </S.EmptyMsg>
        ) : (
          <>
            <S.ActionBar>
              <S.ActionLabel>노출 설정</S.ActionLabel>
              <S.CityChip>
                <strong>{selectedCity?.name ?? cityCode}</strong>
                지역
              </S.CityChip>
              <S.BarHint>
                {overriddenCount > 0
                  ? `이 지역 전용 설정 ${overriddenCount}건 — 나머지는 전역 공통코드 설정을 따릅니다.`
                  : "아직 이 지역 전용 설정이 없습니다. 전역 공통코드 설정을 그대로 따릅니다."}
              </S.BarHint>
              <S.BarButtons>
                <Button
                  type="button"
                  color="primary"
                  layout="solid"
                  width="110px"
                  height={32}
                  label={showCreatePanel ? "추가 닫기" : "카테고리 추가"}
                  onClick={onToggleCreatePanel}
                  disabled={isLoading || isSaving || isResetting || isEditMode}
                />
                <Button
                  type="button"
                  color="func"
                  layout="solid"
                  width="130px"
                  height={32}
                  label={isResetting ? "초기화 중..." : "이 지역 설정 초기화"}
                  onClick={onResetClick}
                  disabled={isLoading || isSaving || isResetting || isEditMode}
                />
              </S.BarButtons>
            </S.ActionBar>

            {isEditMode && (
              <S.EditHint>
                카테고리 이름은 전 지역 공통입니다. 여기서 바꾸면 다른
                지역에서도 바뀝니다.
              </S.EditHint>
            )}

            {showCreatePanel && (
              <S.CreatePanel>
                <S.ModeTabs role="tablist" aria-label="카테고리 추가 방식">
                  {ADD_MODE_TABS.map((tab) => (
                    <S.ModeTab
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={createMode === tab.key}
                      $active={createMode === tab.key}
                      onClick={() => {
                        setParentPickerOpen(false);
                        onChangeCreateMode(tab.key);
                      }}
                    >
                      {tab.label}
                    </S.ModeTab>
                  ))}
                </S.ModeTabs>

                {createMode === "existing" ? (
                  <>
                    {hiddenItems.length === 0 ? (
                      <S.PickEmpty>
                        이 지역에서 숨김 상태인 카테고리가 없습니다.
                      </S.PickEmpty>
                    ) : (
                      <S.PickList>
                        {hiddenItems.map((item) => (
                          <S.PickItem
                            key={item.categoryCode}
                            type="button"
                            onClick={() => onAddExisting(item.categoryCode)}
                          >
                            <span>{getPathLabel(item.categoryCode)}</span>
                            <small>
                              {globalHiddenCodes.has(item.categoryCode)
                                ? "전역 숨김 · 이 지역만 노출됨"
                                : "노출로 변경"}
                            </small>
                          </S.PickItem>
                        ))}
                      </S.PickList>
                    )}
                    <S.PanelHint>
                      누르면 수정 모드로 바뀌면서 이 지역에서 노출로 바뀌고
                      형제 카테고리의 맨 뒤에 놓입니다. 실제 반영은 우측 상단
                      ‘저장’ 을 눌러야 됩니다.
                    </S.PanelHint>
                  </>
                ) : (
                  <>
                    <S.CreateForm onSubmit={onSubmitCreate}>
                      <S.FieldLabel>상위 카테고리</S.FieldLabel>
                      <S.ParentField>
                        <S.ParentTrigger
                          type="button"
                          aria-haspopup="listbox"
                          onClick={() =>
                            setParentPickerOpen((current) => !current)
                          }
                        >
                          <span>{parentLabel}</span>
                          <span>{parentPickerOpen ? "▴" : "▾"}</span>
                        </S.ParentTrigger>
                        {parentPickerOpen && (
                          <S.ParentPanel>
                            <S.ParentPanelHead>
                              <strong>상위 카테고리 선택</strong>
                              <button
                                type="button"
                                onClick={() => setParentPickerOpen(false)}
                              >
                                닫기 ×
                              </button>
                            </S.ParentPanelHead>
                            <S.ParentList>
                              <S.PickItem
                                type="button"
                                onClick={() => {
                                  setNewParentCode(null);
                                  setParentPickerOpen(false);
                                }}
                              >
                                <span>최상위 카테고리</span>
                                <small>선택</small>
                              </S.PickItem>
                              {items.map((item) => (
                                <S.PickItem
                                  key={item.categoryCode}
                                  type="button"
                                  onClick={() => {
                                    setNewParentCode(item.categoryCode);
                                    setParentPickerOpen(false);
                                  }}
                                >
                                  <span>{getPathLabel(item.categoryCode)}</span>
                                  <small>선택</small>
                                </S.PickItem>
                              ))}
                            </S.ParentList>
                          </S.ParentPanel>
                        )}
                      </S.ParentField>

                      <S.NameField>
                        <input
                          type="text"
                          placeholder="카테고리명 입력"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                      </S.NameField>
                      <Button
                        type="submit"
                        color="primary"
                        layout="solid"
                        width="90px"
                        height={32}
                        label={isCreating ? "처리 중..." : "추가"}
                        disabled={isCreating || isDirty || !newName.trim()}
                      />
                    </S.CreateForm>

                    {isDirty ? (
                      <S.PanelWarn>
                        저장하지 않은 변경이 있습니다. 새로 만들면 목록을 다시
                        불러오면서 그 변경이 사라지므로 먼저 ‘저장’ 을 눌러
                        주세요.
                      </S.PanelWarn>
                    ) : (
                      <S.PanelHint>
                        이 지역에서만 보이는 카테고리로 바로 만들어집니다(별도
                        저장 불필요). 다른 지역과 전체 카테고리 목록에서는 숨김
                        상태로 남습니다.
                      </S.PanelHint>
                    )}
                  </>
                )}
              </S.CreatePanel>
            )}

            {error && <S.ErrorMsg>{error}</S.ErrorMsg>}
            {!error && notice && <S.NoticeMsg>{notice}</S.NoticeMsg>}

            <S.GridArea>
              <CategoryCityGrid
                dataSource={items}
                isLoading={isLoading}
                globalHiddenCodes={globalHiddenCodes}
                isEditMode={isEditMode}
                expandableRowKeys={expandableRowKeys}
                expandedRowKeys={expandedRowKeys}
                onChangeExpandedRowKeys={onChangeExpandedRowKeys}
                getSortOptions={getSortOptions}
                onChangeName={onChangeName}
                onToggleUse={onToggleUse}
                onChangeSort={onChangeSort}
              />
            </S.GridArea>
          </>
        )}

        {showResetConfirm && (
          <AlertModal
            title="이 지역 설정을 초기화할까요?"
            message={`${
              selectedCity?.name ?? cityCode
            } 지역의 카테고리 노출·순서 설정이 모두 삭제되고\n전역 공통코드 설정으로 되돌아갑니다.${
              cityOnlyCount > 0
                ? `\n\n이 지역 전용 카테고리 ${cityOnlyCount}건도 함께 사라집니다.\n(전역에서는 숨김 상태라 어디에도 보이지 않게 됩니다.)`
                : ""
            }`}
            confirmLabel="초기화"
            cancelLabel="취소"
            onConfirm={onConfirmReset}
            onCancel={onCancelReset}
          />
        )}

        {pendingHideName && (
          <AlertModal
            title="이 지역 전용 카테고리를 숨길까요?"
            message={`'${pendingHideName}' 은(는) 전역에서 숨김이라 이 지역에서만 보이는 카테고리입니다.\n노출을 해제하면 어디에도 보이지 않게 됩니다.\n\n다시 켜려면 ‘카테고리 추가 > 공통 카테고리에서 선택’ 을 이용하세요.`}
            confirmLabel="노출 해제"
            cancelLabel="취소"
            onConfirm={onConfirmHide}
            onCancel={onCancelHide}
          />
        )}
      </S.AdminCategoryCityPage>
    </AdminLayout>
  );
};
