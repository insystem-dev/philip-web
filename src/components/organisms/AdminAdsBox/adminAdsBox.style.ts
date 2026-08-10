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

/** 이미지 등록 행(80px / 입력 / 90px)과 동일한 규격의 카테고리 선택 행 */
export const CategoryInputRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 90px;
  gap: 5px;
  align-items: center;
  font-size: 1.3rem;
`;

export const CategoryInputLabel = styled.div`
  display: flex;
  height: 35px;
  align-items: center;
`;

export const CategoryInputControl = styled.div`
  grid-column: 2 / 4;

  button[aria-haspopup="listbox"] {
    height: 35px;
  }
`;
