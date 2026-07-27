import styled from "styled-components";

export const Page = styled.div`
  max-width: 760px;
`;

export const Card = styled.section`
  padding: 32px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadow.admin};
`;

export const CardTitle = styled.h2`
  margin: 0 0 8px;
  color: ${(props) => props.theme.colors.adminMainTxt};
  font-size: 2rem;
`;

export const Description = styled.p`
  margin-bottom: 28px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.4rem;
  line-height: 1.6;
`;

export const Status = styled.p`
  padding: 40px 0;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.4rem;
  text-align: center;
`;

export const ErrorStatus = styled(Status)`
  color: ${(props) => props.theme.colors.red};
`;

export const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 30px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.adminInputBg};
`;

export const SummaryItem = styled.div`
  display: flex;
  min-height: 86px;
  padding: 18px;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  border-right: 1px solid ${(props) => props.theme.colors.adminDivider};

  &:last-child {
    border-right: 0;
  }

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.2rem;
  }

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.8rem;
  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  padding: 0;
  margin: 0 0 28px;
  border: 0;
  flex-direction: column;
  gap: 12px;

  legend {
    margin-bottom: 12px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

export const RadioLabel = styled.label`
  display: flex;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 6px;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;

  input {
    margin-top: 3px;
    accent-color: ${(props) => props.theme.colors.primary};
  }

  span {
    display: flex;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.3rem;
    line-height: 1.5;
    flex-direction: column;
    gap: 2px;
  }

  strong {
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  > label {
    display: block;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

export const CountInput = styled.div`
  display: flex;
  width: 280px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.adminInputBorder};
  border-radius: 5px;
  overflow: hidden;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    padding: 0 14px;
    border: 0;
    outline: none;
    color: ${(props) => props.theme.colors.adminMainTxt};
    font-size: 1.5rem;
  }

  input:disabled {
    color: ${(props) => props.theme.colors.adminPlaceholder};
    background: ${(props) => props.theme.colors.adminInputBg};
  }

  span {
    padding: 0 14px;
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.4rem;
  }
`;

export const PreviewText = styled.p`
  margin-top: 8px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.2rem;

  strong {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 700;
  }
`;

export const ValidationMessage = styled.p`
  margin-top: 8px;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
`;

export const Notice = styled.p`
  padding: 12px 14px;
  margin-bottom: 24px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  background: ${(props) => props.theme.colors.adminInputBg};
  font-size: 1.2rem;
  line-height: 1.5;
`;

export const SaveButton = styled.button`
  min-width: 120px;
  height: 42px;
  padding: 0 20px;
  border: 0;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.primary};
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.primaryHover};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.disabledBtn};
    cursor: default;
  }
`;
