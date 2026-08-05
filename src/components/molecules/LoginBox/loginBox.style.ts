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
  display: flex; width: 100%; flex-direction: column; gap: 10px;
`;
export const LoginInput = styled.input`
  width: 100%; height: 46px; padding: 0 12px; border: 1px solid #ddd;
  border-radius: 4px; background: white; font-size: 1.4rem; outline: none;
  &:focus { border-color: ${(props) => props.theme.colors.primary}; }
`;
export const SignupLink = styled.div`
  width: 100%; text-align: right; font-size: 1.3rem;
  a { color: white; text-decoration: underline; }
`;
export const Divider = styled.div`
  display: flex; width: 100%; color: white; align-items: center; gap: 10px;
  &::before, &::after { content: ""; height: 1px; background: rgba(255,255,255,.4); flex: 1; }
  span { font-size: 1.2rem; }
`;
