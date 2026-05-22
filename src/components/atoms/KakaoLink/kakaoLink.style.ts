import styled from "styled-components";

export const KakaoLink = styled.div`
  display: flex;
  width: 100%;
  height: 54px;
  padding: 0 20px;
  color: ${(props) => props.theme.colors.kakaoTxt};
  background: ${(props) => props.theme.colors.kakaoBg};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.kakaoBgHover};
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 56px;
    border-radius: 6px;
  }
`;

export const KakaoLinkTitBox = styled.div`
  display: flex;
  font-size: 1.8rem;
  align-items: center;
  gap: 10px;
`;

export const KakaoLinkTxtSpan = styled.span``;
