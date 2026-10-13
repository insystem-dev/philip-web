import styled from "styled-components";

export const AdminAdsPage = styled.div`
  display: grid;
  grid-template-columns: 650px 1fr;
  gap: 20px;
`;

export const TabList = styled.div`
  display: flex;
  grid-column: 1 / -1;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  height: 42px;
  padding: 0 22px;
  border: 0;
  border-bottom: 2px solid
    ${(props) => (props.$active ? props.theme.colors.primary : "transparent")};
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.adminLabelTxt};
  background: transparent;
  font-size: 1.4rem;
  font-weight: ${(props) => (props.$active ? 700 : 400)};
  cursor: pointer;
`;

/** 왼쪽 열 — 미리보기와 그 아래 노출 on/off 카드를 세로로 묶는다 */
export const LeftColumn = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 20px;
  align-self: start;
`;

/**
 * 현재 탭 범위의 배너 노출 on/off 카드.
 * 미리보기 바로 아래(왼쪽 열)에 두어 "지금 보이는 미리보기가 실제로 노출 중인지"를
 * 이어서 확인·조작할 수 있게 한다.
 * (UI 규약은 환경설정 화면 AdminSettingsPage 의 점검 모드 카드와 동일)
 */
export const ExposureCard = styled.section`
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
`;

export const ExposureTit = styled.h2`
  margin: 0 0 8px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.6rem;
`;

export const ExposureHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  p {
    margin-bottom: 0;
  }
`;

export const ExposureDesc = styled.p`
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  line-height: 1.6;
`;

export const ExposureStatus = styled.p`
  padding: 20px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  text-align: center;
`;

export const ExposureErrorStatus = styled(ExposureStatus)`
  color: ${(props) => props.theme.colors.red};
`;

export const StateRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 14px 18px;
  gap: 12px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.adminInputBg};

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.3rem;
  }
`;

/** 숨김이 '주의가 필요한 상태'이므로 빨강, 노출 중은 기본색으로 둔다 */
export const StateBadge = styled.strong<{ $exposed: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.$exposed ? props.theme.colors.primary : props.theme.colors.red};
  font-size: 1.3rem;
`;

/** 되돌리기 쉬운 조작이지만 '숨기기'가 유저 화면에 미치는 영향이 커 빨강으로 표시한다 */
export const ToggleButton = styled.button<{ $exposed: boolean }>`
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.$exposed ? props.theme.colors.red : props.theme.colors.primary};
  font-size: 1.4rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const BulkActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 6px;

  button {
    height: 34px;
    padding: 0 11px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 5px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: ${(props) => props.theme.colors.white};
    font-size: 1.2rem;
    cursor: pointer;

    &:last-child {
      color: ${(props) => props.theme.colors.red};
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  }
`;

export const CategoryExposureList = styled.div`
  overflow-y: auto;
  max-height: 430px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 6px;
`;

export const CategoryExposureRow = styled.div<{ $depth: number }>`
  display: flex;
  min-height: 58px;
  padding: 10px 12px 10px ${(props) => 12 + Math.min(props.$depth, 3) * 16}px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminDivider};
  background: ${(props) =>
    props.$depth ? props.theme.colors.adminInputBg : props.theme.colors.white};
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &:last-child {
    border-bottom: 0;
  }
`;

export const CategoryExposureName = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.3rem;
  }

  span {
    overflow: hidden;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  em {
    color: ${(props) => props.theme.colors.red};
    font-size: 1rem;
    font-style: normal;
  }
`;

export const CategoryToggle = styled.button<{ $exposed: boolean }>`
  display: inline-flex;
  width: 78px;
  height: 32px;
  padding: 0 9px;
  border: 0;
  border-radius: 999px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.$exposed ? props.theme.colors.primary : props.theme.colors.func};
  font-size: 1.1rem;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  cursor: pointer;

  > span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.white};
    order: ${(props) => (props.$exposed ? 2 : 0)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InlineStatus = styled.span`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.1rem;
`;

export const InlineError = styled(InlineStatus)`
  color: ${(props) => props.theme.colors.red};
`;
