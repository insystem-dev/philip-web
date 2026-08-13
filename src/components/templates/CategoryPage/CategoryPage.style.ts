import styled, { css, keyframes } from "styled-components";

const backdropIn = keyframes`
  from { opacity: 0; transform: scale(1.12); }
  to { opacity: 1; transform: scale(1.055); }
`;

const flagWave = keyframes`
  0%, 100% {
    transform: perspective(900px) rotateY(-1.2deg) skewY(-0.22deg) scale(1.055) translate3d(-0.45%, -0.15%, 0);
    background-position: 0% 50%, 100% 48%, 0 0, 0 0;
  }
  25% {
    transform: perspective(900px) rotateY(0.7deg) skewY(0.18deg) scale(1.065) translate3d(0.25%, 0.12%, 0);
    background-position: 3% 47%, 97% 52%, 10px 3px, 0 0;
  }
  52% {
    transform: perspective(900px) rotateY(1.25deg) skewY(0.34deg) scale(1.06) translate3d(0.55%, -0.08%, 0);
    background-position: 5% 52%, 95% 46%, 18px -2px, 0 0;
  }
  76% {
    transform: perspective(900px) rotateY(-0.35deg) skewY(-0.12deg) scale(1.07) translate3d(-0.12%, 0.18%, 0);
    background-position: 2% 48%, 98% 51%, 7px 2px, 0 0;
  }
`;

const foldDrift = keyframes`
  0%, 100% { transform: translate3d(-16%, 0, 0) skewX(-8deg); opacity: .24; }
  45% { transform: translate3d(18%, 0, 0) skewX(6deg); opacity: .52; }
  70% { transform: translate3d(31%, 0, 0) skewX(-3deg); opacity: .31; }
`;

const brandSettle = keyframes`
  0% { opacity: 0; transform: translateY(82px) scale(.74); filter: blur(7px); }
  18% { opacity: .55; }
  44% { opacity: 1; transform: translateY(70px) scale(1.68); filter: blur(0); }
  58% { transform: translateY(66px) scale(1.68); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
`;

const glint = keyframes`
  0%, 14% { background-position: 135% 0; opacity: 0; }
  20% { opacity: .9; }
  38% { background-position: -35% 0; opacity: 1; }
  39%, 73% { opacity: 0; }
  78% { background-position: 135% 0; opacity: .72; }
  94% { background-position: -35% 0; opacity: .78; }
  95%, 100% { opacity: 0; }
`;

const sparkle = keyframes`
  0%, 58%, 100% { opacity: 0; transform: scale(.2) rotate(0deg); filter: blur(1px); }
  65% { opacity: 1; transform: scale(1.18) rotate(28deg); filter: blur(0); }
  72% { opacity: .32; transform: scale(.68) rotate(52deg); }
  78% { opacity: 1; transform: scale(1) rotate(78deg); }
  86% { opacity: 0; transform: scale(.15) rotate(110deg); }
`;

const copyIn = keyframes`
  from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
`;

const contactIn = keyframes`
  from { opacity: 0; transform: translateY(26px) scale(.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const CategoryPage = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  min-height: calc(100vh - 64px);
  padding: 36px 20px 52px;
  color: white;
  background: #091527;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background:
      radial-gradient(
        circle at 50% 9%,
        rgba(255, 227, 146, 0.14),
        transparent 22%
      ),
      linear-gradient(
        180deg,
        rgba(4, 11, 22, 0.08),
        rgba(2, 8, 17, 0.54) 68%,
        rgba(2, 7, 14, 0.88)
      );
    pointer-events: none;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    min-height: 100dvh;
    padding: 70px 18px 28px;
    justify-content: flex-start;
    gap: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-delay: 0ms !important;
    }
  }
`;

export const FlagBackdrop = styled.div`
  position: absolute;
  z-index: -2;
  overflow: hidden;
  inset: 0;
`;

export const FlagSurface = styled.div`
  position: absolute;
  overflow: hidden;
  inset: -4%;
  background:
    radial-gradient(
      ellipse at 18% 80%,
      rgba(255, 255, 255, 0.12),
      transparent 22%
    ),
    radial-gradient(
      ellipse at 79% 48%,
      rgba(255, 255, 255, 0.1),
      transparent 20%
    ),
    repeating-linear-gradient(
      104deg,
      rgba(255, 255, 255, 0.025) 0 1px,
      transparent 1px 9px
    ),
    linear-gradient(
      90deg,
      #6d1322 0%,
      #8b1d30 48.5%,
      #103863 51.5%,
      #061d3f 100%
    );
  transform-origin: 50% 12%;
  will-change: transform, background-position;
  animation:
    ${backdropIn} 1.15s ease-out both,
    ${flagWave} 6.4s 1.15s ease-in-out infinite;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    background:
      radial-gradient(
        ellipse at 28% 58%,
        rgba(10, 4, 6, 0.36),
        transparent 38%
      ),
      radial-gradient(ellipse at 72% 70%, rgba(2, 9, 25, 0.42), transparent 40%);
    mix-blend-mode: multiply;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 58%;
    background:
      linear-gradient(142deg, rgba(255, 255, 255, 0.28), transparent 32%),
      linear-gradient(218deg, rgba(255, 255, 255, 0.18), transparent 31%),
      linear-gradient(180deg, #eee8d2, #d9d7cc);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    opacity: 0.88;
    filter: brightness(0.78);
  }

  @media screen and (max-width: 768px) {
    transform: scale(1.055);
    animation: none;
    will-change: auto;
  }
`;

export const FlagFold = styled.span<{ $index: number }>`
  position: absolute;
  z-index: 2;
  top: -8%;
  bottom: -8%;
  left: ${(props) => 12 + props.$index * 21}%;
  width: ${(props) => 16 + props.$index * 2}%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 23%,
    rgba(255, 255, 255, 0.2) 45%,
    rgba(0, 0, 0, 0.24) 67%,
    transparent 100%
  );
  mix-blend-mode: soft-light;
  filter: blur(${(props) => 10 + props.$index * 3}px);
  transform: skewX(-8deg);
  pointer-events: none;
  animation: ${foldDrift} ${(props) => 5.3 + props.$index * 0.9}s
    ${(props) => -props.$index * 1.7}s ease-in-out infinite;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const FlagSun = styled.span`
  position: absolute;
  z-index: 1;
  top: 82px;
  left: 50%;
  color: rgba(178, 143, 25, 0.7);
  font-family: Georgia, serif;
  font-size: 98px;
  line-height: 1;
  transform: translateX(-50%);
`;

export const FlagStar = styled.span<{ $position: "left" | "right" | "bottom" }>`
  position: absolute;
  z-index: 1;
  color: rgba(178, 143, 25, 0.68);
  font-size: 21px;
  line-height: 1;

  ${(props) =>
    props.$position === "left" &&
    css`
      top: 34px;
      left: 9%;
    `}
  ${(props) =>
    props.$position === "right" &&
    css`
      top: 34px;
      right: 9%;
    `}
  ${(props) =>
    props.$position === "bottom" &&
    css`
      top: 43%;
      left: 50%;
      transform: translateX(-50%);
    `}
`;

export const CategoryContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: min(1060px, 100%);
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const TopBanner = styled.section`
  overflow: hidden;
  display: grid;
  width: 100%;
  grid-template-areas:
    "LG LG LG"
    "SM1 SM2 SM3";
  grid-template-rows: 180px 120px;
  gap: 8px;
  border-radius: 6px;
  opacity: 0;
  animation: ${copyIn} 0.55s 1.4s ease-out forwards;

  > div {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 180px 120px;
    gap: 2px;
    border-radius: 0;
  }
`;

export const CategoryArea = styled.div`
  display: flex;
  width: min(920px, 100%);
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const Brand = styled.h1`
  position: relative;
  overflow: visible;
  display: inline-flex;
  margin: 0 0 1px;
  padding: 0 0.22em 0.12em;
  color: #ead496;
  font-family: "Trebuchet MS", "Malgun Gothic", sans-serif;
  font-size: clamp(4.4rem, 7vw, 6.8rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.06em;
  text-shadow:
    0 1px 0 #fff3c0,
    0 3px 0 #7e6127,
    0 10px 24px rgba(0, 0, 0, 0.48),
    0 0 20px rgba(255, 228, 142, 0.22);
  transform-origin: center top;
  animation: ${brandSettle} 1.25s 0.06s cubic-bezier(0.16, 0.82, 0.2, 1) both;

  @media screen and (max-width: 768px) {
    font-size: 3.8rem;
  }
`;

export const BrandText = styled.span`
  position: relative;
  display: inline-block;
  padding: 0.08em 0.12em 0.13em 0.08em;
  margin: -0.08em -0.12em -0.13em -0.08em;

  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0.08em 0.12em 0.13em 0.08em;
    color: transparent;
    background: linear-gradient(
      108deg,
      transparent 35%,
      rgba(255, 255, 255, 0.18) 43%,
      #fffce4 50%,
      rgba(255, 241, 169, 0.28) 57%,
      transparent 65%
    );
    background-size: 260% 100%;
    background-position: 135% 0;
    background-clip: text;
    -webkit-background-clip: text;
    pointer-events: none;
    animation: ${glint} 3.25s 0.12s ease-in-out infinite;
  }
`;

export const BrandSparkle = styled.span<{
  $position: "left" | "top" | "right" | "bottom";
}>`
  position: absolute;
  z-index: 2;
  color: #fff9cf;
  font-size: 0.42em;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  text-shadow:
    0 0 5px white,
    0 0 12px #fff2a6,
    0 0 24px #ffd45c;
  animation: ${sparkle} 3.2s ease-in-out infinite;

  ${(props) =>
    props.$position === "left" &&
    css`
      top: 32%;
      left: 5%;
      animation-delay: 0.55s;
    `}
  ${(props) =>
    props.$position === "top" &&
    css`
      top: -3%;
      left: 48%;
      font-size: 0.3em;
      animation-delay: 1.35s;
    `}
  ${(props) =>
    props.$position === "right" &&
    css`
      top: 27%;
      right: 3%;
      font-size: 0.5em;
      animation-delay: 2.05s;
    `}
  ${(props) =>
    props.$position === "bottom" &&
    css`
      right: 26%;
      bottom: -2%;
      font-size: 0.28em;
      animation-delay: 2.65s;
    `}
`;

export const BottomBanners = styled.section`
  position: relative;
  z-index: 1;
  display: block;
  overflow: hidden;
  width: min(1240px, 100%);
  border-radius: 6px;
  opacity: 0;
  animation: ${copyIn} 0.55s 1.55s ease-out forwards;

  > div {
    width: 100%;
    border-radius: 6px;
  }

  @media screen and (max-width: 768px) {
    > div {
      border-radius: 0;
    }
  }
`;

export const ContactArea = styled.div`
  display: flex;
  width: min(920px, 100%);
  justify-content: center;
  opacity: 0;
  animation: ${contactIn} 0.5s 1.15s cubic-bezier(0.18, 0.82, 0.2, 1) forwards;
`;

export const CategoryTxtBox = styled.div`
  color: rgba(255, 250, 236, 0.84);
  font-size: 2rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.55);
  opacity: 0;
  animation: ${copyIn} 0.45s 0.76s ease-out forwards;

  @media screen and (min-width: 769px) {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.55rem;
  }
`;
