import styled from "styled-components";

export const PostItem = styled.li`
  position: relative;
  width: 220px;
  height: 140px;
  color: white;
  cursor: pointer;
  z-index: 0;

  // 임시게시글 디자인(사진X)
  // background: ${(props) => props.theme.colors.dark};

  // 임시게시글 디자인(사진O)
  box-shadow: ${(props) => props.theme.shadow.dark};

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    background: ${(props) => props.theme.gradient.dark};
    transition: all 0.2s ease-in-out;
    z-index: 1;
  }

  // &:hover {
  //   box-shadow: ${(props) => props.theme.shadow.dark};

  //   &::before {
  //     opacity: 1;
  //   }
  // }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    width: calc(33% - 6px);
    height: 90px;
  }
`;

export const PostItemSpan = styled.span`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 16px;
  left: 16px;
  padding-right: 16px;
  font-size: 2.4rem;
  font-weight: 600;
  word-wrap: break-word;
  word-breae: break-all;
  opacity: 1;
  justify-content: flex-end;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  gap: 2px;
  z-index: 2;

  // ${PostItem}:hover & {
  //   opacity: 1;
  // }

  span {
    color: ${(props) => props.theme.colors.white}f2;
    font-size: 1.6rem;
    font-weight: 400;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    font-size: 1.8rem;

    span {
      font-size: 1.3rem;
    }
  }
`;
