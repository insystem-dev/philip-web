import styled, { css, keyframes } from "styled-components";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

export const AdminCodePage = styled.div`
  display: flex;
  min-height: 0;
  height: 100%;
  flex-direction: column;
`;

/** 광고관리와 동일한 언더라인 탭 */
export const GroupTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.adminInputBorder};
`;

export const GroupTab = styled.button<{ $active: boolean }>`
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

/**
 * 코드 추가 바 — 업체관리 검색 바와 같은 규격의 그레이 박스.
 * 하위 추가 모드($childMode)일 때 파란 테두리로 추가 위치가 바뀌었음을 알린다.
 */
export const CreateBar = styled.form<{ $childMode: boolean }>`
  display: flex;
  padding: 12px 20px;
  margin-bottom: 16px;
  border: 1px solid
    ${(props) =>
      props.$childMode ? props.theme.colors.primary : "transparent"};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.adminInputBg};
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  transition: border-color 0.15s ease;
`;

export const CreateLabel = styled.div`
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.4rem;
  font-weight: 700;
  flex: none;
`;

/** 추가 위치 표시 칩 — 최상위(회색) / {부모명} 하위(파랑) */
export const TargetChip = styled.div<{ $child?: boolean }>`
  display: inline-flex;
  height: 26px;
  padding: 0 10px;
  border-radius: 13px;
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

  button {
    display: flex;
    width: 16px;
    height: 16px;
    padding: 0;
    border: 0;
    color: ${(props) => props.theme.colors.primary};
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  ${(props) =>
    props.$child
      ? css`
          color: ${props.theme.colors.primary};
          background: rgba(68, 98, 255, 0.09);
          animation: ${fadeSlide} 0.16s ease;
        `
      : css`
          border: 1px solid ${props.theme.colors.adminInputBorder};
          color: ${props.theme.colors.adminLabelTxt};
          background: ${props.theme.colors.white};
        `}
`;

export const NameField = styled.div`
  flex: none;

  input {
    width: 240px;
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

/** 바 우측 사용법 힌트 */
export const BarHint = styled.p`
  margin-left: auto;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  flex: none;
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

export const ContactCards = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ContactCard = styled.section`
  min-width: 380px;
  padding: 20px 24px 24px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
`;

export const ContactLabel = styled.h2`
  margin: 0 0 14px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ContactInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
