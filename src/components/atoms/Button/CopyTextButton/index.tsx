import * as S from "./copyTextButton.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";
import useCopyText from "@/lib/hooks/useCopyText";

interface CopyTextButtonProps {
  text: string;
  /** 스크린리더용 버튼 이름 (예: 번호복사) */
  label: string;
}

/** 값 바로 뒤에 붙는 "(복사)" 문구형 복사 버튼 */
export const CopyTextButton = ({ text, label }: CopyTextButtonProps) => {
  const { message } = usePhilipLocale();
  const { copied, copy } = useCopyText();

  return (
    <S.CopyTextButton
      type="button"
      aria-label={copied ? message.common.copied : label}
      $copied={copied}
      onClick={() => copy(text)}
    >
      ({copied ? message.common.copied : message.common.copy})
    </S.CopyTextButton>
  );
};
