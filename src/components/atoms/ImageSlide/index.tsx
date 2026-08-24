import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button, ButtonGroup } from "../Button";
import IconArrowPrev from "public/assets/svg/icon-arrow-prev-lg.svg";
import IconArrowNext from "public/assets/svg/icon-arrow-next-lg.svg";
import * as S from "./imageSlide.style";

const clampZoom = (value: number) => Math.min(3, Math.max(1, value));

const getTouchDistance = (touches: React.TouchList) => {
  const deltaX = touches[1].clientX - touches[0].clientX;
  const deltaY = touches[1].clientY - touches[0].clientY;
  return Math.hypot(deltaX, deltaY);
};

const getTouchMidpoint = (touches: React.TouchList) => ({
  x: (touches[0].clientX + touches[1].clientX) / 2,
  y: (touches[0].clientY + touches[1].clientY) / 2,
});

export const ImageSlide = ({ items }: any) => {
  const [selectedId, setSelectedId] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchPanRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const pinchRef = useRef<{
    startDistance: number;
    startZoom: number;
    anchorX: number;
    anchorY: number;
    centerX: number;
    centerY: number;
  } | null>(null);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const hasImages = Boolean(items?.length);
  const itemCount = items?.length ?? 0;

  zoomRef.current = zoom;
  panRef.current = pan;

  const viewerPrev = useCallback(() => {
    setSelectedId((current) => (current - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const viewerNext = useCallback(() => {
    setSelectedId((current) => (current + 1) % itemCount);
  }, [itemCount]);

  const resetPan = useCallback(() => {
    dragRef.current = null;
    touchPanRef.current = null;
    pinchRef.current = null;
    touchStartRef.current = null;
    panRef.current = { x: 0, y: 0 };
    setIsDragging(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
    setZoom(1);
    resetPan();
  }, [resetPan]);

  useEffect(() => {
    if (!viewerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") viewerPrev();
      if (event.key === "ArrowRight") viewerNext();
      if (event.key === "+" || event.key === "=") {
        setZoom((current) => clampZoom(current + 0.5));
      }
      if (event.key === "-") {
        setZoom((current) => clampZoom(current - 0.5));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeViewer, itemCount, viewerNext, viewerOpen, viewerPrev]);

  useEffect(() => {
    setZoom(1);
    resetPan();
  }, [resetPan, selectedId]);

  useEffect(() => {
    if (zoom <= 1) {
      resetPan();
      return;
    }

    const frame = imageFrameRef.current;
    if (!frame) return;
    const maxX = (frame.clientWidth * (zoom - 1)) / 2;
    const maxY = (frame.clientHeight * (zoom - 1)) / 2;
    setPan((current) => ({
      x: Math.min(maxX, Math.max(-maxX, current.x)),
      y: Math.min(maxY, Math.max(-maxY, current.y)),
    }));
  }, [resetPan, zoom]);

  const startTouchPan = (touch: React.Touch) => {
    touchPanRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      originX: panRef.current.x,
      originY: panRef.current.y,
    };
    setIsDragging(true);
  };

  const onViewerTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length >= 2) {
      const distance = getTouchDistance(event.touches);
      if (distance <= 0) return;

      const midpoint = getTouchMidpoint(event.touches);
      const frame = imageFrameRef.current;
      const stageRect = frame?.parentElement?.getBoundingClientRect();
      if (!frame || !stageRect) return;

      const centerX = stageRect.left + stageRect.width / 2;
      const centerY = stageRect.top + stageRect.height / 2;
      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;

      pinchRef.current = {
        startDistance: distance,
        startZoom: currentZoom,
        anchorX: (midpoint.x - centerX - currentPan.x) / currentZoom,
        anchorY: (midpoint.y - centerY - currentPan.y) / currentZoom,
        centerX,
        centerY,
      };
      touchPanRef.current = null;
      touchStartRef.current = null;
      dragRef.current = null;
      setIsDragging(true);
      return;
    }

    if (event.touches.length === 1 && zoomRef.current > 1) {
      touchStartRef.current = null;
      startTouchPan(event.touches[0]);
    }
  };

  const onViewerTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const frame = imageFrameRef.current;
    if (!frame) return;

    if (event.touches.length >= 2 && pinchRef.current) {
      event.preventDefault();
      const pinch = pinchRef.current;
      const midpoint = getTouchMidpoint(event.touches);
      const distance = getTouchDistance(event.touches);
      const nextZoom = clampZoom(
        pinch.startZoom * (distance / pinch.startDistance)
      );
      const maxX = (frame.clientWidth * (nextZoom - 1)) / 2;
      const maxY = (frame.clientHeight * (nextZoom - 1)) / 2;
      const rawX = midpoint.x - pinch.centerX - pinch.anchorX * nextZoom;
      const rawY = midpoint.y - pinch.centerY - pinch.anchorY * nextZoom;
      const nextPan = {
        x: Math.min(maxX, Math.max(-maxX, rawX)),
        y: Math.min(maxY, Math.max(-maxY, rawY)),
      };

      zoomRef.current = nextZoom;
      panRef.current = nextPan;
      setZoom(nextZoom);
      setPan(nextPan);
      return;
    }

    const touchPan = touchPanRef.current;
    if (event.touches.length === 1 && touchPan && zoomRef.current > 1) {
      event.preventDefault();
      const touch = event.touches[0];
      const currentZoom = zoomRef.current;
      const maxX = (frame.clientWidth * (currentZoom - 1)) / 2;
      const maxY = (frame.clientHeight * (currentZoom - 1)) / 2;
      const nextPan = {
        x: Math.min(
          maxX,
          Math.max(-maxX, touchPan.originX + touch.clientX - touchPan.startX)
        ),
        y: Math.min(
          maxY,
          Math.max(-maxY, touchPan.originY + touch.clientY - touchPan.startY)
        ),
      };

      panRef.current = nextPan;
      setPan(nextPan);
    }
  };

  const onViewerTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 1 && pinchRef.current) {
      pinchRef.current = null;
      if (zoomRef.current > 1) startTouchPan(event.touches[0]);
      return;
    }

    if (event.touches.length === 0) {
      pinchRef.current = null;
      touchPanRef.current = null;
      setIsDragging(false);
    }
  };

  const onViewerTouchCancel = () => {
    pinchRef.current = null;
    touchPanRef.current = null;
    touchStartRef.current = null;
    setIsDragging(false);
  };

  if (!hasImages) {
    return (
      <S.ImageSlide>
        <S.ImageEmpty>등록된 이미지가 없습니다.</S.ImageEmpty>
      </S.ImageSlide>
    );
  }

  const onSelectImage = (e: any) => {
    setSelectedId(e);
  };

  const onPrevImage = () => {
    if (selectedId > 0) {
      setSelectedId(selectedId - 1);
    }
  };

  const onNextImage = () => {
    // items 로딩 전 undefined 가드 + 마지막 이미지에서 범위 초과 방지
    if (items && selectedId < items.length - 1) {
      setSelectedId(selectedId + 1);
    }
  };

  return (
    <>
      <S.ImageSlide>
      <S.ImageSelected>
        {/* 이미지가 없으면 빈 src 대신 렌더하지 않음 */}
        {items?.[selectedId]?.filename && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${items[selectedId].filename}`}
            layout="fill"
            sizes="(max-width: 768px) 100vw, 505px"
            priority={selectedId === 0}
            alt="선택된 업체 이미지"
          />
        )}
        <S.OpenViewerButton
          type="button"
          aria-label="선택한 사진을 전체 화면으로 보기"
          onClick={() => setViewerOpen(true)}
        />
        <ButtonGroup justifyContent="space-between">
          <Button
            type="button"
            width="30px"
            height={50}
            color="func"
            layout="function"
            onClick={onPrevImage}
            disabled={selectedId === 0 ? true : false}
          >
            <IconArrowPrev />
          </Button>
          <Button
            type="button"
            width="30px"
            height={50}
            color="func"
            layout="function"
            onClick={onNextImage}
            disabled={selectedId === items?.length - 1 ? true : false}
          >
            <IconArrowNext />
          </Button>
        </ButtonGroup>
      </S.ImageSelected>

      <S.ImageSlideList>
        {items?.map((item: any, idx: number) => {
          return (
            <S.ImageSlideItem
              key={idx}
              $active={selectedId === idx}
              onClick={() => {
                onSelectImage(idx);
                setViewerOpen(true);
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.filename}`}
                width={85}
                height={62}
                sizes="85px"
                alt="업체 이미지"
              />
            </S.ImageSlideItem>
          );
        })}
      </S.ImageSlideList>
      </S.ImageSlide>

      {viewerOpen &&
        createPortal(
          <S.ViewerBackdrop role="dialog" aria-modal="true" aria-label="사진 전체 화면 미리보기">
            <S.ViewerTopBar>
              <S.ViewerCount>
                <strong>{selectedId + 1}</strong>
                <span>/ {items.length}</span>
              </S.ViewerCount>
              <S.ViewerCloseButton
                ref={closeButtonRef}
                type="button"
                onClick={closeViewer}
                aria-label="전체 화면 미리보기 닫기"
              >
                ×
              </S.ViewerCloseButton>
            </S.ViewerTopBar>

            <S.ViewerStage
              onWheel={(event) => {
                event.preventDefault();
                setZoom((current) =>
                  clampZoom(current + (event.deltaY < 0 ? 0.25 : -0.25))
                );
              }}
              onTouchStart={(event) => {
                if (event.touches.length !== 1 || zoomRef.current > 1) {
                  touchStartRef.current = null;
                  return;
                }
                const touch = event.touches[0];
                touchStartRef.current = { x: touch.clientX, y: touch.clientY };
              }}
              onTouchEnd={(event) => {
                if (!touchStartRef.current || zoom > 1) return;
                const touch = event.changedTouches[0];
                const deltaX = touch.clientX - touchStartRef.current.x;
                const deltaY = touch.clientY - touchStartRef.current.y;
                touchStartRef.current = null;
                if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;
                if (deltaX > 0) viewerPrev();
                else viewerNext();
              }}
            >
              {items.length > 1 && (
                <S.ViewerNavButton
                  type="button"
                  $direction="prev"
                  onClick={viewerPrev}
                  aria-label="이전 사진"
                >
                  ‹
                </S.ViewerNavButton>
              )}

              <S.ViewerImageFrame
                ref={imageFrameRef}
                $zoom={zoom}
                $panX={pan.x}
                $panY={pan.y}
                $dragging={isDragging}
                onTouchStart={onViewerTouchStart}
                onTouchMove={onViewerTouchMove}
                onTouchEnd={onViewerTouchEnd}
                onTouchCancel={onViewerTouchCancel}
                onPointerDown={(event) => {
                  if (event.pointerType === "touch" || zoom <= 1) return;
                  event.preventDefault();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragRef.current = {
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    originX: pan.x,
                    originY: pan.y,
                  };
                  setIsDragging(true);
                }}
                onPointerMove={(event) => {
                  if (event.pointerType === "touch") return;
                  const drag = dragRef.current;
                  if (!drag || drag.pointerId !== event.pointerId) return;

                  const maxX = (event.currentTarget.clientWidth * (zoom - 1)) / 2;
                  const maxY = (event.currentTarget.clientHeight * (zoom - 1)) / 2;
                  const nextX = drag.originX + event.clientX - drag.startX;
                  const nextY = drag.originY + event.clientY - drag.startY;

                  setPan({
                    x: Math.min(maxX, Math.max(-maxX, nextX)),
                    y: Math.min(maxY, Math.max(-maxY, nextY)),
                  });
                }}
                onPointerUp={(event) => {
                  if (event.pointerType === "touch") return;
                  if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                  }
                  dragRef.current = null;
                  setIsDragging(false);
                }}
                onPointerCancel={() => {
                  dragRef.current = null;
                  setIsDragging(false);
                }}
                onDoubleClick={() => {
                  if (zoom > 1) {
                    setZoom(1);
                    resetPan();
                  } else {
                    setZoom(2);
                  }
                }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${items[selectedId].filename}`}
                  layout="fill"
                  objectFit="contain"
                  sizes="100vw"
                  priority
                  draggable={false}
                  alt={`업체 사진 ${selectedId + 1}`}
                />
              </S.ViewerImageFrame>

              {items.length > 1 && (
                <S.ViewerNavButton
                  type="button"
                  $direction="next"
                  onClick={viewerNext}
                  aria-label="다음 사진"
                >
                  ›
                </S.ViewerNavButton>
              )}
            </S.ViewerStage>

            <S.ViewerControls aria-label="사진 확대 축소">
              <S.ViewerControlButton
                type="button"
                onClick={() => setZoom((current) => clampZoom(current - 0.5))}
                disabled={zoom <= 1}
                aria-label="축소"
              >
                −
              </S.ViewerControlButton>
              <S.ViewerZoomText>{Math.round(zoom * 100)}%</S.ViewerZoomText>
              <S.ViewerControlButton
                type="button"
                onClick={() => setZoom((current) => clampZoom(current + 0.5))}
                disabled={zoom >= 3}
                aria-label="확대"
              >
                +
              </S.ViewerControlButton>
              <S.ViewerResetButton
                type="button"
                onClick={() => setZoom(1)}
                disabled={zoom === 1}
              >
                원본 크기
              </S.ViewerResetButton>
            </S.ViewerControls>
            <S.ViewerHelp>
              두 손가락·마우스 휠로 확대 / 확대 후 드래그로 시점 이동
            </S.ViewerHelp>
          </S.ViewerBackdrop>,
          document.body
        )}
    </>
  );
};
