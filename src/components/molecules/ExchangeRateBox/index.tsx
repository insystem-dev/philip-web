import { useQuery } from "react-query";
import {
  ExchangeRateSnapshot,
  getExchangeRatesApi,
} from "@/apis/exchangeRateApi";
import * as S from "./exchangeRateBox.style";

const RATE_ITEMS = [
  { code: "USD" as const, name: "달러", symbol: "$", tone: "usd" as const },
  { code: "PHP" as const, name: "페소", symbol: "₱", tone: "php" as const },
  {
    code: "USDT" as const,
    name: "테더",
    symbol: "₮",
    tone: "usdt" as const,
  },
];

const formatRate = (code: keyof ExchangeRateSnapshot["rates"], value: number) =>
  new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: code === "PHP" ? 2 : 0,
    maximumFractionDigits: code === "PHP" ? 2 : 0,
  }).format(value);

const formatRateDate = (date: string) => {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${year}.${month}.${day}`;
};

const formatUpdatedTime = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  });
};

export const ExchangeRateBox = () => {
  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<ExchangeRateSnapshot>(["getExchangeRatesApi"], getExchangeRatesApi, {
      staleTime: 2 * 60 * 1000,
      refetchInterval: 5 * 60 * 1000,
      retry: 1,
    });

  return (
    <S.ExchangeCard aria-labelledby="exchange-rate-title" aria-live="polite">
      <S.CardHeader>
        <div>
          <S.Eyebrow>DAILY MARKET</S.Eyebrow>
          <S.Title id="exchange-rate-title">오늘의 환전시세</S.Title>
        </div>
        <S.RefreshButton
          type="button"
          $loading={isFetching}
          onClick={() => refetch()}
          disabled={isFetching}
          aria-label="환전시세 새로고침"
          title="새로고침"
        >
          ↻
        </S.RefreshButton>
      </S.CardHeader>

      {isLoading ? (
        <S.RateList aria-label="환율 정보를 불러오는 중">
          {RATE_ITEMS.map((item) => (
            <S.SkeletonRow key={item.code}>
              <span />
              <span />
              <span />
            </S.SkeletonRow>
          ))}
        </S.RateList>
      ) : isError || !data ? (
        <S.ErrorState>
          <strong>시세를 불러오지 못했습니다.</strong>
          <span>잠시 후 다시 확인해 주세요.</span>
          <S.RetryButton type="button" onClick={() => refetch()}>
            다시 불러오기
          </S.RetryButton>
        </S.ErrorState>
      ) : (
        <>
          <S.RateMeta>
            <span>KRW 기준 · {formatRateDate(data.date)}</span>
            {data.stale && <S.StaleBadge>최근 시세</S.StaleBadge>}
          </S.RateMeta>
          <S.RateList>
            {RATE_ITEMS.map((item) => (
              <S.RateRow key={item.code}>
                <S.CurrencyMark $tone={item.tone} aria-hidden="true">
                  {item.symbol}
                </S.CurrencyMark>
                <S.CurrencyName>
                  <strong>{item.name}</strong>
                  <span>1 {item.code}</span>
                </S.CurrencyName>
                <S.RateValue>
                  <strong>{formatRate(item.code, data.rates[item.code])}</strong>
                  <span>원</span>
                </S.RateValue>
              </S.RateRow>
            ))}
          </S.RateList>
          <S.SourceNote>
            <span>
              외환 {formatUpdatedTime(data.sourceUpdatedAt.fiat)} · 테더{" "}
              {formatUpdatedTime(data.sourceUpdatedAt.usdt)} 갱신
            </span>
            <span>참고용 · 실제 환전소 시세와 다를 수 있어요</span>
          </S.SourceNote>
        </>
      )}
    </S.ExchangeCard>
  );
};
