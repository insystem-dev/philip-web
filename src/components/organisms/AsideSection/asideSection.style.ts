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
