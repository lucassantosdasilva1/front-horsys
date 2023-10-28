import theme from '@/shared/theme';
import { Input, InputProps } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import styled from 'styled-components';

export const LabelComponent = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.principal};
  font-size: ${({ theme }) => theme.fonts.sizes.small}px;
`;

export const Mask = styled(MaskedInput).attrs({
  style: {
    boxShadow: "7px 7px 35px rgba(0, 0, 0, 0.15)",
    borderRadius: 50,
    fontFamily: theme.fonts.family.principal,
    fontSize: theme.fonts.sizes.small,
  },
} as MaskedInputProps)``;