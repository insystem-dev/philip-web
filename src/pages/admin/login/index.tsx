import { AdminLoginPage } from "@/components/templates/AdminLoginPage";
import { useMutation } from "react-query";
import { logInAPI } from "@/apis/adminApi";
import Error from "next/error";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminState } from "@/recoil/adminToken";
import { setToken } from "@/apis";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  // 아이디 저장 체크박스 체크 유무
  const [isRemember, setIsRemember] = useState(false);
  // id, pw 상태저장
  const [userInfo, setUserInfo] = useState({ adminId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useRecoilState(adminState);

  /** 로그인 submit 버튼 */
  const onSubmitForm = async (e: Event) => {
    // validate your userinfo
    e.preventDefault();
    setIsLoading(true);
    try {
      const user: any = await logInAPI({
        adminId: userInfo.adminId,
        password: userInfo.password,
      });

      localStorage.setItem("admin", JSON.stringify(user));
      setAdmin(user);
      setToken();
      router.replace("/admin/store");
    } catch (error) {
      const { response } = error as unknown as any;

      setErrorMessage(response?.data.message);
      setIsLoading(false);
    }

    // id저장 버튼 클릭됬다면 id 로컬스토리지에 저장
    if (isRemember) {
      localStorage.setItem("rememberUserId", userInfo.adminId);
    }
  };

  /** InputCheckbox checked 상태 변경 함수 */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberUserId");
    }
  };

  /*페이지가 최초 렌더링 될 경우*/
  useEffect(() => {
    /*저장된 로컬값이 있으면, CheckBox TRUE 및 adminId에 값 셋팅*/
    if (localStorage.getItem("rememberUserId") !== null) {
      setUserInfo({
        ...userInfo,
        adminId: localStorage.getItem("rememberUserId")!,
      });
      setIsRemember(true);
    }
  }, []);

  return (
    <>
      <AdminLoginPage
        onSubmitForm={onSubmitForm}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isRemember={isRemember}
        handleOnChange={handleOnChange}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
