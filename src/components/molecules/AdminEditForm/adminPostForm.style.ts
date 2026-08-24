import styled from "styled-components";

export const PostFormBox = styled.form`
  overflow: auto;
  display: grid;
  height: 100%;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const PostFormImgBox = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 120px 1fr;
  grid-auto-rows: max-content;
  align-content: start;
  gap: 20px 10px;
`;

export const PostFormInfoBox = styled.div`
  display: flex;
  padding: 30px;
  background: ${(props) => props.theme.colors.adminInputBg};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  flex-direction: column;
  gap: 10px;
`;

export const PostFormBtnBox = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  grid-column: 1/3;
  padding: 14px 0;
  background: ${(props) => props.theme.colors.white};
  border-top: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;

export const PostFormBoxTit = styled.div`
  display: flex;
  font-size: 1.6rem;
  margin-bottom: 10px;
  flex-direction: column;
  gap: 5px;

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.2rem;
  }
`;

export const PostFormImgInput = styled.div`
  display: flex;
  height: 220px;
`;

export const ViewsSection = styled.section`
  padding-top: 20px;
  margin-top: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;

export const ViewsTitle = styled.h3`
  margin: 0 0 12px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.6rem;
`;

export const ViewsSummary = styled.div`
  display: grid;
  margin-bottom: 14px;
  grid-template-columns: 1fr 1fr;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.white};

  div {
    display: flex;
    padding: 12px;
    flex-direction: column;
    gap: 5px;

    &:first-child {
      border-right: 1px solid ${(props) => props.theme.colors.adminDivider};
    }
  }

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.2rem;
  }

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.6rem;
  }
`;

export const ViewsOptions = styled.div`
  display: flex;
  margin-bottom: 14px;
  flex-direction: column;
  gap: 8px;

  label {
    display: flex;
    padding: 11px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 5px;
    align-items: flex-start;
    gap: 9px;
    cursor: pointer;
  }

  input {
    margin-top: 3px;
    accent-color: ${(props) => props.theme.colors.primary};
  }

  label > span {
    display: flex;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.2rem;
    line-height: 1.45;
    flex-direction: column;
  }

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.3rem;
  }
`;

export const ViewsControl = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 8px;

  > label {
    width: 100%;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const ViewsInput = styled.div`
  display: flex;
  width: 190px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  background: ${(props) => props.theme.colors.white};
  align-items: center;
  overflow: hidden;

  input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 0;
    outline: none;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: transparent;
    font-size: 1.4rem;
  }

  input:disabled {
    color: ${(props) => props.theme.colors.adminPlaceholder};
    background: ${(props) => props.theme.colors.adminDivider};
  }

  span {
    padding: 0 10px;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.3rem;
  }
`;

export const ViewsSaveButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: ${(props) => props.theme.colors.disabledBtn};
    cursor: default;
  }
`;

export const ViewsError = styled.p`
  margin-top: 7px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
`;
