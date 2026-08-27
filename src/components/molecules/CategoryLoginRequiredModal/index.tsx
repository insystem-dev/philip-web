import { AlertModal } from "@/components/molecules/AlertModal";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { usePhilipLocale } from "@/i18n/usePhilipLocale";

interface CategoryLoginRequiredModalProps {
  open: boolean;
  categoryName?: string;
  onClose: () => void;
}

/** 로그인 전용 카테고리 선택 시 사용자에게 공통으로 보여주는 안내 모달 */
export const CategoryLoginRequiredModal = ({
  open,
  categoryName,
  onClose,
}: CategoryLoginRequiredModalProps) => {
  const router = useRouter();
  const { message: localeMessage } = usePhilipLocale();

  useEffect(() => {
    if (!open) return;

    const closeOnRouteChange = () => onClose();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    router.events.on("routeChangeStart", closeOnRouteChange);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      router.events.off("routeChangeStart", closeOnRouteChange);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, open, router.events]);

  if (!open || typeof document === "undefined") return null;

  const message = categoryName
    ? localeMessage.auth.requiredNamed(categoryName)
    : localeMessage.auth.required;

  return createPortal(
    <div onClick={(event) => event.stopPropagation()}>
      <AlertModal
        title={localeMessage.auth.requiredTitle}
        message={message}
        confirmLabel={localeMessage.auth.signIn}
        cancelLabel={localeMessage.auth.cancel}
        onCancel={onClose}
        onBackdropClick={onClose}
        onConfirm={() => {
          onClose();
          router.push("/auth/login");
        }}
      />
    </div>,
    document.body
  );
};
