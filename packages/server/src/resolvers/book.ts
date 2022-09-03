import { fileThousandYears, shukeBeita } from '../epub'

export const bookResolvers = {
  Query: {
    book: (parent, args: { code: string }) => {
      return new Promise((resolve) => {
        console.log(args.code, args.code === 'shuke-beita')
        if (args.code === 'shuke-beita') {
          shukeBeita.on('end', () => {
            console.log(shukeBeita.flow.length, '222222222222')
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
          fileThousandYears.on('end', () => {
            fileThousandYears.getChapter(args.id, (error, text) => {
              resolve({
                id: args.id,
                title: '',
                text,
              })
            })
          })
          fileThousandYears.parse()
        } else {
          return null
        }
      })
    },
    chapterList: (
      parent,
      args: { code: string; ids: string[] },
      context,
      info
    ) => {
      return new Promise((resolve) => {
        if (args.code === 'shuke-beita') {
          shukeBeita.on('end', () => {
            Promise.all(
              args.ids.map(
                (id) =>
                  new Promise((resolve) => {
                    shukeBeita.getChapter(id, (error, text) => {
                      resolve({
                        id,
                        title: '',
                        text,
                      })
                    })
                  })
              )
            ).then((res) => resolve(res))
          })
          shukeBeita.parse()
        } else if (args.code === 'five-thousand-years') {
          fileThousandYears.on('end', () => {
            Promise.all(
              args.ids.map(
                (id) =>
                  new Promise((resolve) => {
                    fileThousandYears.getChapter(id, (error, text) => {
                      resolve({
                        id,
                        title: '',
                        text,
                      })
                    })
                  })
              )
            ).then((res) => resolve(res))
          })
          fileThousandYears.parse()
        } else {
          return null
        }
      })
    },
  },
}
