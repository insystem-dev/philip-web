import { atom } from "recoil";
import { v1 } from "uuid";

export const categoryAll = "fb673f00-c152-11ed-8fb3-59762efda8c3";
// recoil을 사용할 때 발생하는 고질적 문제 v1 해결
export const categoryState = atom({
  key: `categoryState/${v1()}`,
  default: categoryAll,
});
