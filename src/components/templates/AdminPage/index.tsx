import { AdminLayout } from "@/components/organisms/AdminLayout";
import React from "react";
import * as S from "./adminPage.style";
export const AdminPage = ({ children }: any) => {
  return (
    <AdminLayout>
      <S.AdminPage></S.AdminPage>
    </AdminLayout>
  );
};
