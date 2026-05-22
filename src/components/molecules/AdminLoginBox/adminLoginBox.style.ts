import styled from "styled-components";

export const AdminLoginBox = styled.form`
  display: flex;
  width: 420px;
  max-height: 490px;
  padding: 70px 80px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
  align-items: center;
  flex-direction: column;
  gap: 40px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 0;
    background: none;
  }
`;

export const LoginTit = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: 500;
  font-family: "Roboto";
  color: ${(props) => props.theme.colors.adminMainTxt};
`;

export const LoginInputBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
