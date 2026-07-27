import styled, { css, keyframes } from "styled-components";

export const MobileHeader = styled.header`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  height: 64px;
  top: 0;
  background: ${(props) => props.theme.colors.mainBg};
  align-items: center;
  justify-content: space-between;
  z-index: 11;
`;

export const MobileHeaderImgSpan = styled.span`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 24px;
`;

export const UserMenu = styled.div`
  position: relative;
  display: flex;
`;

const panelIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const UserMenuPanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 8px;
  z-index: 20;
  min-width: 148px;
  padding: 6px;
  background: #2c2c31;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  transform-origin: top right;
  visibility: ${(props) => (props.$open ? "visible" : "hidden")};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  pointer-events: ${(props) => (props.$open ? "auto" : "none")};
  transition: opacity 0.14s ease-out, visibility 0.14s;

  /* 아이콘 정중앙을 가리키는 말풍선 꼬리 */
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 24px;
    width: 10px;
    height: 10px;
    background: #2c2c31;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    transform: rotate(45deg);
  }

  ${(props) =>
    props.$open &&
    css`
      animation: ${panelIn} 0.16s ease-out;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: opacity 0.12s linear;
  }
`;

export const UserMenuItem = styled.button`
  display: flex;
  width: 100%;
  height: 42px;
  padding: 0 14px;
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  background: none;
  border: none;
  border-radius: 9px;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s ease-in-out;

  &:hover,
  &:active {
    background: ${(props) => props.theme.colors.primary}22;
  }
`;
