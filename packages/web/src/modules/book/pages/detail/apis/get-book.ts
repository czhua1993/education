import { client } from '@/graphql/client'
import { gql } from '@apollo/client'

export const getBook = async (code: string) => {
  if (!code) {
    return null
  }
  const {
    data: { book },
  } = await client.query({
    query: gql`
      query getBook($code: String) {
        book(code: $code) {
          title
          chapterList {
            id
            title
          }
        }
      }
    `,
    variables: { code },
  })
  return book
}
