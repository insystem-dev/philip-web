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
