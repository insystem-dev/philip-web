import styled from "styled-components";

export const PostListBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export const PostList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 32px 15px;

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    gap: 16px 9px;
  }
`;

export const PostCountSpan = styled.span`
  color: white;
  font-size: 1.4rem;
`;
