import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  TextRun,
} from 'docx'
import { saveAs } from 'file-saver'

export const saveAsDocx = (
  data: Array<{
    title: string
    texts: string[]
  }>
) => {
  Packer.toBlob(
    new Document({
      styles: {
        default: {
          heading1: {
            run: {
              font: '楷体',
              size: 84,
              bold: true,
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
          document: {
            run: {
              font: '楷体',
              size: 52,
              bold: true,
            },
          },
        },
      },
      sections: data.map((chapter) => ({
        properties: {
          page: {
            margin: {
              top: '15mm',
              left: '15mm',
              right: '15mm',
              bottom: '15mm',
            },
          },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            text: chapter.title,
          }),
          ...chapter.texts.map(
            (text) =>
              new Paragraph({
                text,
                indent: { left: 2 },
              })
          ),
        ],
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    size: 24,
                    bold: false,
                    children: [
                      PageNumber.CURRENT,
                      ' / ',
                      PageNumber.TOTAL_PAGES,
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
      })),
    })
  ).then((blob) => {
    console.log(blob)
    const first = data[0].title
    const last = data[data.length - 1].title
    saveAs(
      blob,
      `${first.replace(/[第集]/g, '')}-${last.replace(/[第集]/g, '')}.docx`
    )
    console.log('Document created successfully')
  })
}
