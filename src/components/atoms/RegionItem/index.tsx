import { useRouter } from "next/router";
import useWindowWidth from "@/lib/hooks/useWindowWidth";
import * as S from "./regionItem.style";
import IconArrowWt from "public/assets/svg/icon-link-arrow-white.svg";
import { useRecoilState } from "recoil";
import { cityState } from "@/recoil/city";

export const RegionItem = ({ data }: any) => {
  const router = useRouter();
  const isWindowWidth = useWindowWidth();
  const [city, setCityState] = useRecoilState(cityState);

  const goMain = (e: any) => {
    // 비활성 지역 클릭 시 상태 변경 없이 종료 (disabled 체크를 상태 변경 앞으로 이동)
    if (e.disabled !== false) return;

    setCityState(e.oid);
    localStorage.setItem("city", e.oid);
    isWindowWidth < 769
      ? router.push("/select/category")
      : router.push("/main");
  };

  return (
    <S.RegionItem
      item={data.oid}
      disabled={data.disabled}
      onClick={() => goMain(data)}
    >
      <S.ItemTitBox>
        <S.ItemKR>{data.name}</S.ItemKR>
        <S.ItemEN>{data.name_eng}</S.ItemEN>
      </S.ItemTitBox>
      {!data.disabled && <IconArrowWt viewBox="0 0 24 24" />}
    </S.RegionItem>
  );
};

export default RegionItem;
