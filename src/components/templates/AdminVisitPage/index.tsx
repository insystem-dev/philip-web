import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getVisitDisplaySetting,
  updateVisitDisplaySetting,
  VisitDisplayMode,
} from "@/apis/adminApi";
import useApiError from "@/lib/hooks/useApiError";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import * as S from "./adminVisitPage.style";

const MAX_VISIT_COUNT = 2_147_483_647;

export const AdminVisitPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [mode, setMode] = useState<VisitDisplayMode>("actual");
  const [manualCount, setManualCount] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["visitDisplaySetting"],
    getVisitDisplaySetting,
    {
      retry: 1,
      onError: (error: any) => handleError(error),
    }
  );

  useEffect(() => {
    if (!data) return;
    setMode(data.displayMode);
    setManualCount(
      data.manualCount === null
        ? String(data.actualCount)
        : String(data.manualCount)
    );
  }, [data]);

  const mutation = useMutation(updateVisitDisplaySetting, {
    onSuccess: (savedSetting) => {
      queryClient.setQueryData(["visitDisplaySetting"], savedSetting);
      queryClient.invalidateQueries("getVisitCount");
      alert("방문자 수 설정이 저장되었습니다.");
    },
    onError: (error: any) => {
      handleError(error);
      alert(error?.response?.data?.message || "저장 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationMessage("");

    if (mode === "manual") {
      const count = Number(manualCount);
      if (
        manualCount.trim() === "" ||
        !Number.isSafeInteger(count) ||
        count < 0 ||
        count > MAX_VISIT_COUNT
      ) {
        setValidationMessage(
          `방문자 수는 0 이상 ${MAX_VISIT_COUNT.toLocaleString()} 이하의 정수로 입력해주세요.`
        );
        return;
      }
      mutation.mutate({ mode, count });
      return;
    }

    mutation.mutate({ mode });
  };

  return (
    <AdminLayout title="방문자 수 관리">
      <S.Page>
        <S.Card>
          <S.CardTitle>오늘의 방문자 수</S.CardTitle>
          <S.Description>
            실제 집계값을 그대로 노출하거나, 오늘 표시할 방문자 수를 직접 지정할
            수 있습니다.
          </S.Description>

          {isLoading ? (
            <S.Status>불러오는 중입니다.</S.Status>
          ) : isError || !data ? (
            <S.ErrorStatus>방문자 수 정보를 불러오지 못했습니다.</S.ErrorStatus>
          ) : (
            <form onSubmit={onSubmit}>
              <S.Summary>
                <S.SummaryItem>
                  <span>기준 날짜</span>
                  <strong>{data.visitDate}</strong>
                </S.SummaryItem>
                <S.SummaryItem>
                  <span>실제 방문자 수</span>
                  <strong>{data.actualCount.toLocaleString()}명</strong>
                </S.SummaryItem>
                <S.SummaryItem>
                  <span>현재 노출 수</span>
                  <strong>{data.displayCount.toLocaleString()}명</strong>
                </S.SummaryItem>
              </S.Summary>

              <S.Fieldset>
                <legend>노출 방식</legend>
                <S.RadioLabel>
                  <input
                    type="radio"
                    name="displayMode"
                    value="actual"
                    checked={mode === "actual"}
                    onChange={() => setMode("actual")}
                  />
                  <span>
                    <strong>실제 집계 사용</strong>
                    방문 기록에 따라 자동으로 증가합니다.
                  </span>
                </S.RadioLabel>
                <S.RadioLabel>
                  <input
                    type="radio"
                    name="displayMode"
                    value="manual"
                    checked={mode === "manual"}
                    onChange={() => setMode("manual")}
                  />
                  <span>
                    <strong>직접 입력</strong>
                    입력한 값으로 오늘의 방문자 수를 고정합니다.
                  </span>
                </S.RadioLabel>
              </S.Fieldset>

              <S.InputGroup>
                <label htmlFor="manualCount">노출할 방문자 수</label>
                <S.CountInput>
                  <input
                    id="manualCount"
                    type="number"
                    min="0"
                    max={MAX_VISIT_COUNT}
                    step="1"
                    inputMode="numeric"
                    value={manualCount}
                    disabled={mode !== "manual"}
                    onChange={(event) => {
                      setManualCount(event.target.value);
                      setValidationMessage("");
                    }}
                  />
                  <span>명</span>
                </S.CountInput>
                {validationMessage && (
                  <S.ValidationMessage>{validationMessage}</S.ValidationMessage>
                )}
              </S.InputGroup>

              <S.Notice>
                이 설정은 오늘 날짜에만 적용됩니다. 날짜가 바뀌면 실제 집계값이
                자동으로 노출됩니다.
              </S.Notice>

              <S.SaveButton type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "저장 중..." : "설정 저장"}
              </S.SaveButton>
            </form>
          )}
        </S.Card>
      </S.Page>
    </AdminLayout>
  );
};
