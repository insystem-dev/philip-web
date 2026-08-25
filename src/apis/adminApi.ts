import axiosInstance from "./index";

/** POST 회원가입  */
export function signUpAPI(data: {
  adminId: string;
  password: string;
  name: string;
  birth: string;
}) {
  return axiosInstance
    .post("/admin/signup", data)
    .then((response) => response.data);
}

export interface CreateAdminAccountPayload {
  adminId: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

/** SUPER 관리자 전용 ADMIN 계정 생성 */
export function createAdminAccountAPI(data: CreateAdminAccountPayload) {
  return axiosInstance
    .post("/admin/accounts", data)
    .then((response) => response.data);
}

/** SUPER 관리자 전용 ADMIN 비밀번호 변경 */
export function changeAdminPasswordAPI(
  oid: string,
  data: { password: string; passwordConfirm: string }
) {
  return axiosInstance
    .put(`/admin/accounts/${oid}/password`, data)
    .then((response) => response.data);
}

/** POST 로그인 */
export function logInAPI(data: { adminId: string; password: string }) {
  return axiosInstance
    .post("/admin/signin", data)
    .then((response) => response.data);
}

export function getAdminList({ queryKey }: any) {
  return axiosInstance
    .get(`/admin/list?search=${queryKey[1]}`)
    .then((response) => response.data);
}

export function todayVisitAPI() {
  return axiosInstance.get("/admin/visit").then((response) => response.data);
}

export type VisitDisplayMode = "actual" | "manual";

export interface VisitDisplaySetting {
  visitDate: string;
  actualCount: number;
  displayMode: VisitDisplayMode;
  manualCount: number | null;
  displayCount: number;
  updatedAt: string | null;
}

/** 오늘 방문자 수의 실제 집계값과 노출 설정 조회 */
export function getVisitDisplaySetting() {
  return axiosInstance
    .get<VisitDisplaySetting>("/admin/visit-setting")
    .then((response) => response.data);
}

/** 오늘 방문자 수 노출 설정 저장 */
export function updateVisitDisplaySetting(data: {
  mode: VisitDisplayMode;
  count?: number;
}) {
  return axiosInstance
    .put<VisitDisplaySetting>("/admin/visit-setting", data)
    .then((response) => response.data);
}

export interface MaintenanceState {
  enabled: boolean;
}

/** 점검 모드 상태 조회 (관리자 공통) */
export function getMaintenanceApi() {
  return axiosInstance
    .get<MaintenanceState>("/admin/maintenance")
    .then((response) => response.data);
}

/** 점검 모드 on/off (SUPER 전용) */
export function updateMaintenanceApi(enabled: boolean) {
  return axiosInstance
    .put<MaintenanceState>("/admin/maintenance", { enabled })
    .then((response) => response.data);
}

export function changeAdminRoleAPI(data: Object) {
  return axiosInstance
    .put("/admin/role", data)
    .then((response) => response.data);
}

export function checkDuplicateId(data: Object) {
  return axiosInstance
    .post("/admin/check", data)
    .then((response) => response.data);
}
