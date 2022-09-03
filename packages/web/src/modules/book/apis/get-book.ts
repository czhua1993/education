import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getBook = async (name: string) => {
  if (!name) {
    return null
  }
  const {
    data: { book },
  } = await client.query<{
    book: {
      name: string
      chapterList: Array<{ id: string; title: string }>
    }
  }>({
    query: gql`
      query getBook($name: String) {
        book(name: $name) {
          name
          chapterList {
            id
            title
          }
        }
      }
    `,
    variables: { name },
  })
  return book
}
