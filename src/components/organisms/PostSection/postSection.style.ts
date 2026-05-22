import styled from "styled-components";

export const PostSection = styled.section`
  grid-area: PS;
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  gap: 60px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    gap: 80px;

    & > button {
      display: none;
    }
  }
`;
