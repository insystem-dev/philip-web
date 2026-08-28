import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  TranslationRunStatus,
  getTranslationUsageDashboardApi,
} from "@/apis/translationApi";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import useApiError from "@/lib/hooks/useApiError";
import * as S from "./adminTranslationUsagePage.style";

const RUN_STATUS_LABEL: Record<TranslationRunStatus, string> = {
  STARTED: "실행 중",
  SUCCEEDED: "완료",
  FAILED: "실패",
  BUDGET_BLOCKED: "한도 차단",
};

const ENTITY_LABEL: Record<string, string> = {
  CODE_SUB: "도시·카테고리",
  POST: "업체",
  POPUP: "팝업",
};

const formatNumber = (value = 0) => Number(value || 0).toLocaleString("ko-KR");
const formatUsd = (value = 0) => `$${Number(value || 0).toFixed(6)}`;
const clampPercent = (value = 0) => Math.max(0, Math.min(100, value));

export const AdminTranslationUsagePage = () => {
  const { handleError } = useApiError();
  const dashboardQuery = useQuery(
    ["translationUsageDashboard"],
    getTranslationUsageDashboardApi,
    {
      refetchInterval: 30_000,
      refetchOnWindowFocus: true,
      onError: (error: any) => handleError(error),
    }
  );

  const dashboard = dashboardQuery.data;
  const usage = dashboard?.usage;
  const safePercent = clampPercent(usage?.usagePercent);
  const freePercent = clampPercent(usage?.freeUsagePercent);
  const safetyMarkerPercent = usage?.monthlyFreeCharacters
    ? clampPercent((usage.limit / usage.monthlyFreeCharacters) * 100)
    : 0;
  const usageTone =
    safePercent >= 90 ? "danger" : safePercent >= 75 ? "warning" : "safe";
  const maxDailyUsage = useMemo(
    () =>
      Math.max(
        1,
        ...(dashboard?.dailyUsage ?? []).map((item) =>
          Math.max(item.billedCharacters, item.protectedCharacters)
        )
      ),
    [dashboard?.dailyUsage]
  );
  const periodLabel = usage
    ? new Date(usage.monthStart).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
      })
    : "이번 달";

  return (
    <AdminLayout title="번역 사용량">
      <S.Page>
        <S.Hero>
          <S.HeroHeader>
            <div>
              <S.Eyebrow>TRANSLATION BUDGET CONTROL</S.Eyebrow>
              <S.HeroTitle>월 번역 안전 한도</S.HeroTitle>
              <S.HeroDescription>
                API 호출 전에 문자 수를 먼저 선점해 여러 서버가 동시에 실행되어도
                설정한 한도를 넘지 않도록 보호합니다.
              </S.HeroDescription>
            </div>
            <S.LivePanel>
              <S.LiveDot $enabled={dashboard?.worker.enabled === true} />
              <div>
                <strong>
                  워커 {dashboard?.worker.enabled ? "실행 중" : "중지됨"}
                </strong>
                <span>30초마다 자동 갱신 · {periodLabel}</span>
              </div>
            </S.LivePanel>
          </S.HeroHeader>

          <S.MeterSummary>
            <div>
              <span>안전 한도 반영량</span>
              <strong>{formatNumber(usage?.protectedCharacters)}자</strong>
            </div>
            <S.MeterPercent $tone={usageTone}>{safePercent.toFixed(1)}%</S.MeterPercent>
          </S.MeterSummary>

          <S.ProgressArea>
            <S.ProgressRail
              role="progressbar"
              aria-label="월 무료 번역 범위 사용량"
              aria-valuemin={0}
              aria-valuemax={usage?.monthlyFreeCharacters ?? 0}
              aria-valuenow={usage?.protectedCharacters ?? 0}
            >
              <S.ProgressFill $tone={usageTone} style={{ width: `${freePercent}%` }} />
              <S.SafetyMarker style={{ left: `${safetyMarkerPercent}%` }}>
                <span />
                <small>자동 차단 {formatNumber(usage?.limit)}자</small>
              </S.SafetyMarker>
            </S.ProgressRail>
            <S.ProgressLegend>
              <span>0</span>
              <strong>무료 한도 {formatNumber(usage?.monthlyFreeCharacters)}자</strong>
            </S.ProgressLegend>
          </S.ProgressArea>

          <S.HeroStats>
            <S.HeroStat>
              <span>남은 안전 사용량</span>
              <strong>{formatNumber(usage?.remainingCharacters)}자</strong>
            </S.HeroStat>
            <S.HeroStat>
              <span>무료 구간 안전 버퍼</span>
              <strong>{formatNumber(usage?.safetyBufferCharacters)}자</strong>
            </S.HeroStat>
            <S.HeroStat>
              <span>실제 응답 완료량</span>
              <strong>{formatNumber(usage?.characters)}자</strong>
            </S.HeroStat>
          </S.HeroStats>
        </S.Hero>

        <S.KpiGrid>
          <S.KpiCard>
            <S.KpiLabel>현재 공급자</S.KpiLabel>
            <S.KpiValue>{usage?.provider?.toUpperCase() ?? "-"}</S.KpiValue>
            <S.KpiHint>
              ${usage?.unitPriceUsd ?? 0} / {formatNumber(usage?.unitCharacters)}자
            </S.KpiHint>
          </S.KpiCard>
          <S.KpiCard>
            <S.KpiLabel>성공 호출</S.KpiLabel>
            <S.KpiValue>{formatNumber(usage?.successfulRuns)}회</S.KpiValue>
            <S.KpiHint>계산 비용 {formatUsd(usage?.calculatedCostUsd)}</S.KpiHint>
          </S.KpiCard>
          <S.KpiCard>
            <S.KpiLabel>진행 중 선점</S.KpiLabel>
            <S.KpiValue>{formatNumber(usage?.inFlightCharacters)}자</S.KpiValue>
            <S.KpiHint>호출 완료 전에도 한도에 선반영</S.KpiHint>
          </S.KpiCard>
          <S.KpiCard>
            <S.KpiLabel>실패 보호량</S.KpiLabel>
            <S.KpiValue>{formatNumber(usage?.failedProtectedCharacters)}자</S.KpiValue>
            <S.KpiHint>응답 불명확 실패를 보수적으로 유지</S.KpiHint>
          </S.KpiCard>
        </S.KpiGrid>

        <S.ContentGrid>
          <S.Panel>
            <S.PanelHeader>
              <div>
                <strong>일별 사용 흐름</strong>
                <span>실제 완료량과 안전 한도 반영량을 비교합니다.</span>
              </div>
              <S.Legend>
                <span><i /> 실제</span>
                <span><i /> 보호</span>
              </S.Legend>
            </S.PanelHeader>
            <S.Chart aria-label="일별 번역 사용량 차트">
              {(dashboard?.dailyUsage ?? []).map((item) => (
                <S.ChartColumn key={item.date} title={`${item.date} · ${formatNumber(item.protectedCharacters)}자`}>
                  <S.ChartBars>
                    <S.ChartBar
                      $kind="actual"
                      style={{ height: `${Math.max(2, (item.billedCharacters / maxDailyUsage) * 100)}%` }}
                    />
                    <S.ChartBar
                      $kind="protected"
                      style={{ height: `${Math.max(2, (item.protectedCharacters / maxDailyUsage) * 100)}%` }}
                    />
                  </S.ChartBars>
                  <span>{new Date(`${item.date}T00:00:00`).getDate()}</span>
                </S.ChartColumn>
              ))}
            </S.Chart>
          </S.Panel>

          <S.Panel>
            <S.PanelHeader>
              <div>
                <strong>실행 상태</strong>
                <span>이번 달 공급자 호출 기록입니다.</span>
              </div>
            </S.PanelHeader>
            <S.StatusList>
              {(dashboard?.statusBreakdown ?? []).map((item) => (
                <S.StatusRow key={item.status}>
                  <S.StatusBadge $status={item.status}>
                    {RUN_STATUS_LABEL[item.status]}
                  </S.StatusBadge>
                  <div>
                    <strong>{formatNumber(item.calls)}회</strong>
                    <span>보호 {formatNumber(item.protectedCharacters)}자</span>
                  </div>
                </S.StatusRow>
              ))}
              {!dashboard?.statusBreakdown?.length && (
                <S.Empty>이번 달 실행 기록이 없습니다.</S.Empty>
              )}
            </S.StatusList>
            <S.WorkerInfo>
              <div><span>조회 간격</span><strong>{formatNumber(dashboard?.worker.pollIntervalMs)}ms</strong></div>
              <div><span>배치 크기</span><strong>{formatNumber(dashboard?.worker.batchSize)}건</strong></div>
              <div><span>최대 시도</span><strong>{formatNumber(dashboard?.worker.maxAttempts)}회</strong></div>
            </S.WorkerInfo>
          </S.Panel>
        </S.ContentGrid>

        <S.Panel>
          <S.PanelHeader>
            <div>
              <strong>최근 번역 실행</strong>
              <span>타임아웃과 실패 호출도 안전 한도 반영량에서 확인할 수 있습니다.</span>
            </div>
            <S.RefreshButton
              type="button"
              disabled={dashboardQuery.isFetching}
              onClick={() => dashboardQuery.refetch()}
            >
              {dashboardQuery.isFetching ? "갱신 중" : "지금 갱신"}
            </S.RefreshButton>
          </S.PanelHeader>
          <S.TableScroller>
            <S.Table>
              <S.TableRow $header>
                <span>실행 시각</span><span>대상</span><span>요청</span><span>실제</span><span>보호</span><span>상태</span>
              </S.TableRow>
              {(dashboard?.recentRuns ?? []).map((run) => (
                <S.TableRow key={`${run.provider}:${run.requestId}`}>
                  <span>{new Date(run.createdAt).toLocaleString("ko-KR")}</span>
                  <span title={run.entityId ?? ""}>
                    <strong>{ENTITY_LABEL[run.entityType ?? ""] ?? "공통"}</strong>
                    <small>{run.entityId || run.moduleName}</small>
                  </span>
                  <span>{formatNumber(run.requestedCharacters)}자</span>
                  <span>{formatNumber(run.billedCharacters)}자</span>
                  <span>{formatNumber(run.protectedCharacters)}자</span>
                  <span title={run.errorMessage ?? ""}>
                    <S.StatusBadge $status={run.status}>{RUN_STATUS_LABEL[run.status]}</S.StatusBadge>
                  </span>
                </S.TableRow>
              ))}
              {!dashboard?.recentRuns?.length && <S.Empty>실행 기록이 없습니다.</S.Empty>}
            </S.Table>
          </S.TableScroller>
        </S.Panel>
      </S.Page>
    </AdminLayout>
  );
};
