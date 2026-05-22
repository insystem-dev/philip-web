import styled from "styled-components";

export const LoginPage = styled.section`
  display: flex;
  padding: 120px 0;
  align-items: center;
  justify-content: center;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    min-height: calc(100vh - 302px);
    padding: 70px 60px;
    align-items: flex-start;
  }
`;
