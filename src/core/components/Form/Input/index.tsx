import { Form, InputProps } from "antd";

const { Item } = Form;

interface PropsInput extends InputProps {
  textoInterno: string;
  titulo: string;
  nome: string;
}

import { EntradaComponente, LabelComponent } from "./styles";

export function Entrada({ titulo, textoInterno, nome, ...rest }: PropsInput) {
  
  return (
    <Item name={nome} label={<LabelComponent>{titulo}</LabelComponent>}>
      <EntradaComponente placeholder={textoInterno} {...rest}/>
    </Item>
  );
}
