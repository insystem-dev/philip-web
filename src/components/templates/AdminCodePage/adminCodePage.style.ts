import styled from "styled-components";

export const AdminCodePage = styled.div``;

export const GroupTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 8px;
`;

export const GroupTab = styled.button<{ active: boolean }>`
  height: 40px;
  padding: 0 20px;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.colors.primary : props.theme.colors.adminBorder};
  border-radius: 5px;
  color: ${(props) =>
    props.active ? props.theme.colors.white : props.theme.colors.adminMainTxt};
  background: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.white};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
`;

export const CreateForm = styled.form`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;
  gap: 12px;
`;

export const ErrorMsg = styled.div`
  padding: 5px 10px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
  background: ${(props) => props.theme.colors.red}26;
  border-radius: 3px;
`;

export const ContactCard = styled.section`
  max-width: 480px;
  padding: 32px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
`;

export const ContactLabel = styled.h2`
  margin: 0 0 20px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.8rem;
`;

export const ContactInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;
