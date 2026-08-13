import styled from "styled-components";

export const CategoryList = styled.ul`
  display: grid;
  width: 100%;
  padding: 0;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;

  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
  }
`;
