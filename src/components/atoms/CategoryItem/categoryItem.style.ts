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
  border-radius: 8px;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:active {
    font-weight: 500;
    background: ${(props) => props.theme.colors.primary};
  }

  @media screen and (min-width: 769px) {
    width: 100%;
    height: 76px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1.8rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
    }
  }
`;
