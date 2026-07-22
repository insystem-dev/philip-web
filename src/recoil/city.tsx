import { atom } from "recoil";

// 고정 key 사용 (uuid 기반 key는 리렌더/HMR 시 atom 중복 등록 문제 발생)
export const cityState = atom({
  key: "cityState",
  default:
    typeof window !== "undefined" ? window.localStorage.getItem("city") : null,
});
