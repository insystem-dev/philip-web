import axiosInstance from "./index";

export interface Category {
  oid: string;
  name: string;
  sort: number;
  created_at: string;
  updated_at: string | null;
}

export interface CitySub {
  oid: string;
  name: string;
  name_eng: string;
  disabled: boolean;
  sort: number;
}

/** 공통코드(code_sub) 원본 row 형태 (백엔드 응답) */
interface CodeSubRow {
  mainCd: string;
  subCd: string;
  subNm: string;
  code: string;
  mngCd1: string | null;
  mngCd2: string | null;
  sort: number;
  useYn: string;
  createdAt: string;
  updatedAt: string | null;
}

const CATEGORY_MAIN_CD = "CATEGORY";
const CITY_MAIN_CD = "CITY";
const CONTACT_MAIN_CD = "CONTACT";
const CONTACT_PHONE_CODE = "CONTACT-PHONE";

const toCategory = (row: CodeSubRow): Category => ({
  oid: row.code,
  name: row.subNm,
  sort: row.sort,
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});

const toCity = (row: CodeSubRow): CitySub => ({
  oid: row.code,
  name: row.subNm,
  name_eng: row.mngCd1 ?? "",
  disabled: row.useYn === "N",
  sort: row.sort,
});

/** GET nav 카테고리 목록 불러오기 (관리자 공통코드 관리 목록에서도 동일 API 재사용) */
export async function getCategoryNavApi(): Promise<Category[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", { params: { mainCd: CATEGORY_MAIN_CD } })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/** GET City 목록 불러오기 */
export async function getCityListApi(): Promise<CitySub[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", { params: { mainCd: CITY_MAIN_CD } })
    .then((res) => res.data);
  return rows.map(toCity);
}

/** POST 카테고리 생성 (관리자) */
export function createCategoryApi(data: { name: string }) {
  return axiosInstance
    .post("/code/sub", { mainCd: CATEGORY_MAIN_CD, name: data.name })
    .then((res) => toCategory(res.data));
}

/** PATCH 카테고리 노출 순서(sort) 변경 (관리자) */
export function updateCategorySortApi(data: { oid: string; sort: number }) {
  return axiosInstance
    .patch(`/code/sub/${data.oid}`, { sort: data.sort })
    .then((res) => toCategory(res.data));
}

/** POST 지역 생성 (관리자) */
export function createCityApi(data: { name: string }) {
  return axiosInstance
    .post("/code/sub", { mainCd: CITY_MAIN_CD, name: data.name })
    .then((res) => toCity(res.data));
}

/** PATCH 지역 수정 — 이름/순서/사용여부(활성화)/영문명 (관리자) */
export function updateCitySubApi(data: {
  oid: string;
  name?: string;
  sort?: number;
  disabled?: boolean;
  name_eng?: string;
}) {
  return axiosInstance
    .patch(`/code/sub/${data.oid}`, {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.sort !== undefined && { sort: data.sort }),
      ...(data.disabled !== undefined && {
        useYn: data.disabled ? "N" : "Y",
      }),
      ...(data.name_eng !== undefined && { mngCd1: data.name_eng }),
    })
    .then((res) => toCity(res.data));
}

/** DELETE 카테고리 삭제 (관리자) */
export function deleteCategoryApi(oid: string) {
  return axiosInstance.delete(`/code/sub/${oid}`).then((res) => res.data);
}

/** DELETE 지역 삭제 (관리자) */
export function deleteCityApi(oid: string) {
  return axiosInstance.delete(`/code/sub/${oid}`).then((res) => res.data);
}

/** GET 1:1 문의 전화번호 조회 */
export async function getContactPhoneApi(): Promise<string> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", { params: { mainCd: CONTACT_MAIN_CD } })
    .then((res) => res.data);
  return rows[0]?.subNm ?? "";
}

/** PATCH 1:1 문의 전화번호 변경 (관리자) */
export function updateContactPhoneApi(phone: string) {
  return axiosInstance
    .patch(`/code/sub/${CONTACT_PHONE_CODE}`, { name: phone })
    .then((res) => res.data.subNm as string);
}
