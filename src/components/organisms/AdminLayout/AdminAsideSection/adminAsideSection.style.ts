import styled from "styled-components";

export const AdminAsideSection = styled.section`
  grid-area: AS;
  display: grid;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.white};
  border-right: 1px solid ${(props) => props.theme.colors.adminBorder};
  grid-template-areas:
    "TP"
    "NV";
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr;
`;
