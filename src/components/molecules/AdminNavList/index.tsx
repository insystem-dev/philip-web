import { AdminNavItem } from "@/components/atoms/AdminNavItem";
import * as S from "./adminNavList.style";

export const AdminNavList = () => {
  const menus = [
    {
      id: 1,
      name: "업체관리",
      path: "/admin/store",
    },
    {
      id: 2,
      name: "광고관리",
      path: "/admin/ads",
    },
    {
      id: 3,
      name: "회원관리",
      path: "/admin/users",
    },
    {
      id: 4,
      name: "관리자 설정",
      path: "/admin/account",
    },
  ];

  return (
    <S.AdminNavList>
      {menus.map((menu, idx) => {
        return <AdminNavItem data={menu} key={idx} />;
      })}
    </S.AdminNavList>
  );
};
