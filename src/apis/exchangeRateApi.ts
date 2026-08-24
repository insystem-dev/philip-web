import axiosInstance from "./index";

export interface ExchangeRateSnapshot {
  date: string;
  updatedAt: string;
  sourceUpdatedAt: {
    fiat: string;
    usdt: string;
  };
  stale: boolean;
  rates: {
    USD: number;
    PHP: number;
    USDT: number;
  };
}

export function getExchangeRatesApi(): Promise<ExchangeRateSnapshot> {
  return axiosInstance
    .get("/app/exchange-rates")
    .then((response) => response.data);
}
