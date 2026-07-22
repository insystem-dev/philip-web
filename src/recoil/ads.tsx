import { atom } from "recoil";

type Ads = {
  topAds: string;
  bottom1: string;
  bottom2: string;
  bottom3: string;
};

type AdsList = Ads[];

export const adsState = atom<AdsList>({
  // 고정 key 사용 (uuid 기반 key는 리렌더/HMR 시 atom 중복 등록 문제 발생)
  key: "adsState",
  default: [],
});
