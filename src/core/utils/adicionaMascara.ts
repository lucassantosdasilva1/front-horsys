export function formatarCPF(cpf) {
  // Remove caracteres não numéricos, mantendo apenas os dígitos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF possui 11 dígitos
  // if (cpf.length !== 11) {
  //   form.set("CPF inválido! O CPF deve conter exatamente 11 dígitos.");
  // }

  // Formata o CPF adicionando os pontos e traços
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function retirarFormatacaoCPF(cpf) {
  // Remove caracteres não numéricos, mantendo apenas os dígitos
  return cpf.replace(/\D/g, "");
}
