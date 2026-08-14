import { CategoryIconOption } from "@/apis/categoryApi";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as S from "./categoryIconPicker.style";

interface CategoryIconPickerProps {
  options: CategoryIconOption[];
  value?: string;
  onChange: (iconKey: string) => void;
  disabled?: boolean;
  compact?: boolean;
  ariaLabel?: string;
  inherited?: boolean;
  onUseInherited?: () => void;
}

const assetUrl = (path?: string) => {
  const base = String(process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  return `${base}${path || "/category-icons/plus.svg"}`;
};

/**
 * DB에는 아이콘 key만 저장하고 관리자는 실제 아이콘만 보고 고르는 공용 선택기.
 * 백엔드 카탈로그에 SVG를 추가하면 선택 창에도 자동으로 항목이 늘어난다.
 */
export const CategoryIconPicker = ({
  options,
  value = "plus",
  onChange,
  disabled,
  compact,
  ariaLabel = "카테고리 아이콘 선택",
  inherited,
  onUseInherited,
}: CategoryIconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const selected =
    options.find((option) => option.key === value) ??
    options.find((option) => option.key === "plus");
  const unavailable = !!disabled || options.length === 0;

  const closePicker = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus && typeof window !== "undefined") {
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePicker();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closePicker, isOpen]);

  useEffect(() => {
    if (unavailable) setIsOpen(false);
  }, [unavailable]);

  return (
    <>
      <S.Picker $compact={!!compact} $disabled={unavailable}>
        <S.Trigger
          ref={triggerRef}
          type="button"
          aria-label={ariaLabel}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          disabled={unavailable}
          onClick={() => setIsOpen(true)}
        >
          <img src={assetUrl(selected?.url)} alt="" />
          <S.Chevron aria-hidden="true" />
        </S.Trigger>
      </S.Picker>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <S.Backdrop
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closePicker();
            }}
          >
            <S.Dialog
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <S.DialogHeader>
                <div>
                  <S.DialogEyebrow>카테고리 설정</S.DialogEyebrow>
                  <S.DialogTitle id={titleId}>아이콘 선택</S.DialogTitle>
                </div>
                <S.CloseButton
                  type="button"
                  aria-label="아이콘 선택 창 닫기"
                  onClick={() => closePicker()}
                >
                  ×
                </S.CloseButton>
              </S.DialogHeader>

              <S.IconGrid role="listbox" aria-label="사용 가능한 아이콘">
                {options.map((option, index) => {
                  const isSelected = option.key === selected?.key;
                  return (
                    <S.IconOption
                      key={option.key}
                      type="button"
                      role="option"
                      aria-label={`아이콘 ${index + 1}`}
                      aria-selected={isSelected}
                      $selected={isSelected}
                      onClick={() => {
                        onChange(option.key);
                        closePicker();
                      }}
                    >
                      <img src={assetUrl(option.url)} alt="" />
                      {isSelected && <S.SelectedMark aria-hidden>✓</S.SelectedMark>}
                    </S.IconOption>
                  );
                })}
              </S.IconGrid>
              {onUseInherited && (
                <S.InheritArea>
                  <S.InheritButton
                    type="button"
                    disabled={inherited}
                    onClick={() => {
                      onUseInherited();
                      closePicker();
                    }}
                  >
                    <span aria-hidden>↺</span>
                    공통 아이콘 사용
                  </S.InheritButton>
                  <S.InheritState>
                    {inherited
                      ? "현재 공통코드 아이콘을 사용 중입니다."
                      : "지역 아이콘 대신 공통코드 설정을 따릅니다."}
                  </S.InheritState>
                </S.InheritArea>
              )}
              <S.DialogHint>
                원하는 모양을 누르면 선택됩니다. 아이콘 코드는 화면에 표시되지
                않습니다.
              </S.DialogHint>
            </S.Dialog>
          </S.Backdrop>,
          document.body
        )}
    </>
  );
};
