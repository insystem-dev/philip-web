import { atom } from "recoil";
import { v1 } from "uuid";

// recoil을 사용할 때 발생하는 고질적 문제 v1 해결
export const cityState = atom({
  key: `cityState/${v1()}`,
  default:
    typeof window !== "undefined" ? window.localStorage.getItem("city") : null,
});
