import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getChapterList = async (book: string, ids: string[]) => {
  if (!book || !ids) {
    return null
  }
  const {
    data: { chapterList },
  } = await client.query<{
    chapterList: Array<{ id: string; text: string }>
  }>({
    query: gql`
      query getChapterList($book: String, $ids: [String]) {
        chapterList(book: $book, ids: $ids) {
          id
          text
        }
      }
    `,
    variables: { book, ids },
  })
  return chapterList.map(({ text }) => {
    const div = document.createElement('div')
    div.innerHTML = text
    let title = ''
    const texts: string[] = []
    for (let i = 0; i < div.childNodes.length; i++) {
      const item = div.childNodes[i] as HTMLElement
      if (item.tagName === 'H1') {
        title = item.innerText
      } else if (item.innerText) {
        texts.push('　　' + (item.innerText || ''))
      } else if (item.innerHTML === '<br>') {
        texts.push('')
      }
    }
    return { title, texts }
  })
}
