import styled from "styled-components";

export const AdminUserPopup = styled.div`
  position: absolute;
  display: flex;
  width: 120px;
  top: 42px;
  right: 10px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.adminBorder};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10px;
`;
