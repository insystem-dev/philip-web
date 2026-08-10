import styled from "styled-components";

export const LoginBox = styled.div`
  display: flex;
  width: 420px;
  padding: 55px 60px;
  background: ${(props) => props.theme.colors.searchBarBg};
  align-items: center;
  flex-direction: column;
  gap: 20px;

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
`;

export const LocalForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;
`;

/** 회원가입 폼(UserSignupPage)과 동일한 인풋 톤을 유지한다 */
export const FieldList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;

  label {
    width: 100%;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    input {
      height: 48px;
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  width: 100%;
  color: white;
  align-items: center;
  gap: 10px;

  &::before,
  &::after {
    content: "";
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
    flex: 1;
  }

  span {
    font-size: 1.2rem;
  }
`;
