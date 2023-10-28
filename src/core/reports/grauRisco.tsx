import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logoSeap } from "./imagesBase64";

function GrauRisco(fotoDetento, dadosGrauDeRisco) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  console.log("dadosGrauDeRisco ------------------    ", dadosGrauDeRisco);

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: "SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA",
        fontSize: 8,
        alignment: "center",
      },
      {
        text: `São Luís-MA, ${new Date().toLocaleDateString()}`,
        fontSize: 8,
        alignment: "center",
        margin: [0, 0, 0, 0],
      },

      // {
      //   text: 'www.seap.ma.gov.br',
      //   fontSize: 8,
      //   alignment: 'center',
      //   margin: [10, 0, 10, 0]
      // },
      {
        text: currentPage.toString() + " / " + pageCount.toString(),
        fontSize: 7,
        alignment: "right",
        margin: [0, 0, 10, 10],
      },
    ];
  }

  const header = [
    {
      image: logoSeap.image,
      width: 50,
      height: 50,
      aligment: "left",
      margin: [10, -30, 0, 0],
    },
    {
      text: "ESTADO DO MARANHÃO\n SECRETARIA DE ESTADO DE ADMINSTRAÇÃO PENITENCIÁRIA",
      fontSize: 11,
      alignment: "center",
      margin: [0, -50, 0, 0],
    },
    {
      text: "Ficha de Classificação de Risco para Escolta de Pessoa Presa",
      fontSize: 10,
      bold: true,
      alignment: "center",
      margin: [0, 20, 0, 0],
    },
  ];

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    content: [
      ...header,
      {
        table: {
          headerRows: 1,
          widths: [280, "*"],
          alignment: "left",
          body: [
            [
              {
                text: "UPR: " + dadosGrauDeRisco.unidadePrisional,
                fontSize: 10,
                alignment: "left",
                margin: [0, 5, 0, 0],
              },
              {
                image: fotoDetento,
                width: 120,
                height: 120,
                margin: [145, 0, 0, 0],
                rowSpan: 6,
              },
            ],
            [
              {
                text: "1° DADOS DO PRESO",
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [-10, 5, 0, 0],
              },
            ],
            [
              {
                text: "MATRICULA: " + dadosGrauDeRisco.codPessoa,
                fontSize: 8,
                alignment: "left",
                margin: [0, 5, 0, 0],
              },
            ],
            [
              {
                text: "NOME: " + dadosGrauDeRisco.nome,
                fontSize: 8,
                alignment: "left",
                margin: [0, 5, 0, 0],
              },
            ],
            [
              {
                text: "APELIDO: " + dadosGrauDeRisco.apelido[0],
                fontSize: 8,
                alignment: "left",
                margin: [0, 5, 0, 0],
              },
            ],
            [
              {
                text: "DELITO: " + dadosGrauDeRisco.delito,
                fontSize: 8,
                alignment: "left",
                margin: [0, 5, 0, 0],
              },
            ],
          ],
        },
        margin: [10, 10, 10, 10],
        layout: "noBorders",
      },

      {
        text: "2. CLASSIFICAÇÃO DE RISCO NA ESCOLTA DE RÉU PRESO",
        fontSize: 10,
        bold: true,
        alignment: "left",
        margin: [0, 5, 0, 5],
      },

      {
        table: {
          headerRows: 1,
          widths: [80, 50, "*", 60],
          alignment: "center",
          body: [
            [
              {
                text: "FATORES DE RISCO",
                fontSize: 10,
                rowSpan: 10,
                bold: true,
                alignment: "center",
                margin: [5, 120, 5, 0],
              },
              {
                text: "Grupo",
                bold: true,
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 5, 0, 5],
              },
              {
                text: "Descrição",
                bold: true,
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 5, 0, 5],
              },
              {
                text: "Pontuação",
                bold: true,
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              {
                text: "1",
                fontSize: 10,
                rowSpan: 3,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 35, 0, 5],
              },
              {
                text: "Descrição do crime (assaltante de banco, associação criminosa, sequestro, traficante, crime de pistolagem).",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptTipificacaoCriminal,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Possui histórico criminal de outros estados.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptHistoricoCriminal,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Possui mais de um ciclo no SIISP.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptQuantidadeCiclo,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],

            [
              "",
              {
                text: "2",
                fontSize: 10,
                rowSpan: 5,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 55, 0, 5],
              },
              {
                text: "Possui histórico de fugas ou tentativa.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptHistoricoFugas,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Influência com outros presos.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptInfluenciaPresos,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Informe o resgate.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptInformeResgate,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Possui algum distúrbio mental agressivo.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptDisturbioMental,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              "",
              {
                text: "Repercussão da infração criminal na comunidade.",
                fontSize: 8,
                alignment: "left",
              },
              {
                text: dadosGrauDeRisco.ptRepercussaoInfracao,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
            [
              "",
              {
                text: "3",
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [30, 5, 0, 5],
              },
              {
                text: "Casos em que o preso corre risco de morte (por ameaça de terceiros).",
                fontSize: 8,
                alignment: "left",
                margin: [15, 0, -15, 0],
              },
              {
                text: dadosGrauDeRisco.ptRiscoMorte,
                fontSize: 8,
                alignment: "center",
                margin: [30, 5, 0, 5],
              },
            ],
            [
              {
                text: "PONTUAÇÃO TOTAL",
                fontSize: 10,
                colSpan: 3,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 5, 0, 5],
              },
              "",
              "",
              {
                text: dadosGrauDeRisco.ptTotalPontos,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
        margin: [0, 10, 0, 0],
      },
      {
        table: {
          headerRows: 1,
          widths: [150, 150],
          alignment: "center",
          body: [
            [
              {
                text: "PONTUAÇÃO TOTAL",
                bold: true,
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 3, 0, 3],
              },
              {
                text: "GRAU DE RISCO",
                bold: true,
                fontSize: 10,
                alignment: "center",
                fillColor: "#E3E3E3",
                margin: [0, 3, 0, 3],
              },
            ],
            [
              {
                text: "ZERO",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              {
                text: "Risco Baixo",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
            ],
            [
              {
                text: "ATÉ 3 PONTOS",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              {
                text: "Risco Médio",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
            ],
            [
              {
                text: "ACIMA DE 3 PONTOS",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
              {
                text: "Risco Alto",
                bold: true,
                fontSize: 10,
                alignment: "center",
                margin: [0, 3, 0, 3],
              },
            ],
          ],
        },
        margin: [0, 10, 0, 0],
      },
      {
        text: "GRAU DE RISCO: \n" + dadosGrauDeRisco.grauRisco,
        fontSize: 14,
        alignment: "center",
        margin: [350, -55, 0, 0],
      },
      {
        text: "ATENÇÃO (1): O grupo 3 é considerado de extrema observância. Refere-se a situações em que o transporde de réu preso coloca em risco sua integridade física dos agentes. Por esta razão, deverá ser considerada ALTO RISCO, independente de somatório de pontos. \n\n ATENÇÃO (2): A classificação deverá ser feita pela direção do estabelecimento prisional junto com o diretor de segurança que classificará o risco por critérios objetivos, evitando juízo de valores",
        fontSize: 8,
        alignment: "left",
        margin: [10, 40, 0, 0],
      },
      {
        text: "______________________________________________________________________\n Assinatura da autoridade",
        fontSize: 12,
        alignment: "center",
        margin: [10, 40, 0, 0],
      },
      // {
      //   image: logoSeap.image,
      //   width: 50,
      //   height: 50,
      //   aligment: "left",
      //   margin: [10, -20, 0, 0],
      // },
    ],
    // footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default GrauRisco;
