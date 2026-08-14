import styled from "styled-components";

export const PostItem = styled.li`
  overflow: hidden;
  display: flex;
  width: 220px;
  height: 180px;
  color: white;
  background: transparent;
  cursor: pointer;
  flex-direction: column;
  /* box-shadow: ${(props) => props.theme.shadow.dark}; */
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;

  &:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    transform: translateY(-2px);
  }

  @media screen and (max-width: 768px) {
    width: calc(33% - 6px);
    height: 122px;

    &:hover {
      transform: none;
    }
  }
`;

export const PostItemImage = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 136px;
  flex: 0 0 136px;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 55%,
      rgba(0, 0, 0, 0.14) 100%
    );
    pointer-events: none;
  }

  @media screen and (max-width: 768px) {
    height: 88px;
    flex-basis: 88px;
  }
`;

// 썸네일이 없을 때 보여주는 디폴트 이미지 (다크 배경 + 필립 로고)
export const PostItemNoImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.dark};

  &::after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("/assets/images/img-logo-01.png") no-repeat center / 40%
      auto;
    opacity: 0.35;
  }
`;

export const PostItemSpan = styled.span`
  display: block;
  width: 100%;
  height: 44px;
  padding: 7px 10px 8px;
  overflow: hidden;
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 29px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    height: 34px;
    padding: 5px 7px 6px;
    font-size: 1.45rem;
    line-height: 23px;
  }
`;
