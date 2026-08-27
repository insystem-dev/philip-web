import styled, { css, keyframes } from "styled-components";
import { TranslationStatus } from "@/apis/translationApi";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const control = css`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  color: #303743;
  font-family: inherit;
  font-size: 1.25rem;
  line-height: 1.55;
  background: #ffffff;
  border: 1px solid #d8dee7;
  border-radius: 7px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: #a6adb8;
  }

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(64, 87, 255, 0.1);
    outline: none;
  }
`;

export const Editor = styled.section`
  display: flex;
  min-height: 0;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  box-shadow: 0 10px 28px rgba(28, 39, 58, 0.05);
  flex: 1;
  flex-direction: column;
`;

export const EditorHeader = styled.header`
  display: flex;
  min-height: 92px;
  padding: 18px 22px;
  background: linear-gradient(115deg, #f9fafc 0%, #f2f5fb 100%);
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const Eyebrow = styled.div`
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
`;

export const EditorTitle = styled.h2`
  margin: 0;
  color: #242b36;
  font-size: 1.75rem;
  line-height: 1.3;
`;

export const EditorDescription = styled.p`
  margin: 5px 0 0;
  color: #7d8694;
  font-size: 1.1rem;
`;

export const StatusGroup = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 6px;

  small {
    color: #929aa6;
    font-size: 1rem;
    white-space: nowrap;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: flex-end;
  flex-direction: column;
  gap: 9px;
`;

export const StatusBadge = styled.span<{ $status: TranslationStatus }>`
  display: inline-flex;
  min-height: 28px;
  padding: 0 10px;
  color: #5e6875;
  font-size: 1.05rem;
  font-weight: 700;
  background: #e9edf2;
  border-radius: 999px;
  align-items: center;

  ${(props) =>
    props.$status === "REVIEWED" &&
    css`
      color: #1f7249;
      background: #def3e7;
    `}

  ${(props) =>
    props.$status === "AUTO_TRANSLATED" &&
    css`
      color: #3555b5;
      background: #e7ecff;
    `}

  ${(props) =>
    ["FAILED", "STALE"].includes(props.$status) &&
    css`
      color: #ac453a;
      background: #ffebe8;
    `}
`;

export const StaleNotice = styled.div`
  padding: 11px 22px;
  color: #8c4b2d;
  font-size: 1.1rem;
  font-weight: 600;
  background: #fff5e9;
  border-bottom: 1px solid #f4dfc6;
`;

export const ColumnGuide = styled.div`
  display: grid;
  padding: 11px 22px 9px 154px;
  color: #858e9b;
  font-size: 1.05rem;
  font-weight: 700;
  background: #fbfcfd;
  border-bottom: 1px solid #edf0f4;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

export const FieldList = styled.div`
  display: flex;
  min-height: 0;
  padding: 8px 22px 22px;
  overflow-y: auto;
  flex: 1;
  flex-direction: column;
`;

export const Field = styled.div`
  display: grid;
  padding: 14px 0;
  border-bottom: 1px solid #edf0f4;
  grid-template-columns: 118px minmax(0, 1fr) minmax(0, 1fr);
  align-items: stretch;
  gap: 14px;

  &:last-child {
    border-bottom: 0;
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: 110px 1fr;

    > label {
      grid-row: 1 / 3;
    }
  }
`;

export const FieldLabel = styled.label`
  display: flex;
  min-height: 40px;
  justify-content: center;
  flex-direction: column;

  strong,
  span {
    display: block;
  }

  strong {
    color: #4a5360;
    font-size: 1.15rem;
  }

  span {
    margin-top: 3px;
    color: #9aa1ab;
    font-size: 0.98rem;
  }
`;

export const Original = styled.div`
  height: 100%;
  min-height: 42px;
  box-sizing: border-box;
  padding: 10px 12px;
  color: #606975;
  font-size: 1.2rem;
  line-height: 1.55;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  background: #f3f5f7;
  border: 1px solid #edf0f3;
  border-radius: 7px;
`;

export const TranslationInput = styled.input`
  ${control}
  height: 100%;
  min-height: 42px;
  padding: 0 12px;
`;

export const TranslationTextarea = styled.textarea`
  ${control}
  height: 100%;
  min-height: 96px;
  padding: 10px 12px;
  resize: vertical;
`;

export const EditorFooter = styled.footer`
  display: flex;
  min-height: 68px;
  padding: 12px 18px;
  background: #fafbfc;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media screen and (max-width: 1100px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const FooterHint = styled.div`
  min-width: 0;

  strong,
  span {
    display: block;
  }

  strong {
    color: #4e5764;
    font-size: 1.08rem;
  }

  span {
    margin-top: 4px;
    color: #8b93a0;
    font-size: 0.98rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 8px;

  @media screen and (max-width: 1100px) {
    justify-content: flex-end;
  }
`;

const actionButton = css`
  min-height: 38px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

export const SecondaryButton = styled.button`
  ${actionButton}
  color: #505a68;
  background: #ffffff;
  border: 1px solid #d8dde5;
`;

export const PrimaryButton = styled.button`
  ${actionButton}
  color: #ffffff;
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const StatePanel = styled.div`
  display: flex;
  min-height: 360px;
  color: #7b8491;
  font-size: 1.2rem;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  strong {
    color: #4a5360;
  }

  button {
    min-height: 34px;
    padding: 0 12px;
    color: #ffffff;
    font-family: inherit;
    font-size: 1.1rem;
    background: #3b4350;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const Loader = styled.span`
  width: 24px;
  height: 24px;
  border: 2px solid #dfe4eb;
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
`;
