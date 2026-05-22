import styled, { css } from "styled-components";

interface InputFileProps {
  multiple?: boolean;
}

export const InputFile = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

export const FileLabelBox = styled.div<InputFileProps>`
  display: flex;
  font-size: 1.3rem;
  align-items: center;
  gap: 10px;

  ${(props) =>
    props.multiple &&
    css`
      padding: 15px 0;
      color: ${(props) => props.theme.colors.adminLabelTxt};
      border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
      background: ${(props) => props.theme.colors.adminInputBg};
      justify-content: center;
      flex-direction: column;
    `}

  label {
    display: flex;
    width: 100px;
    height: 30px;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.func};
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.colors.funcHover};
    }
  }
`;

export const ImgPreviewList = styled.ul`
  overflow: auto;
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 180px;
  padding: 20px;
  flex-wrap: wrap;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 6px;
  gap: 10px;

  .empty-txt {
    display: flex;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.3rem;
    align-items: center;
    justify-content: center;
  }
`;

export const ImgPreviewItem = styled.li`
  display: flex !important;
  gap: 5px;

  button {
    padding: 0;

    svg {
      path:last-of-type {
        fill: ${(props) => props.theme.colors.dark};
      }
    }
  }
`;

export const ImgPriviewImg = styled.div`
  overflow: hidden;
  position: relative;
  width: 140px;
  height: 100px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;
