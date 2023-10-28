export function converteData(data: string): string {
  const dataFormatada = data.split('-').join('/').split('/').reverse().join('/');
  //revertendo para formato br
  return dataFormatada;
}