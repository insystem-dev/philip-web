import styled from "styled-components";

export const AdminSearchBox = styled.form`
  display: flex;
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.adminInputBg};
  border-radius: 3px;
  align-items: center;
  gap: 30px;
`;

export const AdminsearchItemBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AdminSearchTit = styled.div`
  font-size: 1.4rem;
`;

export const AdminCategoryFilter = styled.div`
  width: 210px;
`;

export const CategoryFilterWrap = styled.div`
  position: relative;
`;

export const CategoryFilterButton = styled.button`
  display: flex;
  width: 170px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const CategoryTreePanel = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 20;
  width: 300px;
  padding: 12px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
`;

export const CategoryTreeHeader = styled.div`
  display: flex;
  padding: 2px 4px 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.35rem;
  }

  button {
    padding: 0;
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const CategoryTreeBody = styled.div`
  overflow-y: auto;
  max-height: 340px;
`;

export const CategoryTreeRow = styled.div<{
  $depth: number;
  $active: boolean;
}>`
  display: flex;
  min-height: 34px;
  padding-left: ${(props) => props.$depth * 18}px;
  border-radius: 4px;
  background: ${(props) =>
    props.$active ? props.theme.colors.adminInputBg : "transparent"};
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.colors.adminInputBg};
  }
`;

export const TreeToggle = styled.button`
  width: 26px;
  height: 30px;
  padding: 0;
  border: 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  background: transparent;
  cursor: pointer;
`;

export const TreeSpacer = styled.span`
  width: 26px;
`;

export const TreeLabel = styled.button`
  display: flex;
  min-width: 0;
  height: 34px;
  padding: 0 8px 0 2px;
  border: 0;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: transparent;
  text-align: left;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 1.3rem;
  }

  small {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.05rem;
    white-space: nowrap;
  }
`;
