import { Button } from "@/components/atoms/Button";
import * as S from "./adminLoginBox.style";
import { InputText } from "@/components/atoms/Input/InputText";
import { InputCheckbox } from "@/components/atoms/Input/InputCheckbox";
import { AdminLoginPageProps } from "@/components/templates/AdminLoginPage";
import { useRouter } from "next/router";

export const AdminLoginBox = ({
  onSubmitForm,
  userInfo,
  setUserInfo,
  isRemember,
  handleOnChange,
  errorMessage,
  isLoading,
}: AdminLoginPageProps) => {
  const router = useRouter();
  return (
    <S.AdminLoginBox onSubmit={onSubmitForm}>
      <S.LoginTit>Login</S.LoginTit>
      <S.LoginInputBox>
        <InputText
          label="아이디"
          layout="column"
          themeType="admin"
          size="lg"
          width="100%"
          type={"text"}
          placeholder="아이디 입력"
          value={userInfo.adminId}
          onChange={({ target }: any) =>
            setUserInfo({ ...userInfo, adminId: target.value })
          }
        />
        <InputText
          label="비밀번호"
          layout="column"
          themeType="admin"
          size="lg"
          width="100%"
          type={"password"}
          placeholder="비밀번호 입력"
          value={userInfo.password}
          onChange={({ target }: any) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <InputCheckbox
          value="1"
          themeType="admin"
          layout="row"
          displayValue="아이디 저장"
          checked={isRemember}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleOnChange(e);
          }}
        />
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      </S.LoginInputBox>

      <Button
        type="submit"
        width="100%"
        height={56}
        color="primary"
        layout="solid"
        label="로그인하기"
        className={`${isLoading && "spinner spinner-white spinner-right"}`}
      />
      {/* <Button
        type="button"
        width="100%"
        height={56}
        color="mainBg"
        layout="solid"
        label="간편 회원가입"
        onClick={() => {
          router.replace("/admin/signup");
        }}
      /> */}
    </S.AdminLoginBox>
  );
};
