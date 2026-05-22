import { atom } from "recoil";
import { v1 } from "uuid";

export const adminState = atom({
  key: `adminState/${v1()}`,
  default: null,
});
