import { AdminAsideSection } from "./AdminAsideSection";
import { AdminContentSection } from "./AdminContentSection";
import { AdminHeader } from "./AdminHeader";
import * as S from "./adminLayout.style";

export const AdminLayout = ({ title, link, linkLabel, children }: any) => {
  return (
    <S.AdminLayout>
      <AdminHeader />
      <AdminAsideSection />
      <AdminContentSection title={title} link={link} linkLabel={linkLabel}>
        {children}
      </AdminContentSection>
    </S.AdminLayout>
  );
};
