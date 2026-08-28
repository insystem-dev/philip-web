import styled, { css } from "styled-components";
import { TranslationRunStatus } from "@/apis/translationApi";

type Tone = "safe" | "warning" | "danger";

const toneColor = (tone: Tone) =>
  tone === "danger" ? "#e05a4f" : tone === "warning" ? "#e0a52f" : "#4462ff";

export const Page = styled.div`
  display: flex;
  min-width: 0;
  padding-bottom: 40px;
  flex-direction: column;
  gap: 16px;
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 26px 28px 24px;
  color: #f7f9ff;
  background:
    radial-gradient(circle at 88% 10%, rgba(93, 119, 255, 0.34), transparent 32%),
    linear-gradient(122deg, #20283a 0%, #252e43 54%, #1e2740 100%);
  border: 1px solid #303b54;
  border-radius: 12px;
  box-shadow: 0 18px 42px rgba(27, 36, 58, 0.16);

  &::after {
    position: absolute;
    top: -80px;
    right: -40px;
    width: 260px;
    height: 260px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 50%;
    content: "";
  }
`;

export const HeroHeader = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Eyebrow = styled.div`
  margin-bottom: 8px;
  color: #9dacf7;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.15em;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const HeroDescription = styled.p`
  max-width: 650px;
  margin: 9px 0 0;
  color: #b9c2d5;
  font-size: 1.15rem;
  line-height: 1.65;
`;

export const LivePanel = styled.div`
  display: flex;
  min-width: 218px;
  padding: 12px 14px;
  background: rgba(10, 15, 27, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 9px;
  align-items: center;
  gap: 10px;

  strong,
  span { display: block; }
  strong { font-size: 1.12rem; }
  span { margin-top: 3px; color: #98a4ba; font-size: 0.94rem; }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const LiveDot = styled.i<{ $enabled: boolean }>`
  width: 9px;
  height: 9px;
  background: ${(props) => (props.$enabled ? "#55d994" : "#e66a61")};
  border-radius: 50%;
  box-shadow: 0 0 0 5px ${(props) => (props.$enabled ? "rgba(85,217,148,.12)" : "rgba(230,106,97,.12)")};
`;

export const MeterSummary = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: 28px;
  align-items: flex-end;
  justify-content: space-between;

  span, strong { display: block; }
  span { color: #aeb8cc; font-size: 1.05rem; }
  strong { margin-top: 3px; font-size: 2.7rem; letter-spacing: -0.04em; }
`;

export const MeterPercent = styled.strong<{ $tone: Tone }>`
  color: ${(props) => toneColor(props.$tone)};
  font-size: 2rem !important;
`;

export const ProgressArea = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 16px;
`;

export const ProgressRail = styled.div`
  position: relative;
  height: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
`;

export const ProgressFill = styled.span<{ $tone: Tone }>`
  display: block;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(90deg, ${toneColor(props.$tone)}, ${toneColor(props.$tone)}cc)`};
  border-radius: inherit;
  box-shadow: 0 0 18px ${(props) => `${toneColor(props.$tone)}66`};
  transition: width 0.35s ease;
`;

export const SafetyMarker = styled.div`
  position: absolute;
  top: -7px;
  transform: translateX(-1px);

  span { display: block; width: 2px; height: 26px; background: #ffd76a; }
  small {
    position: absolute;
    top: 24px;
    right: 6px;
    color: #ffd76a;
    font-size: 0.92rem;
    white-space: nowrap;
  }
`;

export const ProgressLegend = styled.div`
  display: flex;
  margin-top: 32px;
  color: #8f9bb1;
  font-size: 0.95rem;
  justify-content: space-between;

  strong { color: #b9c3d7; font-weight: 600; }
`;

export const HeroStats = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  margin-top: 34px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 900px) {
    gap: 12px;
  }
`;

export const HeroStat = styled.div`
  padding: 0 18px;
  border-left: 1px solid rgba(255, 255, 255, 0.09);

  &:first-child { padding-left: 0; border-left: 0; }
  span, strong { display: block; }
  span { color: #929eb4; font-size: 1rem; }
  strong { margin-top: 4px; color: #f5f7fc; font-size: 1.45rem; }

  @media screen and (max-width: 900px) {
    padding: 0 10px;
  }
`;

export const KpiGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const KpiCard = styled.article`
  padding: 18px 20px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  box-shadow: 0 7px 22px rgba(33, 42, 62, 0.035);
`;

export const KpiLabel = styled.span`
  color: #7d8695;
  font-size: 1.05rem;
  font-weight: 600;
`;

export const KpiValue = styled.strong`
  display: block;
  margin-top: 7px;
  color: #273042;
  font-size: 2rem;
  letter-spacing: -0.035em;
`;

export const KpiHint = styled.span`
  display: block;
  margin-top: 5px;
  color: #a0a7b3;
  font-size: 0.96rem;
`;

export const ContentGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.45fr);
  gap: 14px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  min-width: 0;
  overflow: hidden;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 10px;
  box-shadow: 0 7px 22px rgba(33, 42, 62, 0.03);
`;

export const PanelHeader = styled.header`
  display: flex;
  min-height: 66px;
  padding: 14px 18px;
  background: #fafbfc;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  strong, span { display: block; }
  strong { color: #303847; font-size: 1.25rem; }
  span { margin-top: 4px; color: #929aa7; font-size: 0.98rem; }
`;

export const Legend = styled.div`
  display: flex;
  color: #7f8896;
  font-size: 0.92rem;
  gap: 12px;

  span { display: flex; margin: 0; align-items: center; gap: 5px; }
  i { width: 8px; height: 8px; background: #4462ff; border-radius: 2px; }
  span:last-child i { background: #8ba0ff; }
`;

export const Chart = styled.div`
  display: flex;
  height: 226px;
  padding: 28px 18px 14px;
  background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 48px, #eef1f5 49px);
  align-items: stretch;
  gap: 5px;
`;

export const ChartColumn = styled.div`
  display: flex;
  min-width: 5px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  > span { margin-top: 7px; color: #a0a7b1; font-size: 0.78rem; }
`;

export const ChartBars = styled.div`
  display: flex;
  width: 100%;
  height: 172px;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
`;

export const ChartBar = styled.i<{ $kind: "actual" | "protected" }>`
  display: block;
  width: 38%;
  max-width: 8px;
  min-height: 2px;
  background: ${(props) => (props.$kind === "actual" ? "#4462ff" : "#9aabf7")};
  border-radius: 3px 3px 1px 1px;
`;

export const StatusList = styled.div`
  padding: 8px 16px;
`;

export const StatusRow = styled.div`
  display: flex;
  min-height: 54px;
  border-bottom: 1px solid #eff1f4;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  > div { text-align: right; }
  strong, span { display: block; }
  strong { color: #394252; font-size: 1.12rem; }
  div span { margin-top: 3px; color: #989faa; font-size: 0.9rem; }
`;

export const StatusBadge = styled.span<{ $status: TranslationRunStatus }>`
  display: inline-flex !important;
  min-height: 25px;
  padding: 0 9px;
  color: #536171;
  font-size: 0.94rem;
  font-weight: 700;
  background: #edf0f3;
  border-radius: 999px;
  align-items: center;

  ${(props) => props.$status === "SUCCEEDED" && css`color: #23704a; background: #e4f5eb;`}
  ${(props) => props.$status === "STARTED" && css`color: #3555b5; background: #e9edff;`}
  ${(props) => props.$status === "BUDGET_BLOCKED" && css`color: #a26a15; background: #fff4d9;`}
  ${(props) => props.$status === "FAILED" && css`color: #b34d43; background: #fff0ed;`}
`;

export const WorkerInfo = styled.div`
  display: grid;
  margin: 4px 16px 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 7px;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  div { text-align: center; }
  span, strong { display: block; }
  span { color: #969daa; font-size: 0.82rem; }
  strong { margin-top: 3px; color: #4a5361; font-size: 0.94rem; }
`;

export const RefreshButton = styled.button`
  height: 34px;
  padding: 0 13px;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  background: #343b48;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  &:disabled { opacity: 0.55; cursor: wait; }
`;

export const TableScroller = styled.div`overflow-x: auto;`;
export const Table = styled.div`min-width: 860px;`;

export const TableRow = styled.div<{ $header?: boolean }>`
  display: grid;
  min-height: ${(props) => (props.$header ? "38px" : "52px")};
  padding: 8px 16px;
  color: ${(props) => (props.$header ? "#858d99" : "#4b5360")};
  font-size: 1.02rem;
  font-weight: ${(props) => (props.$header ? 600 : 400)};
  background: ${(props) => (props.$header ? "#f7f8fa" : "#fff")};
  border-bottom: 1px solid #eff1f4;
  grid-template-columns: 160px minmax(190px, 1fr) 100px 100px 100px 90px;
  align-items: center;
  gap: 12px;

  > span { min-width: 0; }
  strong, small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  strong { color: #384150; font-size: 1.05rem; }
  small { margin-top: 2px; color: #9aa1ac; font-size: 0.88rem; }
`;

export const Empty = styled.div`
  display: flex;
  min-height: 88px;
  color: #979eaa;
  font-size: 1.05rem;
  align-items: center;
  justify-content: center;
`;
