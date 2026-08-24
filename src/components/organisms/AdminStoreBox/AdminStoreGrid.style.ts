import styled from "styled-components";

export const AdminStoreBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  gap: 15px;
`;

export const Pagination = styled.nav`
  display: grid;
  min-height: 46px;
  padding: 7px 10px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  grid-template-columns: minmax(180px, 1fr) auto minmax(180px, 1fr);
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr auto;
  }
`;

export const PageSummary = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.25rem;
  align-items: center;
  gap: 3px;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-weight: 700;
  }

  span {
    margin-left: 7px;
    color: ${(props) => props.theme.colors.adminPlaceholder};
  }
`;

export const PageControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  @media screen and (max-width: 900px) {
    grid-row: 2;
    grid-column: 1 / -1;
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.primary
        : props.theme.colors.adminInputBorder};
  border-radius: 4px;
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.adminMainTxt};
  background: ${(props) =>
    props.$active ? props.theme.colors.primary : props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) =>
      props.$active ? props.theme.colors.white : props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    color: ${(props) => props.theme.colors.adminPlaceholder};
    background: ${(props) => props.theme.colors.adminInputBg};
    cursor: default;
  }
`;

export const PageSizeLabel = styled.label`
  display: flex;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;

  select {
    height: 30px;
    padding: 0 24px 0 8px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: ${(props) => props.theme.colors.white};
    font-size: 1.2rem;
  }
`;
