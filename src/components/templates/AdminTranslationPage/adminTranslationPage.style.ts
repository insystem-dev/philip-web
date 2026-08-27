import styled, { css } from "styled-components";
import { TranslationRunStatus, TranslationStatus } from "@/apis/translationApi";

export const Page = styled.div`
  display: flex;
  min-width: 0;
  padding-bottom: 40px;
  flex-direction: column;
  gap: 18px;
`;

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;

  @media screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SummaryCard = styled.article`
  min-height: 118px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(25, 35, 55, 0.04);
`;

export const SummaryLabel = styled.div`
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  font-weight: 600;
`;

export const SummaryValue = styled.div`
  color: #222936;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  text-transform: capitalize;
`;

export const SummaryHint = styled.div`
  margin-top: 8px;
  color: #8b93a1;
  font-size: 1.1rem;
`;

export const UsageTrack = styled.div`
  width: 100%;
  height: 5px;
  margin-top: 12px;
  overflow: hidden;
  background: #edf0f4;
  border-radius: 999px;

  span {
    display: block;
    height: 100%;
    background: ${(props) => props.theme.colors.primary};
    border-radius: inherit;
    transition: width 0.25s ease;
  }
`;

export const AuditPanel = styled.section`
  overflow: hidden;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(25, 35, 55, 0.035);
`;

export const AuditHead = styled.header`
  display: flex;
  min-height: 72px;
  padding: 15px 18px;
  background: #fafbfc;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  strong,
  span {
    display: block;
  }

  strong {
    color: #303744;
    font-size: 1.35rem;
  }

  span {
    margin-top: 5px;
    color: #8b93a1;
    font-size: 1.05rem;
  }
`;

export const PriceSnapshot = styled.div`
  padding: 8px 11px;
  color: #4d596b;
  font-size: 1.05rem;
  font-weight: 600;
  white-space: nowrap;
  background: #eef2f8;
  border-radius: 6px;
`;

export const AuditScroller = styled.div`
  overflow-x: auto;
`;

export const AuditTable = styled.div`
  min-width: 920px;
`;

export const AuditRow = styled.div<{ $header?: boolean }>`
  display: grid;
  min-height: ${(props) => (props.$header ? "38px" : "54px")};
  padding: 8px 16px;
  color: ${(props) => (props.$header ? "#858d99" : "#4b5360")};
  font-size: 1.1rem;
  font-weight: ${(props) => (props.$header ? 600 : 400)};
  background: ${(props) => (props.$header ? "#f7f8fa" : "#ffffff")};
  border-bottom: 1px solid #eff1f4;
  grid-template-columns: 112px 150px minmax(180px, 1fr) 118px 150px 90px;
  align-items: center;
  gap: 12px;

  > span {
    min-width: 0;
  }

  strong,
  small {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: #3b4350;
    font-size: 1.12rem;
  }

  small {
    margin-top: 3px;
    color: #959ca7;
    font-size: 0.98rem;
  }
`;

export const AuditEmpty = styled.div`
  display: flex;
  min-height: 88px;
  color: #969da7;
  font-size: 1.15rem;
  align-items: center;
  justify-content: center;
`;

export const RunBadge = styled.span<{ $status: TranslationRunStatus }>`
  display: inline-flex;
  min-height: 25px;
  padding: 0 8px;
  color: #536171;
  font-size: 1rem;
  font-weight: 700;
  background: #edf0f3;
  border-radius: 999px;
  align-items: center;

  ${(props) =>
    props.$status === "SUCCEEDED" &&
    css`
      color: #24754d;
      background: #e4f5eb;
    `}

  ${(props) =>
    props.$status === "STARTED" &&
    css`
      color: #3555b5;
      background: #e9edff;
    `}

  ${(props) =>
    ["FAILED", "BUDGET_BLOCKED"].includes(props.$status) &&
    css`
      color: #b54a3d;
      background: #fff0ed;
    `}
`;

export const Workspace = styled.section`
  display: grid;
  min-height: 620px;
  grid-template-columns: minmax(560px, 1.15fr) minmax(390px, 0.85fr);
  gap: 14px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const ListPanel = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  flex-direction: column;
`;

export const FilterBar = styled.form`
  display: grid;
  padding: 14px;
  background: #fafbfc;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  grid-template-columns: 150px 130px minmax(160px, 1fr) 64px;
  gap: 8px;
`;

const control = css`
  height: 38px;
  padding: 0 11px;
  color: #3a414d;
  font-family: inherit;
  font-size: 1.2rem;
  background: white;
  border: 1px solid #dce0e6;
  border-radius: 6px;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

export const Select = styled.select`
  ${control}
`;

export const SearchInput = styled.input`
  ${control}
`;

export const SearchButton = styled.button`
  height: 38px;
  color: white;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 600;
  background: #343943;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
`;

export const ListHeader = styled.div`
  display: grid;
  min-height: 40px;
  padding: 0 16px;
  color: #858d99;
  font-size: 1.1rem;
  font-weight: 600;
  background: #f7f8fa;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  grid-template-columns: minmax(180px, 1fr) minmax(160px, 0.8fr) 94px;
  align-items: center;
  gap: 14px;
`;

export const ListBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ListRow = styled.button<{ $active: boolean }>`
  display: grid;
  width: 100%;
  min-height: 62px;
  padding: 8px 16px;
  color: #3e4652;
  font-family: inherit;
  text-align: left;
  background: ${(props) => (props.$active ? "#f0f3ff" : "white")};
  border: 0;
  border-bottom: 1px solid #eff1f4;
  grid-template-columns: minmax(180px, 1fr) minmax(160px, 0.8fr) 94px;
  align-items: center;
  gap: 14px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$active ? "#f0f3ff" : "#fafbfc")};
  }

  > span:not(:last-child) {
    min-width: 0;
    overflow: hidden;
    font-size: 1.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small,
  strong {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    margin-bottom: 3px;
    color: #9299a4;
    font-size: 1rem;
    font-weight: 500;
  }

  strong {
    font-size: 1.3rem;
  }
`;

export const StatusBadge = styled.span<{ $status: TranslationStatus }>`
  display: inline-flex;
  width: fit-content;
  min-height: 25px;
  padding: 0 8px;
  color: #5f6875;
  font-size: 1.05rem;
  font-weight: 600;
  background: #eef0f3;
  border-radius: 999px;
  align-items: center;

  ${(props) =>
    props.$status === "REVIEWED" &&
    css`
      color: #24754d;
      background: #e4f5eb;
    `}
  ${(props) =>
    props.$status === "AUTO_TRANSLATED" &&
    css`
      color: #3555b5;
      background: #e9edff;
    `}
  ${(props) =>
    ["FAILED", "STALE"].includes(props.$status) &&
    css`
      color: #b54a3d;
      background: #fff0ed;
    `}
`;

export const Empty = styled.div`
  display: flex;
  min-height: 220px;
  color: #969da7;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
`;

export const Pagination = styled.div`
  display: flex;
  min-height: 50px;
  padding: 8px 14px;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: center;
  gap: 14px;

  button {
    height: 30px;
    padding: 0 12px;
    color: #545c68;
    font-family: inherit;
    font-size: 1.1rem;
    background: white;
    border: 1px solid #dfe3e8;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }

  span {
    color: #737b86;
    font-size: 1.1rem;
  }
`;

export const EditorPanel = styled.aside`
  min-width: 0;
  overflow: hidden;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
`;

export const EditorEmpty = styled.div`
  display: flex;
  height: 100%;
  min-height: 420px;
  color: #9ba2ac;
  font-size: 1.2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  strong {
    color: #626b77;
    font-size: 1.4rem;
  }
`;

export const EditorHead = styled.header`
  display: flex;
  min-height: 74px;
  padding: 14px 18px;
  background: #fafbfc;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  small,
  strong {
    display: block;
  }

  small {
    margin-bottom: 5px;
    color: #9299a4;
    font-size: 1rem;
  }

  strong {
    color: #343b46;
    font-size: 1.5rem;
  }
`;

export const FieldList = styled.div`
  display: flex;
  max-height: 660px;
  padding: 18px;
  overflow-y: auto;
  flex-direction: column;
  gap: 18px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    color: #59616d;
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export const Original = styled.div`
  min-height: 38px;
  padding: 10px 11px;
  color: #686f79;
  font-size: 1.2rem;
  line-height: 1.55;
  white-space: pre-wrap;
  background: #f4f5f7;
  border-radius: 6px;
`;

export const Input = styled.input`
  ${control}
  width: 100%;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 92px;
  padding: 10px 11px;
  color: #353c47;
  font-family: inherit;
  font-size: 1.2rem;
  line-height: 1.55;
  resize: vertical;
  border: 1px solid #dce0e6;
  border-radius: 6px;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

export const EditorActions = styled.footer`
  display: flex;
  padding: 14px 18px;
  border-top: 1px solid ${(props) => props.theme.colors.adminDivider};
  justify-content: flex-end;
  gap: 8px;
`;

const actionButton = css`
  min-height: 38px;
  padding: 0 14px;
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

export const SecondaryButton = styled.button`
  ${actionButton}
  color: #515a66;
  background: white;
  border: 1px solid #d9dde3;
`;

export const PrimaryButton = styled.button`
  ${actionButton}
  color: white;
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
`;
