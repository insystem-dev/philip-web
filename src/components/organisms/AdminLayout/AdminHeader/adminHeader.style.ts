import styled from "styled-components";

export const AdminHeader = styled.header`
  grid-area: HD;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.adminHeader};
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

/** 점검 모드 안내 (비SUPER 관리자에게만 표시) */
export const MaintenanceNotice = styled.p`
  margin-right: auto;
  padding-left: 10px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.4rem;
  font-weight: 700;
`;
