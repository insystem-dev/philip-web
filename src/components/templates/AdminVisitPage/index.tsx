import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getVisitDisplaySetting,
  updateVisitDisplaySetting,
  VisitDisplaySetting,
  VisitDisplayMode,
} from "@/apis/adminApi";
import useApiError from "@/lib/hooks/useApiError";
import { AdminLayout } from "@/components/organisms/AdminLayout";
import { getMillisecondsUntilPhilippineMidnight } from "@/lib/philippinesTime";
import * as S from "./adminVisitPage.style";

const MAX_VISIT_COUNT = 2_147_483_647;

export const AdminVisitPage = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const [mode, setMode] = useState<VisitDisplayMode>("actual");
  const [manualCount, setManualCount] = useState("");
  const [autoIntervalMinutes, setAutoIntervalMinutes] = useState("1");
  const [autoIncrementCount, setAutoIncrementCount] = useState("1");
  const [validationMessage, setValidationMessage] = useState("");

  const { data, isLoading, isError, refetch } = useQuery(
    ["visitDisplaySetting"],
    getVisitDisplaySetting,
    {
      retry: 1,
      onError: (error: any) => handleError(error),
    }
  );
  const savedMode = data?.displayMode;
  const savedManualCount = data?.manualCount;
  const savedAutoInterval = data?.autoIntervalMinutes;
  const savedAutoIncrement = data?.autoIncrementCount;

  // 서버가 계산한 다음 증가 시각 직후 조회해 1분 설정이 2분처럼 보이지 않게 한다.
  useEffect(() => {
    if (!data?.nextAutoIncrementAt) return;

    const delay = Math.max(
      0,
      new Date(data.nextAutoIncrementAt).getTime() - Date.now()
    );
    const timer = setTimeout(() => void refetch(), delay + 250);

    return () => clearTimeout(timer);
  }, [data?.nextAutoIncrementAt, refetch]);

  useEffect(() => {
    if (!savedMode) return;
    setMode(savedMode);
    setManualCount(String(savedManualCount ?? 0));
    setAutoIntervalMinutes(String(savedAutoInterval ?? 1));
    setAutoIncrementCount(String(savedAutoIncrement ?? 1));
  }, [savedMode, savedManualCount, savedAutoInterval, savedAutoIncrement]);

  // 관리자 화면을 계속 열어둔 경우에도 필리핀 00시에 전날 캐시를 즉시 제거한다.
  useEffect(() => {
    let cancelled = false;
    let midnightTimer: ReturnType<typeof setTimeout>;

    const scheduleMidnightReset = () => {
      midnightTimer = setTimeout(async () => {
        setValidationMessage("");
        await refetch();
        if (!cancelled) scheduleMidnightReset();
      }, getMillisecondsUntilPhilippineMidnight());
    };

    scheduleMidnightReset();

    return () => {
      cancelled = true;
      clearTimeout(midnightTimer);
    };
  }, [refetch]);

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
          `추가할 방문자 수는 0 이상 ${MAX_VISIT_COUNT.toLocaleString()} 이하의 정수로 입력해주세요.`
        );
        return;
      }
      mutation.mutate({ mode, count });
      return;
    }

    if (mode === "auto") {
      const intervalMinutes = Number(autoIntervalMinutes);
      const incrementCount = Number(autoIncrementCount);
      if (
        !Number.isSafeInteger(intervalMinutes) ||
        intervalMinutes < 1 ||
        intervalMinutes > 1440
      ) {
        setValidationMessage(
          "자동 증가 간격은 1분 이상 1440분 이하의 정수로 입력해주세요."
        );
        return;
      }
      if (
        !Number.isSafeInteger(incrementCount) ||
        incrementCount < 1 ||
        incrementCount > MAX_VISIT_COUNT
      ) {
        setValidationMessage(
          `회당 증가 인원은 1 이상 ${MAX_VISIT_COUNT.toLocaleString()} 이하의 정수로 입력해주세요.`
        );
        return;
      }
      mutation.mutate({ mode, intervalMinutes, incrementCount });
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
            실제 집계값을 그대로 노출하거나, 실제 집계값에 추가로 더할 방문자
            수를 직접 입력하거나 일정한 분 간격으로 자동 증가시킬 수 있습니다.
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
                    <strong>실제 집계 + 추가 입력</strong>
                    실제 방문자 수에 입력한 값을 더해 노출합니다. 실제 방문자가
                    늘어날수록 노출 수도 함께 늘어납니다.
                  </span>
                </S.RadioLabel>
                <S.RadioLabel>
                  <input
                    type="radio"
                    name="displayMode"
                    value="auto"
                    checked={mode === "auto"}
                    onChange={() => setMode("auto")}
                  />
                  <span>
                    <strong>자동 증가</strong>
                    설정한 분 간격마다 지정한 인원만큼 자동으로 더합니다. 퇴근
                    후나 쉬는 날에도 서버 재시작과 관계없이 계속 계산됩니다.
                  </span>
                </S.RadioLabel>
              </S.Fieldset>

              <S.InputGroup>
                <label htmlFor="manualCount">추가할 방문자 수</label>
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
                {mode === "manual" &&
                  !validationMessage &&
                  Number.isSafeInteger(Number(manualCount)) && (
                    <S.PreviewText>
                      실제 {data.actualCount.toLocaleString()}명 + 입력{" "}
                      {Number(manualCount).toLocaleString()}명 ={" "}
                      <strong>
                        {(
                          data.actualCount + Number(manualCount)
                        ).toLocaleString()}
                        명
                      </strong>{" "}
                      노출
                    </S.PreviewText>
                  )}
                {validationMessage && (
                  <S.ValidationMessage>{validationMessage}</S.ValidationMessage>
                )}
              </S.InputGroup>

              <S.AutoInputGroup $disabled={mode !== "auto"}>
                <div>
                  <label htmlFor="autoIntervalMinutes">증가 간격</label>
                  <S.CountInput>
                    <input
                      id="autoIntervalMinutes"
                      type="number"
                      min="1"
                      max="1440"
                      step="1"
                      inputMode="numeric"
                      value={autoIntervalMinutes}
                      disabled={mode !== "auto"}
                      onChange={(event) => {
                        setAutoIntervalMinutes(event.target.value);
                        setValidationMessage("");
                      }}
                    />
                    <span>분마다</span>
                  </S.CountInput>
                </div>
                <div>
                  <label htmlFor="autoIncrementCount">회당 증가</label>
                  <S.CountInput>
                    <input
                      id="autoIncrementCount"
                      type="number"
                      min="1"
                      max={MAX_VISIT_COUNT}
                      step="1"
                      inputMode="numeric"
                      value={autoIncrementCount}
                      disabled={mode !== "auto"}
                      onChange={(event) => {
                        setAutoIncrementCount(event.target.value);
                        setValidationMessage("");
                      }}
                    />
                    <span>명 증가</span>
                  </S.CountInput>
                </div>
              </S.AutoInputGroup>
              {mode === "auto" && !validationMessage && (
                <S.AutoStatus>
                  현재 자동 추가{" "}
                  <strong>{data.autoAddedCount.toLocaleString()}명</strong>
                  {data.autoStartedAt && (
                    <>
                      {" "}
                      · {data.autoIntervalMinutes}분마다{" "}
                      {data.autoIncrementCount}명씩 증가 중
                    </>
                  )}
                </S.AutoStatus>
              )}

              <S.Notice>
                직접 추가 입력은 오늘 날짜에만 적용됩니다. 자동 증가는 다른
                모드로 변경할 때까지 계속 유지되며, 필리핀 자정마다 자동 추가
                인원은 0명부터 다시 계산됩니다.
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
