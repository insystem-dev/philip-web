import styled, { css, keyframes } from "styled-components";

const contactShimmer = keyframes`
  0%, 82% { opacity: 0; transform: translate3d(-180%, 0, 0) skewX(-20deg); }
  84% { opacity: .36; }
  87% { opacity: .94; }
  91%, 100% { opacity: 0; transform: translate3d(520%, 0, 0) skewX(-20deg); }
`;

const contactHoverShimmer = keyframes`
  0% { opacity: 0; transform: translate3d(-180%, 0, 0) skewX(-20deg); }
  24% { opacity: .82; }
  100% { opacity: 0; transform: translate3d(520%, 0, 0) skewX(-20deg); }
`;

const contactAura = keyframes`
  0%, 100% { opacity: .18; transform: scale(.97); }
  50% { opacity: .62; transform: scale(1); }
`;

const iconBob = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  45% { transform: translate3d(0, -2px, 0) rotate(-3deg); }
  68% { transform: translate3d(0, -1px, 0) rotate(2deg); }
`;

export const ContactBox = styled.div<{ $layout: "row" | "column" }>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => props.$layout};
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => (props.$layout === "row" ? "24px" : "8px")};

  @media screen and (max-width: 768px) {
    gap: ${(props) => (props.$layout === "row" ? "8px" : "8px")};
  }

  ${(props) =>
    props.$layout === "column" &&
    css`
      > button {
        width: 100%;
        flex: none;
      }
    `}
`;

export const KakaoLinkTitBox = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 768px) {
    gap: 7px;
  }
`;

export const IconCircle = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  will-change: transform;
  animation: ${iconBob} 3.1s ease-in-out infinite;
  transition: none;
`;

export const KakaoLinkTxtSpan = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
  transition: none;

  svg path {
    fill: ${(props) => props.theme.colors.callTxt};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HoverShine = styled.span`
  position: absolute;
  z-index: 2;
  top: -65%;
  left: 0;
  width: 24%;
  height: 230%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.22) 25%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.22) 75%,
    transparent
  );
  filter: blur(1px);
  opacity: 0;
  transform: translate3d(-180%, 0, 0) skewX(-20deg);
  pointer-events: none;
  will-change: transform, opacity;
`;

export const KakaoLink = styled.button<{ $variant?: "call" | "kakao" }>`
  --contact-bg: ${(props) => props.theme.colors.callBg};
  --contact-hover-bg: ${(props) => props.theme.colors.callBgHover};
  --contact-base-shadow: rgba(124, 179, 66, 0.35);
  --contact-hover-ring: rgba(225, 255, 184, 0.18);
  --contact-hover-shadow: rgba(104, 159, 56, 0.45);
  --contact-active-shadow: rgba(104, 159, 56, 0.35);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  width: auto;
  min-width: 0;
  flex: 1 1 0;
  height: 56px;
  padding: 0 20px;
  color: ${(props) => props.theme.colors.callTxt};
  font: inherit;
  background: var(--contact-bg);
  border: 0;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 6px 16px var(--contact-base-shadow);
  -webkit-tap-highlight-color: transparent;
  transition: none;

  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    top: -65%;
    left: 0;
    width: 24%;
    height: 230%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.22) 25%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 0.22) 75%,
      transparent
    );
    filter: blur(1px);
    opacity: 0;
    transform: translate3d(-180%, 0, 0) skewX(-20deg);
    pointer-events: none;
    will-change: transform, opacity;
    animation: ${contactShimmer} 4.8s 1.2s linear infinite backwards;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    inset: 2px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: calc(10px - 2px);
    background: radial-gradient(
      circle at 50% 0,
      rgba(255, 255, 255, 0.24),
      transparent 58%
    );
    opacity: 0.18;
    transform: scale(0.97);
    pointer-events: none;
    will-change: transform, opacity;
    animation: ${contactAura} 3.6s
      ${(props) => (props.$variant === "kakao" ? "1.1s" : "0s")} ease-in-out
      infinite backwards;
  }

  ${KakaoLinkTitBox},
  ${ArrowIcon} {
    position: relative;
    z-index: 1;
  }

  ${IconCircle} {
    animation-delay: ${(props) =>
      props.$variant === "kakao" ? "-1.45s" : "-0.2s"};
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 250, 218, 0.92);
    outline-offset: 3px;
    background: var(--contact-hover-bg);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px var(--contact-hover-shadow);

    ${HoverShine} {
      animation: ${contactHoverShimmer} 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
    }

    &::after {
      opacity: 0.9;
      transform: scale(0.985);
      animation: none;
    }

    ${IconCircle} {
      filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.62));
      transform: translateY(-1px) scale(1.1) rotate(-5deg);
      animation: none;
    }

    ${ArrowIcon} {
      transform: translateX(4px);
    }
  }

  &:disabled,
  &[aria-disabled="true"] {
    cursor: default;
    opacity: 0.6;
    box-shadow: none;

    &:hover {
      background: var(--contact-bg);
      transform: none;
    }

    &::before,
    &::after,
    ${IconCircle} {
      animation: none;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:not(:disabled):hover {
      background: var(--contact-hover-bg);
      transform: translateY(-3px) scale(1.01);
      box-shadow:
        0 0 0 2px var(--contact-hover-ring),
        0 12px 25px var(--contact-hover-shadow);
      transition:
        background 0.15s ease,
        transform 0.16s cubic-bezier(0.23, 1, 0.32, 1),
        box-shadow 0.16s ease-out;

      ${HoverShine} {
        animation: ${contactHoverShimmer} 0.4s cubic-bezier(0.23, 1, 0.32, 1)
          both;
      }

      &::after {
        opacity: 0.9;
        transform: scale(0.985);
        animation: none;
      }

      ${IconCircle} {
        filter: drop-shadow(0 0 7px rgba(255, 255, 255, 0.62));
        transform: translateY(-1px) scale(1.1) rotate(-5deg);
        animation: none;
        transition:
          transform 0.16s cubic-bezier(0.23, 1, 0.32, 1),
          filter 0.16s ease;
      }

      ${ArrowIcon} {
        transform: translateX(4px);
        transition: transform 0.16s cubic-bezier(0.23, 1, 0.32, 1);
      }
    }
  }

  //카카오톡 문의: 카카오 브랜드 노란색 계열로 표시
  ${(props) =>
    props.$variant === "kakao" &&
    css`
      --contact-bg: ${props.theme.colors.kakaoBg};
      --contact-hover-bg: ${props.theme.colors.kakaoBgHover};
      --contact-base-shadow: rgba(247, 230, 0, 0.35);
      --contact-hover-ring: rgba(247, 230, 0, 0.22);
      --contact-hover-shadow: rgba(235, 219, 0, 0.45);
      --contact-active-shadow: rgba(235, 219, 0, 0.4);
      color: ${props.theme.colors.kakaoTxt};

      &[aria-disabled="true"]:hover {
        background: var(--contact-bg);
      }

      ${IconCircle} {
        background: rgba(0, 0, 0, 0.12);
      }

      ${IconCircle} svg path,
      ${ArrowIcon} svg path {
        fill: ${props.theme.colors.kakaoTxt};
      }
    `}

  &:not(:disabled):active {
    transform: translateY(0) scale(0.97);
    box-shadow: 0 4px 10px var(--contact-active-shadow);
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: auto;
    height: 56px;
    padding: 0 12px;
    border-radius: 6px;

    &::after {
      border-radius: 4px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after,
    ${IconCircle} {
      animation: none;
    }

    ${HoverShine} {
      animation: none;
    }
  }
`;
