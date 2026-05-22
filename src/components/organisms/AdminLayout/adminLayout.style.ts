import styled from "styled-components";

export const AdminLayout = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.adminBg};
  grid-template-areas:
    "AS HD"
    "AS CT";
  grid-template-columns: 220px 1fr;
  grid-template-rows: 50px 1fr;
  align-items: center;
  justify-content: center;
`;
