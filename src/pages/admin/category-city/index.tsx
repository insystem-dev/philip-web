import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AdminCategoryCityPage,
  CategoryAddMode,
} from "@/components/templates/AdminCategoryCityPage";
import {
  Category,
  CategoryCitySetting,
  CitySub,
  createCategoryApi,
  getCategoryCitySettingApi,
  getCategoryTreeApi,
  getCityListApi,
  resetCategoryCitySettingApi,
  updateCategoryCitySettingApi,
} from "@/apis/categoryApi";
import { CITY_ALL } from "@/lib/adsMatch";
import useApiError from "@/lib/hooks/useApiError";

/**
 * 서버가 준 유효 sort 를 형제 그룹별 0..n-1 로 조밀하게 다시 매긴다.
 * 전역 sort 는 삭제 등으로 번호가 비어 있을 수 있는데, 그대로 두면 순서 셀렉트의
 * 옵션(0..n-1)과 값이 어긋나 엉뚱한 항목이 선택된 것처럼 보인다.
 */
const normalizeSort = (rows: CategoryCitySetting[]): CategoryCitySetting[] => {
  const seq = new Map<string, number>();
  return [...rows]
    .sort(
      (a, b) =>
        a.sort - b.sort || a.categoryCode.localeCompare(b.categoryCode)
    )
    .map((row) => {
      const key = row.parentCode ?? "";
      const next = seq.get(key) ?? 0;
      seq.set(key, next + 1);
      return { ...row, sort: next };
    });
};

/** 같은 상위(형제 그룹) 안에서 행을 targetIndex 자리로 옮기고 그룹의 sort 를 다시 매긴다 */
const moveWithinSiblings = (
  rows: CategoryCitySetting[],
  categoryCode: string,
  targetIndex: number
): CategoryCitySetting[] => {
  const target = rows.find((row) => row.categoryCode === categoryCode);
  if (!target) return rows;

  const siblings = rows
    .filter((row) => row.parentCode === target.parentCode)
    .sort(
      (a, b) =>
        a.sort - b.sort || a.categoryCode.localeCompare(b.categoryCode)
    );

  const from = siblings.findIndex((row) => row.categoryCode === categoryCode);
  const to = Math.max(0, Math.min(targetIndex, siblings.length - 1));
  if (from === -1 || from === to) return rows;

  const reordered = [...siblings];
  const [moved] = reordered.splice(from, 1);
  reordered.splice(to, 0, moved);

  const sortMap = new Map(
    reordered.map((row, index) => [row.categoryCode, index])
  );
  return rows.map((row) =>
    sortMap.has(row.categoryCode)
      ? { ...row, sort: sortMap.get(row.categoryCode) as number }
      : row
  );
};

const AdminCategoryCity = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [cityCode, setCityCode] = useState("");
  /** 저장 전까지의 화면 편집본 — 저장 버튼에서 전 항목을 한 번에 전송한다 */
  const [draft, setDraft] = useState<CategoryCitySetting[]>([]);
  /** 이름·노출·순서 편집 모드 — 읽기 모드에서는 그리드가 잠긴다 */
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [createMode, setCreateMode] = useState<CategoryAddMode>("existing");
  const [newName, setNewName] = useState("");
  const [newParentCode, setNewParentCode] = useState<string | null>(null);
  /** 이 지역 전용 카테고리의 노출을 끄기 직전 확인을 받는 대상 */
  const [pendingHideCode, setPendingHideCode] = useState<string | null>(null);

  const { data: cityList } = useQuery<CitySub[]>(
    ["getCityListApi"],
    getCityListApi,
    {
      onError: (error: any) => handleError(error),
    }
  );

  // 전 지역 공통(CITY-ALL)은 전역 설정이므로 이 화면에서 다루지 않는다 (공통코드 관리의 몫)
  const cities = useMemo(
    () => (cityList ?? []).filter((city) => city.oid !== CITY_ALL),
    [cityList]
  );

  // 첫 진입 시 첫 지역을 자동 선택 (지역이 없으면 선택 없음)
  useEffect(() => {
    if (cityCode || cities.length === 0) return;
    setCityCode(cities[0].oid);
  }, [cities, cityCode]);

  const { data: settings, isLoading } = useQuery<CategoryCitySetting[]>(
    ["getCategoryCitySettingApi", cityCode],
    getCategoryCitySettingApi,
    {
      enabled: !!cityCode,
      onError: (error: any) => {
        handleError(error);
        setError(
          error?.response?.data?.message ??
            "지역별 카테고리 설정을 불러오지 못했습니다."
        );
      },
    }
  );

  /**
   * 전역 공통코드 기준 카테고리 목록.
   * /code/category-city 응답에는 전역 use_yn 이 없어 "이 지역 전용"인지 판별할 수 없다.
   * /code/sub/tree 는 cityCode 없이 부르면 use_yn 필터 없이 전역값 그대로 내려오므로 이것과 대조한다.
   */
  const { data: globalCategories } = useQuery<Category[]>(
    ["getCategoryTreeApi"],
    getCategoryTreeApi,
    {
      onError: (error: any) => handleError(error),
    }
  );

  /** 전역에서 숨겨진(use_yn='N') 카테고리 — 지역 오버라이드로만 살아날 수 있는 것들 */
  const globalHiddenCodes = useMemo(
    () =>
      new Set(
        (globalCategories ?? [])
          .filter((category) => category.useYn === "N")
          .map((category) => category.oid)
      ),
    [globalCategories]
  );

  /** 저장 여부 판단 기준이 되는 서버 원본(순서 재번호 적용본) */
  const baseline = useMemo(
    () => normalizeSort(settings ?? []),
    [settings]
  );

  useEffect(() => {
    setDraft(baseline);
  }, [baseline]);

  const isDirty = useMemo(() => {
    if (draft.length !== baseline.length) return true;
    const baseMap = new Map(baseline.map((row) => [row.categoryCode, row]));
    return draft.some((row) => {
      const base = baseMap.get(row.categoryCode);
      return (
        !base ||
        base.sort !== row.sort ||
        base.useYn !== row.useYn ||
        base.name !== row.name
      );
    });
  }, [draft, baseline]);

  /** 하위를 가진 행 key — 수정모드 진입 시 전체 펼치기에 쓴다 */
  const expandableRowKeys = useMemo(
    () =>
      Array.from(
        new Set(
          draft
            .map((row) => row.parentCode)
            .filter((parentCode): parentCode is string => Boolean(parentCode))
        )
      ),
    [draft]
  );

  const overriddenCount = useMemo(
    () => baseline.filter((row) => row.overridden).length,
    [baseline]
  );

  /** 저장돼 있는 "이 지역 전용" 카테고리 수 — 초기화하면 이만큼이 어디에도 안 보이게 된다 */
  const cityOnlyCount = useMemo(
    () =>
      baseline.filter(
        (row) => row.useYn === "Y" && globalHiddenCodes.has(row.categoryCode)
      ).length,
    [baseline, globalHiddenCodes]
  );

  /** 이 지역에서 숨김 상태라 '추가' 대상이 되는 카테고리 */
  const hiddenItems = useMemo(
    () => draft.filter((row) => row.useYn === "N"),
    [draft]
  );

  const rowByCode = useMemo(
    () => new Map(draft.map((row) => [row.categoryCode, row])),
    [draft]
  );

  /** 목록에서 어떤 카테고리인지 알아볼 수 있게 상위 경로까지 붙인 이름 */
  const getPathLabel = (categoryCode: string) => {
    const path: string[] = [];
    let current = rowByCode.get(categoryCode);
    while (current) {
      path.unshift(current.name);
      current = current.parentCode
        ? rowByCode.get(current.parentCode)
        : undefined;
    }
    return path.join(" > ");
  };

  const pendingHideName = pendingHideCode
    ? rowByCode.get(pendingHideCode)?.name ?? pendingHideCode
    : null;

  const saveMutation = useMutation(updateCategoryCitySettingApi, {
    onSuccess: () => {
      setError("");
      setNotice("지역별 카테고리 설정이 저장되었습니다.");
      setIsEditMode(false);
      queryClient.invalidateQueries(["getCategoryCitySettingApi", cityCode]);
      queryClient.invalidateQueries(["getCategoryNavApi"]);
      queryClient.invalidateQueries(["getCategoryTreeApi"]);
    },
    onError: (error: any) => {
      setNotice("");
      setError(
        error?.response?.data?.message ?? "저장 중 오류가 발생했습니다."
      );
    },
  });

  const resetMutation = useMutation(resetCategoryCitySettingApi, {
    onSuccess: () => {
      setError("");
      setNotice("이 지역 설정이 초기화되어 전역 설정으로 되돌아갔습니다.");
      setShowResetConfirm(false);
      queryClient.invalidateQueries(["getCategoryCitySettingApi", cityCode]);
      queryClient.invalidateQueries(["getCategoryNavApi"]);
      queryClient.invalidateQueries(["getCategoryTreeApi"]);
    },
    onError: (error: any) => {
      setNotice("");
      setShowResetConfirm(false);
      setError(
        error?.response?.data?.message ?? "초기화 중 오류가 발생했습니다."
      );
    },
  });

  /**
   * 이 지역 전용 카테고리 생성.
   * 서버가 code_sub 를 전역 숨김으로 만들고 이 지역 오버라이드만 'Y' 로 넣어주므로
   * 별도의 저장(전량 PUT) 없이 그 즉시 이 지역에만 노출된다.
   */
  const createMutation = useMutation(createCategoryApi, {
    onSuccess: (created) => {
      setError("");
      setNotice(`'${created.name}' 카테고리를 이 지역 전용으로 추가했습니다.`);
      setNewName("");
      setNewParentCode(null);
      queryClient.invalidateQueries(["getCategoryCitySettingApi", cityCode]);
      queryClient.invalidateQueries(["getCategoryNavApi"]);
      queryClient.invalidateQueries(["getCategoryTreeApi"]);
    },
    onError: (error: any) => {
      setNotice("");
      setError(
        error?.response?.data?.message ??
          "카테고리 추가 중 오류가 발생했습니다."
      );
    },
  });

  /** 수정 — 편집 모드로 들어가면서 계층을 전부 펼쳐 하위 카테고리까지 한눈에 고치게 한다 */
  const onStartEdit = () => {
    setNotice("");
    setIsEditMode(true);
    setExpandedRowKeys(expandableRowKeys);
    // 편집 중에는 잠기는 영역이라 열려 있던 추가 패널은 닫는다
    setShowCreatePanel(false);
  };

  /** 취소 — 편집본을 서버 원본으로 되돌리고 읽기 모드로 돌아간다 */
  const onCancelEdit = () => {
    setDraft(baseline);
    setIsEditMode(false);
    setExpandedRowKeys([]);
    setError("");
    setNotice("");
    setPendingHideCode(null);
  };

  const onChangeCity = (code: string) => {
    if (code === cityCode) return;
    setCityCode(code);
    // 이전 지역의 편집본이 잠깐 남아 보이지 않도록 비우고 새 조회 결과를 기다린다
    setDraft([]);
    setIsEditMode(false);
    setExpandedRowKeys([]);
    setError("");
    setNotice("");
    setShowResetConfirm(false);
    setShowCreatePanel(false);
    setNewName("");
    setNewParentCode(null);
    setPendingHideCode(null);
  };

  const getSortOptions = (parentCode: string | null) =>
    draft
      .filter((row) => row.parentCode === parentCode)
      .map((_, i) => ({ oid: i, name: i }));

  /**
   * 카테고리 이름 입력 — 편집본만 갱신하고 저장 버튼에서 함께 전송한다.
   * sub_nm 은 지역 오버라이드가 없는 전역값이라 저장하면 전 지역에 반영된다.
   */
  const onChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    const { value } = e.target;
    const categoryCode = data.data.categoryCode;
    setNotice("");
    setDraft((current) =>
      current.map((row) =>
        row.categoryCode === categoryCode ? { ...row, name: value } : row
      )
    );
  };

  const applyToggleUse = (categoryCode: string) => {
    setDraft((current) =>
      current.map((row) =>
        row.categoryCode === categoryCode
          ? { ...row, useYn: row.useYn === "Y" ? "N" : "Y" }
          : row
      )
    );
  };

  const onToggleUse = (data: any) => {
    const categoryCode = data.data.categoryCode;
    setNotice("");
    // 전역에서 숨겨진 카테고리를 이 지역에서까지 끄면 어디에도 안 보이는 고아가 된다
    if (data.data.useYn === "Y" && globalHiddenCodes.has(categoryCode)) {
      setPendingHideCode(categoryCode);
      return;
    }
    applyToggleUse(categoryCode);
  };

  const onConfirmHide = () => {
    if (!pendingHideCode) return;
    applyToggleUse(pendingHideCode);
    setPendingHideCode(null);
  };

  /**
   * 이미 있는 카테고리를 이 지역에 노출시킨다.
   * 화면 편집본만 바꾸므로 기존 전량 PUT(저장 버튼)으로 그대로 저장된다.
   * 저장 버튼은 편집 모드에만 있으므로, 변경이 갇히지 않게 함께 편집 모드로 들어간다.
   */
  const onAddExisting = (categoryCode: string) => {
    setError("");
    setNotice("");
    setIsEditMode(true);
    setExpandedRowKeys(expandableRowKeys);
    setShowCreatePanel(false);
    setDraft((current) => {
      const shown: CategoryCitySetting[] = current.map((row) =>
        row.categoryCode === categoryCode
          ? { ...row, useYn: "Y" as const }
          : row
      );
      const target = shown.find((row) => row.categoryCode === categoryCode);
      if (!target) return shown;
      // 새로 켠 항목은 형제 그룹의 맨 뒤로 보낸다
      const lastIndex =
        shown.filter((row) => row.parentCode === target.parentCode).length - 1;
      return moveWithinSiblings(shown, categoryCode, lastIndex);
    });
  };

  const onSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 생성 후 목록을 다시 받아오므로 저장하지 않은 편집본이 있으면 사라진다
    if (!cityCode || !newName.trim() || isDirty) return;
    setError("");
    setNotice("");
    createMutation.mutate({
      name: newName.trim(),
      parentCode: newParentCode ?? undefined,
      cityCode,
    });
  };

  const onChangeSort = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    const targetIndex = Number(e.target.value);
    if (Number.isNaN(targetIndex)) return;
    setNotice("");
    setDraft((current) =>
      moveWithinSiblings(current, data.data.categoryCode, targetIndex)
    );
  };

  const onSave = () => {
    if (!cityCode) return;
    // 서버가 공백 이름을 400 으로 막으므로 보내기 전에 화면에서 걸러 안내한다
    if (draft.some((row) => !row.name.trim())) {
      setNotice("");
      setError("카테고리 이름은 비워 둘 수 없습니다.");
      return;
    }
    setError("");
    setNotice("");
    // 전량 재작성 API 이므로 화면의 전 항목을 항상 함께 보낸다
    saveMutation.mutate({
      cityCode,
      items: draft.map((row) => ({
        categoryCode: row.categoryCode,
        name: row.name.trim(),
        sort: row.sort,
        useYn: row.useYn,
      })),
    });
  };

  const onConfirmReset = () => {
    if (!cityCode) return;
    setError("");
    setNotice("");
    resetMutation.mutate(cityCode);
  };

  return (
    <AdminCategoryCityPage
      cities={cities}
      cityCode={cityCode}
      onChangeCity={onChangeCity}
      items={draft}
      isLoading={!!cityCode && isLoading}
      error={error}
      notice={notice}
      isDirty={isDirty}
      overriddenCount={overriddenCount}
      cityOnlyCount={cityOnlyCount}
      globalHiddenCodes={globalHiddenCodes}
      isEditMode={isEditMode}
      onStartEdit={onStartEdit}
      onCancelEdit={onCancelEdit}
      expandableRowKeys={expandableRowKeys}
      expandedRowKeys={expandedRowKeys}
      onChangeExpandedRowKeys={setExpandedRowKeys}
      getSortOptions={getSortOptions}
      onChangeName={onChangeName}
      onToggleUse={onToggleUse}
      onChangeSort={onChangeSort}
      onSave={onSave}
      isSaving={saveMutation.isLoading}
      onResetClick={() => setShowResetConfirm(true)}
      isResetting={resetMutation.isLoading}
      showResetConfirm={showResetConfirm}
      onConfirmReset={onConfirmReset}
      onCancelReset={() => setShowResetConfirm(false)}
      showCreatePanel={showCreatePanel}
      onToggleCreatePanel={() => setShowCreatePanel((current) => !current)}
      createMode={createMode}
      onChangeCreateMode={setCreateMode}
      hiddenItems={hiddenItems}
      getPathLabel={getPathLabel}
      onAddExisting={onAddExisting}
      newName={newName}
      setNewName={setNewName}
      newParentCode={newParentCode}
      setNewParentCode={setNewParentCode}
      onSubmitCreate={onSubmitCreate}
      isCreating={createMutation.isLoading}
      pendingHideName={pendingHideName}
      onConfirmHide={onConfirmHide}
      onCancelHide={() => setPendingHideCode(null)}
    />
  );
};

export default AdminCategoryCity;
