import { Counter } from "@/components/atoms/Counter";
import * as S from "./counterBox.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

export const CounterBox = ({ count }: any) => {
  const { message } = usePhilipLocale();
  return (
    <S.CounterBox>
      <S.CounterLabelSpan>{message.main.todayVisitors}</S.CounterLabelSpan>
      <Counter count={count} />
    </S.CounterBox>
  );
};
