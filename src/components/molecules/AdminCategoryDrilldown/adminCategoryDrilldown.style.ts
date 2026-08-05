import styled from "styled-components";

export const Field = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
`;

export const Wrap = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: flex;
  width: 100%;
  min-width: 170px;
  height: 36px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 3px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;

  span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Panel = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  z-index: 50;
  width: 360px;
  padding: 14px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 7px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
  }

  button {
    padding: 0;
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const Search = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 4px;
  outline: none;
  font-size: 1.25rem;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Breadcrumb = styled.div`
  overflow-x: auto;
  display: flex;
  padding: 3px 0 10px;
  white-space: nowrap;

  button {
    padding: 0 3px;
    border: 0;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    background: transparent;
    font-size: 1.15rem;
    cursor: pointer;
  }
`;

export const List = styled.div`
  overflow-y: auto;
  display: flex;
  max-height: 330px;
  flex-direction: column;
  gap: 6px;
`;

export const LevelItem = styled.button`
  display: flex;
  min-height: 40px;
  padding: 0 11px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  background: ${(props) => props.theme.colors.white};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    background: ${(props) => props.theme.colors.adminInputBg};
  }

  span {
    font-size: 1.3rem;
  }

  small {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
  }
`;

export const SelectCurrent = styled(LevelItem)`
  min-height: 54px;
  border-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.adminInputBg};
  text-align: left;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;

  strong {
    font-size: 1.3rem;
  }
`;

export const BackButton = styled(LevelItem)`
  min-height: 34px;
  justify-content: flex-start;
`;

export const SearchResult = styled(LevelItem)`
  text-align: left;
  justify-content: flex-start;
  line-height: 1.4;
`;

export const Empty = styled.p`
  padding: 24px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;
  text-align: center;
`;

export const Error = styled.p`
  margin-top: 4px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.1rem;
`;
