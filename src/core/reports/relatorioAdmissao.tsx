import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logoSeap } from "./imagesBase64";
import { codigoBarras, digital, logoInstitutoGenetica } from "./imgDNA";
import dayjs from "dayjs";
import { Admissao } from "@/pages/modules/detento/visualiza/@types/relatorios";
import { urls } from "@/services/api";

function RelatorioAdmissao(
  dadosAdmissao: Admissao,
  fotoDetento,
  fotosDetento,
  fotosTatuagens
) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const mascaraCPF = () => {
    let cpf = dadosAdmissao.dadosDetento.cpfDetento;
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  };

  const listarParentes = () => {
    return dadosAdmissao.parentesDetento.listaParentes.map((item) => [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          alignment: "left",
          body: [
            [
              {
                text: "Nome: " + item.nomeParente,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Parentesco: " + item.parentesco,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
          ],
        },
        margin: [10, 0, 10, 10],
        layout: "noBorders",
      },
    ]);
  };

  const listarComarcas = () => {
    return dadosAdmissao.historicoComarca.comarcasDetento.map((item) => [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          alignment: "left",
          body: [
            [
              {
                text: "Comarca: " + item.nomeComarca,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Vara: " + item.nomeVara,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Natureza de custódia: " + item.origemComarca,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
          ],
        },
        margin: [10, 0, 10, 10],
        layout: "noBorders",
      },
    ]);
  };

  const listarEntradaESaida = () => {
    return dadosAdmissao.historicoEntradaSaida.listaHistoricoEntradaSaida.map(
      (item) => [
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            alignment: "left",
            body: [
              [
                {
                  text: "Unidade: " + item.nomeUnidadePrisional,
                  fontSize: 10,
                  bold: true,
                  alignment: "left",
                  margin: [0, 4, 0, 0],
                },
                {
                  text: "Entrada: " + item.dataEntrada,
                  fontSize: 10,
                  bold: true,
                  alignment: "left",
                  margin: [0, 4, 0, 0],
                },
                {
                  text: "Saída: " + item.dataSaida,
                  fontSize: 10,
                  bold: true,
                  alignment: "left",
                  margin: [0, 4, 0, 0],
                },
              ],
            ],
          },
          margin: [10, 0, 10, 10],
          layout: "noBorders",
        },
      ]
    );
  };

  const listarTipoPenal = () => {
    return dadosAdmissao.registroPrisional.codigoPenal.length > 0
      ? dadosAdmissao.registroPrisional.codigoPenal.map((item) => [
          {
            text: "Tipo Penal: " + item, //aque
            fontSize: 10,
            bold: true,
            alignment: "left",
            margin: [-5, 4, 0, 0],
            // colSpan: 3,
            border: [false, false, false, false],
          },
        ])
      : [
          {
            text: "Tipo Penal: ",
            fontSize: 10,
            bold: true,
            alignment: "left",
            margin: [-5, 4, 0, 0],
            // colSpan: 3,
            border: [false, false, false, false],
          },
        ];
  };

  const listarMovimentacoes = () => {
    return dadosAdmissao.movimentacoes.listaHistorico.map((item) => [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          alignment: "left",
          body: [
            [
              {
                text: item.tipoMovimentacao,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Entrada: " + item.dataEntrada,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
            [
              {
                text: "Origem: " + item.unidadeOrigem,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Saída: " + item.dataSaida,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
            [
              {
                text: "Retorno: " + item.dataRetorno,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
              {
                text: "Destino: " + item.unidadeDestino,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
            [
              {
                text: "__________________________________________________________________________________________________________________________ ",
                fontSize: 10,
                color: "#a2a2a2",
                bold: true,
                alignment: "center",
                colSpan: 2,
                margin: [0, -5, 0, 0],
              },
              "",
            ],
          ],
        },
        margin: [10, 0, 10, 10],
        layout: "noBorders",
      },
    ]);
  };

  const listarFotos = () => {
    return [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          alignment: "center",

          body: [
            [
              {
                text: "Fotos",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                colSpan: 3,
                border: [false, false, false, true],
              },
              "",
              "",
            ],
            [
              {
                image: fotosDetento[0].path,
                width: 150,
                height: 150,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                image: fotosDetento[1].path,
                width: 150,
                height: 150,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                image: fotosDetento[2].path,
                width: 150,
                height: 150,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: fotosDetento[0].descricao,
                fontSize: 10,
                bold: true,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [true, false, false, true],
              },
              {
                text: fotosDetento[1].descricao,
                fontSize: 10,
                bold: true,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [false, false, false, true],
              },
              {
                text: fotosDetento[2].descricao,
                fontSize: 10,
                bold: true,
                alignment: "center",
                margin: [0, 4, 0, 0],
                border: [false, false, true, true],
              },
            ],
          ],
        },
        margin: [0, 5, 5, 10],
        // layout: "noBorders",
      },
    ];
  };

  const listarTatuagens = () => {
    return fotosTatuagens.map((item) => [
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          alignment: "left",
          body: [
            [
              {
                text: " ",
                fontSize: 10,
                color: "#a2a2a2",
                bold: true,
                alignment: "center",
                colSpan: 2,
                margin: [0, -20, 0, 0],
              },
              "",
            ],
            [
              {
                image: item.path,
                width: 100,
                height: 100,
                alignment: "center",
                margin: [0, 0, 0, 0],
                rowSpan: 3,
              },
              {
                text: "Posição: " + item.posicao.descricao,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
            [
              "",
              {
                text: "Tipo Tatuagem: " + item.tipoTatuagem.descricao,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
              },
            ],
            [
              "",
              {
                text: "Descrição: " + item.descricao,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [30, 4, 0, 0],
              },
            ],
          ],
        },
        margin: [10, 15, 10, 60],
        layout: "noBorders",
      },
    ]);
  };

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: "SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA",
        fontSize: 8,
        alignment: "center",
        margin: [0, 40, 0, 0],
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
        margin: [20, 20, 20, 0],
      },
    ];
  }

  function Cabecalho(currentPage, pageCount) {
    return [
      {
        image: logoSeap.image,
        width: 60,
        height: 60,
        aligment: "left",
        margin: [10, 10, 0, 0],
      },
      {
        text: "ESTADO DO MARANHÃO\n SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA",
        fontSize: 10,
        alignment: "center",
        margin: [0, -50, 0, 0],
      },
      {
        text: "Ficha de Admissão do Preso",
        fontSize: 10,
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, 0],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          alignment: "center",
          body: [
            [
              {
                text: "Ciclo Nº " + dadosAdmissao.header.numeroCiclo,
                fontSize: 8,
                alignment: "left",
                margin: [0, 5, 0, 5],
              },
              {
                text: "Início Ciclo: " + dadosAdmissao.header.inicioCiclo,
                fontSize: 8,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {
                text: `Gerado em ${dayjs().format(
                  "DD/MM/YYYY"
                )} às ${dayjs().format("HH:mm")}`,
                fontSize: 8,
                alignment: "right",
                margin: [0, 5, 0, 5],
              },
            ],
          ],
        },
        margin: [20, 3, 20, 0],
        layout: "noBorders",
      },
    ];
  }

  const options = {
    filename: `Relatorio Admissao de ${dadosAdmissao.dadosDetento.nomeDetento}.pdf`,
  };

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 100, 15, 70],
    content: [
      // {
      //   table: {
      //     headerRows: 1,
      //     widths: ["*"],
      //     alignment: "left",
      //     body: [
      //       [
      //         {
      //           text: "Dados Detento",
      //           fontSize: 12,
      //           bold: true,
      //           alignment: "left",
      //           margin: [5, 0, 0, 0],
      //           fillColor: "#dbdbdb",
      //         },
      //       ],
      //     ],
      //   },
      //   margin: [0, 0, 0, 1],
      //   layout: "noBorders",
      // },

      {
        table: {
          headerRows: 1,
          widths: [280, "*"],
          alignment: "left",
          body: [
            [
              {
                text: "Dados Detento",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, false],
                colSpan: 2,
              },
              "",
            ],
            [
              {
                text: "Situação: " + dadosAdmissao.dadosDetento.situacaoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, true, false, false],
              },
              {
                image: fotosDetento.find((item) => item.descricao === "FRONTAL")
                  .path,
                width: 150,
                height: 150,
                margin: [110, 5, 0, 0],
                border: [false, true, true, true],

                rowSpan: 8,
              },
            ],
            [
              {
                text:
                  "Unidade Prisional: " +
                  dadosAdmissao.dadosDetento.unidadePrisionalDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text: "Matrícula: " + dadosAdmissao.dadosDetento.codigoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text:
                  "N° Tornozeleira Eletrônica: " +
                  dadosAdmissao.dadosDetento.numTornozeleira,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text: "Nome: " + dadosAdmissao.dadosDetento.nomeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text: "Alcunhas: " + dadosAdmissao.dadosDetento.alcunhasDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text:
                  "Nomes Falsos: " +
                  dadosAdmissao.dadosDetento.nomesFalsosDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              "",
            ],
            [
              {
                text:
                  "Nomes Sociais: " +
                  dadosAdmissao.dadosDetento.nomesSociaisDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, true],
              },
              "",
            ],
          ],
        },
        margin: [0, -15, 0, 10],
        // layout: "noBorders",
      },

      {
        table: {
          headerRows: 1,
          widths: [250, "*", "*"],
          alignment: "left",
          body: [
            [
              {
                text:
                  "Data de Nascimento: " +
                  dadosAdmissao.dadosDetento.dataNascimentoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, true, false, false],
              },
              {
                text: "RG: " + dadosAdmissao.dadosDetento.rgDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, true, false, false],
              },
              {
                text: "CPF: " + mascaraCPF(),
                // dadosAdmissao.dadosDetento.cpfDetento, aqui
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, true, true, false],
              },
            ],
            [
              {
                text:
                  "Nome do Pai: " + dadosAdmissao.dadosDetento.nomePaiDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Nome da Mãe: " + dadosAdmissao.dadosDetento.nomeMaeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [false, false, true, false],
              },
              "",
            ],
            [
              {
                text:
                  "Nacionalidade: " +
                  dadosAdmissao.dadosDetento.nacionalidadeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Naturalidade: " +
                  dadosAdmissao.dadosDetento.naturalidadeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [false, false, true, false],
              },
              "",
            ],
            [
              {
                text:
                  "Estado Civil: " +
                  dadosAdmissao.dadosDetento.estadoCivilDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Nome do Cônjugue: " +
                  dadosAdmissao.dadosDetento.conjugueDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [false, false, true, false],
              },
              "",
            ],
            [
              {
                text:
                  "Escolaridade: " +
                  dadosAdmissao.dadosDetento.escolaridadeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, false],
              },
              "",
              "",
            ],
            [
              {
                text:
                  "Endereço: " + dadosAdmissao.dadosDetento.logradouroDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text: "Bairro: " + dadosAdmissao.dadosDetento.bairroDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text: "CEP: " + dadosAdmissao.dadosDetento.cepDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: "Cidade: " + dadosAdmissao.dadosDetento.cidadeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text: "Estado: " + dadosAdmissao.dadosDetento.estadoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text: "País: " + dadosAdmissao.dadosDetento.paisDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text: "Religião: " + dadosAdmissao.dadosDetento.religiaoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, true],
              },
              "",
              "",
            ],
          ],
        },
        margin: [0, -10, 0, 5],
        // layout: "noBorders",
      },

      // {
      //   table: {
      //     headerRows: 1,
      //     widths: ["*"],
      //     alignment: "left",
      //     body: [
      //       [
      //         {
      //           text: "Registro Prisional ",
      //           fontSize: 12,
      //           bold: true,
      //           alignment: "left",
      //           margin: [5, 0, 0, 0],
      //           fillColor: "#dbdbdb",
      //         },
      //       ],
      //     ],
      //   },
      //   margin: [0, 0, 0, 15],
      //   layout: "noBorders",
      // },

      {
        table: {
          headerRows: 1,
          widths: [250, "*", "*"],
          alignment: "left",
          body: [
            [
              {
                text: "Registro Prisional ",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                colSpan: 3,
                border: [false, false, false, true],
              },
              "",
              "",
            ],
            [
              {
                text:
                  "Esfera de Origem: " +
                  dadosAdmissao.registroPrisional.esferaOrigemDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, false],
              },
              "",
              "",
            ],
            [
              {
                text:
                  "Delegacia de Origem: " +
                  dadosAdmissao.registroPrisional.delegaciaOrigemDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, false],
              },
              "",
              "",
            ],
            [
              {
                text:
                  "Data da prisão: " +
                  dadosAdmissao.registroPrisional.dataPrisaoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, false],
              },
              "",
              "",
            ],
            [
              {
                text:
                  "Data do Início do Ciclo de Vida: " +
                  dadosAdmissao.registroPrisional.dataInicioCicloVida,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Data de Cadastro: " +
                  dadosAdmissao.registroPrisional.dataCadastro,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [false, false, true, false],
              },
              "",
            ],
            [
              {
                text:
                  "Tipo de Prisão: " +
                  dadosAdmissao.registroPrisional.tipoPrisao,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Pavilhão: " +
                  dadosAdmissao.registroPrisional.pavilhaoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text: "Cela: " + dadosAdmissao.registroPrisional.celaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text:
                  "Natureza da Custódia: " +
                  dadosAdmissao.registroPrisional.naturezaCustodia,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 3,
                border: [true, false, true, false],
              },

              "",
              "",
            ],

            [
              {
                table: {
                  headerRows: 1,
                  widths: ["*"],
                  alignment: "left",
                  body: listarTipoPenal(),
                },
                colSpan: 3,
                border: [true, false, true, true],
              },

              "",
              "",
            ],
          ],
        },
        margin: [0, -2, 0, 5],
        // layout: "noBorders",
      },

      // {
      //   table: {
      //     headerRows: 1,
      //     widths: ["*"],
      //     alignment: "left",
      //     body: [
      //       [
      //         {
      //           text: "Características Físicas",
      //           fontSize: 12,
      //           bold: true,
      //           alignment: "left",
      //           margin: [5, 0, 0, 0],
      //           fillColor: "#dbdbdb",
      //         },
      //       ],
      //     ],
      //   },
      //   margin: [0, 0, 0, 15],
      //   layout: "noBorders",
      // },

      {
        table: {
          headerRows: 1,
          widths: [125, "*", "*", "*"],
          border: [true, false, true, true],
          alignment: "left",
          body: [
            [
              {
                text: "Características Físicas",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                colSpan: 4,
                border: [false, false, false, true],
              },
              "",
              "",
              "",
            ],
            [
              {
                text:
                  "Peculiaridade: " +
                  dadosAdmissao.caracteristicaFisica.peculiaridadeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [true, false, false, false],
              },
              "",
              {
                text:
                  "Altura: " + dadosAdmissao.caracteristicaFisica.alturaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text: "Peso: " + dadosAdmissao.caracteristicaFisica.pesoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text:
                  "Barba: " + dadosAdmissao.caracteristicaFisica.barbaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Bigode: " + dadosAdmissao.caracteristicaFisica.bigodeDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text: "Boca: " + dadosAdmissao.caracteristicaFisica.bocaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text:
                  "Cabelo: " + dadosAdmissao.caracteristicaFisica.cabeloDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text:
                  "Compleição: " +
                  dadosAdmissao.caracteristicaFisica.compleicaoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Cor da pele: " +
                  dadosAdmissao.caracteristicaFisica.etniaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text:
                  "Lábio: " + dadosAdmissao.caracteristicaFisica.labioDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text:
                  "Nariz: " + dadosAdmissao.caracteristicaFisica.narizDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text:
                  "Olhos: " + dadosAdmissao.caracteristicaFisica.olhoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [true, false, false, false],
              },
              {
                text:
                  "Orelhas: " +
                  dadosAdmissao.caracteristicaFisica.orelhaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text:
                  "Pescoço: " +
                  dadosAdmissao.caracteristicaFisica.pescocoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, false, false],
              },
              {
                text:
                  "Rosto: " + dadosAdmissao.caracteristicaFisica.rostoDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                border: [false, false, true, false],
              },
            ],
            [
              {
                text:
                  "Sobrancelha: " +
                  dadosAdmissao.caracteristicaFisica.sobrancelhaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [true, false, false, true],
              },
              "",
              {
                text:
                  "Testa: " + dadosAdmissao.caracteristicaFisica.testaDetento,
                fontSize: 10,
                bold: true,
                alignment: "left",
                margin: [0, 4, 0, 0],
                colSpan: 2,
                border: [false, false, true, true],
              },
              "",
            ],
          ],
        },
        margin: [0, -2, 0, 20],
        // layout: "noBorders",
      },

      {
        table: {
          headerRows: 1,
          widths: ["*"],
          alignment: "left",
          border: [true, false, true, true],

          body: [
            [
              {
                text: "Parentes",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, false],
              },
            ],
            dadosAdmissao.parentesDetento.listaParentes && [listarParentes()],
          ],
        },
        margin: [0, 10, 0, 20],
        // layout: "noBorders",
      },

      {
        table: {
          headerRows: 1,
          widths: ["*"],
          alignment: "left",
          border: [true, false, true, true],

          body: [
            [
              {
                text: "Historico de Comarca",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, false],
              },
            ],
            dadosAdmissao.historicoComarca.comarcasDetento && [
              listarComarcas(),
            ],
          ],
        },
        margin: [0, 10, 0, 20],
        // layout: "noBorders",
      },

      {
        table: {
          headerRows: 1,
          widths: ["*"],
          alignment: "left",
          border: [true, false, true, true],
          body: [
            [
              {
                text: "Historico de Entrada e Saída",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, false],
              },
            ],
            dadosAdmissao.historicoEntradaSaida.listaHistoricoEntradaSaida && [
              listarEntradaESaida(),
            ],
          ],
        },
        margin: [0, 10, 0, 20],
        // layout: "noBorders",
      },

      {
        table: {
          headerRows: 1,
          widths: [555],
          alignment: "left",
          border: [true, false, true, true],
          body: [
            [
              {
                text: "Movimentações",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, true],
              },
            ],
            dadosAdmissao.movimentacoes.listaHistorico && [
              listarMovimentacoes(),
            ],
          ],
        },
        margin: [0, -5, 5, 30],
        // layout: "noBorders",
      },

      fotosDetento && listarFotos(),

      {
        table: {
          headerRows: 1,
          widths: [555],
          alignment: "left",
          border: [true, false, true, true],
          body: [
            [
              {
                text: "Tatuagens",
                fontSize: 12,
                bold: true,
                alignment: "left",
                margin: [5, 0, 0, 0],
                fillColor: "#dbdbdb",
                border: [false, false, false, true],
              },
            ],

            // [
            //   {
            //     table: {
            //       headerRows: 1,
            //       widths: ["*"],
            //       alignment: "left",
            //       body: [
            //         [
            //           {
            //             image: item.path,
            //             width: 100,
            //             height: 100,
            //             alignment: "center",
            //             margin: [0, 0, 0, 0],
            //             rowSpan: 3,
            //           },
            //           {
            //             text: "Posição: " + item.posicao.descricao,
            //             fontSize: 10,
            //             bold: true,
            //             alignment: "left",
            //             margin: [0, 4, 0, 0],
            //           },
            //         ],
            //         [
            //           "",
            //           {
            //             text: "Tipo Tatuagem: " + item.tipoTatuagem.descricao,
            //             fontSize: 10,
            //             bold: true,
            //             alignment: "left",
            //             margin: [0, 4, 0, 0],
            //           },
            //         ],
            //         [
            //           "",
            //           {
            //             text: "Descrição: " + item.descricao,
            //             fontSize: 10,
            //             bold: true,
            //             alignment: "left",
            //             margin: [30, 4, 0, 0],
            //           },
            //         ],
            //       ],
            //     },
            //     margin: [10, 15, 10, 60],
            //     layout: "noBorders",
            //   },
            // ],
            fotosTatuagens && [listarTatuagens()],
          ],
        },
        margin: [0, 10, 0, 1],
        // layout: "noBorders",
      },

      // fotosTatuagens && listarTatuagens(),
    ],
    footer: Rodape,
    header: Cabecalho,
  };

  pdfMake.createPdf(docDefinitions).download(options.filename);

  // const pdfDocGenerator = pdfMake.createPdf(docDefinitions);

  // // Definir o nome do arquivo
  // pdfDocGenerator.getBlob((blob) => {
  //   const filename = options.filename;

  //   // const blobComNovoNome = new Blob([blob], { type: "application/pdf" });
  //   // (blobComNovoNome.name as any) = filename;

  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.target = "_blank";
  //   link.download = filename;
  //   link.click();

  //   // Abra o PDF em uma nova aba
  //   // window.open(link);
  // });
}

export default RelatorioAdmissao;
