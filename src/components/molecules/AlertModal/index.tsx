import { Button } from "@/components/atoms/Button";
import * as S from "./alertModal.style";

interface AlertModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

/** 만료·인증 등 브라우저 alert()를 대체하는 사이트 테마 모달 */
export const AlertModal = ({
  title,
  message,
  confirmLabel = "확인",
  onConfirm,
}: AlertModalProps) => {
  return (
    <S.AlertModalBg role="presentation">
      <S.AlertModal
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alertModalTitle"
      >
        <S.AlertModalTit id="alertModalTitle">{title}</S.AlertModalTit>
        <S.AlertModalMsg>{message}</S.AlertModalMsg>
        <Button
          type="button"
          width="100%"
          height={48}
          color="primary"
          layout="solid"
          label={confirmLabel}
          onClick={onConfirm}
        />
      </S.AlertModal>
    </S.AlertModalBg>
  );
};
