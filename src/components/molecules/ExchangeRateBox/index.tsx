import { useQuery } from "react-query";
import {
  ExchangeRateSnapshot,
  getExchangeRatesApi,
} from "@/apis/exchangeRateApi";
import * as S from "./exchangeRateBox.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

const formatRate = (
  code: keyof ExchangeRateSnapshot["rates"],
  value: number,
  locale: string
) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "ko-KR", {
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
  const { locale, message } = usePhilipLocale();
  const rateItems = [
    {
      code: "USD" as const,
      name: message.exchange.usd,
      symbol: "$",
      tone: "usd" as const,
    },
    {
      code: "PHP" as const,
      name: message.exchange.php,
      symbol: "₱",
      tone: "php" as const,
    },
    {
      code: "USDT" as const,
      name: message.exchange.usdt,
      symbol: "₮",
      tone: "usdt" as const,
    },
  ];
  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<ExchangeRateSnapshot>(
      ["getExchangeRatesApi"],
      getExchangeRatesApi,
      {
        staleTime: 2 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        retry: 1,
      }
    );

  return (
    <S.ExchangeCard aria-labelledby="exchange-rate-title" aria-live="polite">
      <S.CardHeader>
        <div>
          <S.Eyebrow>DAILY MARKET</S.Eyebrow>
          <S.Title id="exchange-rate-title">{message.exchange.title}</S.Title>
        </div>
        <S.RefreshButton
          type="button"
          $loading={isFetching}
          onClick={() => refetch()}
          disabled={isFetching}
          aria-label={message.exchange.refresh}
          title={message.exchange.refreshShort}
        >
          ↻
        </S.RefreshButton>
      </S.CardHeader>

      {isLoading ? (
        <S.RateList aria-label={message.exchange.loading}>
          {rateItems.map((item) => (
            <S.SkeletonRow key={item.code}>
              <span />
              <span />
              <span />
            </S.SkeletonRow>
          ))}
        </S.RateList>
      ) : isError || !data ? (
        <S.ErrorState>
          <strong>{message.exchange.error}</strong>
          <span>{message.exchange.retryHint}</span>
          <S.RetryButton type="button" onClick={() => refetch()}>
            {message.exchange.retry}
          </S.RetryButton>
        </S.ErrorState>
      ) : (
        <>
          <S.RateMeta>
            <span>
              {message.exchange.krwBase} · {formatRateDate(data.date)}
            </span>
            {data.stale && (
              <S.StaleBadge>{message.exchange.recent}</S.StaleBadge>
            )}
          </S.RateMeta>
          <S.RateList>
            {rateItems.map((item) => (
              <S.RateRow key={item.code}>
                <S.CurrencyMark $tone={item.tone} aria-hidden="true">
                  {item.symbol}
                </S.CurrencyMark>
                <S.CurrencyName>
                  <strong>{item.name}</strong>
                  <span>1 {item.code}</span>
                </S.CurrencyName>
                <S.RateValue>
                  <strong>
                    {formatRate(item.code, data.rates[item.code], locale)}
                  </strong>
                  <span>{message.exchange.won}</span>
                </S.RateValue>
              </S.RateRow>
            ))}
          </S.RateList>
          <S.SourceNote>
            <span>
              {message.exchange.updated(
                formatUpdatedTime(data.sourceUpdatedAt.fiat),
                formatUpdatedTime(data.sourceUpdatedAt.usdt)
              )}
            </span>
            <span>{message.exchange.disclaimer}</span>
          </S.SourceNote>
        </>
      )}
    </S.ExchangeCard>
  );
};
