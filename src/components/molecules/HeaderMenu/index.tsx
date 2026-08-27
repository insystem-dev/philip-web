import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { CitySub, getCityListApi } from "@/apis/categoryApi";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { Button } from "@/components/atoms/Button";
import { cityState } from "@/recoil/city";
import { userTokenState } from "@/recoil/userToken";
import * as S from "./headerMenu.style";
import IconUser from "public/assets/svg/icon-user.svg";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const HeaderMenu = () => {
  const { locale, message } = usePhilipLocale();
  /** 유저 로그인 체크 */
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const [cityOptions, setCityOptions] = useState<CitySub[]>([]);
  const [city, setCityState] = useRecoilState<any>(cityState);

  /** 시티 select 목록 불러오기 */
  const { data: cityItem } = useQuery(
    ["getCityListApi", locale],
    getCityListApi
  );

  const router = useRouter();

  /** 시티 목록 선택시 세팅 */
  const getCityOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityState(e.target.value);
    // 새로 고침 시 선택 city 유지
    localStorage.setItem("city", e.target.value);
  };

  const onLogout = () => {
    localStorage.removeItem("kakaoSignKey");
    setUserToken(null);
    document.location.href = "/main";
  };

  useEffect(() => {
    if (!cityItem) return;
    const activeCities = cityItem.filter((item) => !item.disabled);
    setCityOptions(activeCities);

    if (activeCities.length === 0) {
      setCityState(null);
      localStorage.removeItem("city");
      return;
    }

    if (!city || !activeCities.some((item) => item.oid === city)) {
      setCityState(activeCities[0].oid);
      localStorage.setItem("city", activeCities[0].oid);
    }
  }, [cityItem, city, setCityState]);

  return (
    <S.HeaderMenu>
      {userToken ? (
        <>
          <Button
            type="button"
            color="clear"
            layout="icon"
            size="sm"
            label={message.common.logout}
            onClick={() => {
              onLogout();
            }}
          >
            <IconUser />
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            color="clear"
            layout="icon"
            size="sm"
            label={message.common.login}
            onClick={() => {
              router.replace("/auth");
            }}
          >
            <IconUser />
          </Button>
        </>
      )}

      {router.pathname.includes("main") || router.pathname.includes("auth") ? (
        <InputSelect
          label={message.common.regionSelect}
          options={cityOptions}
          layout="row"
          size="sm"
          onChange={getCityOption}
          value={city}
        />
      ) : (
        ""
      )}
    </S.HeaderMenu>
  );
};
