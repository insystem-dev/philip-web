import * as S from "./counter.style";
//check
export const Counter = ({ count }: any) => {
  // count 미전달/짧은 값에도 크래시 없도록 문자열로 정규화 후 6자리로 패딩
  const digits = String(count ?? 0).padStart(6, "0");

  return (
    <S.Counter>
      <S.CounterNumSpan>{digits[digits.length - 6]}</S.CounterNumSpan>
      <S.CounterNumSpan>{digits[digits.length - 5]}</S.CounterNumSpan>
      <S.CounterNumSpan>{digits[digits.length - 4]}</S.CounterNumSpan>

      <S.CounterTxtSpan lineHeight={40}>,</S.CounterTxtSpan>

      <S.CounterNumSpan>{digits[digits.length - 3]}</S.CounterNumSpan>
      <S.CounterNumSpan>{digits[digits.length - 2]}</S.CounterNumSpan>
      <S.CounterNumSpan>{digits[digits.length - 1]}</S.CounterNumSpan>

      <S.CounterTxtSpan>명</S.CounterTxtSpan>
    </S.Counter>
  );
};
