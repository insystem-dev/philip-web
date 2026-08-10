import axiosInstance from "./index";

/** 배너 연결 대상 입력값 (등록 업체 or 외부 URL 중 하나만 사용) */
export interface AdsLink {
  /** 연결할 업체 게시물 oid */
  postOid: string | null;
  /** 외부 URL */
  url: string;
  /** 외부 URL 사용 여부 (false면 업체 연결) */
  isExternal: boolean;
}

export function addAdsApi(data: Object) {
  return axiosInstance
    .post("/admin/ads", data)
    .then((response) => response.data);
}

export function getAdsData() {
  return axiosInstance.get("/admin/ads").then((response) => response.data);
}

/** PUT 배너 연결 대상(업체 or 외부 URL) 변경 */
export function updateAdsLinkApi(
  oid: string,
  data: { adLinkPostOid: string | null; adLinkUrl: string | null }
) {
  return axiosInstance
    .put(`/admin/ads/${oid}/link`, data)
    .then((response) => response.data);
}

export function deleteAllAdsApi(data: { scope: "main" | "category"; categoryCode?: string }) {
  return axiosInstance.delete("/admin/ads", { params: data });
}

export function deleteOneAdsApi(id: string) {
  return axiosInstance.delete(`/admin/ads/${id}`);
}
