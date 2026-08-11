import { useEffect, useState } from "react";
import { AdminAsideSection } from "./AdminAsideSection";
import { AdminContentSection } from "./AdminContentSection";
import { AdminHeader } from "./AdminHeader";
import { AlertModal } from "@/components/molecules/AlertModal";
import { MAINTENANCE_BLOCKED_EVENT } from "@/apis";
import * as S from "./adminLayout.style";

// titleActions — 타이틀 우측 버튼 영역에 화면별 버튼(수정/저장/취소 등)을 꽂는 슬롯
export const AdminLayout = ({
  title,
  link,
  linkLabel,
  titleActions,
  children,
}: any) => {
  const [maintenanceBlocked, setMaintenanceBlocked] = useState(false);

  // 점검 모드로 차단된 요청(503 MAINTENANCE)이 발생하면 점검 안내 모달 표시
  useEffect(() => {
    const onBlocked = () => setMaintenanceBlocked(true);
    window.addEventListener(MAINTENANCE_BLOCKED_EVENT, onBlocked);
    return () =>
      window.removeEventListener(MAINTENANCE_BLOCKED_EVENT, onBlocked);
  }, []);

  return (
    <S.AdminLayout>
      <AdminHeader />
      <AdminAsideSection />
      <AdminContentSection
        title={title}
        link={link}
        linkLabel={linkLabel}
        titleActions={titleActions}
      >
        {children}
      </AdminContentSection>
      {maintenanceBlocked && (
        <AlertModal
          title="점검중입니다"
          message={`시스템 점검중입니다.\n신규등록, 추가, 수정 작업이 불가합니다.\n(관리자에게 문의하세요)`}
          onConfirm={() => setMaintenanceBlocked(false)}
        />
      )}
    </S.AdminLayout>
  );
};
