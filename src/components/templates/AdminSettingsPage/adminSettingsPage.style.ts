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

export const StateRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  padding: 18px;
  gap: 12px;
  border: 1px solid ${(props) => props.theme.colors.adminDivider};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.adminInputBg};

  span {
    color: ${(props) => props.theme.colors.adminLabelTxt};
    font-size: 1.4rem;
  }
`;

export const StateBadge = styled.strong<{ enabled: boolean }>`
  padding: 6px 14px;
  border-radius: 999px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.enabled ? props.theme.colors.red : props.theme.colors.adminLabelTxt};
  font-size: 1.4rem;
`;

export const Notice = styled.p`
  margin-bottom: 28px;
  color: ${(props) => props.theme.colors.adminLabelTxt};
  font-size: 1.3rem;
  line-height: 1.6;
`;

export const ToggleButton = styled.button<{ enabled: boolean }>`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 6px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.enabled ? props.theme.colors.adminLabelTxt : props.theme.colors.red};
  font-size: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
