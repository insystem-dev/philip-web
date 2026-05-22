import { atom } from "recoil";
import { v1 } from "uuid";

export const searchState = atom({
  key: `searchState/${v1()}`,
  default: "",
});
