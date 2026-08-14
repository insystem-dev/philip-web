import styled from "styled-components";
import {
  FlagBackdrop,
  FlagFold,
  FlagStar,
  FlagSun,
  FlagSurface,
} from "../CategoryPage/CategoryPage.style";

export { FlagBackdrop, FlagFold, FlagStar, FlagSun, FlagSurface };

export const MainLayout = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  min-height: calc(100vh - 80px);
  grid-template-areas:
    "BN BN BN BN"
    "CT CT CT AS";
  grid-template-columns: repeat(4, 295px);
  grid-template-rows: max-content max-content;
  padding: 20px 0 60px;
  align-content: start;
  justify-content: center;
  overflow-anchor: none;
  gap: 20px;
  background:
    repeating-linear-gradient(
      104deg,
      rgba(255, 255, 255, 0.018) 0 1px,
      transparent 1px 10px
    ),
    repeating-linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.01) 0 2px,
      rgba(0, 0, 0, 0.018) 2px 7px
    ),
    linear-gradient(
      90deg,
      #6d1322 0%,
      #8b1d30 48.5%,
      #103863 51.5%,
      #061d3f 100%
    );

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background:
      radial-gradient(
        circle at 50% 82px,
        rgba(255, 227, 146, 0.14),
        transparent 190px
      ),
      linear-gradient(
        180deg,
        rgba(4, 11, 22, 0.08) 0,
        rgba(2, 8, 17, 0.42) 560px,
        rgba(2, 7, 14, 0.58) 820px,
        rgba(2, 7, 14, 0.58) 100%
      );
    pointer-events: none;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    min-height: calc(100dvh - 64px);
    grid-template-areas:
      "BN"
      "AS"
      "CT";
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content max-content;
    padding: 0 16px;
    gap: 16px;
  }
`;
