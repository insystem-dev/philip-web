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

/** 하위 카테고리별 섹션 (타이틀 + 목록) */
export const PostGroupSection = styled.section`
  display: flex;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  gap: 14px;

  &:first-of-type {
    margin-top: 4px;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    margin-top: 14px;
    gap: 12px;
  }
`;

/**
 * 하위 카테고리 섹션 타이틀
 * 다크 배경 위에서 확실히 구분되도록 브랜드 블루 그라데이션 헤더 밴드 + 업체 수 배지
 */
export const PostGroupTitle = styled.h3`
  display: flex;
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-left: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: 0 6px 6px 0;
  background: linear-gradient(
    90deg,
    rgba(68, 98, 255, 0.28) 0%,
    rgba(68, 98, 255, 0.1) 45%,
    rgba(68, 98, 255, 0) 100%
  );
  color: ${(props) => props.theme.colors.white};
  font-size: 1.7rem;
  font-weight: 700;
  line-height: 1.2;
  align-items: center;
  gap: 10px;

  em {
    display: inline-flex;
    height: 22px;
    padding: 0 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 11px;
    color: ${(props) => props.theme.colors.subTxt};
    background: rgba(255, 255, 255, 0.06);
    font-size: 1.15rem;
    font-style: normal;
    font-weight: 500;
    align-items: center;
  }

  //모바일 화면 설정
  @media screen and (max-width: 768px) {
    min-height: 38px;
    padding: 0 10px;
    font-size: 1.5rem;

    em {
      height: 20px;
      padding: 0 8px;
      font-size: 1.05rem;
    }
  }
`;
