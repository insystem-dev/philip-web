import { atom } from "recoil";

export const categoryAll = "fb673f00-c152-11ed-8fb3-59762efda8c3";
// 고정 key 사용 (uuid 기반 key는 리렌더/HMR 시 atom 중복 등록 문제 발생)
export const categoryState = atom({
  key: "categoryState",
  default: categoryAll,
});
