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

export function changeAdminRoleAPI(data: Object) {
  return axiosInstance
    .put("/admin/role", data)
    .then((response) => response.data);
}

export function checkDuplicateId(data: Object) {
  console.log(data);
  return axiosInstance
    .post("/admin/check", data)
    .then((response) => response.data);
}
