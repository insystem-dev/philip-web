import styled from "styled-components";

export const RegionList = styled.ul`
  display: flex;
  gap: 20px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
