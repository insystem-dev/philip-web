import styled from "styled-components";

/**
 * '노출 지역' 축 강조색 (앰버).
 *
 * theme 에는 앰버 계열이 없다. 색 값이 파일마다 흩어지지 않도록 여기서 한 번만 정의하고,
 * 지역 축을 그리는 다른 곳(AdminAdsBox 의 CityScopeBox)도 이 값을 import 해서 쓴다.
 * 카테고리 축은 theme.colors.primary(브랜드 블루)를 그대로 쓰므로 두 축이 색으로도 구분된다.
 */
export const cityScope = {
  /** 포인트 바·hover 테두리 */
  line: "#D69E00",
  /** 박스 외곽선 */
  lineSoft: "#EBD6A0",
  /** 라벨·강조 텍스트 (흰 배경 대비 5.3:1) */
  text: "#8A6400",
  /** 박스 배경 */
  tint: "#FFFBF0",
  /** 칩 hover 배경 (박스 배경보다 한 단계 진하게 — 칩이 배경에 묻히지 않도록) */
  tintStrong: "#FBF0D5",
  /** 선택된 칩 배경 (흰 글씨 대비 5.3:1) */
  fill: "#8A6400",
};

export const Field = styled.div`
  width: 100%;
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
`;

/** 지역이 늘어나면 줄바꿈으로 흘린다 — 좁은 화면에서도 가로 스크롤이 생기지 않는다 */
export const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Chip = styled.button<{ $active: boolean; $off: boolean }>`
  display: inline-flex;
  height: 32px;
  padding: 0 14px;
  border: 1px ${(props) => (props.$off ? "dashed" : "solid")}
    ${(props) =>
      props.$active ? cityScope.fill : props.theme.colors.adminInputBorder};
  /* 아래 '노출 카테고리' 드릴다운(각진 드롭다운 버튼)과 형태가 겹치지 않도록 알약형으로 둔다 */
  border-radius: 999px;
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.adminMainTxt};
  background: ${(props) =>
    props.$active ? cityScope.fill : props.theme.colors.white};
  font-size: 1.25rem;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${cityScope.line};
    background: ${(props) =>
      props.$active ? cityScope.fill : cityScope.tintStrong};
  }

  &:focus-visible {
    outline: 2px solid ${cityScope.line};
    outline-offset: 2px;
  }
`;

/** 비활성 지역 표시 — 관리자는 고를 수 있어야 하므로 disabled 대신 배지 + 점선 테두리로만 구분한다 */
export const OffBadge = styled.span`
  padding: 1px 5px;
  border-radius: 3px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  background: ${(props) => props.theme.colors.adminInputBg};
  font-size: 1rem;
  font-weight: 500;
`;

export const Empty = styled.p`
  padding: 8px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  line-height: 1.5;
`;
