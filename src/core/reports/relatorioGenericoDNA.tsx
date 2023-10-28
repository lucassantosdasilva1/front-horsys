import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { codigoBarras, digital, logoInstitutoGenetica } from "./imgDNA";

interface DadosTabela {
  sub1?: string;
  sub2?: string;
  sub3?: string;
  // dadosGeral: any
  // tituloColunas: string[]
  tituloTabela?: string;
}

function RelatorioGenetico({ tituloTabela }: DadosTabela) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const docDefinitions = {
    pageSize: {
      height: 730.7,
      width: 1040.88,
    },
    pageMargins: [15, 50, 15, 40],
    content: [
      {
        image: logoInstitutoGenetica.image,
        width: 230,
        aligment: "left",
        margin: [15, -35, 0, 0],
      },
      {
        text: tituloTabela,
        fontSize: 16,
        bold: true,
        alignment: "center",
        margin: [0, 0, 10, 20],
      },
      {
        margin: [800, -80, 0, 0],
        table: {
          headerRows: 1,
          widths: "auto",
          alignment: "right",
          body: [
            [
              {
                text: "Nº Formulário",
                fontSize: 16,
                bold: true,
                alignment: "left",
                borderColor: ["#2F5629", "#2F5629", "#2F5629", "#2F5629"],
                fillColor: "#2F5629",
                color: "white",
              },
            ],
            [
              {
                text: "Convicted Offender",
                fontSize: 8,
                alignment: "left",
                borderColor: ["#44823E", "#44823E", "#44823E", "#44823E"],
                fillColor: "#44823E",
                color: "white",
              },
            ],
            [
              {
                text: "2806.19.CO",
                fontSize: 24,
                bold: true,
                alignment: "right",
                border: [true, true, true, true],
                borderColor: ["#5CAE54", "#5CAE54", "#5CAE54", "#5CAE54"],
                margin: [40, 0, 0, 0],
              },
            ],
          ],
        },
      },
      {
        text: "Informações sobre o doador",
        fontSize: 12,
        bold: true,
        style: "subheader",
        margin: [20, 0, 0, 0],
        alignment: "justify",
      },
      {
        margin: [0, 5, 0, 0],
        table: {
          headerRows: 1,
          widths: [150, "*", "*"],
          body: [
            [
              {
                text: "Matrícula do SIISP:",
                fontSize: 12,
                alignment: "right",
                border: [false, true, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "035332",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, true, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              "",
            ],
            [
              {
                text: "Nome do Doador:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "ISAIAS DE JESUS SOUSA SANTANA",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              {
                text: "Data de Nascimento: 21/04/1987",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
            ],
            [
              {
                text: "Filiação:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "Pai: DADOS NÃO CADASTRADOS",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
              },
              {
                text: "Mãe: DADOS NÃO CADASTRADOS",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
              },
            ],
            [
              {
                text: "Documentação:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "RG: 204731920023",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              {
                text: "CPF: 02978045370",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
            ],
            [
              {
                text: "Tipificação Penal:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "Art: DADOS NÃO CADASTRADOS",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              "",
            ],
            [
              {
                text: "Possui Irmão Gêmeo:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "NÂO",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              "",
            ],
            [
              {
                text: "Transfusão de Sangue:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "NÂO",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              "",
            ],
            [
              {
                text: "Transplante:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "NÂO",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              "",
            ],
          ],
        },
      },
      {
        text: "Informações sobre a coleta",
        fontSize: 12,
        bold: true,
        style: "subheader",
        margin: [20, 10, 0, 0],
        alignment: "justify",
      },
      {
        margin: [0, 5, 0, 0],
        table: {
          headerRows: 1,
          widths: [150, "*", "*"],
          body: [
            [
              {
                text: "Data da Coleta:",
                fontSize: 12,
                alignment: "right",
                border: [false, true, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "DADOS NÃO CADASTRADOS",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, true, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              "",
            ],
            [
              {
                text: "Cidade da Coleta:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "SÃO LUÍS",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              "",
            ],
            [
              {
                text: "Local da Coleta:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "INSTITUTO DE GENÉTICA FORENSE -IGF",
                fontSize: 12,
                colSpan: 2,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              "",
            ],
          ],
        },
      },
      {
        text: "Responsável pela coleta",
        fontSize: 12,
        bold: true,
        style: "subheader",
        margin: [20, 10, 0, 0],
        alignment: "justify",
      },
      {
        margin: [0, 5, 0, 0],
        table: {
          headerRows: 1,
          widths: [150, "*", "*"],
          body: [
            [
              {
                text: "Nome do Responsável:",
                fontSize: 12,
                alignment: "right",
                border: [false, true, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: "SANYA JUSSARA CUTRIM MORAIS",
                fontSize: 12,
                alignment: "left",
                border: [false, true, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              {
                text: "Testemunha: ",
                fontSize: 12,
                alignment: "left",
                border: [false, true, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
            ],
            [
              {
                text: "Matrícula:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: " ",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
              {
                text: "Matrícula:",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
                fillColor: "#DFEFDB",
              },
            ],
            [
              {
                text: "Função:",
                fontSize: 12,
                alignment: "right",
                border: [false, false, true, false],
                borderColor: "#2F5629",
                margin: [0, 4, 4, 4],
              },
              {
                text: " ",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
              {
                text: "Função: ",
                fontSize: 12,
                alignment: "left",
                border: [false, false, false, false],
                borderColor: "#2F5629",
                margin: [4, 4, 4, 4],
              },
            ],
          ],
        },
      },
      {
        margin: [0, 30, 0, 0],
        table: {
          headerRows: 1,
          widths: [650],
          alignment: "left",
          body: [
            [
              {
                text: `Em cumprimento da Lei 7.210/84 - Lei de Execução Penal, os condenados por crime praticado, dolosamente, com violência de
                natureza grave contra pessoa, ou por crimes hediondos, serão submetidos, obrigatoriamente, à identificação do perfil genético,
                mediante extração de DNA - ácido desoxirribonucleico, por técnica adequada`,
                fontSize: 11,
                bold: true,
                alignment: "left",
                borderColor: ["#5CAE54", "#5CAE54", "#5CAE54", "#5CAE54"],
              },
            ],
          ],
        },
      },

      {
        alignment: "right",
        margin: [0, -400, 0, 0],
        image: digital.image,
        width: 250,
      },
      {
        image: codigoBarras.image,
        width: 295,
        alignment: "right",
        margin: [0, 82, 25, 0],
      },
    ],
  };
  pdfMake.createPdf(docDefinitions).open();
}

export default RelatorioGenetico;
