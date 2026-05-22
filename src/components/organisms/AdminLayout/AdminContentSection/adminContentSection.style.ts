import styled from "styled-components";

export const AdminContentSection = styled.section`
  grid-area: CT;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
`;

export const AdminContentBox = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 132px);
  padding: 20px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
  flex-direction: column;
  gap: 20px;
`;

export const AdminContentTit = styled.div`
  display: flex;
  height: 32px;
  font-size: 1.8rem;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
`;
