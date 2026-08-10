import axiosInstance from "./index";

export interface Category {
  oid: string;
  name: string;
  sort: number;
  subCd: string;
  parentOid: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CitySub {
  oid: string;
  name: string;
  name_eng: string;
  disabled: boolean;
  sort: number;
  subCd: string;
  parentOid: string | null;
}

/** 공통코드(code_sub) 원본 row 형태 (백엔드 응답) */
export interface CodeSubRow {
  mainCd: string;
  subCd: string;
  subNm: string;
  code: string;
  parentCode: string | null;
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
const CONTACT_KAKAO_CODE = "CONTACT-KAKAO";

const toCategory = (row: CodeSubRow): Category => ({
  oid: row.code,
  name: row.subNm,
  sort: row.sort,
  subCd: row.subCd,
  parentOid: row.parentCode,
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});

const toCity = (row: CodeSubRow): CitySub => ({
  oid: row.code,
  name: row.subNm,
  name_eng: row.mngCd1 ?? "",
  disabled: row.useYn === "N",
  sort: row.sort,
  subCd: row.subCd,
  parentOid: row.parentCode,
});

/** GET nav 카테고리 목록 불러오기 (관리자 공통코드 관리 목록에서도 동일 API 재사용) */
export async function getCategoryNavApi(): Promise<Category[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", { params: { mainCd: CATEGORY_MAIN_CD } })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/**
 * GET 특정 카테고리의 직계 하위 카테고리 목록 (공개)
 * 메인 화면에서 상위 카테고리 선택 시 하위 카테고리별 섹션을 구성할 때 사용한다.
 * queryKey: ["getCategoryChildrenApi", parentCode]
 */
export async function getCategoryChildrenApi({
  queryKey,
}: any): Promise<Category[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", {
      params: { mainCd: CATEGORY_MAIN_CD, parentCode: queryKey[1] },
    })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/** GET 관리자 카테고리 계층 전체 조회 */
export async function getCategoryTreeApi(): Promise<Category[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub/tree", { params: { mainCd: CATEGORY_MAIN_CD } })
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

/** GET 관리자 지역 계층 전체 조회 */
export async function getCityTreeApi(): Promise<CitySub[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub/tree", { params: { mainCd: CITY_MAIN_CD } })
    .then((res) => res.data);
  return rows.map(toCity);
}

/** POST 카테고리 생성 (관리자) */
export function createCategoryApi(data: { name: string; parentCode?: string }) {
  return axiosInstance
    .post("/code/sub", {
      mainCd: CATEGORY_MAIN_CD,
      name: data.name,
      parentCode: data.parentCode,
    })
    .then((res) => toCategory(res.data));
}

/** PATCH 카테고리 이름/노출 순서 변경 (관리자) */
export function updateCategorySortApi(data: {
  oid: string;
  sort?: number;
  name?: string;
}) {
  return axiosInstance
    .patch(`/code/sub/${data.oid}`, {
      ...(data.sort !== undefined && { sort: data.sort }),
      ...(data.name !== undefined && { name: data.name }),
    })
    .then((res) => toCategory(res.data));
}

/** POST 지역 생성 (관리자) */
export function createCityApi(data: { name: string; parentCode?: string }) {
  return axiosInstance
    .post("/code/sub", {
      mainCd: CITY_MAIN_CD,
      name: data.name,
      parentCode: data.parentCode,
    })
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
  return rows.find((row) => row.code === CONTACT_PHONE_CODE)?.subNm ?? "";
}

/** GET 카카오톡 문의 아이디 조회 */
export async function getContactKakaoApi(): Promise<string> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", { params: { mainCd: CONTACT_MAIN_CD } })
    .then((res) => res.data);
  return rows.find((row) => row.code === CONTACT_KAKAO_CODE)?.subNm ?? "";
}

/** PATCH 1:1 문의 전화번호 변경 (관리자) */
export function updateContactPhoneApi(phone: string) {
  return axiosInstance
    .patch(`/code/sub/${CONTACT_PHONE_CODE}`, { name: phone })
    .then((res) => res.data.subNm as string);
}

/** PATCH 카카오톡 문의 아이디 변경 (관리자) */
export function updateContactKakaoApi(kakaoId: string) {
  return axiosInstance
    .patch(`/code/sub/${CONTACT_KAKAO_CODE}`, { name: kakaoId })
    .then((res) => res.data.subNm as string);
}
