import styled from "styled-components";
import { BusinessRegistrationStatus } from "@/apis/businessRegistrationApi";

export const Page = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
  font-family: "Noto Sans KR", "Roboto", sans-serif;
  flex-direction: column;
  gap: 16px;

  &, button, input, textarea, select {
    font-family: "Noto Sans KR", "Roboto", sans-serif;
  }
`;

export const PublicLink = styled.a`
  display: inline-flex;
  height: 32px;
  padding: 0 13px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.primary};
  background: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  align-items: center;
  &:hover { color: #fff; background: ${(props) => props.theme.colors.primary}; }
`;

export const Summary = styled.div`
  display: grid;
  grid-template-columns: 140px 140px 140px minmax(260px, 1fr);
  gap: 10px;
`;

export const SummaryCard = styled.div<{ $tone?: "waiting" | "done" }>`
  position: relative;
  min-height: 92px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid #e7e9ef;
  border-radius: 8px;
  background: ${(props) => props.$tone === "waiting" ? "#fffaf0" : props.$tone === "done" ? "#f2faf6" : "#f6f8ff"};

  span { display: block; color: #7a7f8d; font-size: 1.15rem; font-weight: 600; }
  strong { display: inline-block; margin-top: 7px; color: #232939; font-family: inherit; font-size: 3rem; line-height: 1; }
  i { margin-left: 4px; color: #8c909b; font-style: normal; font-size: 1.15rem; }
`;

export const Campaign = styled.div`
  position: relative;
  padding: 15px 20px;
  overflow: hidden;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(120deg, #1a3254, #07192e);
  &::after { content: "69"; position: absolute; right: 14px; bottom: -26px; color: rgba(255, 218, 72, 0.13); font-family: inherit; font-size: 8rem; font-weight: 700; }
  span { color: #e1c759; font-family: inherit; font-size: 0.95rem; font-weight: 700; letter-spacing: .14em; }
  strong { display: block; margin-top: 5px; font-size: 1.65rem; }
  p { margin-top: 6px; color: rgba(255,255,255,.58); font-size: 1.1rem; }
`;

export const Toolbar = styled.form`
  display: flex;
  min-height: 42px;
  align-items: center;
  gap: 8px;
  select { height: 38px; padding: 0 34px 0 11px; border: 1px solid #dfe2e9; border-radius: 5px; color: #454b59; background: #fff; font-size: 1.25rem; }
`;

export const SearchWrap = styled.div`
  display: flex;
  width: 330px;
  height: 38px;
  input { min-width: 0; padding: 0 12px; flex: 1; border: 1px solid #dfe2e9; border-right: 0; border-radius: 5px 0 0 5px; outline: 0; font-size: 1.25rem; }
  input:focus { border-color: ${(props) => props.theme.colors.primary}; }
  button { width: 62px; border: 0; border-radius: 0 5px 5px 0; color: #fff; background: ${(props) => props.theme.colors.primary}; font-size: 1.2rem; cursor: pointer; }
`;

export const ResetButton = styled.button`
  height: 36px;
  padding: 0 10px;
  border: 0;
  color: #747985;
  background: transparent;
  font-size: 1.15rem;
  cursor: pointer;
`;

export const TableCard = styled.section`
  display: flex;
  min-height: 260px;
  overflow: hidden;
  flex: 1;
  border: 1px solid #eceef3;
  border-radius: 8px;
  flex-direction: column;
`;

export const TableHead = styled.div`
  display: flex;
  min-height: 46px;
  padding: 0 16px;
  border-bottom: 1px solid #eceef3;
  align-items: center;
  justify-content: space-between;
  strong { color: #323744; font-size: 1.35rem; }
  span { color: #9a9eaa; font-size: 1.1rem; }
`;

export const TableScroll = styled.div`overflow: auto; min-height: 0; flex: 1;`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  th { height: 38px; padding: 0 10px; color: #727785; background: #f7f8fb; font-size: 1.15rem; font-weight: 600; text-align: left; }
  td { height: 52px; padding: 7px 10px; overflow: hidden; border-bottom: 1px solid #f0f1f4; color: #4a4f5d; font-size: 1.2rem; text-overflow: ellipsis; white-space: nowrap; }
  tbody tr:hover { background: #fafbff; }
  th:nth-child(1), td:nth-child(1) { width: 150px; }
  th:nth-child(2), td:nth-child(2) { width: 180px; }
  th:nth-child(3), td:nth-child(3) { width: 100px; }
  th:nth-child(5), td:nth-child(5) { width: 95px; text-align: center; }
  th:nth-child(6), td:nth-child(6) { width: 84px; text-align: center; }
  th:nth-child(7), td:nth-child(7) { width: 64px; text-align: center; }
`;

export const BusinessName = styled.strong`color: #242a38; font-size: 1.25rem;`;

export const PhotoBadge = styled.span<{ $received: boolean }>`
  display: inline-flex;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  color: ${(props) => props.$received ? "#18724d" : "#9a6a13"};
  background: ${(props) => props.$received ? "#e9f8f0" : "#fff6df"};
  font-size: 1.05rem;
  font-weight: 700;
  align-items: center;
`;

const statusColor: Record<BusinessRegistrationStatus, [string, string]> = {
  RECEIVED: ["#385be8", "#edf0ff"],
  COMPLETED: ["#15744d", "#e7f7ef"],
};

export const StatusBadge = styled.span<{ $status: BusinessRegistrationStatus }>`
  display: inline-flex;
  height: 24px;
  padding: 0 9px;
  border-radius: 12px;
  color: ${(props) => statusColor[props.$status][0]};
  background: ${(props) => statusColor[props.$status][1]};
  font-size: 1.05rem;
  font-weight: 800;
  align-items: center;
`;

export const ViewButton = styled.button`
  height: 28px;
  padding: 0 11px;
  border: 1px solid #cfd5e2;
  border-radius: 4px;
  color: #4c5c7c;
  background: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  &:hover { color: #fff; border-color: ${(props) => props.theme.colors.primary}; background: ${(props) => props.theme.colors.primary}; }
`;

export const Empty = styled.div`display: grid; min-height: 220px; color: #969ba7; font-size: 1.3rem; place-items: center;`;
export const Error = styled(Empty)`color: #c23b55;`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  padding: 28px;
  background: rgba(18, 24, 35, 0.64);
  justify-content: flex-end;
`;

export const DetailPanel = styled.section`
  width: min(760px, calc(100vw - 280px));
  height: 100%;
  overflow: hidden;
  border-radius: 14px;
  background: #f7f8fb;
  box-shadow: 0 24px 80px rgba(0,0,0,.34);

  &, button, input, textarea, select {
    font-family: "Noto Sans KR", "Roboto", sans-serif;
  }
`;

export const DetailHeader = styled.header`
  display: flex;
  min-height: 112px;
  padding: 22px 24px;
  color: #fff;
  background: linear-gradient(125deg, #1e385b, #081a30);
  align-items: flex-start;
  justify-content: space-between;
  span { color: #e2c959; font-family: inherit; font-size: 1rem; letter-spacing: .13em; }
  h2 { margin: 8px 0 4px; font-family: inherit; font-size: 2.5rem; letter-spacing: -.04em; }
  p { color: rgba(255,255,255,.55); font-size: 1.1rem; }
  button { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; color: #fff; background: transparent; font-size: 2.4rem; line-height: 1; cursor: pointer; }
`;

export const DetailForm = styled.form`
  height: calc(100% - 112px);
  overflow: auto;
  padding: 18px 22px 24px;
`;

export const AdminStateRow = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  margin-bottom: 12px;
  padding: 16px;
  border: 1px solid #e3e5eb;
  border-radius: 9px;
  background: #fff;
  align-items: end;
  gap: 20px;
`;

export const ReadonlyStatus = styled.div<{ $completed: boolean }>`
  display: flex;
  min-height: 52px;
  padding: 9px 12px;
  border: 1px solid
    ${(props) => (props.$completed ? "#cde9db" : "#dce2fa")};
  border-radius: 7px;
  background: ${(props) => (props.$completed ? "#eef9f3" : "#f3f5ff")};
  align-items: center;
  gap: 10px;

  > span {
    display: grid;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    color: #fff;
    background: ${(props) => (props.$completed ? "#23845c" : "#4462ff")};
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 800;
    place-items: center;
  }

  div {
    display: grid;
    gap: 2px;
  }

  small {
    color: #8a8f9a;
    font-size: 1rem;
  }

  strong {
    color: ${(props) => (props.$completed ? "#176b49" : "#334bba")};
    font-size: 1.25rem;
  }
`;

export const PhotoCheck = styled.div`
  display: flex;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  background: #f3f6fb;
  align-items: center;
  gap: 8px;
  input { width: 17px; height: 17px; accent-color: ${(props) => props.theme.colors.primary}; }
  label { color: #4b5364; font-size: 1.2rem; font-weight: 600; cursor: pointer; }
  input:disabled + label { color: #8d929d; cursor: default; }
`;

export const CompletionCard = styled.div`
  display: flex;
  margin-bottom: 12px;
  padding: 17px 18px;
  overflow: hidden;
  border: 1px solid #cfe8db;
  border-radius: 9px;
  color: #194c37;
  background:
    radial-gradient(circle at 92% -20%, rgba(46, 142, 99, 0.16), transparent 38%),
    #eef9f3;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  div {
    display: grid;
    gap: 4px;
  }

  span {
    color: #2b8a62;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.13em;
  }

  strong {
    font-size: 1.35rem;
  }

  p {
    color: #6f877b;
    font-size: 1.05rem;
  }

  a {
    display: inline-flex;
    height: 36px;
    padding: 0 13px;
    flex: none;
    border-radius: 5px;
    color: #fff;
    background: #247a57;
    font-size: 1.15rem;
    font-weight: 700;
    align-items: center;
  }
`;

export const DetailSection = styled.section<{ $accent?: boolean }>`
  margin-bottom: 12px;
  padding: 18px;
  border: 1px solid ${(props) => (props.$accent ? "#cbd4f9" : "#e3e5eb")};
  border-radius: 9px;
  background: ${(props) => (props.$accent ? "#f8f9ff" : "#fff")};
`;

export const DetailSectionTitle = styled.h3`
  display: flex;
  margin: 0 0 16px;
  color: #2f3543;
  font-size: 1.4rem;
  align-items: center;
  gap: 8px;
  b { display: grid; width: 26px; height: 26px; border-radius: 7px; color: #193c68; background: #f0d65b; font-family: inherit; font-size: 1rem; place-items: center; }
`;

export const DetailPhotoTotal = styled.span`
  display: inline-flex;
  height: 22px;
  padding: 0 8px;
  margin-left: auto;
  border-radius: 11px;
  color: #385273;
  background: #edf2f8;
  font-size: 1rem;
  font-weight: 800;
  align-items: center;
`;

export const AdminPhotoGroups = styled.div`
  display: grid;
  gap: 12px;
`;

export const AdminPhotoGroup = styled.div`
  padding: 12px;
  border: 1px solid #e5e7ec;
  border-radius: 7px;
  background: #f8f9fb;
`;

export const AdminPhotoGroupHead = styled.div`
  display: flex;
  min-height: 22px;
  margin-bottom: 9px;
  color: #555d6d;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 1.15rem;
  }

  span {
    color: #8b909b;
    font-size: 1rem;
  }
`;

export const AdminPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;

  button {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    padding: 0;
    border: 1px solid #d9dde5;
    border-radius: 6px;
    background: #e8ebf0;
    cursor: zoom-in;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.18s ease;
  }

  button > span {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 5px 3px;
    color: #fff;
    background: linear-gradient(transparent, rgba(7, 20, 37, 0.82));
    font-size: 0.9rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.16s ease;
  }

  button:hover img,
  button:focus-visible img {
    transform: scale(1.04);
  }

  button:hover > span,
  button:focus-visible > span {
    opacity: 1;
  }

  button:focus-visible {
    outline: 3px solid rgba(68, 98, 255, 0.22);
    outline-offset: 2px;
  }
`;

export const AdminPhotoEmpty = styled.div`
  display: grid;
  min-height: 54px;
  border: 1px dashed #d9dde5;
  border-radius: 6px;
  color: #9a9faa;
  background: #fff;
  font-size: 1.05rem;
  place-items: center;
`;

export const EditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
`;

export const EditField = styled.div<{ $wide?: boolean }>`
  display: grid;
  grid-column: ${(props) => props.$wide ? "1 / -1" : "auto"};
  gap: 6px;
  label { color: #6b7180; font-size: 1.1rem; font-weight: 600; }
  input, textarea, select { width: 100%; min-height: 38px; padding: 8px 10px; border: 1px solid #dfe2e8; border-radius: 5px; outline: 0; color: #303643; background: #fbfcfe; font: inherit; font-size: 1.25rem; line-height: 1.45; }
  textarea { resize: vertical; }
  input:focus, textarea:focus, select:focus { border-color: ${(props) => props.theme.colors.primary}; box-shadow: 0 0 0 3px rgba(68,98,255,.08); }
  input:disabled, textarea:disabled, select:disabled { color: #727783; background: #f1f2f5; cursor: default; }
`;

export const CategoryField = styled.div`
  min-width: 0;

  > div {
    width: 100%;
  }
`;

export const TargetGuide = styled.p`
  display: flex;
  margin: -4px 0 14px;
  padding: 13px 14px;
  border-left: 3px solid #6276da;
  border-radius: 0 7px 7px 0;
  color: #555d70;
  background: #eef1ff;
  font-size: 1.25rem;
  line-height: 1.5;
  flex-direction: column;
  gap: 5px;

  > span:first-child {
    color: #596170;
    font-size: 1.25rem;
    font-weight: 600;
  }

  strong {
    display: inline-block;
    margin-left: 4px;
    padding: 2px 8px 3px;
    border: 1px solid rgba(68, 98, 255, 0.22);
    border-radius: 5px;
    color: #304bc7;
    background: #fff;
    font-size: 1.55rem;
    font-weight: 800;
    line-height: 1.45;
  }

  > span:last-child {
    color: #71798a;
    font-size: 1.15rem;
  }
`;

export const TransferPreview = styled.div`
  display: flex;
  margin-top: 14px;
  padding: 11px 12px;
  border: 1px dashed #cbd2e2;
  border-radius: 7px;
  color: #6c7280;
  background: rgba(255, 255, 255, 0.65);
  font-size: 1.1rem;
  line-height: 1.55;
  align-items: flex-start;
  gap: 10px;

  span {
    padding: 3px 7px;
    flex: none;
    border-radius: 10px;
    color: #4054bd;
    background: #e8ecff;
    font-size: 1rem;
    font-weight: 800;
  }
`;

export const SaveError = styled.div`margin: 10px 0; padding: 11px 13px; border-radius: 6px; color: #ad2844; background: #fff0f3; font-size: 1.2rem;`;
export const SaveSuccess = styled.div`margin: 10px 0; padding: 11px 13px; border-radius: 6px; color: #18734d; background: #eaf8f1; font-size: 1.2rem;`;

export const DetailActions = styled.div`
  position: sticky;
  bottom: -24px;
  display: flex;
  padding: 14px 0 0;
  background: linear-gradient(transparent, #f7f8fb 24%);
  justify-content: flex-end;
  gap: 7px;
  button { min-width: 86px; height: 40px; border: 1px solid #d8dce4; border-radius: 5px; color: #59606f; background: #fff; font-size: 1.2rem; font-weight: 700; cursor: pointer; }
  button[type="submit"] { min-width: 120px; color: #fff; border-color: ${(props) => props.theme.colors.primary}; background: ${(props) => props.theme.colors.primary}; }
  button[data-action="register"] { min-width: 112px; color: #1c2b16; border-color: #d4b620; background: linear-gradient(135deg, #f2d54c, #e4bd25); box-shadow: 0 6px 16px rgba(191, 153, 16, 0.2); }
  button[data-action="register"]:hover { background: linear-gradient(135deg, #ffe56c, #eecb34); }
  button:disabled { opacity: .6; cursor: wait; }
`;
