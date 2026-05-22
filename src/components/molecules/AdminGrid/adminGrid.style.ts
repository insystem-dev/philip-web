import styled from "styled-components";

export const AdminGrid = styled.div`
  height: calc(100vh - 232px);

  .dx-datagrid {
    height: calc(100vh - 252px);

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
