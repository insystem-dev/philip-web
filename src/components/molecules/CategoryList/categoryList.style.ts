import styled from "styled-components";

export const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    display: grid;
    width: min(920px, calc(100vw - 80px));
    padding: 0 !important;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }
`;
