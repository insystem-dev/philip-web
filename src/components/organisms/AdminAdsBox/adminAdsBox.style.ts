import styled from "styled-components";

import { cityScope } from "@/components/molecules/AdminCityChips/adminCityChips.style";

export const AdminAdsBox = styled.div`
  display: flex;
  padding: 30px;
  background: ${(props) => props.theme.colors.adminInputBg};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  flex-direction: column;
  gap: 10px;
`;

export const AdminAdsTit = styled.div`
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.6rem;
  font-weight: 700;
`;

export const AdminAdsDesc = styled.p`
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  line-height: 1.5;

  strong {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 700;
  }
`;

export const AdminAdsGroupTitle = styled.div`
  padding-top: 18px;
  margin-top: 8px;
  border-top: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 1.4rem;
  font-weight: 700;
`;

export const AdminAdsInput = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/**
 * 노출 카테고리 선택 박스
 * 아래 배너 카드 전체의 노출 범위를 바꾸는 핵심 컨트롤이라
 * 브랜드 블루 틴트 + 좌측 포인트 바로 눈에 띄게 강조한다.
 */
export const CategoryScopeBox = styled.div`
  display: flex;
  padding: 12px 14px;
  border: 1px solid rgba(68, 98, 255, 0.35);
  border-left: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  background: rgba(68, 98, 255, 0.06);
  flex-direction: column;
  gap: 8px;
`;

export const CategoryScopeLabel = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.35rem;
  font-weight: 700;
  align-items: center;
  gap: 6px;

  svg {
    flex: none;
  }
`;

export const CategoryScopeControl = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;

  button[aria-haspopup="listbox"] {
    height: 38px;
    border-color: rgba(68, 98, 255, 0.45);
    font-weight: 600;

    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const CategoryExposureToggle = styled.button<{ $exposed: boolean }>`
  display: inline-flex;
  height: 38px;
  padding: 0 12px;
  border: 1px solid
    ${(props) =>
      props.$exposed ? props.theme.colors.primary : props.theme.colors.func};
  border-radius: 6px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.$exposed ? props.theme.colors.primary : props.theme.colors.func};
  font-size: 1.2rem;
  font-weight: 700;
  white-space: nowrap;
  align-items: center;
  gap: 7px;
  cursor: pointer;

  > span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.white};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CategoryExposureError = styled.span`
  color: ${(props) => props.theme.colors.red};
  font-size: 1.1rem;
  white-space: nowrap;
`;

export const CategoryScopeHint = styled.p`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  line-height: 1.5;
`;

/**
 * 노출 지역 선택 박스
 * 카테고리 박스와 같은 골격(좌측 포인트 바 + 라벨 + 안내)을 쓰되 두 가지를 달리해 축을 구분한다.
 * - 색: 브랜드 블루 대신 앰버 (adminCityChips.style 의 cityScope 램프를 공유)
 * - 컨트롤: 드롭다운 대신 칩 그룹 — 클릭 없이 전체 선택지와 현재 값이 함께 보인다
 */
export const CityScopeBox = styled.div`
  display: flex;
  padding: 12px 14px;
  border: 1px solid ${cityScope.lineSoft};
  border-left: 4px solid ${cityScope.line};
  border-radius: 8px;
  background: ${cityScope.tint};
  flex-direction: column;
  gap: 8px;
`;

export const CityScopeLabel = styled.div`
  display: flex;
  color: ${cityScope.text};
  font-size: 1.35rem;
  font-weight: 700;
  align-items: center;
  gap: 6px;

  svg {
    flex: none;
  }
`;

export const CityScopeHint = styled.p`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  line-height: 1.5;

  strong {
    color: ${cityScope.text};
    font-weight: 700;
  }
`;
