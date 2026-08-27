import axiosInstance from "./index";

export type TranslationEntityType = "CODE_SUB" | "POST" | "POPUP";
export type TranslationStatus =
  "MISSING" | "PENDING" | "AUTO_TRANSLATED" | "REVIEWED" | "STALE" | "FAILED";
export type TranslationRunStatus =
  "STARTED" | "SUCCEEDED" | "FAILED" | "BUDGET_BLOCKED";

export interface TranslationRun {
  requestId: string;
  jobOid: string | null;
  provider: "google" | "azure";
  moduleName: string;
  entityType: TranslationEntityType | null;
  entityId: string | null;
  requestedCharacters: number;
  billedCharacters: number;
  estimatedCostUsd: number;
  calculatedCostUsd: number;
  unitPriceUsd: number;
  monthlyFreeCharacters: number;
  status: TranslationRunStatus;
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface TranslationSummary {
  provider: "google" | "azure";
  recordCounts: Partial<Record<TranslationStatus, number>>;
  jobCounts: Partial<
    Record<"PENDING" | "PROCESSING" | "COMPLETED" | "FAILED", number>
  >;
  usage: {
    provider: "google" | "azure";
    characters: number;
    limit: number;
    monthStart: string;
    currency: "USD";
    unitCharacters: number;
    unitPriceUsd: number;
    monthlyFreeCharacters: number;
    estimatedCostUsd: number;
    calculatedCostUsd: number;
    successfulRuns: number;
    failedRuns: number;
  };
  recentRuns: TranslationRun[];
}

export interface TranslationListItem {
  entityType: TranslationEntityType;
  entityId: string;
  originalTitle: string;
  translatedTitle: string;
  status: TranslationStatus;
  provider: string | null;
  updatedAt: string | null;
}

export interface TranslationListResponse {
  items: TranslationListItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface TranslationDetail {
  entityType: TranslationEntityType;
  entityId: string;
  sourceHash: string;
  status: TranslationStatus;
  provider: string | null;
  updatedAt: string | null;
  fields: Record<string, { original: string; translated: string }>;
}

export function getTranslationSummaryApi() {
  return axiosInstance
    .get<TranslationSummary>("/admin/translations/summary")
    .then((response) => response.data);
}

export function getTranslationsApi({ queryKey }: any) {
  const [, params] = queryKey;
  return axiosInstance
    .get<TranslationListResponse>("/admin/translations", { params })
    .then((response) => response.data);
}

export function getTranslationDetailApi(
  entityType: TranslationEntityType,
  entityId: string
) {
  return axiosInstance
    .get<TranslationDetail>(
      `/admin/translations/${entityType}/${encodeURIComponent(entityId)}`
    )
    .then((response) => response.data);
}

export function saveTranslationApi(
  entityType: TranslationEntityType,
  entityId: string,
  translations: Record<string, string>,
  reviewed: boolean
) {
  return axiosInstance
    .put<TranslationDetail>(
      `/admin/translations/${entityType}/${encodeURIComponent(entityId)}`,
      { translations, reviewed }
    )
    .then((response) => response.data);
}

export function requestAutoTranslationApi(
  entityType: TranslationEntityType,
  entityId: string
) {
  return axiosInstance
    .post(
      `/admin/translations/${entityType}/${encodeURIComponent(entityId)}/auto`
    )
    .then((response) => response.data);
}
