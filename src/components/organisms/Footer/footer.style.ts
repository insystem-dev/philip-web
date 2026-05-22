import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterRow = styled.div`
  display: flex;
  width: 100%;
  max-width: 1240px;
  height: 100%;
  padding: 20px 0 80px;
  align-items: center;
  justify-content: space-between;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    padding: 60px 16px 100px;
    align-items: flex-start;
    flex-direction: column;
    gap: 70px;
  }
`;

export const FooterLinkBox = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.white};
  align-items: center;
  gap: 80px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 60px;
  }
`;

export const FooterBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
`;

export const FooterCopySpan = styled.span`
  color: white;
  font-size: 1.2rem;
`;
