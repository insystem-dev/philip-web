import styled from "styled-components";

export const PostFormBox = styled.form`
  overflow: auto;
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 40px;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const PostFormImgBox = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 120px 1fr;
  gap: 20px 10px;
`;

export const PostFormInfoBox = styled.div`
  display: flex;
  padding: 30px;
  background: ${(props) => props.theme.colors.adminInputBg};
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  flex-direction: column;
  gap: 10px;
`;

export const PostFormBtnBox = styled.div`
  grid-column: 1/3;
`;

export const PostFormBoxTit = styled.div`
  display: flex;
  font-size: 1.6rem;
  margin-bottom: 10px;
  flex-direction: column;
  gap: 5px;

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.2rem;
  }
`;

export const PostFormImgInput = styled.div`
  display: flex;
  height: 220px;
`;
