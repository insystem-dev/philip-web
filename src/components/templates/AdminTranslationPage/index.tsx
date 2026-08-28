import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  TranslationEntityType,
  TranslationListItem,
  TranslationRunStatus,
  TranslationStatus,
  getTranslationDetailApi,
  getTranslationSummaryApi,
  getTranslationsApi,
  requestAutoTranslationApi,
  saveTranslationApi,
} from "@/apis/translationApi";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import useApiError from "@/lib/hooks/useApiError";
import * as S from "./adminTranslationPage.style";

const STATUS_LABEL: Record<TranslationStatus, string> = {
  MISSING: "번역 없음",
  PENDING: "대기",
  AUTO_TRANSLATED: "자동 번역",
  REVIEWED: "검수 완료",
  STALE: "원문 변경",
  FAILED: "실패",
};

const ENTITY_LABEL: Record<TranslationEntityType, string> = {
  CODE_SUB: "도시·카테고리",
  POST: "업체",
  POPUP: "팝업",
};

const FIELD_LABEL: Record<string, string> = {
  name: "이름",
  storeName: "업체명",
  address: "주소",
  contents: "소개 내용",
  remark: "비고",
  title: "제목",
  content: "내용",
};

const PAGE_SIZE = 30;

const RUN_STATUS_LABEL: Record<TranslationRunStatus, string> = {
  STARTED: "실행 중",
  SUCCEEDED: "완료",
  FAILED: "실패",
  BUDGET_BLOCKED: "예산 차단",
};

const formatUsd = (value: number) => `$${Number(value || 0).toFixed(6)}`;

export const AdminTranslationPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [page, setPage] = useState(1);
  const [entityType, setEntityType] = useState("");
  const [status, setStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<TranslationListItem | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});

  const params = useMemo(
    () => ({
      page,
      pageSize: PAGE_SIZE,
      ...(entityType && { entityType }),
      ...(status && { status }),
      ...(search && { search }),
    }),
    [entityType, page, search, status]
  );

  const summaryQuery = useQuery(
    ["translationSummary"],
    getTranslationSummaryApi,
    { onError: (error: any) => handleError(error) }
  );
  const listQuery = useQuery(["translations", params], getTranslationsApi, {
    keepPreviousData: true,
    onError: (error: any) => handleError(error),
  });
  const detailQuery = useQuery(
    ["translationDetail", selected?.entityType, selected?.entityId],
    () => getTranslationDetailApi(selected!.entityType, selected!.entityId),
    {
      enabled: !!selected,
      onError: (error: any) => handleError(error),
    }
  );

  useEffect(() => {
    if (!detailQuery.data) return;
    setDraft(
      Object.fromEntries(
        Object.entries(detailQuery.data.fields).map(([field, value]) => [
          field,
          value.translated,
        ])
      )
    );
  }, [detailQuery.data]);

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries(["translationSummary"]),
      queryClient.invalidateQueries(["translations"]),
      queryClient.invalidateQueries(["translationDetail"]),
    ]);
  };

  const saveMutation = useMutation(
    (reviewed: boolean) =>
      saveTranslationApi(
        selected!.entityType,
        selected!.entityId,
        draft,
        reviewed
      ),
    {
      onSuccess: async (_, reviewed) => {
        await refresh();
        alert(
          reviewed ? "번역을 검수 완료로 저장했습니다." : "번역을 저장했습니다."
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message ?? "번역 저장에 실패했습니다.");
      },
    }
  );

  const autoMutation = useMutation(
    () => requestAutoTranslationApi(selected!.entityType, selected!.entityId),
    {
      onSuccess: async () => {
        await refresh();
        alert("자동 번역 작업을 등록했습니다.");
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message ?? "작업 등록에 실패했습니다.");
      },
    }
  );

  const summary = summaryQuery.data;
  const usagePercent = summary?.usage.usagePercent ?? 0;
  const totalPages = Math.max(
    1,
    Math.ceil((listQuery.data?.total ?? 0) / PAGE_SIZE)
  );

  return (
    <AdminLayout title="번역 관리">
      <S.Page>
        <S.SummaryGrid>
          <S.SummaryCard>
            <S.SummaryLabel>현재 번역 서비스</S.SummaryLabel>
            <S.SummaryValue>{summary?.provider ?? "-"}</S.SummaryValue>
            <S.SummaryHint>환경변수로 Google / Azure 전환</S.SummaryHint>
          </S.SummaryCard>
          <S.SummaryCard>
            <S.SummaryLabel>검수 완료</S.SummaryLabel>
            <S.SummaryValue>
              {(summary?.recordCounts.REVIEWED ?? 0).toLocaleString()}건
            </S.SummaryValue>
            <S.SummaryHint>
              자동 번역 {summary?.recordCounts.AUTO_TRANSLATED ?? 0}건
            </S.SummaryHint>
          </S.SummaryCard>
          <S.SummaryCard>
            <S.SummaryLabel>작업 대기</S.SummaryLabel>
            <S.SummaryValue>
              {(summary?.jobCounts.PENDING ?? 0).toLocaleString()}건
            </S.SummaryValue>
            <S.SummaryHint>
              실패 {summary?.jobCounts.FAILED ?? 0}건
            </S.SummaryHint>
          </S.SummaryCard>
          <S.SummaryCard>
            <S.SummaryLabel>이번 달 사용량</S.SummaryLabel>
            <S.SummaryValue>
              {(summary?.usage.characters ?? 0).toLocaleString()}자
            </S.SummaryValue>
            <S.UsageTrack>
              <span style={{ width: `${usagePercent}%` }} />
            </S.UsageTrack>
            <S.SummaryHint>
              안전 한도 {(summary?.usage.limit ?? 0).toLocaleString()}자
            </S.SummaryHint>
          </S.SummaryCard>
          <S.SummaryCard>
            <S.SummaryLabel>이번 달 계산 비용</S.SummaryLabel>
            <S.SummaryValue>
              {formatUsd(summary?.usage.calculatedCostUsd ?? 0)}
            </S.SummaryValue>
            <S.SummaryHint>
              실행 전 예상 합계{" "}
              {formatUsd(summary?.usage.estimatedCostUsd ?? 0)}
            </S.SummaryHint>
          </S.SummaryCard>
        </S.SummaryGrid>

        <S.AuditPanel>
          <S.AuditHead>
            <div>
              <strong>최근 번역 실행 및 비용 기록</strong>
              <span>
                공급자 과금 문자 수와 설정 단가로 계산한 참고 금액입니다.
              </span>
            </div>
            <S.PriceSnapshot>
              {summary
                ? `${summary.provider.toUpperCase()} · $${summary.usage.unitPriceUsd}/100만 자 · 월 무료 ${summary.usage.monthlyFreeCharacters.toLocaleString()}자`
                : "가격 설정 불러오는 중"}
            </S.PriceSnapshot>
          </S.AuditHead>
          <S.AuditScroller>
            <S.AuditTable>
              <S.AuditRow $header>
                <span>실행 시각</span>
                <span>공급자·모듈</span>
                <span>번역 대상</span>
                <span>문자 수</span>
                <span>예상 / 계산 비용</span>
                <span>상태</span>
              </S.AuditRow>
              {!summary?.recentRuns?.length ? (
                <S.AuditEmpty>아직 번역 실행 기록이 없습니다.</S.AuditEmpty>
              ) : (
                summary.recentRuns.map((run) => (
                  <S.AuditRow key={`${run.provider}:${run.requestId}`}>
                    <span>
                      {new Date(run.createdAt).toLocaleString("ko-KR", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span>
                      <strong>{run.provider.toUpperCase()}</strong>
                      <small>{run.moduleName}</small>
                    </span>
                    <span title={run.entityId ?? ""}>
                      <strong>
                        {run.entityType
                          ? ENTITY_LABEL[run.entityType]
                          : "공통 번역"}
                      </strong>
                      <small>{run.entityId || "—"}</small>
                    </span>
                    <span>
                      <strong>{run.billedCharacters.toLocaleString()}자</strong>
                      <small>
                        요청 {run.requestedCharacters.toLocaleString()}자
                      </small>
                    </span>
                    <span>
                      <strong>{formatUsd(run.estimatedCostUsd)}</strong>
                      <small>{formatUsd(run.calculatedCostUsd)}</small>
                    </span>
                    <span title={run.errorMessage ?? ""}>
                      <S.RunBadge $status={run.status}>
                        {RUN_STATUS_LABEL[run.status]}
                      </S.RunBadge>
                    </span>
                  </S.AuditRow>
                ))
              )}
            </S.AuditTable>
          </S.AuditScroller>
        </S.AuditPanel>

        <S.Workspace>
          <S.ListPanel>
            <S.FilterBar
              onSubmit={(event) => {
                event.preventDefault();
                setPage(1);
                setSearch(searchInput.trim());
              }}
            >
              <S.Select
                value={entityType}
                onChange={(event) => {
                  setEntityType(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">전체 대상</option>
                <option value="CODE_SUB">도시·카테고리</option>
                <option value="POST">업체</option>
                <option value="POPUP">팝업</option>
              </S.Select>
              <S.Select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">전체 상태</option>
                {Object.entries(STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </S.Select>
              <S.SearchInput
                value={searchInput}
                placeholder="한글 또는 영문 이름 검색"
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <S.SearchButton type="submit">검색</S.SearchButton>
            </S.FilterBar>

            <S.ListHeader>
              <span>번역 대상</span>
              <span>영문 번역</span>
              <span>상태</span>
            </S.ListHeader>
            <S.ListBody>
              {listQuery.isLoading ? (
                <S.Empty>번역 목록을 불러오는 중입니다.</S.Empty>
              ) : !listQuery.data?.items.length ? (
                <S.Empty>조건에 맞는 번역 대상이 없습니다.</S.Empty>
              ) : (
                listQuery.data.items.map((item) => (
                  <S.ListRow
                    type="button"
                    key={`${item.entityType}:${item.entityId}`}
                    $active={
                      selected?.entityType === item.entityType &&
                      selected?.entityId === item.entityId
                    }
                    onClick={() => setSelected(item)}
                  >
                    <span>
                      <small>{ENTITY_LABEL[item.entityType]}</small>
                      <strong>{item.originalTitle || "이름 없음"}</strong>
                    </span>
                    <span>{item.translatedTitle || "—"}</span>
                    <S.StatusBadge $status={item.status}>
                      {STATUS_LABEL[item.status]}
                    </S.StatusBadge>
                  </S.ListRow>
                ))
              )}
            </S.ListBody>
            <S.Pagination>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                이전
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((value) => value + 1)}
              >
                다음
              </button>
            </S.Pagination>
          </S.ListPanel>

          <S.EditorPanel>
            {!selected ? (
              <S.EditorEmpty>
                <strong>번역할 항목을 선택해주세요.</strong>
                <span>한글 원문과 영문 번역을 나란히 확인할 수 있습니다.</span>
              </S.EditorEmpty>
            ) : detailQuery.isLoading || !detailQuery.data ? (
              <S.EditorEmpty>번역 내용을 불러오는 중입니다.</S.EditorEmpty>
            ) : (
              <>
                <S.EditorHead>
                  <div>
                    <small>{ENTITY_LABEL[detailQuery.data.entityType]}</small>
                    <strong>{selected.originalTitle}</strong>
                  </div>
                  <S.StatusBadge $status={detailQuery.data.status}>
                    {STATUS_LABEL[detailQuery.data.status]}
                  </S.StatusBadge>
                </S.EditorHead>
                <S.FieldList>
                  {Object.entries(detailQuery.data.fields).map(
                    ([field, value]) => {
                      const multiline = [
                        "address",
                        "contents",
                        "content",
                      ].includes(field);
                      return (
                        <S.Field key={field}>
                          <label>{FIELD_LABEL[field] ?? field}</label>
                          <S.Original lang="ko">
                            {value.original || "—"}
                          </S.Original>
                          {multiline ? (
                            <S.Textarea
                              lang="en"
                              value={draft[field] ?? ""}
                              onChange={(event) =>
                                setDraft((current) => ({
                                  ...current,
                                  [field]: event.target.value,
                                }))
                              }
                            />
                          ) : (
                            <S.Input
                              lang="en"
                              value={draft[field] ?? ""}
                              onChange={(event) =>
                                setDraft((current) => ({
                                  ...current,
                                  [field]: event.target.value,
                                }))
                              }
                            />
                          )}
                        </S.Field>
                      );
                    }
                  )}
                </S.FieldList>
                <S.EditorActions>
                  <S.SecondaryButton
                    type="button"
                    disabled={autoMutation.isLoading}
                    onClick={() => autoMutation.mutate()}
                  >
                    {autoMutation.isLoading
                      ? "등록 중..."
                      : "자동 번역 다시 요청"}
                  </S.SecondaryButton>
                  <S.SecondaryButton
                    type="button"
                    disabled={saveMutation.isLoading}
                    onClick={() => saveMutation.mutate(false)}
                  >
                    임시 저장
                  </S.SecondaryButton>
                  <S.PrimaryButton
                    type="button"
                    disabled={saveMutation.isLoading}
                    onClick={() => saveMutation.mutate(true)}
                  >
                    {saveMutation.isLoading
                      ? "저장 중..."
                      : "저장 및 검수 완료"}
                  </S.PrimaryButton>
                </S.EditorActions>
              </>
            )}
          </S.EditorPanel>
        </S.Workspace>
      </S.Page>
    </AdminLayout>
  );
};

export default AdminTranslationPage;
