import moment from 'moment'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { logoGovernoMaranhao, logoSeap } from './imagesBase64'

interface DadosTabela {
  sub1?: string
  sub2?: string
  sub3?: string
  dadosGeral: any
  tituloColunas: string[]
  tituloTabela?: string
}

function RelatorioGenerico({
  sub1,
  sub2,
  sub3,
  dadosGeral,
  tituloColunas,
  tituloTabela
}: DadosTabela) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const gerarTitulos = () => {
    return tituloColunas.map((item) => ({
      text: item,
      style: 'tableHeader',
      fontSize: 12,
      bold: true
    }))
  }
  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage.toString() + ' / ' + pageCount.toString(),
        fontSize: 7,
        alignment: 'right',
        margin: [10, 10, 20, 0]
      },
      {
        text: 'www.seap.ma.gov.br',
        fontSize: 10,
        alignment: 'center',
        margin: [10, 0, 20, 40]
      }
    ]
  }

  const dados = dadosGeral

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [
      {
        text: 'ESTADO DO MARANHÃO',
        fontSize: 13,
        bold: true,
        alignment: 'center',
        margin: [0, 20, 0, 0]
      }
    ],
    content: [
      {
        image: logoSeap.image,
        width: 60,
        height: 60,
        aligment: 'left',
        margin: [-10, -40, 0, 0]
      },
      {
        text: 'SECRETARIA DE ESTADO DE ADMINISTRAÇÃO PENITENCIÁRIA',
        fontSize: 12,
        bold: true,
        alignment: 'center',
        margin: [0, -30, 0, 0]
      },
      {
        image: logoGovernoMaranhao.image,
        alignment: 'right',
        width: 70,
        height: 50,
        margin: [-10, -40, 0, 0]
      },
      {
        text: tituloTabela,
        fontSize: 12,
        bold: true,
        alignment: 'center',
        margin: [15, 20, 0, 20]
      },
      {
        text: sub1 === undefined ? '' : sub1,
        fontSize: 10,
        bold: true,
        style: 'subheader',
        margin: [0, 2, 10, 8],
        alignment: 'justify'
      },
      {
        text: sub2 === undefined ? '' : sub2,
        fontSize: 10,
        bold: true,
        style: 'subheader',
        margin: [0, 2, 10, 8],
        alignment: 'justify'
      },
      {
        text: sub3 === undefined ? '' : sub3,
        fontSize: 10,
        bold: true,
        style: 'subheader',
        margin: [0, 2, 10, 8],
        alignment: 'justify'
      },
      {
        table: {
          headerRows: 1,
          widths: tituloColunas.map((item) => '*'),
          body: [gerarTitulos(), ...dados]
        },
        layout: 'lightHorizontalLines'
      }
    ],
    footer: Rodape
  }
  pdfMake.createPdf(docDefinitions).open()
}

export default RelatorioGenerico
