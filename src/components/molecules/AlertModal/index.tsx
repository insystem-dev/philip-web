import { Button } from "@/components/atoms/Button";
import * as S from "./alertModal.style";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface AlertModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** 취소 동작을 주면 확인/취소 2버튼 모달(= window.confirm 대체)로 동작한다 */
  cancelLabel?: string;
  onCancel?: () => void;
  /** 지정한 모달만 배경 영역 클릭으로 닫을 수 있게 한다. */
  onBackdropClick?: () => void;
}

/** 만료·인증 등 브라우저 alert()를 대체하는 사이트 테마 모달 */
export const AlertModal = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  onBackdropClick,
}: AlertModalProps) => {
  const { message: localeMessage } = usePhilipLocale();

  return (
    <S.AlertModalBg role="presentation" onClick={onBackdropClick}>
      <S.AlertModal
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alertModalTitle"
        onClick={(event) => event.stopPropagation()}
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
              label={cancelLabel ?? localeMessage.common.cancel}
              onClick={onCancel}
            />
          )}
          <Button
            type="button"
            width="100%"
            height={48}
            color="primary"
            layout="solid"
            label={confirmLabel ?? localeMessage.common.confirm}
            onClick={onConfirm}
          />
        </S.AlertModalBtns>
      </S.AlertModal>
    </S.AlertModalBg>
  );
};
