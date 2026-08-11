import axiosInstance from "./index";

export interface Category {
  oid: string;
  name: string;
  sort: number;
  subCd: string;
  parentOid: string | null;
  /**
   * 사용여부. /code/sub/tree 를 cityCode 없이 부르면 전역 값(숨김 항목 포함)이 그대로 내려온다.
   * 지역 전용 카테고리는 전역 'N' + 그 지역 오버라이드만 'Y' 로 표현되므로 판별에 쓴다.
   */
  useYn: "Y" | "N";
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

/** 지역별 카테고리 노출 설정 원본 row 형태 (백엔드 응답) */
export interface CategoryCitySettingRow {
  categoryCode: string;
  name: string;
  parentCode: string | null;
  sort: number;
  useYn: string;
  overridden: boolean;
}

/** 지역별 카테고리 노출 설정 (화면용) */
export interface CategoryCitySetting {
  categoryCode: string;
  name: string;
  parentCode: string | null;
  /** 이 지역에서의 유효 순서 (오버라이드가 없으면 전역값) */
  sort: number;
  /** 이 지역에서의 유효 사용여부 (오버라이드가 없으면 전역값) */
  useYn: "Y" | "N";
  /** 이 지역 전용 설정이 실제로 저장돼 있는지 (전역값과 다를 수 있음을 표시) */
  overridden: boolean;
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
  useYn: row.useYn === "N" ? "N" : "Y",
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

const toCategoryCitySetting = (
  row: CategoryCitySettingRow
): CategoryCitySetting => ({
  categoryCode: row.categoryCode,
  name: row.name,
  parentCode: row.parentCode ?? null,
  sort: Number(row.sort ?? 0),
  useYn: row.useYn === "N" ? "N" : "Y",
  overridden: !!row.overridden,
});

/**
 * cityCode 는 값이 있을 때만 실어 보낸다.
 * 지역 미선택 구간에서 그대로 넘기면 `?cityCode=null` 이 나가 서버가 지역 필터를 걸어버린다.
 */
const withCityCode = (
  params: Record<string, any>,
  cityCode?: string | null
) => (cityCode ? { ...params, cityCode } : params);

/**
 * GET nav 카테고리 목록 불러오기 (관리자 공통코드 관리 목록에서도 동일 API 재사용)
 * queryKey: ["getCategoryNavApi", cityCode?] — cityCode 를 주면 그 지역의 노출 설정(숨김 제외 + 지역 순서)이 적용된다.
 */
export async function getCategoryNavApi({ queryKey }: any = {}): Promise<
  Category[]
> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", {
      params: withCityCode({ mainCd: CATEGORY_MAIN_CD }, queryKey?.[1]),
    })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/**
 * GET 특정 카테고리의 직계 하위 카테고리 목록 (공개)
 * 메인 화면에서 상위 카테고리 선택 시 하위 카테고리별 섹션을 구성할 때 사용한다.
 * queryKey: ["getCategoryChildrenApi", parentCode, cityCode?]
 */
export async function getCategoryChildrenApi({
  queryKey,
}: any): Promise<Category[]> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub", {
      params: withCityCode(
        { mainCd: CATEGORY_MAIN_CD, parentCode: queryKey[1] },
        queryKey?.[2]
      ),
    })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/**
 * GET 관리자 카테고리 계층 전체 조회
 * queryKey: ["getCategoryTreeApi", cityCode?] — cityCode 를 주면 지역 순서/사용여부가 반영되되 숨김 항목도 함께 내려온다.
 */
export async function getCategoryTreeApi({ queryKey }: any = {}): Promise<
  Category[]
> {
  const rows: CodeSubRow[] = await axiosInstance
    .get("/code/sub/tree", {
      params: withCityCode({ mainCd: CATEGORY_MAIN_CD }, queryKey?.[1]),
    })
    .then((res) => res.data);
  return rows.map(toCategory);
}

/**
 * GET 지역별 카테고리 노출 설정 목록 (관리자)
 * 오버라이드가 없는 카테고리도 전역값으로 채워져 전 카테고리가 내려온다.
 * queryKey: ["getCategoryCitySettingApi", cityCode]
 */
export async function getCategoryCitySettingApi({
  queryKey,
}: any): Promise<CategoryCitySetting[]> {
  const rows: CategoryCitySettingRow[] = await axiosInstance
    .get("/code/category-city", { params: { cityCode: queryKey[1] } })
    .then((res) => res.data);
  return rows.map(toCategoryCitySetting);
}

/**
 * PUT 지역별 카테고리 노출 설정 저장 (관리자)
 * 해당 지역 전량 재작성이므로 보낸 목록에 없는 카테고리는 전역값으로 되돌아간다 — 항상 전체 목록을 보낸다.
 * name 은 code_sub.sub_nm 갱신용이며 전역값이라 전 지역에 반영된다. 미전달 시 이름은 건드리지 않는다.
 */
export function updateCategoryCitySettingApi(data: {
  cityCode: string;
  items: {
    categoryCode: string;
    name?: string;
    sort: number;
    useYn: "Y" | "N";
  }[];
}): Promise<CategoryCitySetting[]> {
  return axiosInstance
    .put("/code/category-city", data)
    .then((res) =>
      (res.data as CategoryCitySettingRow[]).map(toCategoryCitySetting)
    );
}

/** DELETE 지역별 카테고리 노출 설정 초기화 (관리자) — 해당 지역이 전역 설정으로 복귀한다 */
export function resetCategoryCitySettingApi(cityCode: string) {
  return axiosInstance
    .delete("/code/category-city", { params: { cityCode } })
    .then((res) => res.data);
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

/**
 * POST 카테고리 생성 (관리자)
 * cityCode 를 주면 "그 지역 전용" 카테고리로 생성된다 — 서버가 code_sub 를 전역 숨김(use_yn='N')으로
 * 만들고 해당 지역의 오버라이드만 'Y' 로 넣는다. 미전달 시에는 기존과 같은 전역 생성이다.
 */
export function createCategoryApi(data: {
  name: string;
  parentCode?: string;
  cityCode?: string;
}) {
  return axiosInstance
    .post("/code/sub", {
      mainCd: CATEGORY_MAIN_CD,
      name: data.name,
      parentCode: data.parentCode,
      ...(data.cityCode !== undefined && { cityCode: data.cityCode }),
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
