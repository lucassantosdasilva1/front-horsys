/* eslint-disable no-template-curly-in-string */
import { validate } from "gerador-validador-cpf";

interface CpfValid {
  validateStatus: string;
  errorMsg: string | null;
}

export const required = [
  {
    required: true,
  },
];

const validCpf = (rule: any, cpf: any, callback: any): any => {
  if (validate(cpf)) {
    callback();
  } else {
    callback("CPF Inválido!");
  }
};

export const CpfRequired = [
  {
    required: true,
  },
  {
    validator: validCpf,
  },
];

export const validateMessages = {
  required: "${label} é obrigatório!",
  types: {
    email: "${label} email inválido!",
    number: "${label} não é um número válido!",
  },
  number: {
    range: "${label} o valor não está entre ${min} e ${max}",
  },
};
