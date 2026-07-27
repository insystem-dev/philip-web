import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMaintenanceApi, updateMaintenanceApi } from "@/apis/adminApi";
import useApiError from "@/lib/hooks/useApiError";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminSettingsPage.style";

/** SUPER 관리자 전용 환경설정 — 점검 모드 on/off */
export const AdminSettingsPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  const { data, isLoading, isError } = useQuery(
    ["getMaintenance"],
    getMaintenanceApi,
    {
      retry: 1,
      onError: (error: any) => handleError(error),
    }
  );

  const mutation = useMutation(updateMaintenanceApi, {
    onSuccess: (saved) => {
      queryClient.setQueryData(["getMaintenance"], saved);
      alert(
        saved.enabled ? "점검 모드가 켜졌습니다." : "점검 모드가 꺼졌습니다."
      );
    },
    onError: (error: any) => {
      handleError(error);
      alert(error?.response?.data?.message ?? "변경 중 오류가 발생했습니다.");
    },
  });

  const enabled = data?.enabled ?? false;

  const onToggle = () => {
    const next = !enabled;
    const confirmMessage = next
      ? "점검 모드를 켜시겠습니까?\nSUPER를 제외한 관리자의 등록/수정/삭제 작업이 차단됩니다."
      : "점검 모드를 끄시겠습니까?\n모든 관리자가 다시 정상적으로 작업할 수 있습니다.";
    if (!window.confirm(confirmMessage)) return;
    mutation.mutate(next);
  };

  return (
    <AdminLayout title="환경설정">
      <S.Page>
        <S.Card>
          <S.CardTitle>점검 모드</S.CardTitle>
          <S.Description>
            점검 모드를 켜면 SUPER 권한을 제외한 관리자는 신규등록·추가·수정·삭제
            작업을 할 수 없습니다. 조회는 정상적으로 가능합니다.
          </S.Description>

          {isLoading ? (
            <S.Status>불러오는 중입니다.</S.Status>
          ) : isError || !data ? (
            <S.ErrorStatus>점검 모드 상태를 불러오지 못했습니다.</S.ErrorStatus>
          ) : (
            <>
              <S.StateRow>
                <span>현재 상태</span>
                <S.StateBadge enabled={enabled}>
                  {enabled ? "점검 중" : "정상 운영 중"}
                </S.StateBadge>
              </S.StateRow>

              <S.Notice>
                점검 모드 중에는 다른 관리자 화면 상단에 점검 안내 메시지가
                표시되고, 작업 시도 시 점검 안내 모달이 노출됩니다.
              </S.Notice>

              <S.ToggleButton
                type="button"
                enabled={enabled}
                disabled={mutation.isLoading}
                onClick={onToggle}
              >
                {mutation.isLoading
                  ? "변경 중..."
                  : enabled
                  ? "점검 모드 끄기"
                  : "점검 모드 켜기"}
              </S.ToggleButton>
            </>
          )}
        </S.Card>
      </S.Page>
    </AdminLayout>
  );
};
