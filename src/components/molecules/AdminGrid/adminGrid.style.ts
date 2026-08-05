import styled from "styled-components";

export const AdminGrid = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 0;
  flex: 1;
  flex-direction: column;

  .dx-datagrid,
  .dx-treelist {
    height: 100%;
    min-height: 0;

    .dx-datagrid-headers {
      overflow: hidden;
      border: none;
      border-radius: 3px;

      .dx-header-row {
        background: ${(props) => props.theme.colors.primary};

        td {
          height: 40px;
          color: ${(props) => props.theme.colors.white};
          font-size: 1.4rem;
          font-weight: 500;
          vertical-align: middle;
          border: none;
        }
      }
    }

    .dx-datagrid-rowsview {
      border-top: none;

      .dx-row {
        td {
          height: 50px;
          color: ${(props) => props.theme.colors.dark};
          font-size: 1.4rem;
          vertical-align: middle;
          border-top: none;
          border-right: none;
          border-left: none;
          border-bottom: 1px solid ${(props) => props.theme.colors.adminBorder};
        }

        &.dx-row-focused {
          td {
            color: ${(props) => props.theme.colors.primary};
            background: ${(props) => props.theme.colors.adminBorder};

            button {
              color: ${(props) => props.theme.colors.white};
              background: ${(props) => props.theme.colors.primary};
            }
          }
        }

        &.dx-master-detail-row {
          td {
            padding: 10px 20px;
            background: ${(props) => props.theme.colors.adminDivider};

            div {
              font-size: 1.4rem;

              label {
                span {
                  color: ${(props) => props.theme.colors.adminLabelTxt};
                  font-weight: 400;
                }
              }

              .dx-field-item-content {
                color: ${(props) => props.theme.colors.black};
              }
            }
          }
        }
      }
    }
  }
`;

export const TreeToolbar = styled.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: flex-end;
  gap: 6px;
`;

export const TreeControlButton = styled.button`
  height: 28px;
  padding: 0 10px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.2rem;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.adminBorder};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const TreeListArea = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;

  > .dx-treelist {
    flex: 1;
    min-height: 0;
  }
`;

export const ViewCountCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const ViewCountInput = styled.input`
  width: 68px;
  height: 28px;
  padding: 0 6px;
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.3rem;
  text-align: right;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
`;

export const ErrorMsg = styled.div`
  padding: 5px 10px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.1rem;
  background: ${(props) => props.theme.colors.red}26;
  border-radius: 3px;
`;

export const AdminCellBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridLoading = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
`;

export const NameEngInput = styled.input`
  width: 100%;
  max-width: 120px;
  height: 30px;
  padding: 0 8px;
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.4rem;
  text-align: center;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

export const CodeNameCell = styled.div`
  display: flex;
  width: 100%;
  padding-left: 4px;
  align-items: center;
`;

export const CodeNameInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 0 9px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.dark};
  background: transparent;
  font-size: 1.4rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.adminInputBorder};
    background: ${(props) => props.theme.colors.white};
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.white};
    outline: none;
  }
`;
