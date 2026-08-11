import styled from "styled-components";

export const AdminAdsPreview = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
`;

export const AdminAdsPreviewTit = styled.div`
  font-size: 1.6rem;
`;

/** 범위 노출 설정이 꺼져 있을 때 미리보기 상단에 뜨는 안내문 */
export const AdminAdsHiddenNotice = styled.p`
  padding: 8px 10px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.red};
  background: ${(props) => props.theme.colors.adminInputBg};
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const AdminAdsPreviewBox = styled.div`
  display: grid;
  grid-template-areas:
    "LG LG LG"
    "SM1 SM2 SM3";
  grid-template-rows: 89px 58px;
  grid-gap: 4px;
`;

export const CategoryAdsPreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  > div {
    width: 100%;
  }
`;

export const CategoryPreviewGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BottomPreviewLabel = styled.div`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
`;
