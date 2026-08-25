import styled, { css } from "styled-components";

export const Section = styled.section`
  display: flex;
  margin: 12px 0 4px;
  padding: 18px;
  background: linear-gradient(145deg, #f7fcff 0%, #eef8ff 100%);
  border: 1px solid rgba(42, 171, 238, 0.3);
  border-radius: 10px;
  flex-direction: column;
  gap: 12px;
`;

export const Heading = styled.div`
  display: flex;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(42, 171, 238, 0.18);
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  span {
    color: #168ac5;
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.12em;
  }

  strong {
    color: #173449;
    font-size: 1.6rem;
  }

  p {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.1rem;
    line-height: 1.5;
  }
`;

export const Label = styled.div`
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
`;

export const IconOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

export const IconOption = styled.button<{ $active: boolean }>`
  display: grid;
  min-width: 0;
  padding: 10px;
  color: #2a3d49;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 8px;
  grid-template-columns: 34px minmax(0, 1fr) 16px;
  text-align: left;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 140ms ease, box-shadow 140ms ease,
    transform 140ms ease;

  ${(props) =>
    props.$active &&
    css`
      border-color: #2aabee;
      box-shadow: 0 0 0 2px rgba(42, 171, 238, 0.12);
    `}

  &:hover {
    border-color: #2aabee;
    transform: translateY(-1px);
  }

  span {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 2px;
  }

  strong {
    font-size: 1.2rem;
  }

  small {
    overflow: hidden;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.05rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  i {
    color: #168ac5;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 800;
    text-align: center;
  }
`;

export const CustomGlyph = styled.b`
  display: flex;
  width: 34px;
  height: 34px;
  color: #168ac5;
  background: #e5f6ff;
  border: 1px dashed #2aabee;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 400;
  align-items: center;
  justify-content: center;
`;

export const CustomUpload = styled.div`
  display: flex;
  min-height: 150px;
  flex-direction: column;
  gap: 7px;
`;

export const Guide = styled.div`
  display: flex;
  padding: 9px 10px;
  color: #426276;
  background: rgba(42, 171, 238, 0.08);
  border-radius: 6px;
  font-size: 1.1rem;
  line-height: 1.5;
  align-items: flex-start;
  gap: 7px;

  svg {
    flex: 0 0 auto;
  }
`;
