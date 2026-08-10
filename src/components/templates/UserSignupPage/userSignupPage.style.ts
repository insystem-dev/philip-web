import styled from "styled-components";

export const UserSignupPage = styled.section`
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

export const SignupBox = styled.form`
  display: flex;
  width: 420px;
  padding: 55px 60px;
  background: ${(props) => props.theme.colors.searchBarBg};
  align-items: center;
  flex-direction: column;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    background: none;
  }
`;

export const SignupTit = styled.div`
  color: white;
  font-size: 3rem;
  font-weight: 500;
  font-family: "Roboto";
`;

export const FieldList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;

  //공통 InputText(layout="row")의 라벨을 세로 배치로만 전환한다
  label {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    input {
      height: 48px;
    }
  }
`;

export const IdField = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

export const IdRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 10px;

  > *:first-child {
    flex: 1;
  }
`;

/** 아이디 중복확인 결과·약관 동의 등 필드 하단 상태 메시지 공용 */
export const IdMessage = styled.p<{ status: string }>`
  color: ${(props) =>
    props.status === "success"
      ? props.theme.colors.callBg
      : props.theme.colors.red};
  font-size: 1.2rem;
`;

export const Terms = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  background: ${(props) => props.theme.colors.mainBg};
  flex-direction: column;
  gap: 10px;

  strong {
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
  }

  p {
    color: ${(props) => props.theme.colors.subTxt};
    font-size: 1.2rem;
    line-height: 1.6;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
  }

  .displayValue {
    color: white;
    font-size: 1.3rem;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    background: ${(props) => props.theme.colors.search};
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
