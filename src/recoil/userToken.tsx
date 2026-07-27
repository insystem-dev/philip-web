import { atom } from "recoil";

export const userTokenState = atom<string | null>({
  // 고정 key 사용 (uuid 기반 key는 리렌더/HMR 시 atom 중복 등록 문제 발생)
  key: "userTokenState",
  default: null,
});
