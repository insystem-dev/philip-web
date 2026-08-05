import styled from "styled-components";

export const AdminAdsPage = styled.div`
  display: grid;
  grid-template-columns: 650px 1fr;
  gap: 20px;
`;

export const TabList = styled.div`
  display: flex;
  grid-column: 1 / -1;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  height: 42px;
  padding: 0 22px;
  border: 0;
  border-bottom: 2px solid
    ${(props) => (props.$active ? props.theme.colors.primary : "transparent")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.adminLabelTxt};
  background: transparent;
  font-size: 1.4rem;
  font-weight: ${(props) => (props.$active ? 700 : 400)};
  cursor: pointer;
`;
