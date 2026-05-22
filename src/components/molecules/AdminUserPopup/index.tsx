import { UserPopupItem } from "@/components/atoms/UserPopupItem";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as S from "./adminUserBox.style";

export const AdminUserPopup = () => {
  const onSignOut = async () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  return (
    <S.AdminUserPopup>
      <UserPopupItem>
        <Link href="/main">
          <span>홈으로 가기</span>
        </Link>
      </UserPopupItem>
      <UserPopupItem>
        <span onClick={() => onSignOut()}>로그아웃</span>
      </UserPopupItem>
    </S.AdminUserPopup>
  );
};
