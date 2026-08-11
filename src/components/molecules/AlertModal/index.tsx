import { Button } from "@/components/atoms/Button";
import * as S from "./alertModal.style";

interface AlertModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** 취소 동작을 주면 확인/취소 2버튼 모달(= window.confirm 대체)로 동작한다 */
  cancelLabel?: string;
  onCancel?: () => void;
}

/** 만료·인증 등 브라우저 alert()를 대체하는 사이트 테마 모달 */
export const AlertModal = ({
  title,
  message,
  confirmLabel = "확인",
  onConfirm,
  cancelLabel = "취소",
  onCancel,
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
        <S.AlertModalBtns>
          {onCancel && (
            <Button
              type="button"
              width="100%"
              height={48}
              color="func"
              layout="solid"
              label={cancelLabel}
              onClick={onCancel}
            />
          )}
          <Button
            type="button"
            width="100%"
            height={48}
            color="primary"
            layout="solid"
            label={confirmLabel}
            onClick={onConfirm}
          />
        </S.AlertModalBtns>
      </S.AlertModal>
    </S.AlertModalBg>
  );
};
