import styled from "styled-components";

export const adminPostPage = styled.div`
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
`;

export const VersionSwitch = styled.div`
  display: inline-grid;
  flex: 0 0 auto;
  padding: 3px;
  background: #edf0f4;
  border-radius: 7px;
  grid-template-columns: 1fr 1fr;

  button {
    min-width: 112px;
    height: 34px;
    padding: 0 12px;
    color: #69727f;
    font-family: inherit;
    font-size: 1.08rem;
    font-weight: 700;
    background: transparent;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease,
      box-shadow 0.15s ease;

    &.active {
      color: ${(props) => props.theme.colors.primary};
      background: #ffffff;
      box-shadow: 0 2px 7px rgba(34, 46, 65, 0.1);
    }
  }
`;

export const EditorToolbar = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
`;

export const DetailPreviewLink = styled.a`
  display: inline-flex;
  height: 40px;
  box-sizing: border-box;
  padding: 0 13px;
  color: #4d5663;
  font-family: inherit;
  font-size: 1.08rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  background: #ffffff;
  border: 1px solid #d8dee7;
  border-radius: 7px;
  align-items: center;
  gap: 7px;
  transition: color 0.15s ease, border-color 0.15s ease,
    background 0.15s ease, box-shadow 0.15s ease;

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.3rem;
    line-height: 1;
  }

  &:hover,
  &:focus-visible {
    color: ${(props) => props.theme.colors.primary};
    background: #f8f9ff;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 3px 10px rgba(46, 62, 102, 0.1);
    outline: none;
  }
`;

export const EditorBody = styled.div`
  display: flex;
  min-height: 0;
  flex: 1;
`;
