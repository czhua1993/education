import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getBooks = async () => {
  const {
    data: { books },
  } = await client.query<{
    books: Array<{
      name: string
      chapterList: Array<{ id: string; title: string }>
    }>
  }>({
    query: gql`
      query books {
        books {
          name
          chapterList {
            id
            title
          }
        }
      }
    `,
  })
  return books
}
