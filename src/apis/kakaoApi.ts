import axiosInstance from "./index";

export function kakaoLoginAPI(code: any) {
  return axiosInstance
    .post("/user/kakao", { authCode: code })
    .then((response) => response.data);
}

export function getKakaoUserList({ queryKey }: any) {
  return axiosInstance
    .get(`/user/kakao?search=${queryKey[1]}`)
    .then((response) => response.data);
}

export function changeUserRoleAPI(data: Object) {
  return axiosInstance
    .put("/user/role", data)
    .then((response) => response.data);
}

export const checkUserIdAPI = (userId: string) =>
  axiosInstance.post("/user/check-id", { userId }).then((res) => res.data);
export const localSignupAPI = (data: Object) =>
  axiosInstance.post("/user/signup", data).then((res) => res.data);
export const localSigninAPI = (data: { userId: string; password: string }) =>
  axiosInstance.post("/user/signin", data).then((res) => res.data);
