import styled, { css } from "styled-components";

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
      > div {
        width: 100%;
        flex: none;
      }
    `}
`;

export const KakaoLink = styled.div`
  display: flex;
  width: auto;
  min-width: 0;
  flex: 1 1 0;
  height: 56px;
  padding: 0 20px;
  color: ${(props) => props.theme.colors.callTxt};
  background: ${(props) => props.theme.colors.callBg};
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(124, 179, 66, 0.35);
  transition:
    background 0.15s ease-in-out,
    transform 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.colors.callBgHover};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(104, 159, 56, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(104, 159, 56, 0.35);
  }

  &[aria-disabled="true"] {
    cursor: default;
    opacity: 0.6;
    box-shadow: none;

    &:hover {
      background: ${(props) => props.theme.colors.callBg};
      transform: none;
    }
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: auto;
    height: 56px;
    padding: 0 12px;
    border-radius: 6px;
  }
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

  svg path {
    fill: ${(props) => props.theme.colors.callTxt};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
