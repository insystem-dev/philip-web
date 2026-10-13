import styled from "styled-components";

export const Page = styled.div`
  max-width: 1320px;
`;
export const Description = styled.p`
  margin: 0 0 20px;
  color: ${(p) => p.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  line-height: 1.5;
`;
export const PrimaryButton = styled.button`
  min-width: 112px;
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  background: ${(p) => p.theme.colors.primary};
  font-size: 1.35rem;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    background: ${(p) => p.theme.colors.disabledBtn};
  }
`;
export const Workspace = styled.div<{ $editorOpen: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$editorOpen ? "minmax(440px,1fr) 440px" : "1fr")};
  align-items: start;
  gap: 20px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;
export const ListPanel = styled.section`
  overflow: hidden;
  border: 1px solid ${(p) => p.theme.colors.adminDivider};
  border-radius: 8px;
  background: #fff;
  box-shadow: ${(p) => p.theme.shadow.admin};
`;
export const ListHeader = styled.div`
  display: flex;
  min-height: 58px;
  padding: 0 22px;
  border-bottom: 1px solid ${(p) => p.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  strong {
    font-size: 1.5rem;
  }
  span {
    color: ${(p) => p.theme.colors.adminLabelTxt};
    font-size: 1.25rem;
  }
`;
export const Empty = styled.div`
  display: flex;
  min-height: 240px;
  padding: 40px;
  color: ${(p) => p.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  strong {
    font-size: 1.5rem;
    color: ${(p) => p.theme.colors.adminMainTxt};
  }
`;
export const EventList = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 8px;
`;
export const EventCard = styled.article<{ $selected: boolean }>`
  display: flex;
  padding: 16px;
  border: 1px solid
    ${(p) => (p.$selected ? p.theme.colors.primary : p.theme.colors.adminDivider)};
  border-radius: 7px;
  background: ${(p) => (p.$selected ? "#f8f9ff" : "#fff")};
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
export const CardBody = styled.div`
  min-width: 0;
  h3 {
    margin: 7px 0 4px;
    color: #333;
    font-size: 1.55rem;
  }
  strong {
    display: block;
    color: #4b5fc4;
    font-size: 1.25rem;
  }
  p {
    overflow: hidden;
    margin: 8px 0;
    color: #666;
    font-size: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  small {
    color: #89909b;
    font-size: 1.1rem;
  }
`;
export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    color: #8a909b;
    font-size: 1.1rem;
  }
`;
export const Status = styled.b<{
  $tone: "active" | "scheduled" | "ended" | "off";
}>`
  padding: 4px 7px;
  border-radius: 4px;
  color: ${(p) => (p.$tone === "active" ? "#137a45" : p.$tone === "scheduled" ? "#8a5b09" : "#697386")};
  background: ${(p) => (p.$tone === "active" ? "#e8f8ef" : p.$tone === "scheduled" ? "#fff5d9" : "#eef0f3")};
  font-size: 1.1rem;
`;
export const Actions = styled.div`
  display: flex;
  gap: 6px;
  button {
    height: 32px;
    padding: 0 11px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
  }
  button.danger {
    color: #d14343;
  }
`;
export const EditorPanel = styled.section`
  overflow: hidden;
  border: 1px solid ${(p) => p.theme.colors.adminDivider};
  border-radius: 8px;
  background: #fff;
  box-shadow: ${(p) => p.theme.shadow.admin};
`;
export const EditorHeader = styled.div`
  display: flex;
  min-height: 72px;
  padding: 0 22px;
  border-bottom: 1px solid #e4e4e4;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  span {
    color: #6674c9;
    font-size: 1rem;
    font-weight: 800;
  }
  strong {
    font-size: 1.65rem;
  }
  button {
    border: 0;
    background: none;
    font-size: 2.4rem;
    cursor: pointer;
  }
`;
export const Form = styled.form`
  display: flex;
  padding: 22px;
  flex-direction: column;
  gap: 18px;
`;
export const Field = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 7px;
  label {
    color: #5f6570;
    font-size: 1.2rem;
    font-weight: 700;
  }
  em {
    color: #e14d4d;
    font-style: normal;
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 0 12px;
    border: 1px solid #dfe1e7;
    border-radius: 5px;
    background: #fff;
    font-size: 1.3rem;
  }
  input,
  select {
    height: 40px;
  }
  textarea {
    min-height: 110px;
    padding-top: 11px;
    resize: vertical;
  }
`;
export const DateRow = styled.div`
  display: flex;
  gap: 12px;
`;
export const StoreHint = styled.p`
  margin: -8px 0 0;
  padding: 10px;
  border-radius: 5px;
  color: #5262b2;
  background: #f1f3ff;
  font-size: 1.15rem;
`;
export const Validation = styled.p`
  margin: 0;
  color: #d14343;
  font-size: 1.2rem;
`;
export const FormActions = styled.div`
  display: flex;
  padding-top: 6px;
  justify-content: flex-end;
  gap: 8px;
  > button:first-child {
    height: 42px;
    padding: 0 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    cursor: pointer;
  }
`;
