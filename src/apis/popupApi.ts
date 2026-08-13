import axiosInstance from "./index";

export interface PopupItem {
  oid: string;
  title: string;
  content: string | null;
  imageFilename: string | null;
  linkUrl: string | null;
  sortOrder: number;
  useYn: "Y" | "N";
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

export function getActivePopupsApi() {
  return axiosInstance
    .get<PopupItem[]>("/admin/popups/active")
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
