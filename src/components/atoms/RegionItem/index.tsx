import { useRouter } from "next/router";
import * as S from "./regionItem.style";
import IconArrowWt from "public/assets/svg/icon-link-arrow-white.svg";
import { useRecoilState } from "recoil";
import { cityState } from "@/recoil/city";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const RegionItem = ({ data }: any) => {
  const router = useRouter();
  const [, setCityState] = useRecoilState(cityState);
  const { locale } = usePhilipLocale();

  const primaryName =
    locale === "en" ? data.name_eng || data.name : data.name || data.name_eng;
  const secondaryName = locale === "en" ? data.name : data.name_eng;

  const goMain = (e: any) => {
    // 비활성 지역 클릭 시 상태 변경 없이 종료 (disabled 체크를 상태 변경 앞으로 이동)
    if (e.disabled !== false) return;

    setCityState(e.oid);
    localStorage.setItem("city", e.oid);
    router.push("/select/category");
  };

  return (
    <S.RegionItem
      item={data.oid}
      disabled={data.disabled}
      onClick={() => goMain(data)}
    >
      <S.ItemTitBox>
        <S.ItemPrimary lang={locale}>{primaryName}</S.ItemPrimary>
        {secondaryName && secondaryName !== primaryName && (
          <S.ItemSecondary lang={locale === "en" ? "ko" : "en"}>
            {secondaryName}
          </S.ItemSecondary>
        )}
      </S.ItemTitBox>
      {!data.disabled && <IconArrowWt viewBox="0 0 24 24" />}
    </S.RegionItem>
  );
};

export default RegionItem;
