import axiosInstance from "./index";

export interface EventPost {
  oid: string;
  postOid: string;
  title: string;
  benefit: string;
  startDate: string;
  endDate: string;
  storeName: string;
  category?: string | null;
  thumb?: string | null;
}

/** QR 이벤트 페이지 전용 회원 프로모션 목록 */
export function getMonthlyEventPosts({ queryKey }: any) {
  return axiosInstance
    .get<EventPost[]>("/events/monthly", {
      params: { locale: queryKey[1] ?? "ko" },
    })
    .then((response) => response.data);
}

export interface AdminEventItem extends EventPost {
  sortOrder: number;
  useYn: "Y" | "N";
  createdAt: string;
  updatedAt: string;
}

export interface EventStoreOption {
  oid: string;
  storeName: string;
  category: string | null;
  city: string | null;
}

export interface SaveEventPayload {
  postOid: string;
  title: string;
  benefit: string;
  startDate: string;
  endDate: string;
  sortOrder: number;
  useYn: "Y" | "N";
}

export const getAdminEventsApi = () =>
  axiosInstance
    .get<AdminEventItem[]>("/admin/events")
    .then((response) => response.data);

export const getEventStoresApi = () =>
  axiosInstance
    .get<EventStoreOption[]>("/admin/events/stores")
    .then((response) => response.data);

export const createEventApi = (data: SaveEventPayload) =>
  axiosInstance
    .post<AdminEventItem>("/admin/events", data)
    .then((response) => response.data);

export const updateEventApi = (oid: string, data: SaveEventPayload) =>
  axiosInstance
    .put<AdminEventItem>(`/admin/events/${oid}`, data)
    .then((response) => response.data);

export const deleteEventApi = (oid: string) =>
  axiosInstance.delete(`/admin/events/${oid}`);
