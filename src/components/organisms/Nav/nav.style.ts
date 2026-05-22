import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  padding: 5px 0;
  justify-content: center;
  gap: 10px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
