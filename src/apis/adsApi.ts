import axiosInstance from "./index";

/** 배너 노출 범위 — 메인 페이지 배너 / 전체 카테고리 배너 */
export type AdsScope = "main" | "category";

/**
 * 범위별 배너 노출 설정.
 * 값이 없거나 미설정이면 서버가 'N'(숨김)을 내려준다 — 켜는 것은 관리자의 명시적 행동이어야 한다.
 */
export interface AdsSettings {
  main: "Y" | "N";
  category: "Y" | "N";
}

/**
 * GET /admin/ads 가 내려주는 광고 행 (서버 select 목록과 1:1).
 * 화면 대부분은 아직 any 로 다루지만, 새로 쓰는 곳은 이 타입으로 좁혀
 * 'Y'/'N' 자리에 boolean 이 섞이는 실수를 컴파일러가 잡게 한다.
 */
export interface AdsRow {
  oid: string;
  label: string;
  filename: string;
  /** 메인 배너가 노출될 카테고리 코드 (전체 카테고리는 과거 데이터에서 null) */
  adCategoryCode: string | null;
  /** 배너가 노출될 지역 코드 (배너는 지역 전용) */
  adCityCode: string | null;
  adLinkPostOid: string | null;
  adLinkUrl: string | null;
}

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

/**
 * GET 광고 배너 목록
 * queryKey: ["getAdsData", cityCode]
 *
 * cityCode 를 주면 서버가 해당 지역 + 전 지역("CITY-ALL"/NULL) 배너만 내려준다 (유저 화면).
 * 미지정이면 전체를 내려준다 — 관리자 화면은 전체를 받아 클라이언트에서 지역을 거른다.
 */
export function getAdsData({ queryKey }: any = {}) {
  const cityCode = queryKey?.[1];
  return axiosInstance
    .get("/admin/ads", { params: cityCode ? { cityCode } : undefined })
    .then((response) => response.data);
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

/**
 * GET 범위별 배너 노출 설정
 * queryKey: ["getAdsSettings"]
 *
 * 유저 화면(비로그인 포함)도 호출하는 공개 조회다 — 배너를 그리기 전에 이 값으로 노출 여부를 판단한다.
 */
export function getAdsSettingsApi() {
  return axiosInstance
    .get<AdsSettings>("/admin/ads/settings")
    .then((response) => response.data);
}

/**
 * PUT 범위별 배너 노출 on/off (관리자)
 * 이미지를 지우지 않고 그 범위의 배너 영역 자체를 유저 화면에서 감춘다.
 * (완전히 지우는 것은 deleteAllAdsApi / deleteOneAdsApi)
 */
export function updateAdsSettingApi(scope: AdsScope, useYn: "Y" | "N") {
  return axiosInstance
    .put<AdsSettings>("/admin/ads/settings", { scope, useYn })
    .then((response) => response.data);
}

/** DELETE 범위 삭제 — cityCode 를 함께 보내야 다른 지역 배너가 지워지지 않는다 */
export function deleteAllAdsApi(data: {
  scope: "main" | "category";
  categoryCode?: string;
  cityCode?: string;
}) {
  return axiosInstance.delete("/admin/ads", { params: data });
}

export function deleteOneAdsApi(id: string) {
  return axiosInstance.delete(`/admin/ads/${id}`);
}
