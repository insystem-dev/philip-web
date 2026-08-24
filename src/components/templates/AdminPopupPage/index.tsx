import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createPopupApi,
  deletePopupApi,
  getPopupsApi,
  PopupItem,
  PopupPayload,
  updatePopupApi,
} from "@/apis/popupApi";
import { deletePreviewImagesAPI, uploadImagesAPI } from "@/apis/postsApi";
import useApiError from "@/lib/hooks/useApiError";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { AdminCategoryDrilldown } from "@/components/molecules/AdminCategoryDrilldown";
import { getCategoryTreeApi } from "@/apis/categoryApi";
import * as S from "./adminPopupPage.style";

interface PopupDraft {
  target: "CATEGORY_SELECTION" | "CATEGORY";
  categoryCode: string;
  title: string;
  content: string;
  imageFilename: string | null;
  linkUrl: string;
  sortOrder: string;
  useYn: "Y" | "N";
  startAt: string;
  endAt: string;
}

const EMPTY_DRAFT: PopupDraft = {
  target: "CATEGORY_SELECTION",
  categoryCode: "",
  title: "",
  content: "",
  imageFilename: null,
  linkUrl: "",
  sortOrder: "0",
  useYn: "Y",
  startAt: "",
  endAt: "",
};

const toLocalDateTime = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const toIsoDateTime = (value: string) =>
  value ? new Date(value).toISOString() : null;

const getStatus = (popup: PopupItem) => {
  if (popup.useYn === "N") return { label: "사용 안 함", tone: "off" as const };
  const now = Date.now();
  if (popup.startAt && new Date(popup.startAt).getTime() > now) {
    return { label: "노출 예약", tone: "scheduled" as const };
  }
  if (popup.endAt && new Date(popup.endAt).getTime() < now) {
    return { label: "노출 종료", tone: "ended" as const };
  }
  return { label: "노출 중", tone: "active" as const };
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "제한 없음";

export const AdminPopupPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [editing, setEditing] = useState<PopupItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<PopupDraft>(EMPTY_DRAFT);
  const [draftUpload, setDraftUpload] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [validation, setValidation] = useState("");

  const {
    data: popups = [],
    isLoading,
    isError,
  } = useQuery(["adminPopups"], getPopupsApi, {
    retry: 1,
    onError: (error: any) => handleError(error),
  });

  const { data: categories = [] } = useQuery(
    ["popupCategories"],
    getCategoryTreeApi,
    {
      retry: 1,
      onError: (error: any) => handleError(error),
    }
  );

  const categoryByCode = useMemo(
    () => new Map(categories.map((category) => [category.oid, category])),
    [categories]
  );

  const getCategoryLabel = (categoryCode: string | null) => {
    if (!categoryCode) return "카테고리 선택 화면";
    const path: string[] = [];
    const visited = new Set<string>();
    let current = categoryByCode.get(categoryCode);
    while (current && !visited.has(current.oid)) {
      visited.add(current.oid);
      path.unshift(current.name);
      current = current.parentOid
        ? categoryByCode.get(current.parentOid)
        : undefined;
    }
    return path.join(" > ") || categoryCode;
  };

  const resetEditor = () => {
    if (draftUpload) deletePreviewImagesAPI(draftUpload).catch(() => undefined);
    setDraftUpload(null);
    setDraft(EMPTY_DRAFT);
    setEditing(null);
    setEditorOpen(false);
    setValidation("");
  };

  const saveMutation = useMutation(
    (payload: PopupPayload) =>
      editing ? updatePopupApi(editing.oid, payload) : createPopupApi(payload),
    {
      onSuccess: () => {
        setDraftUpload(null);
        setDraft(EMPTY_DRAFT);
        setEditing(null);
        setEditorOpen(false);
        queryClient.invalidateQueries(["adminPopups"]);
        queryClient.invalidateQueries(["activePopups"]);
        alert(editing ? "팝업이 수정되었습니다." : "팝업이 등록되었습니다.");
      },
      onError: (error: any) => {
        handleError(error);
        alert(error?.response?.data?.message || "저장 중 오류가 발생했습니다.");
      },
    }
  );

  const deleteMutation = useMutation(deletePopupApi, {
    onSuccess: (_, oid) => {
      if (editing?.oid === oid) resetEditor();
      queryClient.invalidateQueries(["adminPopups"]);
      queryClient.invalidateQueries(["activePopups"]);
    },
    onError: (error: any) => {
      handleError(error);
      alert(error?.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    },
  });

  const openNew = () => {
    if (draftUpload) deletePreviewImagesAPI(draftUpload).catch(() => undefined);
    setDraftUpload(null);
    setDraft(EMPTY_DRAFT);
    setEditing(null);
    setEditorOpen(true);
    setValidation("");
  };

  const openEdit = (popup: PopupItem) => {
    if (draftUpload) deletePreviewImagesAPI(draftUpload).catch(() => undefined);
    setDraftUpload(null);
    setEditing(popup);
    setDraft({
      target: popup.categoryCode ? "CATEGORY" : "CATEGORY_SELECTION",
      categoryCode: popup.categoryCode || "",
      title: popup.title,
      content: popup.content || "",
      imageFilename: popup.imageFilename,
      linkUrl: popup.linkUrl || "",
      sortOrder: String(popup.sortOrder),
      useYn: popup.useYn,
      startAt: toLocalDateTime(popup.startAt),
      endAt: toLocalDateTime(popup.endAt),
    });
    setEditorOpen(true);
    setValidation("");
  };

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setValidation("이미지 파일만 등록할 수 있습니다.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setValidation("이미지는 10MB 이하로 등록해 주세요.");
      return;
    }

    setUploading(true);
    setValidation("");
    try {
      const formData = new FormData();
      formData.append("files", file);
      const uploaded = await uploadImagesAPI(formData);
      const filename = uploaded?.[0]?.filename;
      if (!filename) throw new Error("업로드 결과에 파일명이 없습니다.");
      if (draftUpload)
        await deletePreviewImagesAPI(draftUpload).catch(() => undefined);
      setDraftUpload(filename);
      setDraft((current) => ({ ...current, imageFilename: filename }));
    } catch (error: any) {
      handleError(error);
      setValidation("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    if (draftUpload) deletePreviewImagesAPI(draftUpload).catch(() => undefined);
    setDraftUpload(null);
    setDraft((current) => ({ ...current, imageFilename: null }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidation("");
    const title = draft.title.trim();
    const sortOrder = Number(draft.sortOrder);
    if (!title) return setValidation("팝업 제목을 입력해 주세요.");
    if (draft.target === "CATEGORY" && !draft.categoryCode) {
      return setValidation("팝업을 노출할 카테고리를 선택해 주세요.");
    }
    if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 9999) {
      return setValidation(
        "노출 순서는 0부터 9999 사이의 정수로 입력해 주세요."
      );
    }
    if (
      draft.linkUrl &&
      !/^(https?:\/\/|\/(?!\/))/i.test(draft.linkUrl.trim())
    ) {
      return setValidation(
        "링크 URL은 / 내부경로 또는 http://, https://로 시작해 주세요."
      );
    }
    if (draft.startAt && draft.endAt && draft.endAt < draft.startAt) {
      return setValidation("종료 일시는 시작 일시보다 빠를 수 없습니다.");
    }

    saveMutation.mutate({
      title,
      content: draft.content.trim() || null,
      imageFilename: draft.imageFilename,
      linkUrl: draft.linkUrl.trim() || null,
      categoryCode: draft.target === "CATEGORY" ? draft.categoryCode : null,
      sortOrder,
      useYn: draft.useYn,
      startAt: toIsoDateTime(draft.startAt),
      endAt: toIsoDateTime(draft.endAt),
    });
  };

  return (
    <AdminLayout title="팝업 관리">
      <S.Page>
        <S.Toolbar>
          <div>
            <S.PageTitle>카테고리 화면 팝업</S.PageTitle>
            <S.Description>
              카테고리 선택 화면과 카테고리별 메인 화면에 노출할 팝업을
              관리합니다.
            </S.Description>
          </div>
          <S.PrimaryButton type="button" onClick={openNew}>
            + 팝업 등록
          </S.PrimaryButton>
        </S.Toolbar>

        <S.Workspace $editorOpen={editorOpen}>
          <S.ListPanel>
            <S.ListHeader>
              <strong>등록된 팝업</strong>
              <span>{popups.length}개</span>
            </S.ListHeader>
            {isLoading ? (
              <S.Empty>팝업 목록을 불러오는 중입니다.</S.Empty>
            ) : isError ? (
              <S.Error>팝업 목록을 불러오지 못했습니다.</S.Error>
            ) : popups.length === 0 ? (
              <S.Empty>
                <strong>아직 등록된 팝업이 없습니다.</strong>
                <span>팝업 등록 버튼으로 첫 팝업을 만들어 보세요.</span>
              </S.Empty>
            ) : (
              <S.PopupList>
                {popups.map((popup) => {
                  const status = getStatus(popup);
                  return (
                    <S.PopupCard
                      key={popup.oid}
                      $selected={editing?.oid === popup.oid}
                    >
                      <S.Thumbnail>
                        {popup.imageFilename ? (
                          // 관리자 썸네일은 업로드 원본 비율이 정해져 있지 않다.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${popup.imageFilename}`}
                            alt=""
                          />
                        ) : (
                          <span>TEXT</span>
                        )}
                      </S.Thumbnail>
                      <S.CardBody>
                        <S.CardTop>
                          <S.Status $tone={status.tone}>
                            {status.label}
                          </S.Status>
                          <S.Order>순서 {popup.sortOrder}</S.Order>
                        </S.CardTop>
                        <S.TargetBadge $category={!!popup.categoryCode}>
                          {popup.categoryCode ? "CATEGORY" : "SELECT"}
                          <span>{getCategoryLabel(popup.categoryCode)}</span>
                        </S.TargetBadge>
                        <S.CardTitle>{popup.title}</S.CardTitle>
                        <S.Period>
                          {formatDate(popup.startAt)} ~{" "}
                          {formatDate(popup.endAt)}
                        </S.Period>
                      </S.CardBody>
                      <S.CardActions>
                        <button type="button" onClick={() => openEdit(popup)}>
                          수정
                        </button>
                        <button
                          type="button"
                          className="danger"
                          disabled={deleteMutation.isLoading}
                          onClick={() => {
                            if (
                              window.confirm(
                                `‘${popup.title}’ 팝업을 삭제할까요?`
                              )
                            ) {
                              deleteMutation.mutate(popup.oid);
                            }
                          }}
                        >
                          삭제
                        </button>
                      </S.CardActions>
                    </S.PopupCard>
                  );
                })}
              </S.PopupList>
            )}
          </S.ListPanel>

          {editorOpen && (
            <S.EditorPanel>
              <S.EditorHeader>
                <div>
                  <span>{editing ? "EDIT POPUP" : "NEW POPUP"}</span>
                  <strong>{editing ? "팝업 수정" : "새 팝업 등록"}</strong>
                </div>
                <button
                  type="button"
                  aria-label="편집 닫기"
                  onClick={resetEditor}
                >
                  ×
                </button>
              </S.EditorHeader>
              <S.Form onSubmit={onSubmit}>
                <S.Field>
                  <label>
                    노출 위치 <em>*</em>
                  </label>
                  <S.TargetMode role="radiogroup" aria-label="팝업 노출 위치">
                    <S.TargetOption
                      type="button"
                      role="radio"
                      aria-checked={draft.target === "CATEGORY_SELECTION"}
                      $active={draft.target === "CATEGORY_SELECTION"}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          target: "CATEGORY_SELECTION",
                          categoryCode: "",
                        }))
                      }
                    >
                      <strong>카테고리 선택 화면</strong>
                      <span>/select/category</span>
                    </S.TargetOption>
                    <S.TargetOption
                      type="button"
                      role="radio"
                      aria-checked={draft.target === "CATEGORY"}
                      $active={draft.target === "CATEGORY"}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          target: "CATEGORY",
                        }))
                      }
                    >
                      <strong>특정 카테고리 메인</strong>
                      <span>/main</span>
                    </S.TargetOption>
                  </S.TargetMode>
                  <S.TargetHint>
                    {draft.target === "CATEGORY_SELECTION"
                      ? "기존처럼 카테고리를 고르기 전 화면에서 표시됩니다."
                      : "선택한 카테고리로 들어오거나 메뉴에서 전환할 때 표시됩니다."}
                  </S.TargetHint>
                </S.Field>

                {draft.target === "CATEGORY" && (
                  <AdminCategoryDrilldown
                    categories={categories}
                    value={draft.categoryCode || undefined}
                    allowAll
                    label="노출 카테고리"
                    onChange={(categoryCode) =>
                      setDraft((current) => ({
                        ...current,
                        categoryCode,
                      }))
                    }
                  />
                )}

                <S.Field>
                  <label htmlFor="popupTitle">
                    제목 <em>*</em>
                  </label>
                  <input
                    id="popupTitle"
                    maxLength={120}
                    value={draft.title}
                    placeholder="팝업 제목을 입력하세요"
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                  />
                </S.Field>

                <S.Field>
                  <label htmlFor="popupContent">안내 내용</label>
                  <textarea
                    id="popupContent"
                    maxLength={2000}
                    value={draft.content}
                    placeholder="줄바꿈을 포함해 안내 내용을 입력할 수 있습니다."
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                  />
                </S.Field>

                <S.Field>
                  <label>팝업 이미지</label>
                  {draft.imageFilename ? (
                    <S.ImagePreview>
                      {/* 업로드 원본 비율 그대로 확인하기 위한 관리자 미리보기 */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${draft.imageFilename}`}
                        alt="팝업 이미지 미리보기"
                      />
                      <button type="button" onClick={removeImage}>
                        이미지 제거
                      </button>
                    </S.ImagePreview>
                  ) : (
                    <S.UploadLabel $disabled={uploading}>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={onUpload}
                      />
                      <strong>
                        {uploading ? "이미지 처리 중..." : "이미지 선택"}
                      </strong>
                      <span>JPG, PNG 등 · 최대 10MB · 자동 WebP 변환</span>
                    </S.UploadLabel>
                  )}
                </S.Field>

                <S.Field>
                  <label htmlFor="popupLink">연결 링크</label>
                  <input
                    id="popupLink"
                    type="text"
                    value={draft.linkUrl}
                    placeholder="예: /self-registration 또는 https://example.com"
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        linkUrl: event.target.value,
                      }))
                    }
                  />
                  <small>
                    무료 등록 신청서는 <b>/self-registration</b>을 입력하세요.
                  </small>
                </S.Field>

                <S.FieldRow>
                  <S.Field>
                    <label htmlFor="popupOrder">노출 순서</label>
                    <input
                      id="popupOrder"
                      type="number"
                      min="0"
                      max="9999"
                      value={draft.sortOrder}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          sortOrder: event.target.value,
                        }))
                      }
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="popupUseYn">사용 여부</label>
                    <select
                      id="popupUseYn"
                      value={draft.useYn}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          useYn: event.target.value as "Y" | "N",
                        }))
                      }
                    >
                      <option value="Y">사용</option>
                      <option value="N">사용 안 함</option>
                    </select>
                  </S.Field>
                </S.FieldRow>

                <S.FieldRow>
                  <S.Field>
                    <label htmlFor="popupStart">노출 시작</label>
                    <input
                      id="popupStart"
                      type="datetime-local"
                      value={draft.startAt}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          startAt: event.target.value,
                        }))
                      }
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="popupEnd">노출 종료</label>
                    <input
                      id="popupEnd"
                      type="datetime-local"
                      value={draft.endAt}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          endAt: event.target.value,
                        }))
                      }
                    />
                  </S.Field>
                </S.FieldRow>
                <S.HelpText>
                  기간을 비워 두면 시작 또는 종료 제한 없이 노출됩니다.
                </S.HelpText>

                {validation && <S.Validation>{validation}</S.Validation>}
                <S.FormActions>
                  <S.SecondaryButton type="button" onClick={resetEditor}>
                    취소
                  </S.SecondaryButton>
                  <S.PrimaryButton
                    type="submit"
                    disabled={saveMutation.isLoading || uploading}
                  >
                    {saveMutation.isLoading
                      ? "저장 중..."
                      : editing
                        ? "수정 저장"
                        : "팝업 등록"}
                  </S.PrimaryButton>
                </S.FormActions>
              </S.Form>
            </S.EditorPanel>
          )}
        </S.Workspace>
      </S.Page>
    </AdminLayout>
  );
};
