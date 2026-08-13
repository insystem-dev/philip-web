import styled, { css, keyframes } from "styled-components";

const cardIn = keyframes`
  0% { opacity: 0; transform: translateY(22px) scale(.88); filter: blur(5px); }
  72% { opacity: 1; transform: translateY(-2px) scale(1.015); filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
`;

const buttonShimmer = keyframes`
  0%, 82% { opacity: 0; transform: translate3d(-190%, 0, 0) skewX(-22deg); }
  84% { opacity: .34; }
  87% { opacity: .92; }
  91%, 100% { opacity: 0; transform: translate3d(410%, 0, 0) skewX(-22deg); }
`;

const buttonHoverShimmer = keyframes`
  0% { opacity: 0; transform: translate3d(-190%, 0, 0) skewX(-22deg); }
  22% { opacity: .86; }
  100% { opacity: 0; transform: translate3d(410%, 0, 0) skewX(-22deg); }
`;

const buttonAura = keyframes`
  0%, 100% { opacity: .18; transform: scale(.96); }
  50% { opacity: .62; transform: scale(1); }
`;

const iconFloat = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  48% { transform: translate3d(0, -2px, 0) rotate(-1.5deg); }
  72% { transform: translate3d(0, -1px, 0) rotate(1deg); }
`;

export const CategoryItem = styled.li<{ $index: number; $active: boolean }>`
  position: relative;
  list-style: none;
  opacity: 0;
  --button-motion-delay: 1.2s;
  animation: ${cardIn} 0.52s cubic-bezier(0.18, 0.82, 0.22, 1) forwards;
  animation-delay: ${(props) => 0.92 + Math.min(props.$index, 18) * 0.035}s;

  ${(props) =>
    props.$active &&
    css`
      z-index: 1;

      > button {
        color: #fff5cb;
        border-color: rgba(255, 224, 121, 0.9);
        background: linear-gradient(
          145deg,
          rgba(115, 105, 68, 0.78),
          rgba(35, 42, 48, 0.92)
        );
        box-shadow:
          0 0 0 2px rgba(255, 224, 121, 0.12),
          0 0 22px rgba(255, 211, 79, 0.2),
          0 10px 24px rgba(0, 0, 0, 0.34);
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

export const HoverShine = styled.span`
  position: absolute;
  z-index: 2;
  top: -55%;
  left: 0;
  width: 28%;
  height: 210%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08) 22%,
    rgba(255, 247, 200, 0.82) 50%,
    rgba(255, 255, 255, 0.08) 78%,
    transparent
  );
  filter: blur(1px);
  opacity: 0;
  transform: translate3d(-190%, 0, 0) skewX(-22deg);
  pointer-events: none;
  will-change: transform, opacity;
`;

export const CategoryButton = styled.button`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  width: 100%;
  min-height: 66px;
  padding: 7px 5px 8px;
  color: rgba(255, 250, 229, 0.93);
  font: inherit;
  background: linear-gradient(
    145deg,
    rgba(80, 90, 102, 0.66),
    rgba(25, 34, 45, 0.82)
  );
  border: 1px solid rgba(255, 244, 198, 0.07);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 8px 18px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(9px);
  -webkit-tap-highlight-color: transparent;
  transition: none;

  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: -55%;
    left: 0;
    width: 28%;
    height: 210%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.08) 22%,
      rgba(255, 247, 200, 0.76) 50%,
      rgba(255, 255, 255, 0.08) 78%,
      transparent
    );
    filter: blur(1px);
    opacity: 0;
    transform: translate3d(-190%, 0, 0) skewX(-22deg);
    pointer-events: none;
    will-change: transform, opacity;
    animation: ${buttonShimmer} 4.8s var(--button-motion-delay) linear infinite
      backwards;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 0;
    border: 1px solid rgba(255, 232, 151, 0.28);
    border-radius: inherit;
    background: radial-gradient(
      circle at 50% 8%,
      rgba(255, 229, 139, 0.17),
      transparent 58%
    );
    opacity: 0.18;
    transform: scale(0.96);
    pointer-events: none;
    will-change: transform, opacity;
    animation: ${buttonAura} 3.8s var(--button-motion-delay) ease-in-out
      infinite backwards;
  }

  > span {
    position: relative;
    z-index: 1;
  }

  &:focus-visible {
    outline: none;
    color: #fff8d9;
    border-color: rgba(255, 224, 121, 0.82);
    background: linear-gradient(
      145deg,
      rgba(108, 101, 73, 0.74),
      rgba(30, 38, 48, 0.9)
    );
    transform: translateY(-2px);
    box-shadow:
      0 0 0 2px rgba(255, 224, 121, 0.16),
      0 12px 24px rgba(0, 0, 0, 0.32);

    ${HoverShine} {
      animation: ${buttonHoverShimmer} 0.38s cubic-bezier(0.23, 1, 0.32, 1) both;
    }

    &::after {
      opacity: 1;
      transform: scale(0.985);
      animation: none;
    }
  }

  @media screen and (min-width: 769px) {
    min-height: 92px;
    border-radius: 14px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      outline: none;
      color: #fff8d9;
      border-color: rgba(255, 224, 121, 0.9);
      background: linear-gradient(
        145deg,
        rgba(116, 106, 72, 0.8),
        rgba(28, 37, 48, 0.94)
      );
      transform: translateY(-3px) scale(1.018);
      box-shadow:
        0 0 0 2px rgba(255, 224, 121, 0.18),
        0 0 26px rgba(255, 207, 67, 0.22),
        0 14px 30px rgba(0, 0, 0, 0.34);
      transition:
        border-color 0.16s ease,
        background 0.16s ease,
        transform 0.16s cubic-bezier(0.23, 1, 0.32, 1),
        box-shadow 0.16s ease-out,
        color 0.16s ease;

      ${HoverShine} {
        animation: ${buttonHoverShimmer} 0.38s cubic-bezier(0.23, 1, 0.32, 1)
          both;
      }

      &::after {
        opacity: 1;
        transform: scale(0.985);
        animation: none;
      }
    }
  }

  &:active {
    transform: translateY(1px) scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }

    ${HoverShine} {
      animation: none;
    }
  }
`;

export const CategoryIcon = styled.span`
  display: flex;
  width: 27px;
  height: 27px;
  color: #e7d39b;
  align-items: center;
  justify-content: center;
  will-change: transform;
  animation: ${iconFloat} 3.4s var(--button-motion-delay) ease-in-out infinite;
  transition: none;

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  ${CategoryButton}:focus-visible & {
    color: #fff0a6;
    filter: drop-shadow(0 0 7px rgba(255, 220, 101, 0.68));
    transform: translateY(-2px) scale(1.1) rotate(-4deg);
    animation: none;
  }

  @media (hover: hover) and (pointer: fine) {
    ${CategoryButton}:hover & {
      color: #fff0a6;
      filter: drop-shadow(0 0 7px rgba(255, 220, 101, 0.68));
      transform: translateY(-2px) scale(1.1) rotate(-4deg);
      animation: none;
      transition:
        color 0.16s ease,
        filter 0.16s ease,
        transform 0.16s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CategoryName = styled.span`
  overflow: hidden;
  max-width: 100%;
  color: inherit;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.045em;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (min-width: 769px) {
    font-size: 1.6rem;
  }
`;
