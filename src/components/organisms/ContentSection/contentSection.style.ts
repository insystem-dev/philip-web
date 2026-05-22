import styled from "styled-components";

export const ContentSection = styled.section`
  grid-area: CT;
  display: flex;
  flex-direction: column;
  gap: 32px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 20px 16px 40px;
  }
`;
