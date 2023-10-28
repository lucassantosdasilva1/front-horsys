import styled from "styled-components";

export const Container = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.large}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;
