import IGetResumoProcessualResponse from "@/pages/modules/detento/visualiza/service/interfaces/IGetResumoProcessualResponse";
import dayjs from "dayjs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logoSeap } from "./imagesBase64";

import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

interface DadosTabela {
  data: IGetResumoProcessualResponse;
}

function RelatorioProcessual({ data }: DadosTabela) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const estiloPadrao = {
    fontSize: 8,
    alignment: "left",
  };

  const estiloPadraoHeader = {
    fontSize: 10,
    bold: true,
    alignment: "center",
    margin: [0, 5, 0, 5],
    fillColor: "#E3E3E3",
  };

  const header = [
    {
      image: logoSeap.image,
      width: 50,
      height: 50,
      aligment: "left",
      margin: [10, 0, 0, 0],
    },
    {
      text: "ESTADO DO MARANHÃO\n \n SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA - SEAP\n \n SECRETARIA ADJUNTA DE ATENDIMENTO E HUMANIZAÇÃO PENITENCIÁRIA - SAAHP\n \n UNIDADE GESTORA DE ATENDIMENTO E HUMANIZAÇÃO PENITENCIÁRIA - UGAHP\n \n SUPERVISÃO DE ASSISTÊNCIA JURÍDICA - SAJ",
      fontSize: 7,
      alignment: "left",
      margin: [80, -60, 0, 0],
    },
    {
      text: "FICHA DE RESUMO PROCESSUAL",
      fontSize: 10,
      bold: true,
      alignment: "center",
      margin: [0, 20, 0, 0],
    },
    {
      border: [true, true, true, true],
      text: `INSTRUÇÃO NORMATIVA Nº 16, DE 09 DE OUTUBRO DE 2018 - SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA): `,

      fontSize: 9,
      bold: true,
      alignment: "justify",
      margin: [35, 10, 5, 0],
    },

    {
      text: `"Art. 8º. A FRP não é suficiente à colocação em liberdade de pessoa presa, devendo sempre ser
      complementada pela Instrução Técnica competente, que é expedida pela Supervisão de Gestão de Alvarás, na forma da
      regulamentação específica." - Informações válidas até a data de elaboração/atualização`,

      fontSize: 9,
      bold: true,
      alignment: "justify",
      margin: [5, 0, 5, 10],
    },
  ];

  const tabelaInformacoesPessoaisDetento = {
    table: {
      headerRows: 1,
      widths: [230, 180, "*"],
      alignment: "left",
      body: [
        [
          {
            text: `CÓDIGO DO DETENTO: ${data.detento_cod}`,
            ...estiloPadrao,
          },
          {
            text: `PRESO: ${data.detento_nome}`,
            ...estiloPadrao,
          },
          "",
        ],
        [
          {
            text: `NATURALIDADE: ${data.detento_naturalidade}`,
            ...estiloPadrao,
          },
          {
            text: `ALCUNHA: ${data.detento_alcunha}`,
            ...estiloPadrao,
          },
          {
            text: `D.N: ${data.detento_data_nascimento}`,
            ...estiloPadrao,
          },
        ],
        [
          {
            text: `PAI: ${data.detento_pai}`,
            ...estiloPadrao,
          },
          {
            text: `MÃE: ${data.detento_mae}`,
            ...estiloPadrao,
          },
          "",
        ],

        [
          {
            text: `DATA DA ÚLTIMA PRISÃO: ${data.detento_data_ultima_prisao}`,
            ...estiloPadrao,
          },
          {
            text: `NATUREZA DE CUSTÓDIA: ${data.natureza_custodia}`,
            ...estiloPadrao,
          },
          "",
        ],
      ],
    },
    margin: [0, 0, 0, 0],
  };

  const tabelaProcessosQueRespondePreso = {
    table: {
      headerRows: 1,
      widths: ["*", "*"],
      alignment: "left",
      body: [
        [
          {
            text: "PROCESSOS QUE RESPONDE PRESO",
            fontSize: 10,
            colSpan: 2,
            bold: true,
            alignment: "center",
            margin: [0, 5, 0, 5],
            fillColor: "#E3E3E3",
          },
          "",
        ],
        [
          {
            text: `Nº ÚNICO: ${data.processo_responde_preso_list[0]?.processo_num_grande}`,
            ...estiloPadrao,
          },
          {
            text: `Nº DO PROCESSO: ${data.processo_responde_preso_list[0]?.processo_num_pequeno}`,
            ...estiloPadrao,
          },
        ],

        [
          {
            text: `VARA: ${data.processo_responde_preso_list[0]?.vara_comarca}`,
            ...estiloPadrao,
          },
          {
            text: `REGIME: ${data.processo_responde_preso_list[0]?.guia_regime}`,
            ...estiloPadrao,
          },
        ],

        [
          {
            text: `TIPO DE CRIME: ${data.processo_responde_preso_list[0]?.tipo_crime}`,
            ...estiloPadrao,
          },
          {
            text: `TIPO DE ARMA: ${data.processo_responde_preso_list[0]?.tipo_arma}`,
            ...estiloPadrao,
          },
        ],

        [
          {
            text: `ATO CRIME: ${data.processo_responde_preso_list[0]?.ato_crime}`,
            fontSize: 8,
            colSpan: 2,
          },
          "",
        ],
        [
          {
            text: `INCIDÊNCIA PENAL: ${data.processo_responde_preso_list[0]?.incidencia_penal}`,
            fontSize: 8,
            colSpan: 2,
          },
          "",
        ],
        [
          {
            text: `OBJETOS TUTELADOS: ${data.processo_responde_preso_list[0]?.objeto_tutelado}`,
            fontSize: 8,
            colSpan: 2,
          },
          "",
        ],
        [
          {
            text: `ASSUNTOS: ${data.processo_responde_preso_list[0]?.assunto}`,
            fontSize: 8,
            colSpan: 2,
          },
          "",
        ],
        [
          {
            text: `OBS: ${data.processo_responde_preso_list[0]?.observacao}`,
            fontSize: 8,
            colSpan: 2,
          },
          "",
        ],
      ],
    },
    margin: [0, 10, 0, 0],
  };

  const tabelaProcessosDeExecucao = {
    table: {
      headerRows: 1,
      widths: ["*", "*"],
      alignment: "left",
      body: data.processo_execucao_list.reduce((acc: any, cv) => {
        const header = [
          {
            text: "PROCESSOS DE EXECUÇÃO",
            fontSize: 10,
            colSpan: 2,
            bold: true,
            alignment: "center",
            margin: [0, 5, 0, 5],
            fillColor: "#E3E3E3",
          },
          "",
        ];

        const linha1 = [
          { text: `EXECUÇÃO Nº: ${cv.processo_num_execucao}`, ...estiloPadrao },
          { text: `VARA/COMARCA: ${cv.vara_comarca}`, ...estiloPadrao },
        ];

        const linha2 = [
          { text: `REGIME ATUAL: ${cv.guia_regime}`, ...estiloPadrao },
          { text: `PENA: ${cv.guia_pena}`, ...estiloPadrao },
        ];

        const linha3 = [
          { text: `DATA BASE: ${cv.data_base}`, ...estiloPadrao },
          {
            text: `PREV. PROGRESSÃO DE REGIME: ${cv.data_progressao_regime}`,
            ...estiloPadrao,
          },
        ];

        const linha4 = [
          {
            text: `PREV. LIVRAMENTO CONDICIONAL: ${cv.data_livramento_condicional}`,
            ...estiloPadrao,
          },
          {
            text: `PREV. TÉRMINO PENA: ${cv.data_termino_pena}`,
            ...estiloPadrao,
          },
        ];

        const linha5 = [{ text: `OBS: ${cv.observacao}`, ...estiloPadrao }, ""];

        acc.push(header, linha1, linha2, linha3, linha4, linha5);

        return acc;
      }, []),
    },
  };

  const tabelaProcessosOriginarios = {
    table: {
      headerRows: 1,
      widths: ["*", "*", "*"],
      alignment: "left",
      body: data.processo_execucao_list.reduce((acc: any, cv) => {
        const header = [
          {
            text: "PROCESSOS ORIGINÁRIOS",
            fontSize: 10,
            colSpan: 3,
            bold: true,
            alignment: "center",
            margin: [0, 5, 0, 5],
            fillColor: "#E3E3E3",
          },
          "",
          "",
        ];

        const linha1 = [
          {
            text: `Nº ÚNICO: ${data.processo_execucao_list[0].guia_list[0].processo_num_grande}`,
            ...estiloPadrao,
          },
          {
            text: `Nº PROCESSO: ${data.processo_execucao_list[0].guia_list[0].processo_num_pequeno}`,
            ...estiloPadrao,
          },
          {
            text: `Guia: ${data.processo_execucao_list[0].guia_list[0].guia_numero}`,
            ...estiloPadrao,
          },
        ];
        const linha2 = [
          {
            text: `Vara/Comarca: ${data.processo_execucao_list[0].guia_list[0].vara_comarca}`,
            ...estiloPadrao,
          },
          {
            text: `Regime Inicial: ${data.processo_execucao_list[0].guia_list[0].guia_regime}`,
            ...estiloPadrao,
          },
          {
            text: `Assunto: ${data.processo_execucao_list[0].guia_list[0].assunto}`,
            ...estiloPadrao,
          },
        ];

        const linha3 = [
          {
            text: `Pena: ${data.processo_execucao_list[0].guia_list[0].guia_pena}`,
            ...estiloPadrao,
          },
          {
            text: `Início do Cumprimento: ${data.processo_execucao_list[0].guia_list[0].guia_ini_cumprimento}`,
            ...estiloPadrao,
          },
          {
            text: `Incidência Penal: ${cv.guia_list.map(
              (item) => item.incidencia_penal
            )}`,
            ...estiloPadrao,
            rowSpan: 3,
          },
        ];

        const linha4 = [
          {
            text: `Tipo de Crime: ${data.processo_execucao_list[0].guia_list[0].tipo_crime}`,
            ...estiloPadrao,
          },
          {
            text: `Objeto Tutelado: ${data.processo_execucao_list[0].guia_list[0].objeto_tutelado}`,

            ...estiloPadrao,
          },
          "",
        ];

        const linha5 = [
          {
            text: `Tipo de arma: ${data.processo_execucao_list[0].guia_list[0].tipo_arma}`,
            ...estiloPadrao,
          },
          {
            text: `Ato do Crime: ${data.processo_execucao_list[0].guia_list[0].ato_crime}`,
            ...estiloPadrao,
          },
          "",
        ];

        const linha6 = [
          {
            text: `OBS: ${data.processo_execucao_list[0].guia_list[0].observacao}`,
            fontSize: 8,
            alignment: "left",
            colSpan: 3,
          },
          "",
          "",
        ];

        acc.push(header, linha1, linha2, linha3, linha4, linha5, linha6);

        return acc;
      }, []),
    },
  };

  const tabelaNecessitaAtendimentyoDPE = {
    // table: processosExecucao === undefined ? '' : { ...
    table: {
      headerRows: 1,
      widths: ["*"],
      alignment: "left",
      body: [
        [
          {
            text: `Necessita de atendimento de DPE: ${data.necessita_atendimento_dpe}`,
            ...estiloPadrao,
          },
        ],
        [
          {
            text: `Justificativa atendimento de DPE: ${data.justificativa_atendimento_dpe ?? ""}`,
            ...estiloPadrao,
          },
        ],
      ],
    },
    margin: [0, 10, 0, 0],
  };

  const tabelaAptoSaidaTemporaria = {
    table: {
      headerRows: 1,
      widths: ["*"],
      alignment: "left",
      body: [
        [
          {
            text: `Está apta ao benefício da saída temporária: ${data.apto_saida_temporaria}`,
            ...estiloPadrao,
          },
        ],
        [
          {
            text: `Justificativa benefício da saída temporária: ${data.justificativa_saida_temporaria}`,
            ...estiloPadrao,
          },
        ],
      ],
    },
    margin: [0, 10, 0, 0],
  };

  const tabelaSintese = {
    table: {
      headerRows: 1,
      widths: ["*"],
      alignment: "left",
      body: [
        [
          {
            text: "SÍNTESE",
            ...estiloPadraoHeader,
          },
        ],
        [
          {
            text: data.sintese,
            ...estiloPadrao,
          },
        ],
      ],
    },
    margin: [0, 10, 0, 0],
  };

  /*ltima alteração: 17/01/2023 16:19:17 | MARCIO FELIPE M P DE QUEIROGA (84) Lotado em: PENITENCIARIA REGIONAL DE SAO LUIS | Processo
Originário
São Luís/MA, 06 de June de 2023
*/
  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage.toString() + " / " + pageCount.toString() + '\n\n',
        fontSize: 8,
        alignment: "right",
        margin: [10, -15, 10, -10],
      },
      {
        text: "________________________________________________________________________________________________________________________________________________________________",
        fontSize: 8,
        bold: true,
        alignment: "left",
        margin: [10, 0, 0, 10],
      },
      {
        text: data.ultima_atualizacao,
        fontSize: 8,
        noWrap: false,
        alignment: "left",
        margin: [10, -10, 20, 0],
      },
      {
        text: `São Luís/MA, ${dayjs().format("DD [de] MMMM [de] YYYY")}`,
        fontSize: 8,
        alignment: "left",
        margin: [10, 0, 0, 0],
      },
    ]
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],
    content: [
      ...header,
      tabelaInformacoesPessoaisDetento,
      data.processo_responde_preso_list.length > 0 ? tabelaProcessosQueRespondePreso : "",
      data.processo_execucao_list.length > 0 ? tabelaProcessosDeExecucao : "",
      data.processo_execucao_list.length > 0 ? tabelaProcessosOriginarios : "",
      tabelaNecessitaAtendimentyoDPE,
      tabelaAptoSaidaTemporaria,
      tabelaSintese,
    ],
    footer: data.ultima_atualizacao === undefined ? '' : Rodape,
  };

  pdfMake.createPdf(docDefinitions).open();
}

export default RelatorioProcessual;
