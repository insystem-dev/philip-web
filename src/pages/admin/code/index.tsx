import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AdminCodePage,
  CodeGroup,
} from "@/components/templates/AdminCodePage";
import {
  Category,
  CategoryIconOption,
  CitySub,
  createCategoryApi,
  createCityApi,
  deleteCategoryApi,
  deleteCityApi,
  getCategoryTreeApi,
  getCategoryIconCatalogApi,
  getCityTreeApi,
  getContactKakaoApi,
  getContactPhoneApi,
  updateCategorySortApi,
  updateCitySubApi,
  updateContactKakaoApi,
  updateContactPhoneApi,
} from "@/apis/categoryApi";
import type { CodeNameDraft } from "@/components/molecules/AdminGrid/CodeSubGrid";
import useApiError from "@/lib/hooks/useApiError";

const toCodeDraftRow = (item: any): CodeNameDraft[string] => ({
  name: item.name ?? "",
  name_eng: item.name_eng ?? "",
  iconKey: item.iconKey ?? "plus",
  sort: Number(item.sort ?? 0),
  disabled: Boolean(item.disabled),
});

const AdminCode = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [activeGroup, setActiveGroup] = useState<CodeGroup>("CATEGORY");
  const [newName, setNewName] = useState("");
  const [newIconKey, setNewIconKey] = useState("plus");
  const [selectedParent, setSelectedParent] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactKakao, setContactKakao] = useState("philip69");
  // 방금 추가한 행의 key — 새 항목이 목록 맨 아래(스크롤 밖)에 추가되어
  // 화면에 안 보이던 문제를 그리드 자동 스크롤/포커스로 해결
  const [focusedRowKey, setFocusedRowKey] = useState<string | null>(null);
  // 편집 가능한 값은 draft 로 모았다가 저장 버튼에서 한 번에 반영한다
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameDraft, setNameDraft] = useState<CodeNameDraft>({});
  const [isSavingNames, setIsSavingNames] = useState(false);

  const { data: categories, isLoading: isCategoryLoading } = useQuery<
    Category[]
  >(["getCategoryTreeApi"], getCategoryTreeApi, {
    enabled: activeGroup === "CATEGORY",
    onError: (error: any) => handleError(error),
  });

  const { data: iconOptions = [] } = useQuery<CategoryIconOption[]>(
    ["getCategoryIconCatalogApi"],
    getCategoryIconCatalogApi,
    {
      enabled: activeGroup === "CATEGORY",
      staleTime: Infinity,
      onError: (error: any) => handleError(error),
    }
  );

  const { data: cities, isLoading: isCityLoading } = useQuery<CitySub[]>(
    ["getCityTreeApi"],
    getCityTreeApi,
    {
      enabled: activeGroup === "CITY",
      onError: (error: any) => handleError(error),
    }
  );

  const { data: contactPhoneData } = useQuery(
    ["getContactPhoneApi"],
    getContactPhoneApi,
    {
      enabled: activeGroup === "CONTACT",
      onError: (error: any) => handleError(error),
    }
  );

  const { data: contactKakaoData } = useQuery(
    ["getContactKakaoApi"],
    getContactKakaoApi,
    {
      enabled: activeGroup === "CONTACT",
      onError: (error: any) => handleError(error),
    }
  );

  useEffect(() => {
    if (contactPhoneData !== undefined) setContactPhone(contactPhoneData);
  }, [contactPhoneData]);

  useEffect(() => {
    if (contactKakaoData !== undefined) setContactKakao(contactKakaoData);
  }, [contactKakaoData]);

  const createCategoryMutation = useMutation(createCategoryApi, {
    onSuccess: (created) => {
      setNewName("");
      setNewIconKey("plus");
      setError("");
      // 리패칭을 기다리지 않고 생성 응답을 목록에 즉시 반영
      queryClient.setQueryData<Category[]>(
        ["getCategoryTreeApi"],
        (old) => [...(old ?? []), created]
      );
      setFocusedRowKey(created.oid);
      queryClient.invalidateQueries(["getCategoryTreeApi"]);
      queryClient.invalidateQueries(["getCategoryNavApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "생성 중 오류가 발생했습니다."),
  });

  const createCityMutation = useMutation(createCityApi, {
    onSuccess: (created) => {
      setNewName("");
      setError("");
      // 리패칭을 기다리지 않고 생성 응답을 목록에 즉시 반영
      queryClient.setQueryData<CitySub[]>(
        ["getCityTreeApi"],
        (old) => [...(old ?? []), created]
      );
      setFocusedRowKey(created.oid);
      queryClient.invalidateQueries(["getCityTreeApi"]);
      queryClient.invalidateQueries(["getCityListApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "생성 중 오류가 발생했습니다."),
  });

  const deleteCategoryMutation = useMutation(deleteCategoryApi, {
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries(["getCategoryTreeApi"]);
      queryClient.invalidateQueries(["getCategoryNavApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "삭제 중 오류가 발생했습니다."),
  });

  const deleteCityMutation = useMutation(deleteCityApi, {
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries(["getCityTreeApi"]);
      queryClient.invalidateQueries(["getCityListApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "삭제 중 오류가 발생했습니다."),
  });

  const updateContactPhoneMutation = useMutation(updateContactPhoneApi, {
    onSuccess: (phone) => {
      setContactPhone(phone);
      queryClient.invalidateQueries(["getContactPhoneApi"]);
      alert("문의 전화번호가 저장되었습니다.");
    },
    onError: (error: any) => {
      handleError(error);
      alert(error?.response?.data?.message ?? "저장 중 오류가 발생했습니다.");
    },
  });

  const updateContactKakaoMutation = useMutation(updateContactKakaoApi, {
    onSuccess: (kakaoId) => {
      setContactKakao(kakaoId);
      queryClient.invalidateQueries(["getContactKakaoApi"]);
      alert("카카오톡 문의 아이디가 저장되었습니다.");
    },
    onError: (error: any) => {
      handleError(error);
      alert(error?.response?.data?.message ?? "저장 중 오류가 발생했습니다.");
    },
  });

  const onSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEditMode) return;
    const name = newName.trim();
    if (!name) return;
    const parentCode = selectedParent?.oid;
    if (activeGroup === "CATEGORY")
      createCategoryMutation.mutate({ name, parentCode, iconKey: newIconKey });
    if (activeGroup === "CITY")
      createCityMutation.mutate({ name, parentCode });
  };

  /** 편집모드 이름 입력 — 저장 버튼을 누르기 전까지 draft 에만 반영한다 */
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    if (!isEditMode) return;
    const { oid } = data.data;
    const name = e.target.value;
    setNameDraft((prev) => ({
      ...prev,
      [oid]: {
        ...toCodeDraftRow(data.data),
        ...prev[oid],
        name,
      },
    }));
  };

  const onChangeSort = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    if (!isEditMode) return;
    const targetIndex = Number(e.target.value);
    if (Number.isNaN(targetIndex)) return;

    setNameDraft((prev) => {
      const siblings = items
        .filter((item: any) => item.parentOid === data.data.parentOid)
        .sort(
          (a: any, b: any) =>
            (prev[a.oid]?.sort ?? Number(a.sort ?? 0)) -
              (prev[b.oid]?.sort ?? Number(b.sort ?? 0)) ||
            String(a.oid).localeCompare(String(b.oid))
        );
      const from = siblings.findIndex(
        (item: any) => item.oid === data.data.oid
      );
      const to = Math.max(0, Math.min(targetIndex, siblings.length - 1));
      if (from === -1 || from === to) return prev;

      const reordered = [...siblings];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);

      const next = { ...prev };
      reordered.forEach((item: any, index) => {
        next[item.oid] = {
          ...toCodeDraftRow(item),
          ...next[item.oid],
          sort: index,
        };
      });
      return next;
    });
  };

  const onToggleDisabled = (data: any) => {
    if (!isEditMode || activeGroup !== "CITY") return;
    const { oid } = data.data;
    setNameDraft((prev) => ({
      ...prev,
      [oid]: {
        ...toCodeDraftRow(data.data),
        ...prev[oid],
        disabled: !(prev[oid]?.disabled ?? Boolean(data.data.disabled)),
      },
    }));
  };

  /** 편집모드 영문명 입력 — 이름과 같이 draft 에만 반영한다 */
  const onChangeNameEng = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    if (!isEditMode) return;
    const { oid } = data.data;
    const nameEng = e.target.value;
    setNameDraft((prev) => ({
      ...prev,
      [oid]: {
        ...toCodeDraftRow(data.data),
        ...prev[oid],
        name_eng: nameEng,
      },
    }));
  };

  const onChangeIcon = (iconKey: string, data: any) => {
    if (!isEditMode) return;
    const { oid } = data.data;
    setNameDraft((prev) => ({
      ...prev,
      [oid]: {
        ...toCodeDraftRow(data.data),
        ...prev[oid],
        iconKey,
      },
    }));
  };

  const onDelete = (data: any) => {
    if (!isEditMode) return;
    if (!window.confirm(`"${data.data.name}" 항목을 삭제하시겠습니까?`)) return;
    if (activeGroup === "CATEGORY") {
      deleteCategoryMutation.mutate(data.data.oid);
    } else if (activeGroup === "CITY") {
      deleteCityMutation.mutate(data.data.oid);
    }
  };

  const onSubmitContactPhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = contactPhone.trim();
    if (!phone) return;
    updateContactPhoneMutation.mutate(phone);
  };

  const onSubmitContactKakao = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const kakaoId = contactKakao.trim();
    if (!kakaoId) return;
    updateContactKakaoMutation.mutate(kakaoId);
  };

  const items: Array<Category | CitySub> =
    activeGroup === "CITY" ? cities ?? [] : categories ?? [];
  const isLoading = activeGroup === "CITY" ? isCityLoading : isCategoryLoading;
  const getSortOptions = (parentOid: string | null) =>
    items
      .filter((item) => item.parentOid === parentOid)
      .map((_, i) => ({ oid: i, name: i }));
  const isCreating =
    activeGroup === "CITY"
      ? createCityMutation.isLoading
      : createCategoryMutation.isLoading;

  const startCreate = (parent: any | null = null) => {
    if (!isEditMode) return;
    setSelectedParent(parent);
    setNewName("");
    if (activeGroup === "CATEGORY") setNewIconKey("plus");
    setError("");
  };

  /** 편집 시작 — 현재 목록의 편집 가능 값을 draft 로 스냅샷 */
  const startEditNames = () => {
    const draft: CodeNameDraft = {};
    items.forEach((item: any) => {
      draft[item.oid] = toCodeDraftRow(item);
    });
    setNameDraft(draft);
    setError("");
    setIsEditMode(true);
  };

  const cancelEditNames = () => {
    setNameDraft({});
    setSelectedParent(null);
    setNewName("");
    setNewIconKey("plus");
    setError("");
    setIsEditMode(false);
  };

  /** 저장 — 원본과 값이 다른 행만 모아 한 번에 보내고, 하나라도 실패하면 편집모드를 유지한다 */
  const saveEditNames = async () => {
    if (!isEditMode || isSavingNames) return;
    const changed = items.filter((item: any) => {
      const draft = nameDraft[item.oid];
      if (!draft) return false;
      const isNameChanged = draft.name.trim() !== (item.name ?? "");
      if (activeGroup === "CATEGORY") {
        return (
          isNameChanged ||
          draft.iconKey !== (item.iconKey ?? "plus") ||
          draft.sort !== Number(item.sort ?? 0)
        );
      }
      if (activeGroup !== "CITY") return isNameChanged;
      return (
        isNameChanged ||
        draft.name_eng.trim() !== (item.name_eng ?? "") ||
        draft.sort !== Number(item.sort ?? 0) ||
        draft.disabled !== Boolean(item.disabled)
      );
    });

    // 이름이 비면 목록에서 그 행을 식별할 수 없게 되므로 저장 자체를 막는다
    if (changed.some((item: any) => !nameDraft[item.oid].name.trim())) {
      setError("이름은 비워 둘 수 없습니다.");
      return;
    }

    if (!changed.length) {
      cancelEditNames();
      return;
    }

    setIsSavingNames(true);
    try {
      // 순서 변경 API는 형제 전체를 다시 정렬하므로 경쟁 상태가 생기지 않게 차례로 보낸다.
      for (const item of changed as any[]) {
        const draft = nameDraft[item.oid];
        if (activeGroup === "CITY") {
          await updateCitySubApi({
            oid: item.oid,
            name: draft.name.trim(),
            name_eng: draft.name_eng.trim(),
            sort: draft.sort,
            disabled: draft.disabled,
          });
        } else {
          await updateCategorySortApi({
            oid: item.oid,
            name: draft.name.trim(),
            iconKey: draft.iconKey,
            sort: draft.sort,
          });
        }
      }
      if (activeGroup === "CITY") {
        queryClient.invalidateQueries(["getCityTreeApi"]);
        queryClient.invalidateQueries(["getCityListApi"]);
      } else {
        queryClient.invalidateQueries(["getCategoryTreeApi"]);
        queryClient.invalidateQueries(["getCategoryNavApi"]);
      }
      setNameDraft({});
      setError("");
      setIsEditMode(false);
    } catch (error: any) {
      // 편집모드를 유지해 입력한 값이 날아가지 않게 한다
      setError(
        error?.response?.data?.message ?? "저장 중 오류가 발생했습니다."
      );
    } finally {
      setIsSavingNames(false);
    }
  };

  return (
    <AdminCodePage
      activeGroup={activeGroup}
      setActiveGroup={(group) => {
        if (isEditMode || isSavingNames) return;
        setActiveGroup(group);
        setNewName("");
        setNewIconKey("plus");
        setSelectedParent(null);
        setError("");
        setFocusedRowKey(null);
        setIsEditMode(false);
        setNameDraft({});
      }}
      items={items}
      focusedRowKey={focusedRowKey}
      isLoading={isLoading}
      error={error}
      isEditMode={isEditMode}
      nameDraft={nameDraft}
      isSavingNames={isSavingNames}
      onStartEditNames={startEditNames}
      onSaveEditNames={saveEditNames}
      onCancelEditNames={cancelEditNames}
      newName={newName}
      setNewName={setNewName}
      newIconKey={newIconKey}
      setNewIconKey={setNewIconKey}
      iconOptions={iconOptions}
      selectedParent={selectedParent}
      clearSelectedParent={() => startCreate(null)}
      onSubmitCreate={onSubmitCreate}
      isCreating={isCreating}
      getSortOptions={getSortOptions}
      onAddChild={(data) => {
        startCreate(data.data);
      }}
      onChangeName={onChangeName}
      onChangeSort={onChangeSort}
      onToggleDisabled={onToggleDisabled}
      onChangeNameEng={onChangeNameEng}
      onChangeIcon={onChangeIcon}
      onDelete={onDelete}
      contactPhone={contactPhone}
      setContactPhone={setContactPhone}
      onSubmitContactPhone={onSubmitContactPhone}
      isSavingContactPhone={updateContactPhoneMutation.isLoading}
      contactKakao={contactKakao}
      setContactKakao={setContactKakao}
      onSubmitContactKakao={onSubmitContactKakao}
      isSavingContactKakao={updateContactKakaoMutation.isLoading}
    />
  );
};

export default AdminCode;
