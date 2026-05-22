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
