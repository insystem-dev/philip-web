import styled from "styled-components";

export const AsideSection = styled.section`
  grid-area: AS;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(100vw);
    grid-template-rows: 120px 80px;
    grid-gap: 2px;
  }
`;

/** 모바일 메인에서는 환전 시세 카드를 노출하지 않는다. */
export const DesktopExchangeRate = styled.div`
  width: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
