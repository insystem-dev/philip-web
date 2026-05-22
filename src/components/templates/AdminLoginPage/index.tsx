import { AdminLoginBox } from "@/components/molecules/AdminLoginBox";
import * as S from "./adminLoginPage.style";

export interface AdminLoginPageProps {
  onSubmitForm: (e: any) => any;
  userInfo: { adminId: string; password: string };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{ adminId: string; password: string }>
  >;
  isRemember: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  isLoading: boolean;
}
export const AdminLoginPage = ({
  onSubmitForm,
  userInfo,
  setUserInfo,
  isRemember,
  handleOnChange,
  errorMessage,
  isLoading,
}: AdminLoginPageProps) => {
  return (
    <S.LoginPage>
      <AdminLoginBox
        onSubmitForm={onSubmitForm}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        isRemember={isRemember}
        handleOnChange={handleOnChange}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </S.LoginPage>
  );
};
