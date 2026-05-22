import styled from "styled-components";

export const MainLayout = styled.div`
  display: grid;
  grid-template-areas:
    "BN BN BN BN"
    "CT CT CT AS"
    "CT CT CT AS";
  grid-template-columns: repeat(4, 295px);
  padding: 20px 0 60px;
  justify-content: center;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    grid-template-areas:
      "BN"
      "AS"
      "CT";
    grid-template-columns: 1fr;
    padding: 0 16px;
    gap: 16px;
  }
`;
