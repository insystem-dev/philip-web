import styled, { keyframes } from "styled-components";

const backdropIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  padding: 20px;
  background: rgba(3, 9, 18, 0.02);
  backdrop-filter: blur(0.8px);
  -webkit-backdrop-filter: blur(0.8px);
  place-items: center;
  animation: ${backdropIn} 160ms ease-out;
`;

export const Modal = styled.section`
  position: relative;
  width: min(430px, 100%);
  max-height: calc(100vh - 40px);
  overflow: auto;
  border: 1px solid rgba(255, 224, 121, 0.38);
  border-radius: 16px;
  color: #fff8df;
  background:
    radial-gradient(
      circle at 18% -8%,
      rgba(255, 222, 112, 0.14),
      transparent 34%
    ),
    linear-gradient(
      145deg,
      rgba(65, 75, 85, 0.97),
      rgba(19, 29, 41, 0.985) 58%,
      rgba(9, 20, 36, 0.99)
    );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 227, 134, 0.08),
    0 26px 72px rgba(0, 0, 0, 0.5),
    0 0 34px rgba(255, 211, 79, 0.1);
  animation: ${modalIn} 220ms cubic-bezier(0.22, 1, 0.36, 1);

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    right: 14%;
    left: 14%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 229, 147, 0.9),
      transparent
    );
    pointer-events: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(255, 224, 121, 0.25);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const TopBar = styled.div`
  display: flex;
  min-height: 52px;
  padding: 9px 10px 6px 18px;
  align-items: center;
  justify-content: space-between;
`;

export const TopMeta = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 9px;
`;

export const Kicker = styled.span`
  color: #dfc77f;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.13em;

  span {
    color: #fff4bb;
    text-shadow: 0 0 9px rgba(255, 221, 104, 0.72);
  }
`;

export const Counter = styled.span`
  padding: 3px 7px;
  border: 1px solid rgba(255, 224, 121, 0.18);
  border-radius: 999px;
  color: rgba(255, 246, 210, 0.72);
  background: rgba(6, 15, 27, 0.32);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

export const IconClose = styled.button`
  display: grid;
  width: 34px;
  height: 34px;
  border: 1px solid transparent;
  border-radius: 50%;
  color: rgba(255, 248, 220, 0.72);
  background: transparent;
  font-size: 2.6rem;
  line-height: 1;
  cursor: pointer;
  place-items: center;

  &:hover {
    color: #fff4b5;
    border-color: rgba(255, 224, 121, 0.22);
    background: rgba(255, 238, 178, 0.08);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 224, 121, 0.7);
    outline-offset: 2px;
  }
`;

export const ImageFrame = styled.div`
  width: calc(100% - 32px);
  margin: 0 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 238, 184, 0.14);
  border-radius: 12px;
  background: rgba(3, 11, 22, 0.72);
  box-shadow: inset 0 0 26px rgba(0, 0, 0, 0.28);

  img {
    display: block;
    width: 100%;
    max-height: 420px;
    object-fit: contain;
  }
`;

export const Content = styled.div<{ $hasImage: boolean }>`
  padding: ${(props) =>
    props.$hasImage ? "22px 26px 24px" : "10px 26px 28px"};
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0;
  color: #fff2bd;
  font-family: "Trebuchet MS", "Malgun Gothic", sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.035em;
  text-shadow:
    0 2px 0 rgba(65, 48, 11, 0.65),
    0 7px 20px rgba(0, 0, 0, 0.36),
    0 0 18px rgba(255, 221, 106, 0.12);
  word-break: keep-all;
`;

export const Message = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 250, 230, 0.76);
  font-size: 1.45rem;
  line-height: 1.65;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.28);
  white-space: pre-line;
  word-break: keep-all;
`;

export const Link = styled.a`
  display: inline-flex;
  margin-top: 18px;
  padding: 8px 13px;
  border: 1px solid rgba(255, 224, 121, 0.3);
  border-radius: 999px;
  color: #f4d77d;
  background: rgba(255, 224, 121, 0.06);
  font-size: 1.35rem;
  font-weight: 800;
  align-items: center;
  gap: 5px;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;

  &:hover {
    color: #fff5c6;
    border-color: rgba(255, 224, 121, 0.62);
    background: rgba(255, 224, 121, 0.12);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 224, 121, 0.7);
    outline-offset: 3px;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 104px;
  border-top: 1px solid rgba(255, 238, 184, 0.12);
  background: rgba(3, 11, 22, 0.22);
`;

const actionButton = `
  height: 54px;
  border: 0;
  font-size: 1.35rem;
  font-weight: 700;
  cursor: pointer;

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 2px solid rgba(255, 238, 174, 0.86);
    outline-offset: -3px;
  }
`;

export const TodayButton = styled.button`
  ${actionButton}
  color: rgba(255, 250, 229, 0.72);
  background: transparent;

  &:hover {
    color: #fff8d9;
    background: rgba(255, 255, 255, 0.055);
  }
`;

export const CloseButton = styled.button`
  ${actionButton}
  border-left: 1px solid rgba(255, 224, 121, 0.18);
  color: #34280d;
  background: linear-gradient(145deg, #f2d276, #c49d3d);
  text-shadow: 0 1px rgba(255, 255, 255, 0.36);

  &:hover {
    background: linear-gradient(145deg, #ffe69b, #d7ad48);
  }
`;
