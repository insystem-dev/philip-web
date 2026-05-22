import Logo from "@/components/atoms/Logo";
import { AdminNavList } from "@/components/molecules/AdminNavList";
import * as S from "./adminAsideSection.style";

export const AdminAsideSection = () => {
  return (
    <S.AdminAsideSection>
      <Logo admin={true} />
      <AdminNavList />
    </S.AdminAsideSection>
  );
};
