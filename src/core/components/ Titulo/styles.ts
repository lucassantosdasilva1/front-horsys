import styled from "styled-components";

export const Container = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.extraLarge}px;
  font-family: ${({ theme }) => theme.fonts.family.principal};
  color: ${({ theme }) => theme.colors.textColorPrimary};
`;
