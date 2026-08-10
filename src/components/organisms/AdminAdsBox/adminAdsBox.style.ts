import styled from "styled-components";

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
  button[aria-haspopup="listbox"] {
    height: 38px;
    border-color: rgba(68, 98, 255, 0.45);
    font-weight: 600;

    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const CategoryScopeHint = styled.p`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.15rem;
  line-height: 1.5;
`;
