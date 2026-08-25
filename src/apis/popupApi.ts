import axiosInstance from "./index";

export interface PopupItem {
  oid: string;
  title: string;
  content: string | null;
  imageFilename: string | null;
  linkUrl: string | null;
  /** null이면 카테고리 선택 화면, 값이 있으면 해당 카테고리 메인 화면 */
  categoryCode: string | null;
  sortOrder: number;
  useYn: "Y" | "N";
  /** 사용자 팝업에 '오늘 하루 보지 않기' 버튼을 표시할지 여부 */
  showTodayHideYn: "Y" | "N";
  startAt: string | null;
  endAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PopupPayload = Omit<PopupItem, "oid" | "createdAt" | "updatedAt">;

export function getPopupsApi() {
  return axiosInstance
    .get<PopupItem[]>("/admin/popups")
    .then((response) => response.data);
}

export function getActivePopupsApi(categoryCode?: string) {
  return axiosInstance
    .get<PopupItem[]>("/admin/popups/active", {
      params: categoryCode ? { categoryCode } : undefined,
    })
    .then((response) => response.data);
}

export function createPopupApi(data: PopupPayload) {
  return axiosInstance
    .post<PopupItem>("/admin/popups", data)
    .then((response) => response.data);
}

export function updatePopupApi(oid: string, data: PopupPayload) {
  return axiosInstance
    .put<PopupItem>(`/admin/popups/${oid}`, data)
    .then((response) => response.data);
}

export function deletePopupApi(oid: string) {
  return axiosInstance.delete(`/admin/popups/${oid}`);
}
