import styled from "styled-components";

interface IntroProps {
  window: number;
}

export const IntroPage = styled.div<IntroProps>`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: ${(props) => (props.window < 769 ? "0 60px" : "0")};
  background: ${(props) => props.theme.colors.mainBg};
  align-items: center;
  justify-content: ${(props) => (props.window < 769 ? "flex-start" : "center")};
  transition: all 0.5s ease-in-out;
  opacity: 1;
  z-index: 15;

  &.delayed {
    opacity: 0;
    z-index: -1;
  }
`;

export const IntroLogo = styled.div`
  width: 100px;
  height: 100px;
  background: white;
`;
