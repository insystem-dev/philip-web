import { useEffect } from "react";
import { PopupItem } from "@/apis/popupApi";
import * as S from "./noticePopupModal.style";

interface NoticePopupModalProps {
  popup: PopupItem;
  current: number;
  total: number;
  onClose: () => void;
  onHideToday: () => void;
}

export const NoticePopupModal = ({
  popup,
  current,
  total,
  onClose,
  onHideToday,
}: NoticePopupModalProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const imageUrl = popup.imageFilename
    ? `${process.env.NEXT_PUBLIC_API_URL}/${popup.imageFilename}`
    : null;
  const isInternalLink = popup.linkUrl?.startsWith("/");
  const isRegistrationLink = popup.linkUrl?.startsWith("/self-registration");

  return (
    <S.Backdrop
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <S.Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby={`notice-popup-${popup.oid}`}
      >
        <S.TopBar>
          <S.TopMeta>
            <S.Kicker>
              <span aria-hidden="true">✦</span> PHILIP NOTICE
            </S.Kicker>
            {total > 1 && (
              <S.Counter>
                {current} / {total}
              </S.Counter>
            )}
          </S.TopMeta>
          <S.IconClose type="button" aria-label="팝업 닫기" onClick={onClose}>
            <span aria-hidden="true">×</span>
          </S.IconClose>
        </S.TopBar>

        {imageUrl && (
          <S.ImageFrame>
            {/* 원본 비율이 팝업마다 달라 자연 높이를 유지해야 하므로 img를 사용한다. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" />
          </S.ImageFrame>
        )}

        <S.Content $hasImage={!!imageUrl}>
          <S.Title id={`notice-popup-${popup.oid}`}>{popup.title}</S.Title>
          {popup.content && <S.Message>{popup.content}</S.Message>}
          {popup.linkUrl && (
            <S.Link
              href={popup.linkUrl}
              target={isInternalLink ? undefined : "_blank"}
              rel={isInternalLink ? undefined : "noopener noreferrer"}
            >
              {isRegistrationLink ? "무료 등록 신청하기" : "자세히 보기"}{" "}
              <span aria-hidden="true">{isInternalLink ? "→" : "↗"}</span>
            </S.Link>
          )}
        </S.Content>

        <S.Actions>
          {popup.showTodayHideYn !== "N" && (
            <S.TodayButton type="button" onClick={onHideToday}>
              오늘 하루 보지 않기
            </S.TodayButton>
          )}
          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.Actions>
      </S.Modal>
    </S.Backdrop>
  );
};
