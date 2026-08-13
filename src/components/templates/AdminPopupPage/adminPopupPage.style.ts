import styled from "styled-components";

export const Page = styled.div`
  max-width: 1320px;
`;

export const Toolbar = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
`;

export const PageTitle = styled.h2`
  margin: 0 0 6px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 2rem;
`;

export const Description = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
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
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.35rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.primaryHover};
  }
  &:disabled {
    background: ${(props) => props.theme.colors.disabledBtn};
    cursor: default;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.whiteHover};
  }
`;

export const Workspace = styled.div<{ $editorOpen: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.$editorOpen ? "minmax(480px, 1fr) 430px" : "1fr")};
  align-items: start;
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ListPanel = styled.section`
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 8px;
  background: #fff;
  box-shadow: ${(props) => props.theme.shadow.admin};
`;

export const ListHeader = styled.div`
  display: flex;
  min-height: 58px;
  padding: 0 22px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.5rem;
  }
  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.25rem;
  }
`;

export const PopupList = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 8px;
`;

export const PopupCard = styled.article<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr) auto;
  min-height: 112px;
  padding: 10px;
  border: 1px solid
    ${(props) =>
      props.$selected
        ? props.theme.colors.primary
        : props.theme.colors.adminDivider};
  border-radius: 7px;
  background: ${(props) => (props.$selected ? "#f8f9ff" : "#fff")};
  align-items: center;
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 84px minmax(0, 1fr);
  }
`;

export const Thumbnail = styled.div`
  display: grid;
  width: 104px;
  height: 90px;
  overflow: hidden;
  border-radius: 6px;
  color: #9aa2b1;
  background: #eef1f6;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  place-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 720px) {
    width: 84px;
    height: 76px;
  }
`;

export const CardBody = styled.div`
  min-width: 0;
`;

export const CardTop = styled.div`
  display: flex;
  margin-bottom: 7px;
  align-items: center;
  gap: 8px;
`;

export const Status = styled.span<{
  $tone: "active" | "scheduled" | "ended" | "off";
}>`
  padding: 4px 7px;
  border-radius: 4px;
  color: ${(props) =>
    props.$tone === "active"
      ? "#137a45"
      : props.$tone === "scheduled"
        ? "#8a5b09"
        : "#697386"};
  background: ${(props) =>
    props.$tone === "active"
      ? "#e8f8ef"
      : props.$tone === "scheduled"
        ? "#fff5d9"
        : "#eef0f3"};
  font-size: 1.1rem;
  font-weight: 800;
`;

export const Order = styled.span`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.1rem;
`;

export const CardTitle = styled.h3`
  overflow: hidden;
  margin: 0 0 8px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.55rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Period = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
`;

export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    height: 32px;
    padding: 0 11px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 4px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }

  button:hover {
    background: ${(props) => props.theme.colors.whiteHover};
  }
  button.danger {
    color: #d14343;
  }

  @media (max-width: 720px) {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
`;

export const Empty = styled.div`
  display: flex;
  min-height: 260px;
  padding: 40px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.5rem;
  }
`;

export const Error = styled(Empty)`
  color: ${(props) => props.theme.colors.red};
`;

export const EditorPanel = styled.aside`
  position: sticky;
  top: 20px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 8px;
  background: #fff;
  box-shadow: ${(props) => props.theme.shadow.admin};

  @media (max-width: 1100px) {
    position: static;
  }
`;

export const EditorHeader = styled.div`
  display: flex;
  min-height: 68px;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  div span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
  div strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.6rem;
  }
  > button {
    border: 0;
    color: #7c8492;
    background: transparent;
    font-size: 2.6rem;
    cursor: pointer;
  }
`;

export const Form = styled.form`
  display: flex;
  max-height: calc(100vh - 210px);
  padding: 20px;
  overflow-y: auto;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 1100px) {
    max-height: none;
  }
`;

export const Field = styled.div`
  min-width: 0;

  label {
    display: block;
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.25rem;
    font-weight: 700;
  }
  label em {
    color: ${(props) => props.theme.colors.red};
    font-style: normal;
  }
  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 5px;
    outline: 0;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: #fff;
    font-size: 1.3rem;
  }
  input,
  select {
    height: 42px;
    padding: 0 11px;
  }
  textarea {
    min-height: 92px;
    padding: 11px;
    resize: vertical;
    line-height: 1.55;
  }
  input:focus,
  textarea:focus,
  select:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const UploadLabel = styled.label<{ $disabled: boolean }>`
  display: flex;
  min-height: 104px;
  margin: 0 !important;
  border: 1px dashed ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 6px;
  color: ${(props) => props.theme.colors.adminLabelTxt} !important;
  background: ${(props) => props.theme.colors.adminInputBg};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: ${(props) => (props.$disabled ? "default" : "pointer")};

  input {
    display: none;
  }
  strong {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.35rem;
  }
  span {
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  display: grid;
  min-height: 160px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 6px;
  background: #eef1f6;
  place-items: center;

  img {
    display: block;
    width: 100%;
    max-height: 260px;
    object-fit: contain;
  }
  button {
    position: absolute;
    right: 8px;
    bottom: 8px;
    height: 32px;
    padding: 0 10px;
    border: 0;
    border-radius: 4px;
    color: #fff;
    background: rgba(22, 27, 39, 0.78);
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const HelpText = styled.p`
  margin: -8px 0 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.1rem;
`;

export const Validation = styled.p`
  padding: 10px 12px;
  margin: 0;
  border-radius: 5px;
  color: #c33c3c;
  background: #fff0f0;
  font-size: 1.2rem;
`;

export const FormActions = styled.div`
  display: flex;
  padding-top: 2px;
  justify-content: flex-end;
  gap: 8px;
`;
