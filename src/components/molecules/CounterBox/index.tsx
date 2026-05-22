import { Counter } from "@/components/atoms/Counter";
import * as S from "./counterBox.style";

export const CounterBox = ({ count }: any) => {
  return (
    <S.CounterBox>
      <S.CounterLabelSpan>오늘의 방문자수</S.CounterLabelSpan>
      <Counter count={count} />
    </S.CounterBox>
  );
};
