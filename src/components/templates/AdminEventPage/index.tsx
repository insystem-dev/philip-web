import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AdminEventItem,
  createEventApi,
  deleteEventApi,
  getAdminEventsApi,
  getEventStoresApi,
  SaveEventPayload,
  updateEventApi,
} from "@/apis/eventApi";
import useApiError from "@/lib/hooks/useApiError";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { Button } from "@/components/atoms/Button";
import * as S from "./adminEventPage.style";

const getPhilippineDate = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
};

const getMonthEnd = (date: string) => {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
};

interface Draft {
  postOid: string;
  title: string;
  benefit: string;
  startDate: string;
  endDate: string;
  sortOrder: string;
  useYn: "Y" | "N";
}

const emptyDraft = (): Draft => {
  const startDate = getPhilippineDate();
  return {
    postOid: "",
    title: "",
    benefit: "",
    startDate,
    endDate: getMonthEnd(startDate),
    sortOrder: "0",
    useYn: "Y",
  };
};

const getStatus = (event: AdminEventItem) => {
  if (event.useYn === "N") return { label: "사용 안 함", tone: "off" as const };
  const today = getPhilippineDate();
  if (event.startDate > today)
    return { label: "노출 예정", tone: "scheduled" as const };
  if (event.endDate < today) return { label: "종료", tone: "ended" as const };
  return { label: "노출 중", tone: "active" as const };
};

export const AdminEventPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [editing, setEditing] = useState<AdminEventItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [validation, setValidation] = useState("");

  const { data: events = [], isLoading } = useQuery(
    ["adminMemberEvents"],
    getAdminEventsApi,
    { onError: (error: any) => handleError(error) }
  );
  const { data: stores = [] } = useQuery(
    ["adminMemberEventStores"],
    getEventStoresApi,
    { onError: (error: any) => handleError(error) }
  );

  const storeByOid = useMemo(
    () => new Map(stores.map((store) => [store.oid, store])),
    [stores]
  );

  const closeEditor = () => {
    setEditing(null);
    setDraft(emptyDraft());
    setEditorOpen(false);
    setValidation("");
  };

  const refresh = () => {
    queryClient.invalidateQueries(["adminMemberEvents"]);
    queryClient.invalidateQueries(["monthlyMemberEvents"]);
  };

  const saveMutation = useMutation(
    (payload: SaveEventPayload) =>
      editing ? updateEventApi(editing.oid, payload) : createEventApi(payload),
    {
      onSuccess: () => {
        refresh();
        alert(
          editing ? "이벤트가 수정되었습니다." : "이벤트가 등록되었습니다."
        );
        closeEditor();
      },
      onError: (error: any) => {
        handleError(error);
        setValidation(error?.response?.data?.message || "저장하지 못했습니다.");
      },
    }
  );

  const deleteMutation = useMutation(deleteEventApi, {
    onSuccess: () => {
      refresh();
      closeEditor();
    },
    onError: (error: any) => handleError(error),
  });

  const openNew = () => {
    setEditing(null);
    setDraft(emptyDraft());
    setValidation("");
    setEditorOpen(true);
  };

  const openEdit = (event: AdminEventItem) => {
    setEditing(event);
    setDraft({
      postOid: event.postOid,
      title: event.title,
      benefit: event.benefit,
      startDate: event.startDate,
      endDate: event.endDate,
      sortOrder: String(event.sortOrder),
      useYn: event.useYn,
    });
    setValidation("");
    setEditorOpen(true);
  };

  const submit = (submitEvent: FormEvent) => {
    submitEvent.preventDefault();
    setValidation("");
    const sortOrder = Number(draft.sortOrder);
    if (!draft.postOid) return setValidation("대상 업체를 선택해 주세요.");
    if (!draft.title.trim())
      return setValidation("이벤트 제목을 입력해 주세요.");
    if (!draft.benefit.trim())
      return setValidation("할인·혜택 내용을 입력해 주세요.");
    if (!draft.startDate || !draft.endDate)
      return setValidation("이벤트 기간을 입력해 주세요.");
    if (draft.endDate < draft.startDate)
      return setValidation("종료일은 시작일보다 빠를 수 없습니다.");
    if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 9999) {
      return setValidation("노출 순서는 0~9999 사이의 정수여야 합니다.");
    }
    saveMutation.mutate({
      ...draft,
      title: draft.title.trim(),
      benefit: draft.benefit.trim(),
      sortOrder,
    });
  };

  return (
    <AdminLayout
      title="이벤트 관리"
      titleActions={
        <Button
          type="button"
          width="90px"
          height={32}
          color="primary"
          layout="solid"
          label="신규등록"
          onClick={openNew}
        />
      }
    >
      <S.Page>
        <S.Description>
          QR 이벤트 페이지에 노출할 업체 할인과 프로모션을 관리합니다.
        </S.Description>

        <S.Workspace $editorOpen={editorOpen}>
          <S.ListPanel>
            <S.ListHeader>
              <strong>등록된 이벤트</strong>
              <span>{events.length}개</span>
            </S.ListHeader>
            {isLoading ? (
              <S.Empty>이벤트 목록을 불러오는 중입니다.</S.Empty>
            ) : events.length === 0 ? (
              <S.Empty>
                <strong>등록된 이벤트가 없습니다.</strong>
                <span>이벤트 등록 버튼으로 첫 혜택을 등록해 보세요.</span>
              </S.Empty>
            ) : (
              <S.EventList>
                {events.map((event) => {
                  const status = getStatus(event);
                  return (
                    <S.EventCard
                      key={event.oid}
                      $selected={editing?.oid === event.oid}
                    >
                      <S.CardBody>
                        <S.CardMeta>
                          <S.Status $tone={status.tone}>
                            {status.label}
                          </S.Status>
                          <span>순서 {event.sortOrder}</span>
                        </S.CardMeta>
                        <h3>{event.title}</h3>
                        <strong>{event.storeName}</strong>
                        <p>{event.benefit}</p>
                        <small>
                          {event.startDate} ~ {event.endDate}
                        </small>
                      </S.CardBody>
                      <S.Actions>
                        <button type="button" onClick={() => openEdit(event)}>
                          수정
                        </button>
                        <button
                          type="button"
                          className="danger"
                          onClick={() => {
                            if (
                              window.confirm(
                                `‘${event.title}’ 이벤트를 삭제할까요?`
                              )
                            )
                              deleteMutation.mutate(event.oid);
                          }}
                        >
                          삭제
                        </button>
                      </S.Actions>
                    </S.EventCard>
                  );
                })}
              </S.EventList>
            )}
          </S.ListPanel>

          {editorOpen && (
            <S.EditorPanel>
              <S.EditorHeader>
                <div>
                  <span>{editing ? "EDIT EVENT" : "NEW EVENT"}</span>
                  <strong>{editing ? "이벤트 수정" : "새 이벤트 등록"}</strong>
                </div>
                <button type="button" onClick={closeEditor}>
                  ×
                </button>
              </S.EditorHeader>
              <S.Form onSubmit={submit}>
                <S.Field>
                  <label htmlFor="eventStore">
                    대상 업체 <em>*</em>
                  </label>
                  <select
                    id="eventStore"
                    value={draft.postOid}
                    onChange={(e) =>
                      setDraft((v) => ({ ...v, postOid: e.target.value }))
                    }
                  >
                    <option value="">업체를 선택하세요</option>
                    {stores.map((store) => (
                      <option key={store.oid} value={store.oid}>
                        {store.storeName} (
                        {[store.city, store.category]
                          .filter(Boolean)
                          .join(" / ")}
                        )
                      </option>
                    ))}
                  </select>
                </S.Field>
                {draft.postOid && (
                  <S.StoreHint>
                    {storeByOid.get(draft.postOid)?.storeName}의 기존 썸네일이
                    이벤트 대표 이미지로 사용됩니다.
                  </S.StoreHint>
                )}
                <S.Field>
                  <label htmlFor="eventTitle">
                    이벤트 제목 <em>*</em>
                  </label>
                  <input
                    id="eventTitle"
                    maxLength={160}
                    value={draft.title}
                    placeholder="예: 10월 회원 20% 할인"
                    onChange={(e) =>
                      setDraft((v) => ({ ...v, title: e.target.value }))
                    }
                  />
                </S.Field>
                <S.Field>
                  <label htmlFor="eventBenefit">
                    할인·혜택 내용 <em>*</em>
                  </label>
                  <textarea
                    id="eventBenefit"
                    maxLength={3000}
                    value={draft.benefit}
                    placeholder="회원에게 제공할 혜택과 이용 조건을 입력하세요."
                    onChange={(e) =>
                      setDraft((v) => ({ ...v, benefit: e.target.value }))
                    }
                  />
                </S.Field>
                <S.DateRow>
                  <S.Field>
                    <label htmlFor="eventStart">
                      시작일 <em>*</em>
                    </label>
                    <input
                      id="eventStart"
                      type="date"
                      value={draft.startDate}
                      onChange={(e) =>
                        setDraft((v) => ({ ...v, startDate: e.target.value }))
                      }
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="eventEnd">
                      종료일 <em>*</em>
                    </label>
                    <input
                      id="eventEnd"
                      type="date"
                      value={draft.endDate}
                      onChange={(e) =>
                        setDraft((v) => ({ ...v, endDate: e.target.value }))
                      }
                    />
                  </S.Field>
                </S.DateRow>
                <S.DateRow>
                  <S.Field>
                    <label htmlFor="eventOrder">노출 순서</label>
                    <input
                      id="eventOrder"
                      type="number"
                      min="0"
                      max="9999"
                      value={draft.sortOrder}
                      onChange={(e) =>
                        setDraft((v) => ({ ...v, sortOrder: e.target.value }))
                      }
                    />
                  </S.Field>
                  <S.Field>
                    <label htmlFor="eventUse">사용 여부</label>
                    <select
                      id="eventUse"
                      value={draft.useYn}
                      onChange={(e) =>
                        setDraft((v) => ({
                          ...v,
                          useYn: e.target.value as "Y" | "N",
                        }))
                      }
                    >
                      <option value="Y">사용</option>
                      <option value="N">사용 안 함</option>
                    </select>
                  </S.Field>
                </S.DateRow>
                {validation && <S.Validation>{validation}</S.Validation>}
                <S.FormActions>
                  <button type="button" onClick={closeEditor}>
                    취소
                  </button>
                  <S.PrimaryButton
                    type="submit"
                    disabled={saveMutation.isLoading}
                  >
                    {saveMutation.isLoading
                      ? "저장 중..."
                      : editing
                        ? "수정 저장"
                        : "이벤트 등록"}
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
