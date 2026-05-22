import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  z-index: 5;

  &.page-load-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.black}b2;
    z-index: 999;
  }

  .loader {
    display: flex;
    height: 30px;
    width: 30px;

    &.loader-1 {
      border-radius: 50%;
      border-top: 3px solid rgba(255, 255, 255, 0.5);
      border-right: 3px solid rgba(255, 255, 255, 0.5);
      border-bottom: 3px solid rgba(255, 255, 255, 0.5);
      border-left: 3px solid rgba(255, 255, 255, 1);
      animation: loader 1s cubic-bezier(0.41, 0.25, 0.32, 0.83) infinite;
    }
  }

  .loading-txt {
    margin-top: 10px;
    color: ${(props) => props.theme.colors.white};
    font-size: 1.6rem;
  }

  @keyframes loader {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }
`;
