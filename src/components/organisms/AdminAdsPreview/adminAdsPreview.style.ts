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

export const AdminAdsPreviewBox = styled.div`
  display: grid;
  grid-template-areas:
    "LG LG LG"
    "SM1 SM2 SM3";
  grid-template-rows: 89px 58px;
  grid-gap: 4px;
`;
