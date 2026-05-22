import styled from "styled-components";

export const AdminAdsBox = styled.div`
  display: flex;
  padding: 30px;
  background: ${(props) => props.theme.colors.adminInputBg};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  flex-direction: column;
  gap: 10px;
`;

export const AdminAdsTit = styled.div`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

export const AdminAdsInput = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
