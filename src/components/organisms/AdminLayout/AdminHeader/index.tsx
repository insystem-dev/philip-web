import { Button } from "@/components/atoms/Button";
import * as S from "./adminHeader.style";
import IconUser from "public/assets/svg/icon-user.svg";
import { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { AdminUserPopup } from "@/components/molecules/AdminUserPopup";
import { adminState } from "@/recoil/adminToken";
import { getMaintenanceApi } from "@/apis/adminApi";

export const AdminHeader = () => {
  const [userShow, setUserShow] = useState(false);
  const admin = useRecoilValue(adminState) as { role?: string } | null;

  // 점검 모드 상태 — 점검 중이면 비SUPER 관리자에게 상단 안내 표시
  const { data: maintenance } = useQuery(["getMaintenance"], getMaintenanceApi, {
    enabled: !!admin,
    retry: 1,
  });

  const showMaintenanceNotice =
    maintenance?.enabled === true && admin?.role !== "SUPER";

  const UserClick = () => {
    setUserShow(!userShow);
  };

  return (
    <>
      <S.AdminHeader>
        {showMaintenanceNotice && (
          <S.MaintenanceNotice>
            시스템 점검중입니다. 신규등록, 추가, 수정 작업이 불가합니다.
            (관리자에게 문의하세요)
          </S.MaintenanceNotice>
        )}
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
