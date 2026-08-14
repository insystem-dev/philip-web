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

    /* TreeList(공통코드) — DataGrid와 동일한 룩을 treelist 클래스에도 적용 */
    .dx-treelist-headers {
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

    .dx-treelist-rowsview {
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

        /* 최상위 코드 행 — 배경 틴트 + 이름 굵게로 하위 행과 구분 */
        &.code-row-root {
          td {
            background: rgba(68, 98, 255, 0.05);
          }

          /* 이름 열만 굵게 — 읽기 모드는 텍스트, 편집 모드는 입력이 들어온다 */
          td:first-child,
          td:first-child input {
            font-weight: 700;
          }
        }

        &.dx-row-focused {
          td {
            color: ${(props) => props.theme.colors.primary};
            background: ${(props) => props.theme.colors.adminBorder};
          }
        }
      }

      /* 펼침/접힘 화살표 — 브랜드 컬러로 강조해 하위 존재 여부가 눈에 띄게 */
      .dx-treelist-collapsed,
      .dx-treelist-expanded {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
`;

export const TreeToolbar = styled.div`
  display: flex;
  padding-bottom: 8px;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
`;

export const ModeState = styled.span<{ $edit: boolean }>`
  display: inline-flex;
  height: 26px;
  padding: 0 10px;
  margin-right: auto;
  border: 1px solid
    ${(props) =>
      props.$edit
        ? props.theme.colors.primary
        : props.theme.colors.adminInputBorder};
  border-radius: 13px;
  color: ${(props) =>
    props.$edit
      ? props.theme.colors.primary
      : props.theme.colors.adminLabelTxt};
  background: ${(props) =>
    props.$edit ? "rgba(68, 98, 255, 0.09)" : props.theme.colors.adminInputBg};
  font-size: 1.15rem;
  font-weight: 600;
  align-items: center;
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
  gap: 2px;

  /* 편집 중에는 연필 버튼을 숨긴다 (이미 편집 상태이므로) */
  &:focus-within button {
    visibility: hidden;
  }
`;

/** 하위 코드 행의 └ 모양 연결 가이드 — 상위-하위 관계를 시각적으로 표시 */
export const ChildGuide = styled.span`
  width: 10px;
  height: 10px;
  margin: -8px 6px 0 2px;
  border-left: 1px solid ${(props) => props.theme.colors.adminPlaceholder};
  border-bottom: 1px solid ${(props) => props.theme.colors.adminPlaceholder};
  border-radius: 0 0 0 3px;
  flex: none;
`;

/** 이름 수정 가능 표시 연필 버튼 — 클릭 시 이름 입력에 포커스 */
export const NameEditButton = styled.button`
  display: flex;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  background: transparent;
  align-items: center;
  justify-content: center;
  flex: none;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.adminInputBg};
  }
`;

/** 이름 표시 전용 셀 텍스트 (지역별 카테고리 화면은 이름을 여기서 고치지 않는다) */
export const CodeNameText = styled.span`
  overflow: hidden;
  flex: 1;
  min-width: 0;
  padding: 0 9px;
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

/** 전역값과 다르게 이 지역 전용 설정이 저장된 행 표시 배지 */
export const OverrideBadge = styled.span<{ $on: boolean }>`
  display: inline-flex;
  height: 22px;
  padding: 0 10px;
  border-radius: 11px;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.$on ? props.theme.colors.primary : props.theme.colors.adminLabelTxt};
  background: ${(props) =>
    props.$on ? "rgba(68, 98, 255, 0.09)" : props.theme.colors.adminInputBg};
  border: 1px solid
    ${(props) =>
      props.$on ? props.theme.colors.primary : props.theme.colors.adminInputBorder};
`;

export const CodeNameInput = styled.input`
  flex: 1;
  min-width: 0;
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
