import styled from "styled-components";

export const LoginBox = styled.form`
  display: flex;
  width: 420px;
  max-height: 490px;
  padding: 70px 80px;
  background: ${(props) => props.theme.colors.searchBarBg};
  align-items: center;
  flex-direction: column;
  gap: 10px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0;
    background: none;
  }
`;
export const IdCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const LoginTit = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: 500;
  font-family: "Roboto";
`;
