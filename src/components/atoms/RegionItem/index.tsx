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
    setCityState(e.oid);
    localStorage.setItem("city", e.oid);
    if (e.disabled === false) {
      isWindowWidth < 769
        ? router.push("/select/category")
        : router.push("/main");
    }
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
