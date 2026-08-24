import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  BusinessRegistrationItem,
  BusinessRegistrationListStatus,
  BusinessRegistrationUpdate,
  getBusinessRegistrationsApi,
  registerBusinessRegistrationApi,
  updateBusinessRegistrationApi,
} from "@/apis/businessRegistrationApi";
import {
  Category,
  getCategoryTreeApi,
  getCityListApi,
} from "@/apis/categoryApi";
import { AdminCategoryDrilldown } from "@/components/molecules/AdminCategoryDrilldown";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminBusinessRegistrationPage.style";

const STATUS_LABEL = {
  RECEIVED: "접수",
  COMPLETED: "등록 완료",
} as const;

const FILTER_OPTIONS: Array<{
  value: BusinessRegistrationListStatus;
  label: string;
}> = [
  { value: "RECEIVED", label: "접수만 보기" },
  { value: "COMPLETED", label: "등록 완료만 보기" },
  { value: "ALL", label: "전체 보기" },
];

const formatDate = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(value))
    : "-";

const toDraft = (
  item: BusinessRegistrationItem
): BusinessRegistrationUpdate => ({
  businessName: item.businessName,
  category: item.category,
  businessHours: item.businessHours,
  holiday: item.holiday || "",
  phone: item.phone || "",
  kakaoId: item.kakaoId || "",
  location: item.location,
  oneLineIntro: item.oneLineIntro,
  servicesPrices: item.servicesPrices,
  promotion: item.promotion || "",
  photosReceivedYn: item.photosReceivedYn,
  adminMemo: item.adminMemo || "",
});

const getErrorMessage = (error: any) =>
  error?.response?.data?.message || "처리 중 오류가 발생했습니다.";

export const AdminBusinessRegistrationPage = () => {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<BusinessRegistrationListStatus>("RECEIVED");
  const [selected, setSelected] =
    useState<BusinessRegistrationItem | null>(null);
  const [draft, setDraft] =
    useState<BusinessRegistrationUpdate | null>(null);
  const [targetCityOid, setTargetCityOid] = useState("");
  const [targetCategoryOid, setTargetCategoryOid] = useState("");
  const [validation, setValidation] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery(
    ["businessRegistrations", search, status],
    () => getBusinessRegistrationsApi({ search, status }),
    { keepPreviousData: true }
  );

  const { data: allItems = [] } = useQuery(
    ["businessRegistrationStats"],
    () => getBusinessRegistrationsApi({ status: "ALL" }),
    { staleTime: 1000 * 30 }
  );
  const { data: cityOptions = [] } = useQuery(
    ["getCityListApi"],
    getCityListApi
  );
  const { data: categoryOptions = [] } = useQuery(
    ["getCategoryTreeApi", targetCityOid],
    getCategoryTreeApi,
    { enabled: !!targetCityOid }
  );

  const visibleCategories = useMemo(
    () => categoryOptions.filter((category) => category.useYn === "Y"),
    [categoryOptions]
  );
  const counts = useMemo(
    () => ({
      received: allItems.filter((item) => item.status === "RECEIVED").length,
      completed: allItems.filter((item) => item.status === "COMPLETED").length,
      total: allItems.length,
    }),
    [allItems]
  );
  const isCompleted = selected?.status === "COMPLETED";

  const refreshLists = () => {
    queryClient.invalidateQueries(["businessRegistrations"]);
    queryClient.invalidateQueries(["businessRegistrationStats"]);
    queryClient.invalidateQueries(["getAdminStorePosts"]);
  };

  const updateMutation = useMutation(
    ({ oid, value }: { oid: string; value: BusinessRegistrationUpdate }) =>
      updateBusinessRegistrationApi(oid, value),
    {
      onSuccess: (updated) => {
        setSelected(updated);
        setDraft(toDraft(updated));
        setSavedMessage("변경사항을 저장했습니다.");
        refreshLists();
      },
    }
  );

  const registerMutation = useMutation(
    async ({
      oid,
      value,
      cityOid,
      categoryOid,
    }: {
      oid: string;
      value: BusinessRegistrationUpdate;
      cityOid: string;
      categoryOid: string;
    }) => {
      // 화면의 최신 수정값을 먼저 저장한 뒤 서버가 저장된 신청서로 업체를 생성한다.
      await updateBusinessRegistrationApi(oid, value);
      return registerBusinessRegistrationApi(oid, { cityOid, categoryOid });
    },
    {
      onSuccess: (updated) => {
        setSelected(updated);
        setDraft(toDraft(updated));
        setSavedMessage("업체 등록이 완료되었습니다.");
        refreshLists();
      },
    }
  );

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  useEffect(() => {
    if (!selected || isCompleted || targetCityOid || cityOptions.length === 0) {
      return;
    }
    const savedCity = localStorage.getItem("city");
    const defaultCity =
      cityOptions.find((city) => city.oid === savedCity) ||
      cityOptions.find((city) => city.name === "앙헬레스") ||
      cityOptions[0];
    setTargetCityOid(defaultCity?.oid || "");
  }, [cityOptions, isCompleted, selected, targetCityOid]);

  useEffect(() => {
    if (
      !draft?.category ||
      targetCategoryOid ||
      visibleCategories.length === 0
    ) {
      return;
    }
    const normalized = draft.category.trim().toLowerCase();
    const matched = visibleCategories.find(
      (category) => category.name.trim().toLowerCase() === normalized
    );
    if (matched) setTargetCategoryOid(matched.oid);
  }, [draft?.category, targetCategoryOid, visibleCategories]);

  const openDetail = (item: BusinessRegistrationItem) => {
    setSelected(item);
    setDraft(toDraft(item));
    setTargetCityOid("");
    setTargetCategoryOid("");
    setValidation("");
    setSavedMessage("");
    updateMutation.reset();
    registerMutation.reset();
  };

  const setValue = <K extends keyof BusinessRegistrationUpdate>(
    key: K,
    value: BusinessRegistrationUpdate[K]
  ) =>
    setDraft((current) =>
      current ? { ...current, [key]: value } : current
    );

  const validateDraft = () => {
    if (!draft) return "신청 정보를 불러오지 못했습니다.";
    const requiredFields = [
      { value: draft.businessName, label: "업소명", id: "adminBusinessName" },
      { value: draft.category, label: "신청 카테고리", id: "adminCategory" },
      { value: draft.businessHours, label: "영업 시간", id: "adminHours" },
      { value: draft.location, label: "위치 또는 주소", id: "adminLocation" },
      { value: draft.oneLineIntro, label: "한줄 소개", id: "adminIntro" },
      {
        value: draft.servicesPrices,
        label: "주요 메뉴/서비스 및 가격",
        id: "adminServices",
      },
    ];
    const missingFields = requiredFields.filter(
      (field) => !field.value?.trim()
    );
    if (missingFields.length > 0) {
      window.requestAnimationFrame(() => {
        document.getElementById(missingFields[0].id)?.focus();
      });
      return `업체 등록 필수 정보가 누락되었습니다: ${missingFields
        .map((field) => field.label)
        .join(", ")}`;
    }
    if (!draft.phone?.trim() && !draft.kakaoId?.trim()) {
      window.requestAnimationFrame(() => {
        document.getElementById("adminPhone")?.focus();
      });
      return "전화번호 또는 카카오톡 ID 중 하나를 입력해 주세요.";
    }
    return "";
  };

  const onSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidation("");
    setSavedMessage("");
    if (!selected || !draft || isCompleted) return;
    const message = validateDraft();
    if (message) return setValidation(message);
    updateMutation.mutate({ oid: selected.oid, value: draft });
  };

  const onRegister = () => {
    setValidation("");
    setSavedMessage("");
    if (!selected || !draft || isCompleted) return;
    const message = validateDraft();
    if (message) return setValidation(message);
    if (!targetCityOid) {
      window.requestAnimationFrame(() => {
        document.getElementById("targetCity")?.focus();
      });
      return setValidation("업체 등록 필수 정보인 지역을 선택해 주세요.");
    }
    if (!targetCategoryOid) {
      return setValidation("업체 등록 필수 정보인 카테고리를 선택해 주세요.");
    }

    const cityName =
      cityOptions.find((city) => city.oid === targetCityOid)?.name || "선택 지역";
    const categoryName =
      visibleCategories.find((category) => category.oid === targetCategoryOid)
        ?.name || "선택 카테고리";
    if (
      !window.confirm(
        `‘${draft.businessName}’을(를) ${cityName} / ${categoryName} 업체로 등록할까요?\n등록 후에는 업체관리에서 사진과 상세정보를 수정할 수 있습니다.`
      )
    ) {
      return;
    }

    registerMutation.mutate({
      oid: selected.oid,
      value: draft,
      cityOid: targetCityOid,
      categoryOid: targetCategoryOid,
    });
  };

  const titleActions = (
    <S.PublicLink href="/self-registration" target="_blank" rel="noreferrer">
      신청서 링크 열기 ↗
    </S.PublicLink>
  );

  return (
    <AdminLayout title="업소 등록 신청" titleActions={titleActions}>
      <S.Page>
        <S.Summary>
          <S.SummaryCard $tone="waiting">
            <span>접수</span>
            <strong>{counts.received}</strong>
            <i>건</i>
          </S.SummaryCard>
          <S.SummaryCard $tone="done">
            <span>등록 완료</span>
            <strong>{counts.completed}</strong>
            <i>건</i>
          </S.SummaryCard>
          <S.SummaryCard>
            <span>전체 신청</span>
            <strong>{counts.total}</strong>
            <i>건</i>
          </S.SummaryCard>
          <S.Campaign>
            <span>APPLICATION → STORE</span>
            <strong>검토 후 한 번에 업체 등록</strong>
            <p>신청 내용을 다듬고 지역·카테고리만 선택하면 업체로 전환됩니다.</p>
          </S.Campaign>
        </S.Summary>

        <S.Toolbar
          onSubmit={(event) => {
            event.preventDefault();
            const keyword = searchInput.trim();
            setSearch(keyword);
            if (keyword) setStatus("ALL");
          }}
        >
          <S.SearchWrap>
            <input
              aria-label="신청서 검색"
              value={searchInput}
              placeholder="업소명, 카테고리, 연락처 검색"
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type="submit">검색</button>
          </S.SearchWrap>
          <select
            aria-label="신청 상태 필터"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as BusinessRegistrationListStatus)
            }
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {(search || status !== "RECEIVED") && (
            <S.ResetButton
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearch("");
                setStatus("RECEIVED");
              }}
            >
              접수 목록으로 돌아가기
            </S.ResetButton>
          )}
        </S.Toolbar>

        <S.TableCard>
          <S.TableHead>
            <strong>
              {status === "RECEIVED"
                ? "처리할 신청 목록"
                : status === "COMPLETED"
                ? "등록 완료 목록"
                : "전체 신청 목록"}
            </strong>
            <span>최신 신청 순</span>
          </S.TableHead>
          {isLoading ? (
            <S.Empty>신청서를 불러오는 중입니다.</S.Empty>
          ) : isError ? (
            <S.Error>신청서 목록을 불러오지 못했습니다.</S.Error>
          ) : data.length === 0 ? (
            <S.Empty>조건에 맞는 신청서가 없습니다.</S.Empty>
          ) : (
            <S.TableScroll>
              <S.Table>
                <thead>
                  <tr>
                    <th>접수일</th>
                    <th>업소명</th>
                    <th>신청 카테고리</th>
                    <th>연락처</th>
                    <th>사진자료</th>
                    <th>상태</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.oid}>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>
                        <S.BusinessName>{item.businessName}</S.BusinessName>
                      </td>
                      <td>{item.category}</td>
                      <td>{item.phone || item.kakaoId || "-"}</td>
                      <td>
                        <S.PhotoBadge $received={item.photosReceivedYn}>
                          {item.photosReceivedYn ? "수신 완료" : "수신 대기"}
                        </S.PhotoBadge>
                      </td>
                      <td>
                        <S.StatusBadge $status={item.status}>
                          {STATUS_LABEL[item.status]}
                        </S.StatusBadge>
                      </td>
                      <td>
                        <S.ViewButton
                          type="button"
                          onClick={() => openDetail(item)}
                        >
                          보기
                        </S.ViewButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TableScroll>
          )}
        </S.TableCard>
      </S.Page>

      {selected && draft && (
        <S.Backdrop
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <S.DetailPanel
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
          >
            <S.DetailHeader>
              <div>
                <span>
                  APPLICATION · {selected.oid.slice(0, 8).toUpperCase()}
                </span>
                <h2 id="detail-title">{selected.businessName}</h2>
                <p>{formatDate(selected.createdAt)} 접수</p>
              </div>
              <button
                type="button"
                aria-label="상세 닫기"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </S.DetailHeader>

            <S.DetailForm onSubmit={onSave}>
              <S.AdminStateRow>
                <S.ReadonlyStatus $completed={isCompleted}>
                  <span>{isCompleted ? "✓" : "01"}</span>
                  <div>
                    <small>처리 상태</small>
                    <strong>{isCompleted ? "업체 등록 완료" : "신청 접수"}</strong>
                  </div>
                </S.ReadonlyStatus>
                <S.PhotoCheck>
                  <input
                    id="photosReceived"
                    type="checkbox"
                    checked={draft.photosReceivedYn}
                    disabled={isCompleted}
                    onChange={(event) =>
                      setValue("photosReceivedYn", event.target.checked)
                    }
                  />
                  <label htmlFor="photosReceived">
                    사진 자료를 카카오톡으로 받았습니다
                  </label>
                </S.PhotoCheck>
              </S.AdminStateRow>

              {isCompleted && (
                <S.CompletionCard>
                  <div>
                    <span>STORE CREATED</span>
                    <strong>신청서가 실제 업체로 등록되었습니다.</strong>
                    <p>{formatDate(selected.registeredAt)} 등록 완료</p>
                  </div>
                  {selected.postOid && (
                    <a href={`/admin/store/edit/${selected.postOid}`}>
                      등록 업체 수정 ↗
                    </a>
                  )}
                </S.CompletionCard>
              )}

              <S.DetailSection>
                <S.DetailSectionTitle>
                  <b>01</b> 업소 기본 정보
                </S.DetailSectionTitle>
                <S.EditGrid>
                  <S.EditField $wide>
                    <label htmlFor="adminBusinessName">업소명 *</label>
                    <input
                      id="adminBusinessName"
                      disabled={isCompleted}
                      value={draft.businessName}
                      onChange={(event) =>
                        setValue("businessName", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField>
                    <label htmlFor="adminCategory">신청 카테고리 *</label>
                    <input
                      id="adminCategory"
                      disabled={isCompleted}
                      value={draft.category}
                      onChange={(event) =>
                        setValue("category", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField>
                    <label htmlFor="adminHours">영업 시간 *</label>
                    <input
                      id="adminHours"
                      disabled={isCompleted}
                      value={draft.businessHours}
                      onChange={(event) =>
                        setValue("businessHours", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField $wide>
                    <label htmlFor="adminHoliday">휴무일</label>
                    <input
                      id="adminHoliday"
                      disabled={isCompleted}
                      value={draft.holiday || ""}
                      onChange={(event) =>
                        setValue("holiday", event.target.value)
                      }
                    />
                  </S.EditField>
                </S.EditGrid>
              </S.DetailSection>

              <S.DetailSection>
                <S.DetailSectionTitle>
                  <b>02</b> 연락처 및 위치
                </S.DetailSectionTitle>
                <S.EditGrid>
                  <S.EditField>
                    <label htmlFor="adminPhone">전화번호</label>
                    <input
                      id="adminPhone"
                      disabled={isCompleted}
                      value={draft.phone || ""}
                      onChange={(event) =>
                        setValue("phone", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField>
                    <label htmlFor="adminKakao">카카오톡 ID</label>
                    <input
                      id="adminKakao"
                      disabled={isCompleted}
                      value={draft.kakaoId || ""}
                      onChange={(event) =>
                        setValue("kakaoId", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField $wide>
                    <label htmlFor="adminLocation">
                      구글맵 위치 또는 주소 *
                    </label>
                    <textarea
                      id="adminLocation"
                      rows={3}
                      disabled={isCompleted}
                      value={draft.location}
                      onChange={(event) =>
                        setValue("location", event.target.value)
                      }
                    />
                  </S.EditField>
                </S.EditGrid>
              </S.DetailSection>

              <S.DetailSection>
                <S.DetailSectionTitle>
                  <b>03</b> 홍보 내용
                </S.DetailSectionTitle>
                <S.EditGrid>
                  <S.EditField $wide>
                    <label htmlFor="adminIntro">한줄 소개 *</label>
                    <input
                      id="adminIntro"
                      disabled={isCompleted}
                      value={draft.oneLineIntro}
                      onChange={(event) =>
                        setValue("oneLineIntro", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField $wide>
                    <label htmlFor="adminServices">
                      주요 메뉴/서비스 및 가격 *
                    </label>
                    <textarea
                      id="adminServices"
                      rows={5}
                      disabled={isCompleted}
                      value={draft.servicesPrices}
                      onChange={(event) =>
                        setValue("servicesPrices", event.target.value)
                      }
                    />
                  </S.EditField>
                  <S.EditField $wide>
                    <label htmlFor="adminPromotion">프로모션</label>
                    <textarea
                      id="adminPromotion"
                      rows={3}
                      disabled={isCompleted}
                      value={draft.promotion || ""}
                      onChange={(event) =>
                        setValue("promotion", event.target.value)
                      }
                    />
                  </S.EditField>
                </S.EditGrid>
              </S.DetailSection>

              {!isCompleted && (
                <S.DetailSection $accent>
                  <S.DetailSectionTitle>
                    <b>04</b> 실제 업체 등록 대상
                  </S.DetailSectionTitle>
                  <S.TargetGuide>
                    <span>
                      신청자가 자유 입력한 카테고리는
                      <strong>‘{draft.category}’</strong>입니다.
                    </span>
                    <span>
                      실제 사이트에서 사용할 지역과 카테고리를 선택해 주세요.
                    </span>
                  </S.TargetGuide>
                  <S.EditGrid>
                    <S.EditField>
                      <label htmlFor="targetCity">등록 지역 *</label>
                      <select
                        id="targetCity"
                        value={targetCityOid}
                        onChange={(event) => {
                          setTargetCityOid(event.target.value);
                          setTargetCategoryOid("");
                        }}
                      >
                        <option value="">지역을 선택하세요</option>
                        {cityOptions.map((city) => (
                          <option key={city.oid} value={city.oid}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </S.EditField>
                    <S.CategoryField>
                      <AdminCategoryDrilldown
                        label="등록 카테고리 *"
                        categories={visibleCategories as Category[]}
                        value={targetCategoryOid}
                        onChange={setTargetCategoryOid}
                      />
                    </S.CategoryField>
                  </S.EditGrid>
                  <S.TransferPreview>
                    <span>자동 입력</span>
                    <p>
                      상호명, 주소, 연락처, 영업시간, 메뉴·가격, 프로모션이
                      업체 정보로 전달됩니다. 사진은 등록 후 업체 수정 화면에서
                      추가할 수 있습니다.
                    </p>
                  </S.TransferPreview>
                </S.DetailSection>
              )}

              <S.DetailSection>
                <S.DetailSectionTitle>
                  <b>{isCompleted ? "04" : "05"}</b> 관리자 메모
                </S.DetailSectionTitle>
                <S.EditField>
                  <label htmlFor="adminMemo">내부 확인사항</label>
                  <textarea
                    id="adminMemo"
                    rows={4}
                    disabled={isCompleted}
                    placeholder="담당자 확인사항이나 등록 진행 내용을 기록하세요."
                    value={draft.adminMemo || ""}
                    onChange={(event) =>
                      setValue("adminMemo", event.target.value)
                    }
                  />
                </S.EditField>
              </S.DetailSection>

              {(validation ||
                updateMutation.isError ||
                registerMutation.isError) && (
                <S.SaveError role="alert">
                  {validation ||
                    getErrorMessage(
                      updateMutation.error || registerMutation.error
                    )}
                </S.SaveError>
              )}
              {savedMessage && (
                <S.SaveSuccess role="status">{savedMessage}</S.SaveSuccess>
              )}

              <S.DetailActions>
                <button type="button" onClick={() => setSelected(null)}>
                  닫기
                </button>
                {!isCompleted && (
                  <>
                    <button
                      type="submit"
                      disabled={
                        updateMutation.isLoading || registerMutation.isLoading
                      }
                    >
                      {updateMutation.isLoading
                        ? "저장 중..."
                        : "변경사항 저장"}
                    </button>
                    <button
                      type="button"
                      data-action="register"
                      disabled={
                        updateMutation.isLoading || registerMutation.isLoading
                      }
                      onClick={onRegister}
                    >
                      {registerMutation.isLoading
                        ? "업체 등록 중..."
                        : "업체 등록"}
                    </button>
                  </>
                )}
              </S.DetailActions>
            </S.DetailForm>
          </S.DetailPanel>
        </S.Backdrop>
      )}
    </AdminLayout>
  );
};
