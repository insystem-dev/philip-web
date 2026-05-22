import { atom } from "recoil";
import { v1 } from "uuid";

type Ads = {
  topAds: string;
  bottom1: string;
  bottom2: string;
  bottom3: string;
};

type AdsList = Ads[];

export const adsState = atom<AdsList>({
  key: `adsState/${v1()}`,
  default: [],
});
