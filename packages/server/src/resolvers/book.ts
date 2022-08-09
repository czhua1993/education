import { service } from '../database/services'
import { fileThousandYears, shukeBeita } from '../epub'

export const bookResolvers = {
  Query: {
    book: (parent, args: { code: string }) => {
      return new Promise((resolve) => {
        if (args.code === 'shuke-beita') {
          shukeBeita.on('end', () => {
            resolve({
              title: '舒克和贝塔',
              chapterList: shukeBeita.flow.map((c) => ({
                id: c.id,
                title: c.title,
                text: '',
              })),
            })
          })
          shukeBeita.parse()
        } else if (args.code === 'five-thousand-years') {
          fileThousandYears.on('end', () => {
            resolve({
              title: '上下五千年',
              chapterList: fileThousandYears.flow.map((c) => ({
                id: c.id,
                title: c.title,
                text: '',
              })),
            })
          })
          fileThousandYears.parse()
        } else {
          return null
        }
      })
    },
    chapter: (parent, args: { code: string; id: string }, context, info) => {
      return new Promise((resolve) => {
        if (args.code === 'shuke-beita') {
          shukeBeita.on('end', () => {
            shukeBeita.getChapter(args.id, (error, text) => {
              resolve({
                id: args.id,
                title: '',
                text,
              })
            })
          })
          shukeBeita.parse()
        } else if (args.code === 'five-thousand-years') {
          fileThousandYears.getChapter(args.id, (error, text) => {
            resolve({
              id: args.id,
              title: '',
              text,
            })
          })
        } else {
          return null
        }
      })
    },
  },
}
