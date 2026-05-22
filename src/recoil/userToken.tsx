import { atom } from "recoil";
import { v1 } from "uuid";

export const userTokenState = atom({
  key: `userTokenState/${v1()}`,
  default: null,
});
