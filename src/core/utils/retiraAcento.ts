export default function retiraAcento(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// funcao que retira caracteres especiais
// Path: src/shared/utils/retiraCaracteresEspeciais.ts
export function retiraCaracteresEspeciais(texto: string) {
  return texto.replace(/[^a-zA-Z0-9 ]/g, '');
}

// funcao que retira caracteres especiais e acentos
// Path: src/shared/utils/retiraCaracteresEspeciais.ts
export function retiraCaracteresEspeciaisEacentos(texto: string) {
  return retiraAcento(retiraCaracteresEspeciais(texto));
}