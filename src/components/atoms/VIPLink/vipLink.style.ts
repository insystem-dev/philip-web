import styled from "styled-components";

export const VIPLink = styled.div`
  display: flex;
  width: 100%;
  height: 54px;
  padding: 0 20px;
  color: white;
  background: ${(props) => props.theme.colors.vipBg};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    path {
      fill: white;
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.vipBgHover};
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 56px;
    border-radius: 6px;
  }
`;

export const VIPLinkTitBox = styled.div`
  display: flex;
  font-size: 1.8rem;
  align-items: center;
  gap: 10px;
`;

export const VIPLinkTxtSpan = styled.span``;
