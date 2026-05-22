import styled from "styled-components";

export const MobileHeader = styled.header`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  height: 64px;
  top: 0;
  background: ${(props) => props.theme.colors.mainBg};
  align-items: center;
  justify-content: space-between;
  z-index: 11;
`;

export const MobileHeaderImgSpan = styled.span`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 24px;
`;

export const Popup = styled.div`
  position: static;
  top: 30px;
`;
