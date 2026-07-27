import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AdminCodePage,
  CodeGroup,
} from "@/components/templates/AdminCodePage";
import {
  Category,
  CitySub,
  createCategoryApi,
  createCityApi,
  deleteCategoryApi,
  deleteCityApi,
  getCategoryNavApi,
  getCityListApi,
  getContactPhoneApi,
  updateCategorySortApi,
  updateCitySubApi,
  updateContactPhoneApi,
} from "@/apis/categoryApi";
import useApiError from "@/lib/hooks/useApiError";

const AdminCode = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [activeGroup, setActiveGroup] = useState<CodeGroup>("CATEGORY");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // 방금 추가한 행의 key — 새 항목이 목록 맨 아래(스크롤 밖)에 추가되어
  // 화면에 안 보이던 문제를 그리드 자동 스크롤/포커스로 해결
  const [focusedRowKey, setFocusedRowKey] = useState<string | null>(null);

  const { data: categories, isLoading: isCategoryLoading } = useQuery<
    Category[]
  >(["getCategoryNavApi"], getCategoryNavApi, {
    enabled: activeGroup === "CATEGORY",
    onError: (error: any) => handleError(error),
  });

  const { data: cities, isLoading: isCityLoading } = useQuery<CitySub[]>(
    ["getCityListApi"],
    getCityListApi,
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

  useEffect(() => {
    if (contactPhoneData !== undefined) setContactPhone(contactPhoneData);
  }, [contactPhoneData]);

  const createCategoryMutation = useMutation(createCategoryApi, {
    onSuccess: (created) => {
      setNewName("");
      setError("");
      // 리패칭을 기다리지 않고 생성 응답을 목록에 즉시 반영
      queryClient.setQueryData<Category[]>(
        ["getCategoryNavApi"],
        (old) => [...(old ?? []), created]
      );
      setFocusedRowKey(created.oid);
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
        ["getCityListApi"],
        (old) => [...(old ?? []), created]
      );
      setFocusedRowKey(created.oid);
      queryClient.invalidateQueries(["getCityListApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "생성 중 오류가 발생했습니다."),
  });

  const updateCategoryMutation = useMutation(updateCategorySortApi, {
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries(["getCategoryNavApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "변경 중 오류가 발생했습니다."),
  });

  const updateCityMutation = useMutation(updateCitySubApi, {
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries(["getCityListApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "변경 중 오류가 발생했습니다."),
  });

  const deleteCategoryMutation = useMutation(deleteCategoryApi, {
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries(["getCategoryNavApi"]);
    },
    onError: (error: any) =>
      setError(error?.response?.data?.message ?? "삭제 중 오류가 발생했습니다."),
  });

  const deleteCityMutation = useMutation(deleteCityApi, {
    onSuccess: () => {
      setError("");
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

  const onSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    if (activeGroup === "CATEGORY") createCategoryMutation.mutate({ name });
    if (activeGroup === "CITY") createCityMutation.mutate({ name });
  };

  const onChangeSort = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    const sort = Number(e.target.value);
    if (activeGroup === "CATEGORY") {
      updateCategoryMutation.mutate({ oid: data.data.oid, sort });
    } else if (activeGroup === "CITY") {
      updateCityMutation.mutate({ oid: data.data.oid, sort });
    }
  };

  const onToggleDisabled = (data: any) => {
    updateCityMutation.mutate({
      oid: data.data.oid,
      disabled: !data.data.disabled,
    });
  };

  const onChangeNameEng = (
    e: React.FocusEvent<HTMLInputElement>,
    data: any
  ) => {
    updateCityMutation.mutate({
      oid: data.data.oid,
      name_eng: e.target.value,
    });
  };

  const onDelete = (data: any) => {
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

  const items = activeGroup === "CITY" ? cities ?? [] : categories ?? [];
  const isLoading = activeGroup === "CITY" ? isCityLoading : isCategoryLoading;
  const sortOptions = items.map((_, i) => ({ oid: i, name: i }));
  const isCreating =
    activeGroup === "CITY"
      ? createCityMutation.isLoading
      : createCategoryMutation.isLoading;

  return (
    <AdminCodePage
      activeGroup={activeGroup}
      setActiveGroup={(group) => {
        setActiveGroup(group);
        setNewName("");
        setError("");
        setFocusedRowKey(null);
      }}
      items={items}
      focusedRowKey={focusedRowKey}
      isLoading={isLoading}
      error={error}
      newName={newName}
      setNewName={setNewName}
      onSubmitCreate={onSubmitCreate}
      isCreating={isCreating}
      sortOptions={sortOptions}
      onChangeSort={onChangeSort}
      onToggleDisabled={onToggleDisabled}
      onChangeNameEng={onChangeNameEng}
      onDelete={onDelete}
      contactPhone={contactPhone}
      setContactPhone={setContactPhone}
      onSubmitContactPhone={onSubmitContactPhone}
      isSavingContactPhone={updateContactPhoneMutation.isLoading}
    />
  );
};

export default AdminCode;
