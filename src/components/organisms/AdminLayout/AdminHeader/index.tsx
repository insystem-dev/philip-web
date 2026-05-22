import { Button } from "@/components/atoms/Button";
import * as S from "./adminHeader.style";
import IconUser from "public/assets/svg/icon-user.svg";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AdminUserPopup } from "@/components/molecules/AdminUserPopup";

export const AdminHeader = () => {
  const [userShow, setUserShow] = useState(false);

  const UserClick = () => {
    setUserShow(!userShow);
  };

  return (
    <>
      <S.AdminHeader>
        <Button
          type="button"
          color="adminClear"
          layout="icon"
          size="md"
          label="관리자 님"
          onClick={UserClick}
        >
          <IconUser />
        </Button>
      </S.AdminHeader>
      {userShow && <AdminUserPopup />}
    </>
  );
};
