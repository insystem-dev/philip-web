import { ReactNode, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  TranslationStatus,
  getTranslationDetailApi,
  requestAutoTranslationApi,
  saveTranslationApi,
} from "@/apis/translationApi";
import useApiError from "@/lib/hooks/useApiError";
import * as S from "./adminPostTranslationEditor.style";

const STATUS_LABEL: Record<TranslationStatus, string> = {
  MISSING: "번역 없음",
  PENDING: "번역 대기",
  AUTO_TRANSLATED: "자동 번역",
  REVIEWED: "검수 완료",
  STALE: "원문 변경",
  FAILED: "번역 실패",
};

const FIELD_LABEL: Record<string, { ko: string; en: string }> = {
  storeName: { ko: "상호명", en: "Store name" },
  address: { ko: "주소", en: "Address" },
  contents: { ko: "요금 및 메뉴설명", en: "Prices, menu & description" },
  remark: { ko: "비고", en: "Notes" },
};

const MULTILINE_FIELDS = new Set(["address", "contents", "remark"]);

interface AdminPostTranslationEditorProps {
  postOid: string;
  versionSwitch?: ReactNode;
}

export const AdminPostTranslationEditor = ({
  postOid,
  versionSwitch,
}: AdminPostTranslationEditorProps) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const detailQuery = useQuery(
    ["translationDetail", "POST", postOid],
    () => getTranslationDetailApi("POST", postOid),
    {
      enabled: !!postOid,
      onError: (error: any) => handleError(error),
    }
  );

  useEffect(() => {
    if (!detailQuery.data) return;
    setDraft(
      Object.fromEntries(
        Object.entries(detailQuery.data.fields).map(([field, value]) => [
          field,
          value.translated ?? "",
        ])
      )
    );
  }, [detailQuery.data]);

  const isDirty = useMemo(() => {
    if (!detailQuery.data) return false;
    return Object.entries(detailQuery.data.fields).some(
      ([field, value]) => (draft[field] ?? "") !== (value.translated ?? "")
    );
  }, [detailQuery.data, draft]);

  const refreshTranslation = async () => {
    await Promise.all([
      queryClient.invalidateQueries(["translationDetail", "POST", postOid]),
      queryClient.invalidateQueries(["translations"]),
      queryClient.invalidateQueries(["translationSummary"]),
    ]);
  };

  const saveMutation = useMutation(
    (reviewed: boolean) =>
      saveTranslationApi("POST", postOid, draft, reviewed),
    {
      onSuccess: async (_, reviewed) => {
        await refreshTranslation();
        alert(
          reviewed
            ? "영어 번역을 저장하고 검수 완료 처리했습니다."
            : "영어 번역을 임시 저장했습니다."
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message ?? "영어 번역 저장에 실패했습니다.");
      },
    }
  );

  const autoMutation = useMutation(
    () => requestAutoTranslationApi("POST", postOid),
    {
      onSuccess: async () => {
        await refreshTranslation();
        alert(
          "자동 번역 작업을 등록했습니다. 번역 작업자가 꺼져 있으면 대기 상태로 유지됩니다."
        );
      },
      onError: (error: any) => {
        handleError(error);
        alert(
          error?.response?.data?.message ?? "자동 번역 작업 등록에 실패했습니다."
        );
      },
    }
  );

  if (!postOid || detailQuery.isLoading) {
    return (
      <S.StatePanel role="status">
        <S.Loader aria-hidden="true" />
        영어 번역 정보를 불러오는 중입니다.
      </S.StatePanel>
    );
  }

  if (detailQuery.isError || !detailQuery.data) {
    return (
      <S.StatePanel role="alert">
        <strong>영어 번역 정보를 불러오지 못했습니다.</strong>
        <button type="button" onClick={() => detailQuery.refetch()}>
          다시 불러오기
        </button>
      </S.StatePanel>
    );
  }

  const detail = detailQuery.data;

  return (
    <S.Editor>
      <S.EditorHeader>
        <div>
          <S.Eyebrow>ENGLISH VERSION</S.Eyebrow>
          <S.EditorTitle>
            {detail.fields.storeName?.translated ||
              detail.fields.storeName?.original ||
              "업체 영어 정보"}
          </S.EditorTitle>
          <S.EditorDescription>
            한글 원문은 참고용이며 오른쪽 영어 번역만 수정됩니다.
          </S.EditorDescription>
        </div>
        <S.HeaderActions>
          {versionSwitch}
          <S.StatusGroup>
            <S.StatusBadge $status={detail.status}>
              {STATUS_LABEL[detail.status]}
            </S.StatusBadge>
            {detail.updatedAt && (
              <small>
                마지막 저장 {new Date(detail.updatedAt).toLocaleString("ko-KR")}
              </small>
            )}
          </S.StatusGroup>
        </S.HeaderActions>
      </S.EditorHeader>

      {detail.status === "STALE" && (
        <S.StaleNotice role="status">
          한글 원문이 변경되었습니다. 변경된 내용을 확인한 뒤 영어 번역을 다시
          저장해 주세요.
        </S.StaleNotice>
      )}

      <S.ColumnGuide aria-hidden="true">
        <span>한글 원문 · 읽기 전용</span>
        <span>영어 번역 · 수정 가능</span>
      </S.ColumnGuide>

      <S.FieldList>
        {Object.entries(detail.fields).map(([field, value]) => {
          const label = FIELD_LABEL[field] ?? { ko: field, en: field };
          const multiline = MULTILINE_FIELDS.has(field);

          return (
            <S.Field key={field}>
              <S.FieldLabel>
                <strong>{label.ko}</strong>
                <span>{label.en}</span>
              </S.FieldLabel>
              <S.Original lang="ko">{value.original || "—"}</S.Original>
              {multiline ? (
                <S.TranslationTextarea
                  lang="en"
                  aria-label={`${label.ko} 영어 번역`}
                  value={draft[field] ?? ""}
                  placeholder={`${label.en} in English`}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      [field]: event.target.value,
                    }))
                  }
                />
              ) : (
                <S.TranslationInput
                  lang="en"
                  aria-label={`${label.ko} 영어 번역`}
                  value={draft[field] ?? ""}
                  placeholder={`${label.en} in English`}
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
        })}
      </S.FieldList>

      <S.EditorFooter>
        <S.FooterHint>
          <strong>{isDirty ? "저장하지 않은 변경사항이 있습니다." : "저장된 번역입니다."}</strong>
          <span>
            검수 완료로 저장하면 이후 자동 번역이 해당 내용을 덮어쓰지 않습니다.
          </span>
        </S.FooterHint>
        <S.Actions>
          <S.SecondaryButton
            type="button"
            title={
              detail.status === "REVIEWED"
                ? "검수 완료 번역은 자동 번역으로 덮어쓰지 않습니다."
                : undefined
            }
            disabled={
              detail.status === "REVIEWED" ||
              autoMutation.isLoading ||
              saveMutation.isLoading
            }
            onClick={() => autoMutation.mutate()}
          >
            {detail.status === "REVIEWED"
              ? "검수 완료 번역 보호 중"
              : autoMutation.isLoading
                ? "등록 중..."
                : "자동 번역 요청"}
          </S.SecondaryButton>
          <S.SecondaryButton
            type="button"
            disabled={!isDirty || saveMutation.isLoading}
            onClick={() => saveMutation.mutate(false)}
          >
            임시 저장
          </S.SecondaryButton>
          <S.PrimaryButton
            type="button"
            disabled={
              (detail.status === "REVIEWED" && !isDirty) ||
              saveMutation.isLoading
            }
            onClick={() => saveMutation.mutate(true)}
          >
            {saveMutation.isLoading
              ? "저장 중..."
              : detail.status === "REVIEWED" && !isDirty
                ? "검수 완료됨"
                : isDirty
                  ? "저장 및 검수 완료"
                  : "검수 완료 처리"}
          </S.PrimaryButton>
        </S.Actions>
      </S.EditorFooter>
    </S.Editor>
  );
};

export default AdminPostTranslationEditor;
