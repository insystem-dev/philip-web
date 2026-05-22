import styled, { css } from "styled-components";

interface InputProps {
  width?: string;
  size?: string;
  layout?: string;
  themeType?: string;
}

export const InputCommon = styled.div<InputProps>`
  display: flex;

  label {
    display: flex;
    width: ${(props) => (props.width ? props.width : "initial")};
    color: ${(props) =>
      props.themeType === "admin" ? props.theme.colors.adminLabelTxt : "white"};
    font-size: 1.4rem;
    align-items: center;
    gap: 6px 10px;

    .displayValue {
      font-size: 1.4rem;
      cursor: pointer;
    }
  }

  input,
  select,
  textarea {
    width: ${(props) => (props.width ? props.width : "initial")};
    height: ${(props) =>
      props.size === "sm"
        ? "24px"
        : props.size === "md"
        ? "30px"
        : props.size === "lg"
        ? "40px"
        : props.size === "xlg"
        ? "48px"
        : "unset"};
    padding: ${(props) =>
      props.size === "sm" || props.size === "md"
        ? "0 6px 2px"
        : props.size === "lg"
        ? "0 15px"
        : "0"};
    font-size: ${(props) => (props.size === "lg" ? "1.5rem;" : "1.3rem;")};
  }

  textarea {
    height: 120px;
    padding: 10px;
    font-size: 1.3rem;
  }

  ${(props) =>
    props.layout === "row" &&
    css`
      label {
        input,
        select {
          color: white;
          background: ${(props) => props.theme.colors.inputDarkBg};
          border: none;
          border-bottom: 1px solid
            ${(props) => props.theme.colors.inputDarkBorder};
          border-radius: 3px 3px 0 0;
        }
      }
    `}

  ${(props) =>
    props.layout === "column" &&
    css`
      label {
        flex-direction: column;
        align-items: flex-start;
      }
    `}

    ${(props) =>
    props.layout === "adminRow" &&
    css`
      label {
        color: ${(props) => props.theme.colors.adminLabelTxt};

        input {
          padding: 0px 6px;
          border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
          border-radius: 3px;
        }
      }
    `}

    ${(props) =>
    props.themeType === "admin" &&
    css`
      input,
      select,
      textarea {
        border: 1px solid ${props.theme.colors.adminInputBorder};
        border-radius: 4px;
      }
    `}
`;
