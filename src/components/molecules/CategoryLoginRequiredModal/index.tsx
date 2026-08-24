import { AlertModal } from "@/components/molecules/AlertModal";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createPortal } from "react-dom";

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
    ? `'${categoryName}' 카테고리는 로그인 후 이용할 수 있습니다.`
    : "이 카테고리는 로그인 후 이용할 수 있습니다.";

  return createPortal(
    <div onClick={(event) => event.stopPropagation()}>
      <AlertModal
        title="로그인이 필요한 카테고리입니다"
        message={message}
        confirmLabel="로그인하기"
        cancelLabel="취소"
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
