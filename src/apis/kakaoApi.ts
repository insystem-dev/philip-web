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

/** 서버 LocalSignupDto 와 동일한 회원가입 요청 body */
export interface LocalSignupBody {
  userId: string;
  password: string;
  /** 서버에서도 password 와 일치하는지 재확인한다 (필수) */
  passwordConfirm: string;
  name: string;
  /** 숫자 또는 010-1234-5678 형식. 서버가 숫자만 남겨 저장한다 */
  phoneNumber: string;
  /** 선택 항목 — 비어 있으면 아예 보내지 않는다 */
  email?: string;
  termsAgreed: boolean;
}

export const checkUserIdAPI = (userId: string) =>
  axiosInstance.post("/user/check-id", { userId }).then((res) => res.data);
export const localSignupAPI = (data: LocalSignupBody) =>
  axiosInstance.post("/user/signup", data).then((res) => res.data);
export const localSigninAPI = (data: { userId: string; password: string }) =>
  axiosInstance.post("/user/signin", data).then((res) => res.data);
