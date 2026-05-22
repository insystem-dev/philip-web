import styled from "styled-components";

export const CategoryItem = styled.li`
  display: flex;
  width: 104px;
  height: 52px;
  color: white;
  font-size: 1.6rem;
  background: ${(props) => props.theme.colors.inputDarkBg};
  align-items: center;
  justify-content: center;

  &:hover,
  &:active {
    font-weight: 500;
    background: ${(props) => props.theme.colors.primary};
  }
`;
