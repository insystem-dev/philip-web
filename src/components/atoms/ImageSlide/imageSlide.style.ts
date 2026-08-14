import styled from "styled-components";

export const ImageSlide = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto 85px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const ImageSelected = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  width: 505px;
  height: 390px;
  border-radius: 4px;
  align-items: center;

  button {
    position: relative;
    z-index: 10;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 280px;
    border-radius: 0;
  }
`;

export const OpenViewerButton = styled.button`
  position: absolute !important;
  z-index: 2 !important;
  inset: 0;
  width: 100%;
  padding: 0;
  background: transparent;
  border: 0;
  cursor: zoom-in;

  &::after {
    content: "확대 보기";
    position: absolute;
    right: 14px;
    bottom: 14px;
    padding: 8px 11px;
    color: rgba(255, 255, 255, 0.94);
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    background: rgba(7, 12, 22, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #e6cf8c;
    outline-offset: -3px;
  }

  @media screen and (max-width: 768px) {
    &::after {
      opacity: 0.82;
      transform: none;
    }
  }
`;

export const ImageEmpty = styled.div`
  display: flex;
  overflow: hidden;
  grid-column: 1 / 3;
  width: 100%;
  height: 390px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.categorySubTxt};
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 280px;
    border-radius: 0;
  }
`;

export const ImageSlideList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 0 16px;
    flex-direction: row;
    gap: 12px;
  }
`;

export const ImageSlideItem = styled.li<{ $active: boolean }>`
  overflow: hidden;
  width: 85px;
  height: 62px;
  border: 2px solid
    ${(props) => (props.$active ? "#e6cf8c" : "transparent")};
  border-radius: 4px;
  cursor: pointer;
  opacity: ${(props) => (props.$active ? 1 : 0.68)};
  transition:
    opacity 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    opacity: 1;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(20vw - 12px);
    border-radius: 0;
  }
`;

export const ViewerBackdrop = styled.div`
  position: fixed;
  z-index: 10000;
  inset: 0;
  overflow: hidden;
  color: white;
  background:
    radial-gradient(circle at 50% 42%, rgba(36, 45, 61, 0.5), transparent 52%),
    rgba(2, 5, 10, 0.98);
  animation: viewerFadeIn 0.18s ease-out;

  @keyframes viewerFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ViewerTopBar = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 72px;
  padding: 14px 20px 14px 24px;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent);

  @media screen and (max-width: 768px) {
    height: 64px;
    padding: 10px 12px 10px 18px;
  }
`;

export const ViewerCount = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
  font-size: 1.5rem;
  letter-spacing: 0.02em;

  strong {
    color: #f0d991;
    font-size: 1.8rem;
  }

  span {
    color: rgba(255, 255, 255, 0.55);
  }
`;

export const ViewerCloseButton = styled.button`
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0 0 4px;
  color: white;
  font-family: Georgia, serif;
  font-size: 3.2rem;
  line-height: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  place-items: center;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;

  &:hover,
  &:focus-visible {
    background: rgba(230, 207, 140, 0.18);
    outline: none;
    transform: scale(1.04);
  }
`;

export const ViewerStage = styled.div`
  position: absolute;
  inset: 64px 0 88px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y;

  @media screen and (max-width: 768px) {
    inset: 60px 0 104px;
  }
`;

export const ViewerImageFrame = styled.div<{
  $zoom: number;
  $panX: number;
  $panY: number;
  $dragging: boolean;
}>`
  position: relative;
  width: calc(100% - 180px);
  height: 100%;
  transform: translate3d(
      ${(props) => props.$panX}px,
      ${(props) => props.$panY}px,
      0
    )
    scale(${(props) => props.$zoom});
  transition: ${(props) =>
    props.$dragging
      ? "none"
      : "transform 0.18s cubic-bezier(0.2, 0.75, 0.25, 1)"};
  transform-origin: center;
  cursor: ${(props) =>
    props.$zoom <= 1 ? "zoom-in" : props.$dragging ? "grabbing" : "grab"};
  touch-action: none;
  user-select: none;
  will-change: transform;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ViewerNavButton = styled.button<{
  $direction: "prev" | "next";
}>`
  position: absolute;
  z-index: 3;
  top: 50%;
  ${(props) => (props.$direction === "prev" ? "left: 22px;" : "right: 22px;")}
  display: grid;
  width: 54px;
  height: 64px;
  padding: 0 0 7px;
  color: rgba(255, 255, 255, 0.92);
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 1;
  background: rgba(0, 0, 0, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 12px;
  place-items: center;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover,
  &:focus-visible {
    color: #f0d991;
    background: rgba(12, 17, 27, 0.88);
    outline: none;
  }

  @media screen and (max-width: 768px) {
    top: auto;
    bottom: 10px;
    ${(props) =>
      props.$direction === "prev" ? "left: 12px;" : "right: 12px;"}
    width: 44px;
    height: 48px;
    font-size: 4rem;
    background: rgba(0, 0, 0, 0.56);
    border-radius: 50%;
    transform: none;
  }
`;

export const ViewerControls = styled.div`
  position: absolute;
  z-index: 4;
  bottom: 24px;
  left: 50%;
  display: flex;
  height: 48px;
  padding: 5px;
  align-items: center;
  background: rgba(18, 23, 33, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  transform: translateX(-50%);

  @media screen and (max-width: 768px) {
    bottom: 38px;
  }
`;

export const ViewerControlButton = styled.button`
  display: grid;
  width: 38px;
  height: 38px;
  padding: 0 0 2px;
  color: white;
  font-size: 2.2rem;
  background: transparent;
  border: 0;
  border-radius: 50%;
  place-items: center;
  cursor: pointer;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    color: #f0d991;
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.22);
    cursor: default;
  }
`;

export const ViewerZoomText = styled.span`
  min-width: 58px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.3rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
`;

export const ViewerResetButton = styled.button`
  height: 32px;
  margin-right: 3px;
  padding: 0 12px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.08);
  border: 0;
  border-radius: 999px;
  cursor: pointer;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    color: #f0d991;
    outline: 1px solid rgba(240, 217, 145, 0.45);
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.3);
    cursor: default;
  }
`;

export const ViewerHelp = styled.p`
  position: absolute;
  right: 22px;
  bottom: 34px;
  color: rgba(255, 255, 255, 0.42);
  font-size: 1.2rem;

  @media screen and (max-width: 768px) {
    right: auto;
    bottom: 14px;
    left: 50%;
    width: 100%;
    font-size: 1.1rem;
    text-align: center;
    transform: translateX(-50%);
  }
`;
