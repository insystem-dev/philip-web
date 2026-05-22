import styled from "styled-components";

export const NavItem = styled.li`
  position: relative;
  display: flex;
  width: 90px;
  height: 40px;
  color: white;
  font-size: 1.4rem;
  background: ${(props) => props.theme.colors.white}26;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: ${(props) => props.theme.gradient.primary};
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &.active {
    &::before {
      opacity: 1;
    }
  }

  span {
    position: relative;
    z-index: 2;
  }
`;
