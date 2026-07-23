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
