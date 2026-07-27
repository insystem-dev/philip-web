import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const KakaoLoginBox = styled.div`
  display: flex;
  width: 420px;
  max-height: 490px;
  padding: 70px 80px;
  background: ${(props) => props.theme.colors.searchBarBg};
  align-items: center;
  flex-direction: column;
  gap: 24px;
  text-align: center;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0;
    background: none;
  }
`;

/** 카카오 인증 → PHILIP 전환을 은유하는 스피너: 카카오 옐로우 accent 링 */
export const Spinner = styled.span`
  display: block;
  width: 48px;
  height: 48px;
  border: 3px solid rgba(255, 255, 255, 0.16);
  border-top-color: ${(props) => props.theme.colors.kakaoBg};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1.6s;
  }
`;

export const KakaoLoginTit = styled.div`
  color: white;
  font-size: 2.2rem;
  font-weight: 500;
  font-family: "Roboto";
`;

export const KakaoLoginDesc = styled.p`
  color: ${(props) => props.theme.colors.subTxt};
  font-size: 1.4rem;
  line-height: 1.6;
`;
