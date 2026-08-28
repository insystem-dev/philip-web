import { AdminNavItem } from "@/components/atoms/AdminNavItem";
import { useRecoilValue } from "recoil";
import { adminState } from "@/recoil/adminToken";
import * as S from "./adminNavList.style";

export const AdminNavList = () => {
  const admin = useRecoilValue(adminState) as { role?: string } | null;

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
      id: 9,
      name: "팝업 관리",
      path: "/admin/popup",
    },
    {
      id: 6,
      name: "공통코드 관리",
      path: "/admin/code",
    },
    {
      id: 8,
      name: "지역별 카테고리",
      path: "/admin/category-city",
    },
    {
      id: 11,
      name: "번역 관리",
      path: "/admin/translations",
    },
    {
      id: 3,
      name: "회원관리",
      path: "/admin/users",
    },
    {
      id: 10,
      name: "업소 등록 신청",
      path: "/admin/business-registrations",
    },
    {
      id: 4,
      name: "방문자 수 관리",
      path: "/admin/visit",
    },
  ];

  // SUPER 관리자 전용 메뉴
  if (admin?.role === "SUPER") {
    menus.push({
      id: 5,
      name: "관리자 계정 관리",
      path: "/admin/account",
    });
    menus.push({
      id: 7,
      name: "환경설정",
      path: "/admin/settings",
    });
    menus.push({
      id: 12,
      name: "번역 사용량",
      path: "/admin/translation-usage",
    });
  }

  return (
    <S.AdminNavList>
      {menus.map((menu, idx) => {
        return <AdminNavItem data={menu} key={idx} />;
      })}
    </S.AdminNavList>
  );
};
