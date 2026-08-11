import styled from "styled-components";

export const AdminCategoryCityPage = styled.div`
  display: flex;
  min-height: 0;
  height: 100%;
  flex-direction: column;
`;

/** 지역 탭 — 공통코드 관리(AdminCodePage)의 언더라인 탭과 같은 규격 */
export const CityTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  flex-wrap: wrap;
`;

export const CityTab = styled.button<{ $active: boolean }>`
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

  /* 비활성 지역은 클릭 불가 — 존재는 보이되 흐리게, 목록 맨 뒤로 정렬된다 */
  &:disabled {
    color: ${(props) => props.theme.colors.adminPlaceholder};
    cursor: not-allowed;
  }
`;

/** 저장·초기화 액션 바 — 공통코드 관리의 추가 바와 같은 그레이 박스 */
export const ActionBar = styled.div`
  display: flex;
  padding: 12px 20px;
  margin-bottom: 16px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.adminInputBg};
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ActionLabel = styled.div`
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.4rem;
  font-weight: 700;
  flex: none;
`;

/** 선택 지역 표시 칩 */
export const CityChip = styled.div`
  display: inline-flex;
  height: 26px;
  padding: 0 10px;
  border-radius: 13px;
  color: ${(props) => props.theme.colors.primary};
  background: rgba(68, 98, 255, 0.09);
  font-size: 1.2rem;
  align-items: center;
  gap: 6px;
  flex: none;

  strong {
    overflow: hidden;
    max-width: 200px;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const BarHint = styled.p`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  flex: none;
`;

/** 우측 버튼 묶음 */
export const BarButtons = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 8px;
  flex: none;
`;

/**
 * 카테고리 추가 패널 — 공통코드 관리(AdminCodePage)의 추가 바와 같은 그레이 박스 규격이되,
 * 모드가 둘이라 한 줄에 담지 않고 상단 모드 탭 + 본문 구조로 편다.
 */
export const CreatePanel = styled.div`
  padding: 14px 20px 16px;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.adminInputBg};
`;

export const ModeTabs = styled.div`
  display: flex;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ModeTab = styled.button<{ $active: boolean }>`
  height: 30px;
  padding: 0 14px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.theme.colors.primary
        : props.theme.colors.adminInputBorder};
  border-radius: 15px;
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary
      : props.theme.colors.adminLabelTxt};
  background: ${(props) =>
    props.$active ? "rgba(68, 98, 255, 0.09)" : props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: ${(props) => (props.$active ? 700 : 400)};
  cursor: pointer;
`;

/** 모드① — 이 지역에서 숨김 상태인 카테고리 목록 (누르면 바로 노출로 바뀐다) */
export const PickList = styled.div`
  overflow-y: auto;
  display: flex;
  max-height: 240px;
  flex-direction: column;
  gap: 6px;
`;

export const PickItem = styled.button`
  display: flex;
  min-height: 36px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  text-align: left;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.adminInputBg};
  }

  span {
    overflow: hidden;
    font-size: 1.3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  small {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
    flex: none;
  }
`;

export const PickEmpty = styled.p`
  padding: 18px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  text-align: center;
`;

/** 모드② — 이름 + 상위 카테고리 입력 줄 */
export const CreateForm = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  flex: none;
`;

/**
 * 상위 카테고리 선택 — 공통 InputSelect 는 값이 falsy 면 localStorage 의 city 로 폴백해
 * 최상위(값 없음)를 표현할 수 없다. AdminCategoryDrilldown 과 같은 Trigger/Panel 골격으로 대체한다.
 */
export const ParentField = styled.div`
  position: relative;
  flex: none;
`;

export const ParentTrigger = styled.button`
  display: flex;
  width: 220px;
  height: 32px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;

  span:first-child {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ParentPanel = styled.div`
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 50;
  width: 340px;
  padding: 14px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 7px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
`;

export const ParentPanelHead = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
  }

  button {
    padding: 0;
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const ParentList = styled(PickList)`
  max-height: 280px;
`;

export const NameField = styled.div`
  flex: none;

  input {
    width: 220px;
    height: 32px;
    padding: 0 10px;
    border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
    border-radius: 3px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    background: ${(props) => props.theme.colors.white};
    font-size: 1.3rem;
    outline: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.adminPlaceholder};
    }

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

/** 패널 하단 사용법 안내 */
export const PanelHint = styled.p`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  line-height: 1.5;
`;

/** 편집 모드 안내 한 줄 — 이름 변경이 전 지역에 반영된다는 경고 */
export const EditHint = styled(PanelHint)`
  margin-top: -6px;
  margin-bottom: 14px;
`;

/** 저장하지 않은 변경 등, 진행을 막는 사유 안내 */
export const PanelWarn = styled.p`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.15rem;
`;

export const GridArea = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

export const ErrorMsg = styled.div`
  padding: 5px 10px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
  background: ${(props) => props.theme.colors.red}26;
  border-radius: 3px;
`;

export const NoticeMsg = styled.div`
  padding: 5px 10px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  background: rgba(68, 98, 255, 0.09);
  border-radius: 3px;
`;

export const EmptyMsg = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
`;
