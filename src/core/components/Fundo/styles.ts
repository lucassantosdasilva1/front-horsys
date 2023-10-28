import { Layout } from "antd";
import styled from "styled-components";

export const FundoComponente = styled(Layout)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 2rem;
  margin: -0.5rem;
  height: 100%;
  min-height: 100vh;
`;
