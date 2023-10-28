import { Form, InputProps } from "antd";
import { MaskedInputProps } from "antd-mask-input/build/main/lib/MaskedInput";

const { Item } = Form;

interface PropsInput extends MaskedInputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
}

import { Mask, LabelComponent } from "./styles";

export function MaskedInput({
  titulo,
  textoInterno,
  nome,
  ...rest
}: PropsInput) {
  return (
    <Item name={nome} label={<LabelComponent>{titulo}</LabelComponent>}>
      <Mask placeholder={textoInterno} {...rest} />
    </Item>
  );
}
