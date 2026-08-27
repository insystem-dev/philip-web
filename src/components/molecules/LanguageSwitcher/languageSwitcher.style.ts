import styled, { css } from "styled-components";

export const Switcher = styled.div`
  display: inline-flex;
  min-height: 42px;
  padding: 5px 7px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(20, 20, 22, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.24);
  align-items: center;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media screen and (max-width: 768px) {
    min-height: 38px;
    padding: 4px 6px;
    background: rgba(20, 20, 22, 0.82);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
`;

export const Globe = styled.span`
  position: relative;
  width: 18px;
  height: 18px;
  margin: 0 7px 0 3px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  opacity: 0.9;

  &::before,
  &::after,
  span {
    position: absolute;
    content: "";
  }

  &::before {
    top: 2px;
    right: 5px;
    bottom: 2px;
    left: 5px;
    border-right: 1px solid currentColor;
    border-left: 1px solid currentColor;
    border-radius: 50%;
  }

  &::after {
    top: 50%;
    right: 1px;
    left: 1px;
    border-top: 1px solid currentColor;
    transform: translateY(-50%);
  }
`;

export const Option = styled.button<{ $active: boolean }>`
  height: 30px;
  padding: 0 12px;
  color: inherit;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  background: transparent;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;

  ${(props) =>
    props.$active &&
    css`
      color: #1b1b1d;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
    `}

  &:focus-visible {
    outline: 2px solid #f5cf58;
    outline-offset: 2px;
  }

  @media screen and (max-width: 768px) {
    height: 28px;
    padding: 0 10px;
    font-size: 1.2rem;
  }
`;

export const Divider = styled.span`
  width: 1px;
  height: 14px;
  margin: 0 1px;
  background: rgba(255, 255, 255, 0.16);
`;
