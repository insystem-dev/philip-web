import styled from "styled-components";

export const LinkBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    position: fixed;
    display: flex;
    width: 100%;
    padding: 0 8px;
    bottom: 8px;
    flex-direction: column;
    gap: 8px;
  }
`;
