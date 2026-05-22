import styled, { css } from "styled-components";

interface InputFileProps {
  multiple?: boolean;
}

export const InputFile = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const FileLabelBox = styled.div<InputFileProps>`
  display: grid;
  font-size: 1.3rem;
  grid-template-columns: 80px 1fr 90px;
  gap: 5px;

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
    width: 90px;
    height: 35px;
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

export const FileTitBox = styled.div`
  display: flex;
  align-items: center;
`;

export const FileNameBox = styled.div`
  overflow: hidden;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 10px;
  font-size: 1.3rem;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  align-items: center;

  span {
    overflow: hidden;
    width: 100%;
    height: 100%;
    line-height: 30px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ImgPreviewList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

export const ImgPreviewItem = styled.li`
  overflow: hidden;
  position: relative;
  width: 220px;
  height: 140px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;
