import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCityListApi } from "@/apis/categoryApi";
import { InputSelect } from "@/components/atoms/Input/InputSelect";
import { Button } from "@/components/atoms/Button";
import { cityState } from "@/recoil/city";
import { userTokenState } from "@/recoil/userToken";
import * as S from "./headerMenu.style";
import IconUser from "public/assets/svg/icon-user.svg";
import { adminState } from "@/recoil/adminToken";

export const HeaderMenu = () => {
  /** 유저 로그인 체크 */
  const [userToken, setUserToken] = useRecoilState(userTokenState);
  const admin = useRecoilValue(adminState);
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCityState] = useRecoilState<any>(cityState);

  /** 시티 select 목록 불러오기 */
  const { data: cityItem } = useQuery("getCityListApi", getCityListApi);

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
    setCityOptions(cityItem);
  }, [cityItem]);

  return (
    <S.HeaderMenu>
      {/* 관리자 페이지 이동 버튼 */}
      {admin && (
        <Button
          type="button"
          color="clear"
          layout="icon"
          size="sm"
          label="관리자 페이지"
          onClick={() => {
            router.replace("/admin/store");
          }}
        />
      )}
      {userToken ? (
        <>
          <Button
            type="button"
            color="clear"
            layout="icon"
            size="sm"
            label="로그아웃"
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
            label="로그인/회원가입"
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
          label="지역선택"
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
