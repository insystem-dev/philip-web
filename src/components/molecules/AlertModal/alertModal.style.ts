import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const AlertModalBg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  background: ${(props) => props.theme.colors.black}99;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.15s ease-out;
`;

export const AlertModal = styled.div`
  display: flex;
  width: 340px;
  max-width: calc(100vw - 32px);
  padding: 36px 32px 32px;
  background: ${(props) => props.theme.colors.searchBarBg};
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  animation: ${popIn} 0.18s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AlertModalTit = styled.h2`
  margin: 0;
  color: white;
  font-size: 1.9rem;
  font-weight: 500;
  font-family: "Roboto";
`;

/** 버튼 영역 — 확인 1개일 때도 폭 100%를 유지하고, 취소가 붙으면 좌우로 나눠 배치한다 */
export const AlertModalBtns = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const AlertModalMsg = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.subTxt};
  font-size: 1.4rem;
  line-height: 1.6;
  white-space: pre-line;
`;
